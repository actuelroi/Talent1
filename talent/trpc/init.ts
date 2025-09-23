// trpc/init.ts
import { auth } from '@clerk/nextjs/server'
import { initTRPC, TRPCError } from '@trpc/server'
import { cache } from 'react'
import superjson from 'superjson'

// Development mode check
const isDevelopment = process.env.NODE_ENV === 'development'

export const createTRPCContext = cache(async () => {
  if (isDevelopment) {
    // Mock auth for development
    return {
      auth: {
        userId: 'dev-user-id-123',
        sessionId: 'dev-session-id',
        session: null,
        user: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        claims: null,
        debug: null,
      },
    }
  }

  try {
    // Production: use real auth
    const authData = await auth()
    return {
      auth: authData,
    }
  } catch (error) {
    console.error('Clerk auth failed:', error)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Authentication failed',
    })
  }
})

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const baseProcedure = t.procedure
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    })
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})



