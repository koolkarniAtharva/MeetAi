import { EmptyState } from "@/components/Empty-state";

export const ProcessingState =()=>{
    return(
        <div className="bg-white rounded-lg p-4 py-5 flex flex-col gap-y-8 items-center justify-center shadow">
            <EmptyState
                image="/processing.svg"
                title="Meeting completed"
                description="This Meeting was completed , a summary will appear soon "
            />
        </div>
    )
}