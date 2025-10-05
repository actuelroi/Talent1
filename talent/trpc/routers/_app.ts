// src/trpc/routers/_app.ts
import { adminRouter } from "@/modules/admin/server/procedures"
import { advertisementRouter } from "@/modules/advertisement/server/procedures"
import { companyRouter } from "@/modules/company/server/procedures"

import { companyRegistrationRouter } from "@/modules/companyRegistration/server/procedures"
import { applicationRouter } from "@/modules/postulate/server/procedures"
import { jobPostingRouter, } from "@/modules/publishedJob/server/procedures"
import { createTRPCRouter } from "@/trpc/init"

export const appRouter = createTRPCRouter({
  companyRegistration: companyRegistrationRouter, // ⚡ plus clean : pas de `filesRouter: filesRouter`
  company : companyRouter,
  admin: adminRouter,
  publishedJob: jobPostingRouter,
  postulate: applicationRouter,
  advertisement: advertisementRouter,
 

})

export type AppRouter = typeof appRouter






