import { ResponsiveDialog } from "@/components/responsive-dialog";

import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
export const UpdateMeetingDialogue = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogueProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the Meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm 
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
