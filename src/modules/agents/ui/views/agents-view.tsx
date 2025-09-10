"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/Error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/Empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilter();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    // Handle both array and object with items/totalPages
    const items = Array.isArray(data) ? data : data.items;
    const totalPages = Array.isArray(data) ? 1 : data.totalPages ?? 1;

    return (
        <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4 ">
            <DataTable 
            data={items} 
            columns={columns} 
            onRowClick={(row)=>router.push(`/agents/${row.id}`)}
            />
            <DataPagination
                page={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {items.length === 0 && (
                <EmptyState
                    title="Create your First Agent"
                    description="Create an agent to join your meetings . Each agent will follow your instructions and can Interact with Paticipants during a call "
                />
            )}
        </div>
    );
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few seconds"
        />
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went Wrong"
        />
    );
};
