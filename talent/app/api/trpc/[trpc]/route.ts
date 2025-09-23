

// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest } from 'next/server'
import { appRouter } from '@/trpc/routers/_app'
import { createTRPCContext } from '@/trpc/init'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext(),
    onError: ({ error, path, input, ctx, type }) => {
      console.error('=== tRPC ERROR ===')
      console.error('Path:', path)
      console.error('Type:', type)
      console.error('Error:', error)
      console.error('Code:', error.code)
      console.error('Message:', error.message)
      console.error('Input:', input)
      console.error('===================')
    },
  })

export { handler as GET, handler as POST }



// import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// import { appRouter } from '@/lib/trpc/routers';
// import { createTRPCContext } from '@/lib/trpc/server';


// const handler = (req: Request) =>
//   fetchRequestHandler({
//     endpoint: '/api/trpc',
//     req,
//     router: appRouter,
//     createContext: () => createTRPCContext({ headers: req.headers }),
    
//   });

// export { handler as GET, handler as POST };