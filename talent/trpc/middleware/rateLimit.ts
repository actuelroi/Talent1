// src/server/trpc/middleware/rateLimit.ts
import { TRPCError } from '@trpc/server';

interface RateLimitOptions {
  max: number;
  windowMs: number;
  keyGenerator?: (ctx: any) => string;
}

// Simple in-memory rate limiter (no external dependencies)
const createMemoryStore = () => {
  const store = new Map<string, { count: number; resetTime: number }>();
  
  return {
    get: (key: string): number => {
      const item = store.get(key);
      if (!item) return 0;
      if (item.resetTime < Date.now()) {
        store.delete(key);
        return 0;
      }
      return item.count;
    },
    
    increment: (key: string, windowMs: number): number => {
      const now = Date.now();
      const item = store.get(key);
      
      if (!item || item.resetTime < now) {
        // New window
        store.set(key, { count: 1, resetTime: now + windowMs });
        return 1;
      } else {
        // Existing window
        item.count += 1;
        return item.count;
      }
    },
    
    // Clean up expired entries (optional, for memory management)
    cleanup: () => {
      const now = Date.now();
      for (const [key, item] of store.entries()) {
        if (item.resetTime < now) {
          store.delete(key);
        }
      }
    }
  };
};

const memoryStore = createMemoryStore();

// Run cleanup every 5 minutes
setInterval(() => memoryStore.cleanup(), 1 * 60 * 1000);

export const rateLimit = (options: RateLimitOptions) => {
  const { max, windowMs, keyGenerator = (ctx) => ctx.req?.ip || 'anonymous' } = options;

  return async ({ ctx, next }: any) => {
    const key = `rate_limit:${keyGenerator(ctx)}`;
    
    try {
      const currentCount = memoryStore.get(key);
      
      if (currentCount >= max) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Too many requests, please try again later.',
        });
      }

      // Increment counter
      const newCount = memoryStore.increment(key, windowMs);

      return next();
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      console.error('Rate limiting error:', error);
      // Allow the request to proceed if rate limiting fails
      return next();
    }
  };
};