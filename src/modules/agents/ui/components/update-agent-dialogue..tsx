import { ResponsiveDialog  } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";


interface UpdateAgentDialogueProps{ 
    open:boolean,
    onOpenChange:(open:boolean)=>void;
    initialValues: AgentGetOne;
};
export const UpdateAgentDialogue = ({
    open,
    onOpenChange,
    initialValues,
}:UpdateAgentDialogueProps)=>{
    return(
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the Agent details ."
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    )
}