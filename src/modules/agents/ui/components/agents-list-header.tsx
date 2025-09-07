"use client" ;
import { useState } from 'react';
import { Button } from '@/components/ui/button'

import { PlusIcon, XCircleIcon } from 'lucide-react';
import { NewAgentDialogue } from './new-agent-dialogue';
import { useAgentsFilter } from '../../hooks/use-agents-filter';
import { AgentsSearchFilter } from './Agents-search-filters';
import { DEFAULT_PAGE } from '@/constants';

const AgentsListHeader = () => {
  const [filters, setfilters] = useAgentsFilter();
  const[IsDailogueOpen,setIsDailogueOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setfilters({
      search:"",
      page: DEFAULT_PAGE,
      }); 
  
  }

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
      <div className="flex items-center gap-x-2 p-1 ">
        <AgentsSearchFilter/>
        {isAnyFilterModified && (
          <Button 
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          >
            <XCircleIcon />
            clear
          </Button>
        )}
      </div>
    </div>
    </>
  )
}

export default AgentsListHeader
