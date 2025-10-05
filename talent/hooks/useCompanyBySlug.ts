// hooks/useCompanyBySlug.ts
'use client';

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";



export function useCompanyBySlug(slug: string) {
    const trpc = useTRPC()
  return useQuery(trpc.company.getCompanyBySlug.queryOptions(
    { slug },
    {
      enabled: !!slug,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  ));
}