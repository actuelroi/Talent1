// src/server/trpc/routers/admin.ts - Add this at the top
import { TRPCError } from '@trpc/server';
import { baseProcedure, createTRPCRouter } from '../init';

const adminMiddleware = baseProcedure.use(async ({ ctx, next }) => {
  // Add your admin check logic here
  // For example, check if the user has admin role in your system
  // or check against a list of admin user IDs
  
  const isAdmin = true; // Replace with your actual admin check logic
  
  if (!isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin access required',
    });
  }

  return next();
});

// Then use adminMiddleware instead of baseProcedure for all admin routes
export const adminRouter = createTRPCRouter({
  getPendingCompanies: adminMiddleware.query(async () => {
    // ... your existing code
  }),
  // ... other procedures with adminMiddleware
});