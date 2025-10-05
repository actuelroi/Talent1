// src/server/trpc/routers/companyRegistration.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';




import { CompanyMemberRole, CompanySize, UserRole } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';
import { rateLimit } from '@/trpc/middleware/rateLimit';
import { logger } from '@/lib/logger';

import { baseProcedure, createTRPCRouter } from '@/trpc/init';


// In your companyRegistration.ts, add this helper function
const ensurePlansExist = async (tx: any) => {
  const plans = await tx.subscriptionPlan.findMany({
    where: { slug: { in: ['starter', 'pro', 'enterprise'] } },
    select: { slug: true }
  });
  
  const existingSlugs = plans.map((p:any) => p.slug);
  const missingPlans = ['starter', 'pro', 'enterprise'].filter(slug => !existingSlugs.includes(slug));
  
  if (missingPlans.length > 0) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Missing subscription plans: ${missingPlans.join(', ')}. Please run the seed script.`
    });
  }
};




// Input validation schemas
const companyInfoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(100),
  companySize: z.nativeEnum(CompanySize),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  postalCode: z.string().optional().or(z.literal('')),
  country: z.string().default('France'), // ✅ required, matches frontend + DB
});
const accountInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  jobTitle: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
})

const planSelectionSchema = z.object({
  plan: z.enum(['starter', 'pro', 'enterprise']),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
  receiveNewsletter: z.boolean().default(true),
});

const completeRegistrationSchema = z.object({
  company: companyInfoSchema,
  account: accountInfoSchema,
  plan: planSelectionSchema,
});

// Helper functions
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateVerificationToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Plan ID lookup functions (moved outside the router)
const getStarterPlanId = async (tx: any): Promise<string> => {
  const plan = await tx.subscriptionPlan.findUnique({
    where: { slug: 'starter' },
    select: { id: true },
  });
  
  if (!plan) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Starter plan not configured',
    });
  }
  
  return plan.id;
};

const getProPlanId = async (tx: any): Promise<string> => {
  const plan = await tx.subscriptionPlan.findUnique({
    where: { slug: 'pro' },
    select: { id: true },
  });
  
  if (!plan) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Pro plan not configured',
    });
  }
  
  return plan.id;
};

const getEnterprisePlanId = async (tx: any): Promise<string> => {
  const plan = await tx.subscriptionPlan.findUnique({
    where: { slug: 'enterprise' },
    select: { id: true },
  });
  
  if (!plan) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Enterprise plan not configured',
    });
  }
  
  return plan.id;
};

export const companyRegistrationRouter = createTRPCRouter({
  checkCompanyAvailability: baseProcedure
    .input(z.object({
      companyName: z.string().min(1),
      email: z.string().email(),
    }))
    .use(rateLimit({ max: 10, windowMs: 10000 })) // Increase rate limit
    .mutation(async ({ input }) => {
      try {
        // Use Promise.all for parallel execution
        const [existingCompany, existingUser] = await Promise.all([
          prisma.company.findFirst({
            where: {
              OR: [
                { name: { equals: input.companyName, mode: 'insensitive' } },
                { slug: generateSlug(input.companyName) },
              ],
            },
            select: { id: true, name: true }, // Only select needed fields
          }),
          prisma.user.findUnique({
            where: { email: input.email.toLowerCase() },
            select: { id: true }, // Only select needed fields
          }),
        ]);

        // Only fetch suggestions if company exists
        let suggestions = null;
        if (existingCompany) {
          suggestions = {
            similarNames: await prisma.company.findMany({
              where: {
                name: { 
                  contains: input.companyName.substring(0, 3), // Only first 3 chars for performance
                  mode: 'insensitive' 
                },
                NOT: { id: existingCompany.id },
              },
              take: 3,
              select: { name: true },
            }),
          };
        }

        return {
          companyAvailable: !existingCompany,
          emailAvailable: !existingUser,
          suggestions,
        };
      } catch (error) {
        logger.error('Company availability check failed:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to check availability',
        });
      }
    }),

//  registerCompany: baseProcedure
//     .input(completeRegistrationSchema.extend({ clerkUserId: z.string() }))
//     .mutation(async ({ input }) => {
//       const { company, account, plan, clerkUserId } = input;

//       try {
//         // Step 1: Validate inputs quickly
//         const existingCompany = await prisma.company.findFirst({
//           where: { name: { equals: company.companyName, mode: 'insensitive' } },
//         });

//         if (existingCompany) {
//           throw new TRPCError({ code: 'CONFLICT', message: 'Company exists' });
//         }

//         // Step 2: Create user (fast operation)
//         let user = await prisma.user.findUnique({ where: { clerkUserId } });
        
//         if (!user) {
//           user = await prisma.user.create({
//             data: {
//               clerkUserId,
//               email: account.email.toLowerCase(),
//               firstName: account.firstName,
//               lastName: account.lastName,
//               role: UserRole.COMPANY_ADMIN,
//               emailVerified: true,
//             },
//           });
//         }

//         // Step 3: Create company (fast operation)
//         const newCompany = await prisma.company.create({
//           data: {
//             name: company.companyName,
//             slug: generateSlug(company.companyName),
//             industry: company.industry,
//             size: company.companySize,
//             website: company.website || null,
//             country: company.country,
//             isVerified: false,
//             isActive: true,
//           },
//         });

//         // Step 4: Create membership and subscription in parallel
//         await Promise.all([
//           prisma.companyMember.create({
//             data: {
//               userId: user.id,
//               companyId: newCompany.id,
//               role: CompanyMemberRole.ADMIN,
//               jobTitle: account.jobTitle || null,
//               department: account.department || null,
//               isActive: true,
//             },
//           }),
//           // Get plan ID and create subscription
//           (async () => {
//             const planRecord = await prisma.subscriptionPlan.findUnique({
//               where: { slug: plan.plan }
//             });
            
//             if (!planRecord) throw new Error('Plan not found');
            
//             await prisma.companySubscription.create({
//               data: {
//                 companyId: newCompany.id,
//                 subscriptionPlanId: planRecord.id,
//                 status: 'TRIALING',
//                 currentPeriodStart: new Date(),
//                 currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//                 cancelAtPeriodEnd: false,
//               },
//             });
//           })()
//         ]);

//         return { success: true, companyId: newCompany.id, userId: user.id , companySlug: newCompany.slug };

//       } catch (error) {
//         // Handle errors and cleanup if needed
//         logger.error('Step-by-step registration failed:', error);
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: 'Registration failed',
//         });
//       }
//     }),


registerCompany :baseProcedure
  .input(completeRegistrationSchema.extend({ clerkUserId: z.string() }))
  .mutation(async ({ input }) => {
    const { company, account, plan, clerkUserId } = input;

    try {
      return await prisma.$transaction(async (tx) => {
        // 🔎 Vérifier si la société existe déjà
        const existingCompany = await tx.company.findFirst({
          where: { name: { equals: company.companyName, mode: 'insensitive' } },
        });

        if (existingCompany) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Company already exists' });
        }

        // 🔎 Vérifier si un user existe déjà avec ce clerkUserId ou email
        let user = await tx.user.findFirst({
          where: {
            OR: [
              { clerkUserId },
              { email: account.email.toLowerCase() },
            ],
          },
        });

        if (!user) {
          // Aucun utilisateur → créer
          user = await tx.user.create({
            data: {
              clerkUserId,
              email: account.email.toLowerCase(),
              firstName: account.firstName,
              lastName: account.lastName,
              role: UserRole.COMPANY_ADMIN,
              emailVerified: true,
            },
          });
        } else if (!user.clerkUserId) {
          // Utilisateur existe avec email mais pas encore lié à Clerk → mise à jour
          user = await tx.user.update({
            where: { id: user.id },
            data: { clerkUserId },
          });
        }

        // ✅ Créer la société
        const newCompany = await tx.company.create({
          data: {
            name: company.companyName,
            slug: company.companyName.toLowerCase().replace(/\s+/g, '-'),
            industry: company.industry,
            size: company.companySize,
            website: company.website || null,
            country: company.country,
            isVerified: false,
            isActive: true,
          },
        });

        // ✅ Créer l’adhésion + abonnement en parallèle
        await Promise.all([
          tx.companyMember.create({
            data: {
              userId: user.id,
              companyId: newCompany.id,
              role: CompanyMemberRole.ADMIN,
              jobTitle: account.jobTitle || null,
              department: account.department || null,
              isActive: true,
            },
          }),
          (async () => {
            const planRecord = await tx.subscriptionPlan.findUnique({
              where: { slug: plan.plan },
            });

            if (!planRecord) throw new Error('Plan not found');

            await tx.companySubscription.create({
              data: {
                companyId: newCompany.id,
                subscriptionPlanId: planRecord.id,
                status: 'TRIALING',
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                cancelAtPeriodEnd: false,
              },
            });
          })(),
        ]);

        return {
          success: true,
          companyId: newCompany.id,
          userId: user.id,
          companySlug: newCompany.slug,
        };
      });
    } catch (error: any) {
      logger.error('Registration failed:', error);

      // Prisma unique constraint error (P2002)
      if (error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Duplicate value for ${error.meta?.target}`,
        });
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Registration failed',
      });
    }
  }),
  
    // src/server/trpc/routers/companyRegistration.ts - Add new procedure
