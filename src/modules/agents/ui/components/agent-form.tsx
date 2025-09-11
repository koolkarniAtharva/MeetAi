import {z} from "zod";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface AgentsFormProps{
    onSuccess?:() => void;
    onCancel?:() => void;
    initailValues?: AgentGetOne;
};
export const AgentForm = ({
    onSuccess,
    onCancel,
    initailValues,
}:AgentsFormProps)=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async()=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                // TODO : Invatildate free tier Usage 
                onSuccess?.();
            },
            onError:(error)=>{
                toast.error(error.message);
                //TODO : check if error code is "Forbidden" , redirect to "/upgrade"
            },
        }),
    )

const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess: async()=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                );
                if(initailValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initailValues.id}),
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


    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver:zodResolver(agentsInsertSchema),
        defaultValues:{
            name:initailValues?.name??"",
            instructions:initailValues?.instructions??"",
        },
    });
    const isEdit = !!initailValues?.id;
    const isPending = createAgent.isPending || updateAgent.isPending;

    const onSubmit = (values:z.infer<typeof agentsInsertSchema>)=>{
        if(isEdit){
            updateAgent.mutate({...values, id: initailValues.id});
        }
        else{
            createAgent.mutate(values);
        }
    };

    return(
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />  
                <FormField
                    name="name"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="e.g. Math Tutor "/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea 
                                {...field} 
                                placeholder="e.g. You are a Math Tutor which will help me understand and deepen my knowledge of maths while helping me in my homework "/>
                            </FormControl>
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
    )
}