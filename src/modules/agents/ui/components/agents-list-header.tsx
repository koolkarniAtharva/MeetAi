"use client";
import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { NewAgentDialogue } from "./new-agent-dialogue";
import { AgentsSearchFilter } from "./Agents-search-filters";
import { useAgentsFilter } from "../../hooks/use-agents-filter";

const AgentsListHeader = () => {
  const [filters, setfilters] = useAgentsFilter();
  const [IsDailogueOpen, setIsDailogueOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setfilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialogue
        open={IsDailogueOpen}
        onOpenChange={setIsDailogueOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Agents</h5>
          <Button onClick={() => setIsDailogueOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1 ">
            <AgentsSearchFilter />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default AgentsListHeader;
