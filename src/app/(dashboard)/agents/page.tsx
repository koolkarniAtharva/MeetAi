import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server"

import { 
  AgentsView,
  AgentsViewError,
  AgentsViewLoading 
} from "@/modules/agents/ui/views/agents-view"
import { Suspense } from "react";

import {ErrorBoundary} from "react-error-boundary"

const page = async() => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
        <Suspense fallback={<AgentsViewLoading/>}>
          <AgentsView/>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}

export default page
