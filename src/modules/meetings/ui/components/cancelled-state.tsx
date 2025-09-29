import { EmptyState } from "@/components/Empty-state";

export const CancelledState =()=>{
    return(
        <div className="bg-white rounded-lg p-4 py-5 flex flex-col gap-y-8 items-center justify-center shadow">
            <EmptyState
                image="/cancelled.svg"
                title="Meeting Cancelled"
                description="This Meeting is Cancelled"
            />
        </div>
    )
}