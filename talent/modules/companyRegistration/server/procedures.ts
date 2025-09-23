// src/server/trpc/routers/companyRegistration.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';



import { CompanyMemberRole, CompanySize, UserRole } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';
import { rateLimit } from '@/trpc/middleware/rateLimit';
import { logger } from '@/lib/logger';
import { sendVerificationEmail } from '@/lib/email';
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
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain letters and numbers'),
  confirmPassword: z.string(),
  jobTitle: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

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
    .use(rateLimit({ max: 5, windowMs: 60000 }))
    .mutation(async ({ input }) => {
      try {
        const [existingCompany, existingUser] = await Promise.all([
          prisma.company.findFirst({
            where: {
              OR: [
                { name: { equals: input.companyName, mode: 'insensitive' } },
                { slug: generateSlug(input.companyName) },
              ],
            },
            select: { id: true },
          }),
          prisma.user.findUnique({
            where: { email: input.email.toLowerCase() },
            select: { id: true },
          }),
        ]);

        return {
          companyAvailable: !existingCompany,
          emailAvailable: !existingUser,
          suggestions: existingCompany ? {
            similarNames: await prisma.company.findMany({
              where: {
                name: { contains: input.companyName, mode: 'insensitive' },
                NOT: { id: existingCompany.id },
              },
              take: 3,
              select: { name: true },
            }),
          } : null,
        };
      } catch (error) {
        logger.error('Company availability check failed:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to check availability',
        });
      }
    }),

  registerCompany: baseProcedure
    .input(completeRegistrationSchema)
    .use(rateLimit({ max: 3, windowMs: 900000 }))
    .mutation(async ({ input }) => {
      const { company, account, plan } = input;
      
      return await prisma.$transaction(async (tx: any) => {
        try {
           await ensurePlansExist(tx);
              console.log('Checking for existing company...');
          // Check if company name or email already exists
          const [existingCompany, existingUser] = await Promise.all([
            tx.company.findFirst({
              where: {
                OR: [
                  { name: { equals: company.companyName, mode: 'insensitive' } },
                  { slug: generateSlug(company.companyName) },
                ],
              },
            }),
            tx.user.findUnique({
              where: { email: account.email.toLowerCase() },
            }),
          ]);

          if (existingCompany) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Company name already exists',
            });
          }

          if (existingUser) {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Email already registered',
            });
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(account.password, 12);

        console.log('Creating company...');

          // Create company
          const newCompany = await tx.company.create({
            data: {
              name: company.companyName,
              slug: generateSlug(company.companyName),
              industry: company.industry,
              size: company.companySize,
              website: company.website || null,
              address: company.address || null,
              city: company.city || null,
              postalCode: company.postalCode || null,
              country: company.country,
              isVerified: false,
              isActive: true,
            },
          });
          console.log('Creating user...');
          // Create user
          const newUser = await tx.user.create({
            data: {
              email: account.email.toLowerCase(),
              password: hashedPassword,
              firstName: account.firstName,
              lastName: account.lastName,
              role: UserRole.COMPANY_ADMIN,
              emailVerified: false,
            },
          });

          // Create company membership
          
          await tx.companyMember.create({
            data: {
              userId: newUser.id,
              companyId: newCompany.id,
              role: CompanyMemberRole.ADMIN,
              jobTitle: account.jobTitle || null,
              department: account.department || null,
              isActive: true,
            },
          });

          // Create subscription based on plan
          let subscriptionPlanId: string;
          
          switch (plan.plan) {
            case 'pro':
              subscriptionPlanId = await getProPlanId(tx);
              break;
            case 'enterprise':
              subscriptionPlanId = await getEnterprisePlanId(tx);
              break;
            default:
              subscriptionPlanId = await getStarterPlanId(tx);
          }

          const currentDate = new Date();
          const periodEnd = new Date();
          periodEnd.setMonth(periodEnd.getMonth() + 1);
          console.log('Creating subscription...');
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

          // Generate verification token and send email
          const verificationToken = generateVerificationToken();
          
          await sendVerificationEmail({
            email: account.email,
            firstName: account.firstName,
            verificationToken,
            companyName: company.companyName,
          });

          logger.info('Company registration completed', {
            companyId: newCompany.id,
            userId: newUser.id,
            plan: plan.plan,
          });

          return {
            success: true,
            companyId: newCompany.id,
            userId: newUser.id,
            message: 'Registration completed successfully. Please check your email for verification.',
          };

        } catch (error) {
          logger.error('Company registration failed:', error);
          
          if (error instanceof TRPCError) {
            throw error;
          }
          
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to complete registration',
          });
        }
      });
    }),
});