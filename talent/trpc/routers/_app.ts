// src/trpc/routers/_app.ts
import { companyRegistrationRouter } from "@/modules/companyRegistration/server/procedures"
import { createTRPCRouter } from "@/trpc/init"

export const appRouter = createTRPCRouter({
  companyRegistration: companyRegistrationRouter, // ⚡ plus clean : pas de `filesRouter: filesRouter`
 


})

export type AppRouter = typeof appRouter



