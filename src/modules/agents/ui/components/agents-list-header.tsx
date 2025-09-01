"use client" ;
import { useState } from 'react';
import { Button } from '@/components/ui/button'

import { PlusIcon } from 'lucide-react';
import { NewAgentDialogue } from './new-agent-dialogue';

const AgentsListHeader = () => {
  const[IsDailogueOpen,setIsDailogueOpen] = useState(false);
  return (
   <>
  <NewAgentDialogue 
    open={IsDailogueOpen}
    onOpenChange={setIsDailogueOpen}
  />
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h5>My Agents</h5>
        <Button onClick={()=>setIsDailogueOpen(true)}>
          <PlusIcon/>
          New Agent
        </Button>
      </div>
    </div>
    </>
  )
}

export default AgentsListHeader
