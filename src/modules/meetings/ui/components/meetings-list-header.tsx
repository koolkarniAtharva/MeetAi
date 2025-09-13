"use client" ;
import { Button } from '@/components/ui/button'

import { PlusIcon } from 'lucide-react';
import { NewMeetingDialogue } from './new-meeting-dialogue';
import { useState } from 'react';

const MeetingsListHeader = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false);

  return (
   <>
   <NewMeetingDialogue
    open={isDialogOpen}
    onOpenChange={setisDialogOpen}
   />
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h5>My Agents</h5>
        <Button onClick={()=>setisDialogOpen(true)} >
          <PlusIcon/>
          New Meetings
        </Button>
      </div>
      <div className="flex items-center gap-x-2 p-1 ">
        TODO: filters
        </div>
    </div>
    </>
  )
}

export default MeetingsListHeader
