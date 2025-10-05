// src/server/trpc/routers/advertisement.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';

const advertisementInput = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  image: z.string().url("Invalid image URL"),
  redirectUrl: z.string().url("Invalid redirect URL"),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  priority: z.number().min(1).max(10).default(1),
  details: z.object({
    fullDescription: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    duration: z.string().optional(),
    features: z.array(z.string()).optional(),
  }).optional(),
});

export const advertisementRouter = createTRPCRouter({
  // Get active ads for public display
  getActiveAds: baseProcedure
    .query(async () => {
      const now = new Date();
      
      const ads = await prisma.advertisement.findMany({
        where: {
          isActive: true,
          startDate: { lte: now },
          endDate: { gte: now },
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          redirectUrl: true,
          priority: true,
          details: true,
          clicks: true,
          impressions: true,
        }
      });

      // Increment impressions for analytics
      if (ads.length > 0) {
        await prisma.advertisement.updateMany({
          where: {
            id: { in: ads.map(ad => ad.id) },
            isActive: true,
          },
          data: {
            impressions: { increment: 1 }
          }
        });
      }

      return { ads };
    }),

  // Get ad by ID for detail page
  getAdById: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const ad = await prisma.advertisement.findFirst({
        where: {
          id: input.id,
          isActive: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        }
      });

      if (!ad) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Advertisement not found'
        });
      }

      // Increment clicks when viewing details
      await prisma.advertisement.update({
        where: { id: input.id },
        data: { clicks: { increment: 1 } }
      });

      return { ad };
    }),

  // Admin: Get all ads with pagination
  getAllAds: baseProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
      includeInactive: z.boolean().default(false),
    }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin (you'll need to implement proper admin check)
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const skip = (input.page - 1) * input.limit;
      const where = input.includeInactive ? {} : { isActive: true };

      const [ads, totalCount] = await Promise.all([
        prisma.advertisement.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take: input.limit,
        //   include: {
        //     // You might want to include creator info here
        //   }
        }),
        prisma.advertisement.count({ where })
      ]);

      return {
        ads,
        pagination: {
          page: input.page,
          limit: input.limit,
          totalCount,
          totalPages: Math.ceil(totalCount / input.limit),
        }
      };
    }),

  // Admin: Create new ad
  createAd: baseProcedure
    .input(advertisementInput)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // Validate date range
      if (input.endDate <= input.startDate) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'End date must be after start date'
        });
      }

      const ad = await prisma.advertisement.create({
        data: {
          ...input,
          createdById: ctx.auth.userId,
        }
      });

      return { ad };
    }),

  // Admin: Update ad
  updateAd: baseProcedure
    .input(z.object({
      id: z.string(),
      data: advertisementInput.partial(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const ad = await prisma.advertisement.findUnique({
        where: { id: input.id }
      });

      if (!ad) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Advertisement not found'
        });
      }

      const updatedAd = await prisma.advertisement.update({
        where: { id: input.id },
        data: input.data
      });

      return { ad: updatedAd };
    }),

  // Admin: Toggle ad active status
  toggleAdStatus: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const ad = await prisma.advertisement.findUnique({
        where: { id: input.id }
      });

      if (!ad) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Advertisement not found'
        });
      }

      const updatedAd = await prisma.advertisement.update({
        where: { id: input.id },
        data: { isActive: !ad.isActive }
      });

      return { ad: updatedAd };
    }),

  // Admin: Delete ad
  deleteAd: baseProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await prisma.advertisement.delete({
        where: { id: input.id }
      });

      return { success: true };
    }),

  // Get ad statistics
  getAdStats: baseProcedure
    .query(async ({ ctx }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const [totalAds, activeAds, totalClicks, totalImpressions] = await Promise.all([
        prisma.advertisement.count(),
        prisma.advertisement.count({ where: { isActive: true } }),
        prisma.advertisement.aggregate({ _sum: { clicks: true } }),
        prisma.advertisement.aggregate({ _sum: { impressions: true } }),
      ]);

      return {
        totalAds,
        activeAds,
        totalClicks: totalClicks._sum.clicks || 0,
        totalImpressions: totalImpressions._sum.impressions || 0,
      };
    }),
});