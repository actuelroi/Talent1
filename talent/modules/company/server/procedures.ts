// src/server/trpc/routers/company.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db'; // Import Prisma directly


export const companyRouter = createTRPCRouter({

// Add this to your company router in src/server/trpc/routers/company.ts

getCompanyBySlug: baseProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    const company = await prisma.company.findUnique({
      where: { 
        slug: input.slug,
        isActive: true 
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logoText: true,
        industries: true,
        location: true,
        website: true,
        gradientFrom: true,
        gradientTo: true,
        stats: true,
        presentation: true,
        lookingFor: true,
        metiers: true,
        verificationStatus: true,
        isVerified: true,
        description: true,
        industry: true,
        size: true,
        logo: true,
        coverImage: true,
        foundedYear: true,
        address: true,
        city: true,
        country: true,
        postalCode: true,
        members: {
          where: { isActive: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    if (!company) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Company not found'
      });
    }

    return { company };
  }),
// In your company router - make sure this is correct
getUserCompanies: baseProcedure
  .query(async ({ ctx }) => {
    console.log('🔍 getUserCompanies - auth context:', ctx.auth);
    
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // First find the user by clerkUserId
    const user = await prisma.user.findUnique({
      where: { clerkUserId: ctx.auth.userId },
      select: { id: true }
    });

    if (!user) {
      console.log('❌ getUserCompanies - User not found in database');
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
    }

    console.log('🔍 getUserCompanies - Database user ID:', user.id);

    const companies = await prisma.company.findMany({
      where: {
        members: {
          some: {
            userId: user.id, // Use the database user ID, not clerkUserId
            isActive: true,
          }
        }
      },
      include: {
        members: {
          where: {
            userId: user.id,
            isActive: true,
          },
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        }
      }
    });

    console.log('🔍 getUserCompanies - Found companies:', companies.map(c => ({
      id: c.id,
      name: c.name,
      verificationStatus: c.verificationStatus,
      members: c.members.length
    })));

    return {
      companies: companies.map(company => ({
        id: company.id,
        name: company.name,
        slug: company.slug,
        verificationStatus: company.verificationStatus,
        isActive: company.isActive,
        role: company.members[0]?.role || 'MEMBER',
        memberSince: company.members[0]?.joinedAt || company.createdAt,
        adminEmail: company.members[0]?.user?.email,
        // Include company profile data
        logoText: company.logoText,
        industries: company.industries,
        location: company.location,
        website: company.website,
        gradientFrom: company.gradientFrom,
        gradientTo: company.gradientTo,
        stats: company.stats,
        presentation: company.presentation
      }))
    };
  }),

updateCompany: baseProcedure
  .input(z.object({
    companyId: z.string(),
    data: z.object({
      name: z.string().optional(),
      logoText: z.string().optional(),
      industries: z.array(z.string()).optional(),
      location: z.string().optional(),
      website: z.string().optional(),
      gradientFrom: z.string().optional(),
      gradientTo: z.string().optional(),
      stats: z.any().optional(),
      presentation: z.array(z.string()).optional(),
      lookingFor: z.array(z.string()).optional(), // Add this line
      metiers: z.any().optional(), // Add this line
    })
  }))
  .mutation(async ({ input }) => {
    const updatedCompany = await prisma.company.update({
      where: { id: input.companyId },
      data: input.data
    });
    
    return { 
      success: true,
      company: updatedCompany
    };
  }),



  getCompanyDashboard: baseProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // First find the user by clerkUserId
      const user = await prisma.user.findUnique({
        where: { clerkUserId: ctx.auth.userId },
        select: { id: true }
      });

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
      }

      const companyMember = await prisma.companyMember.findFirst({
        where: {
          companyId: input.companyId,
          userId: user.id, // Use database user ID
          isActive: true,
        },
        include: {
          company: {
            include: {
              subscriptions: {
                where: {
                  status: { in: ['ACTIVE', 'TRIALING'] },
                },
                orderBy: { createdAt: 'desc' },
                take: 1,
                include: {
                  subscriptionPlan: true,
                },
              },
              _count: {
                select: {
                  jobPostings: { where: { isActive: true } },
                  members: { where: { isActive: true } },
                },
              },
            },
          },
        },
      });

      if (!companyMember) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
      }

      if (companyMember.company.verificationStatus !== 'VERIFIED') {
        throw new TRPCError({ 
          code: 'FORBIDDEN', 
          message: 'Company pending verification' 
        });
      }

      return {
        company: companyMember.company,
        memberRole: companyMember.role,
        subscription: companyMember.company.subscriptions[0],
      };
    }),


  // Add team member
  inviteTeamMember: baseProcedure
    .input(z.object({
      companyId: z.string(),
      email: z.string().email(),
      role: z.enum(['ADMIN', 'MANAGER', 'RECRUITER', 'MEMBER']),
      jobTitle: z.string().optional(),
      department: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // Verify requester has admin rights
      const requester = await prisma.companyMember.findFirst({
        where: {
          companyId: input.companyId,
          userId: ctx.auth.userId,
          role: 'ADMIN',
          isActive: true,
        },
      });

      if (!requester) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin rights required' });
      }

      // Find or create user
      let user = await prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
      });

      if (!user) {
        // Create user without Clerk ID (they'll complete registration later)
        user = await prisma.user.create({
          data: {
            email: input.email.toLowerCase(),
            firstName: '', // To be filled during registration
            lastName: '', // To be filled during registration
            role: 'COMPANY_ADMIN',
            emailVerified: false,
          },
        });
      }

      // Create membership
      const membership = await prisma.companyMember.create({
        data: {
          userId: user.id,
          companyId: input.companyId,
          role: input.role,
          jobTitle: input.jobTitle,
          department: input.department,
          isActive: true,
        },
      });

      // TODO: Send invitation email

      return { success: true, membership };
    }),

  // Get company team members
  getTeamMembers: baseProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // Verify user has access to this company
      const userMembership = await prisma.companyMember.findFirst({
        where: {
          companyId: input.companyId,
          userId: ctx.auth.userId,
          isActive: true,
        },
      });

      if (!userMembership) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
      }

      const teamMembers = await prisma.companyMember.findMany({
        where: {
          companyId: input.companyId,
          isActive: true,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
            },
          },
        },
        orderBy: [
          { role: 'desc' }, // Admins first
          { joinedAt: 'asc' },
        ],
      });

      return { teamMembers };
    }),

  // Remove team member
  removeTeamMember: baseProcedure
    .input(z.object({
      companyId: z.string(),
      memberId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // Verify requester has admin rights
      const requester = await prisma.companyMember.findFirst({
        where: {
          companyId: input.companyId,
          userId: ctx.auth.userId,
          role: 'ADMIN',
          isActive: true,
        },
      });

      if (!requester) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin rights required' });
      }

      // Prevent removing yourself
      if (input.memberId === ctx.auth.userId) {
        throw new TRPCError({ 
          code: 'FORBIDDEN', 
          message: 'Cannot remove yourself from company' 
        });
      }

      // Deactivate the membership
      await prisma.companyMember.updateMany({
        where: {
          companyId: input.companyId,
          userId: input.memberId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });

      return { success: true };
    }),


    // In src/server/trpc/routers/company.ts

// Add these procedures to your existing company router

// Get company jobs
getCompanyJobs: baseProcedure
  .input(z.object({ companyId: z.string() }))
  .query(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // Verify user has access to this company
    const userMembership = await prisma.companyMember.findFirst({
      where: {
        companyId: input.companyId,
        userId: ctx.auth.userId,
        isActive: true,
      },
    });

    // if (!userMembership) {
    //   throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
    // }

    const jobs = await prisma.jobPosting.findMany({
      where: {
        companyId: input.companyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { jobs };
  }),

// Create job
createJob: baseProcedure
  .input(z.object({
    companyId: z.string(),
    data: z.object({
      title: z.string(),
      description: z.string(),
      requirements: z.string().optional(),
      responsibilities: z.string().optional(),
      benefits: z.string().optional(),
      location: z.string(),
      remotePolicy: z.enum(['ONSITE','HYBRID','REMOTE']),
      employmentType: z.enum(['FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP','TEMPORARY']),
      salaryMin: z.number().nullable().optional(), // Change to nullable().optional()
      salaryMax: z.number().nullable().optional(), // Change to nullable().optional()
      currency: z.string().default('EUR'),
      experienceLevel: z.enum(['INTERNSHIP','ENTRY_LEVEL','JUNIOR','MID_LEVEL','SENIOR','LEAD','EXECUTIVE']),
      isActive: z.boolean().default(true),
      isFeatured: z.boolean().default(false),
      applicationUrl: z.string().optional(),
    })
  }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // Verify user has access to this company
    const userMembership = await prisma.companyMember.findFirst({
      where: {
        companyId: input.companyId,
        userId: ctx.auth.userId,
        isActive: true,
      },
    });

    // if (!userMembership) {
    //   throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
    // }

    // Generate slug from title
    const slug = input.data.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);

    const job = await prisma.jobPosting.create({
      data: {
        ...input.data,
        slug,
        companyId: input.companyId,
        publishedAt: new Date(),
      },
    });

    return { job };
  }),

// Update job
updateJob: baseProcedure
  .input(z.object({
    jobId: z.string(),
    data: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      requirements: z.string().optional(),
      responsibilities: z.string().optional(),
      benefits: z.string().optional(),
      location: z.string().optional(),
      remotePolicy: z.enum(['ONSITE','HYBRID','REMOTE']),
      employmentType: z.enum(['FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP','TEMPORARY']),
       salaryMin: z.number().nullable().optional(), // Change to nullable().optional()
      salaryMax: z.number().nullable().optional(), // Change to nullable().optional()
      currency: z.string().optional(),
       experienceLevel: z.enum(['INTERNSHIP','ENTRY_LEVEL','JUNIOR','MID_LEVEL','SENIOR','LEAD','EXECUTIVE']),
      isActive: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      applicationUrl: z.string().optional(),
    })
  }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // Get job to verify company access
    const job = await prisma.jobPosting.findUnique({
      where: { id: input.jobId },
      include: { company: true },
    });

    if (!job) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
    }

    // Verify user has access to this company
    const userMembership = await prisma.companyMember.findFirst({
      where: {
        companyId: job.companyId,
        userId: ctx.auth.userId,
        isActive: true,
      },
    });

    if (!userMembership) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
    }

    const updatedJob = await prisma.jobPosting.update({
      where: { id: input.jobId },
      data: input.data,
    });

    return { job: updatedJob };
  }),

// Delete job
deleteJob: baseProcedure
  .input(z.object({ jobId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // Get job to verify company access
    const job = await prisma.jobPosting.findUnique({
      where: { id: input.jobId },
      include: { company: true },
    });

    if (!job) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Job not found' });
    }

    // Verify user has access to this company
    const userMembership = await prisma.companyMember.findFirst({
      where: {
        companyId: job.companyId,
        userId: ctx.auth.userId,
        isActive: true,
      },
    });

    if (!userMembership) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
    }

    await prisma.jobPosting.delete({
      where: { id: input.jobId },
    });

    return { success: true };
  }),
});