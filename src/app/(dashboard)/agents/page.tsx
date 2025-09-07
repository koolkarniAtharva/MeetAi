import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server"

import { 
  AgentsView,
  AgentsViewError,
  AgentsViewLoading 
} from "@/modules/agents/ui/views/agents-view"
import { Suspense } from "react";

import {ErrorBoundary} from "react-error-boundary"
import AgentsListHeader from "@/modules/agents/ui/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";


interface Props{
  searchParams: Promise<SearchParams>;
}

const page = async({ searchParams }:Props) => {
  const filters = await loadSearchParams(searchParams);
   
  const session= await auth.api.getSession({
    headers:await headers(),
  });

  if(!session){
    redirect("/sign-in")
  }


  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
        <Suspense fallback={<AgentsViewLoading/>}>
          <AgentsView/>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
    </>
  )
}

export default page
