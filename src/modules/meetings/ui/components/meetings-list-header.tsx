"use client";
import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { StatusFilter } from "./status-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { NewMeetingDialogue } from "./new-meeting-dialogue";
import { MeetingsSearchFilter } from "./Meetings-search-filters";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";

export const MeetingsListHeader = () => {
  const [filter, setFilter] = useMeetingsFilter();
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filter.status || !!filter.search || !!filter.agentId;

  const onClearFilters = () => {
    setFilter({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialogue open={isDialogOpen} onOpenChange={setisDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5>My Meetings</h5>
          <Button onClick={() => setisDialogOpen(true)}>
            <PlusIcon />
            New Meetings
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1 ">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar
          orientation="horizontal"
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeader;
