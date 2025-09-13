import { z } from "zod";
import { MeetingGetOne } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialogue } from "@/modules/agents/ui/components/new-agent-dialogue";

interface MeetingFormProps{
    onSuccess?:(id?:string) => void;
    onCancel?:() => void;
    initailValues?: MeetingGetOne;
};
export const MeetingForm = ({
    onSuccess,  
    onCancel,
    initailValues,
}:MeetingFormProps)=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [openNewAgentDialog, setopenNewAgentDialog] = useState(false)
    const [agentSearch,setAgentSearch] = useState("");

    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search:agentSearch
        }),
    );


    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async(data)=>{
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                // TODO : Invatildate free tier Usage 
                onSuccess?.(data.id);
            },
            onError:(error)=>{
                toast.error(error.message);
                //TODO : check if error code is "Forbidden" , redirect to "/upgrade"
            },
        }),
    )

const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async()=>{
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                );
                if(initailValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({id:initailValues.id}),
                    );
                }
                onSuccess?.();
            },
            onError:(error)=>{
                toast.error(error.message);
                //TODO : check if error code is "Forbidden" , redirect to "/upgrade"
            },
        }),
    )


    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver:zodResolver(meetingsInsertSchema),
        defaultValues:{
            name:initailValues?.name??"",
            agentId:initailValues?.agentId??"",
        },
    });
    const isEdit = !!initailValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values:z.infer<typeof meetingsInsertSchema>)=>{
        if(isEdit){
            updateMeeting.mutate({...values, id: initailValues.id});
        }
        else{
            createMeeting.mutate(values);
        }
    };

    return(
         <>
        <NewAgentDialogue 
        open={openNewAgentDialog}
        onOpenChange={setopenNewAgentDialog}
        />
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>  
                <FormField
                    name="name"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math Consultations "/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                <FormField
                    name="agentId"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Agent</FormLabel>
                            <FormControl>
                                <CommandSelect
                                    options={(agents.data?.items ?? [] ).map((agent)=>({
                                        id:agent.id,
                                        value:agent.id,
                                        children:(
                                            <div className="flex items-center gap-x-2">
                                                <GeneratedAvatar
                                                    seed={agent.name}
                                                    variant="botttsNeutral"
                                                    className="border size-6"
                                                    />
                                                <span>{agent.name}</span>
                                            </div>
                                        )
                                    }))}
                                    onSelect={field.onChange}
                                    onSearch={setAgentSearch}
                                    value={field.value}
                                    placeholder="Select an agent"
                                    />
                            </FormControl>
                            <FormDescription>
                                Not Found what you&apos;re looking for ?{" "}
                                <button
                                typeof="button"
                                className="text-primary hover:underline"
                                onClick={()=> setopenNewAgentDialog(true)}
                                >
                                    Create a new Agent
                                </button>
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                
                <div className=" flex justify-between gap-x-2">
                    {onCancel && (
                        <Button
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={()=>onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                    disabled={isPending}
                    type="submit"
                    >
                        {isEdit ?"Update": "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    </>
    )
}