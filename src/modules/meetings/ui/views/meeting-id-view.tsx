"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { useConfirm } from "@/hooks/use-comfirm";
import { ErrorState } from "@/components/Error-state";
import { LoadingState } from "@/components/loading-state";

import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { UpdateMeetingDialogue } from "../components/update-meeting-dialogue.";

interface Props{
    meetingId: string;
};

export const MeetingIdView =({meetingId}:Props)=>{

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const [UpdateMeetingDialogueOpen,setUpdateMeetingDialogueOpen] = useState(false);

    const [RemoveConfirmation,confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting.",

    )

    const {data}  = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId})
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                // TODO Invalidate Free Tier Usage 
                router.push("/meetings")
            },
        })
    );

    const handleRemoveMeeting = async()=>{
        const ok = await confirmRemove();

        if(!ok) return;

        await removeMeeting.mutateAsync({id: meetingId});
    }

    return(
        <>
            <RemoveConfirmation/>
            <UpdateMeetingDialogue
                open={UpdateMeetingDialogueOpen}
                onOpenChange={setUpdateMeetingDialogueOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name }
                    onEdit={()=>setUpdateMeetingDialogueOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {JSON.stringify(data,null,2)}
            </div>
        </>
    )
};

export const MeetingIdViewLoading =()=>{
    return(
        <LoadingState
            title="Loading Meeting"
            description="This may take a few seconds."
        />
    );
};

export const MeetingIdViewError =()=>{
    return(
        <ErrorState
            title="Error loading Meeting"
            description="Please try again later ."
        />
    );
};