completeCompanyProfile: baseProcedure
  .input(z.object({
    clerkUserId: z.string(),
    email: z.string().email(),
    companyName: z.string().min(1),
    companySize: z.enum(['SIZE_1_10', 'SIZE_11_50', 'SIZE_51_200', 'SIZE_201_500', 'SIZE_501_1000', 'SIZE_1000_PLUS']),
    industry: z.string().min(1),
    website: z.string().optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    jobTitle: z.string().optional().or(z.literal('')),
    department: z.string().optional().or(z.literal('')),
  }))
  .mutation(async ({ input }) => {
    const { clerkUserId, email, companyName, companySize, industry, website, jobTitle, department } = input;

    return await prisma.$transaction(async (tx: any) => {
      try {
        // Check if company already exists
        const existingCompany = await tx.company.findFirst({
          where: {
            name: { equals: companyName, mode: 'insensitive' },
          },
        });

        if (existingCompany) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Ce nom d\'entreprise existe déjà',
          });
        }

        // Create company
        const newCompany = await tx.company.create({
          data: {
            name: companyName,
            slug: generateSlug(companyName),
            industry,
            size: companySize,
            website: website || null,
            isVerified: false,
            isActive: true,
          },
        });

        // Find or create user based on Clerk user ID
        let user = await tx.user.findUnique({
          where: { clerkUserId },
        });

        if (!user) {
          // Create user with Clerk reference
          user = await tx.user.create({
            data: {
              clerkUserId,
              email: email.toLowerCase(),
              firstName: '', // Will be updated from Clerk
              lastName: '', // Will be updated from Clerk
              role: UserRole.COMPANY_ADMIN,
              emailVerified: true, // Clerk handles email verification
            },
          });
        }

        // Create company membership
        await tx.companyMember.create({
          data: {
            userId: user.id,
            companyId: newCompany.id,
            role: CompanyMemberRole.ADMIN,
            jobTitle: jobTitle || null,
            department: department || null,
            isActive: true,
          },
        });

        // Create starter subscription
        const subscriptionPlanId = await getStarterPlanId(tx);
        const currentDate = new Date();
        const periodEnd = new Date();
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        await tx.companySubscription.create({
          data: {
            companyId: newCompany.id,
            subscriptionPlanId,
            status: 'TRIALING',
            currentPeriodStart: currentDate,
            currentPeriodEnd: periodEnd,
            cancelAtPeriodEnd: false,
          },
        });

        logger.info('Company profile completed via Clerk', {
          companyId: newCompany.id,
          userId: user.id,
          clerkUserId,
        });

        return {
          success: true,
          companyId: newCompany.id,
          message: 'Profil entreprise créé avec succès',
        };

      } catch (error) {
        logger.error('Company profile completion failed:', error);
        
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la création du profil',
        });
      }
    });
  }),
});