// // src/server/trpc/routers/job.ts
// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, baseProcedure } from '@/trpc/init';
// import { prisma } from '@/lib/db';
// import { EmploymentType, ExperienceLevel, RemotePolicy } from '@/lib/generated/prisma';


// export const jobRouter = createTRPCRouter({
//   // Get all active job postings for homepage
//  // Get all active job postings for homepage
//   getHomepageJobs: baseProcedure
//     .input(z.object({
//       limit: z.number().min(1).max(50).default(9),
//       cursor: z.string().optional(),
//       search: z.string().optional(),
//       location: z.string().optional(),
//       employmentType: z.array(z.nativeEnum(EmploymentType)).optional(),
//       remotePolicy: z.array(z.nativeEnum(RemotePolicy)).optional(),
//       experienceLevel: z.array(z.nativeEnum(ExperienceLevel)).optional(),
//       salaryRange: z.object({
//         min: z.number().optional(),
//         max: z.number().optional(),
//       }).optional(),
//       categories: z.array(z.string()).optional(),
//     }))
//     .query(async ({ input }) => {
//       const {
//         limit,
//         cursor,
//         search,
//         location,
//         employmentType,
//         remotePolicy,
//         experienceLevel,
//         salaryRange,
//         categories
//       } = input;

//       try {
//         const jobs = await prisma.jobPosting.findMany({
//           where: {
//             isActive: true,
//             publishedAt: { lte: new Date() },
//             expiresAt: { gt: new Date() },
//             ...(search && {
//               OR: [
//                 { title: { contains: search, mode: 'insensitive' } },
//                 { description: { contains: search, mode: 'insensitive' } },
//                 { company: { name: { contains: search, mode: 'insensitive' } } },
//               ],
//             }),
//             ...(location && {
//               OR: [
//                 { location: { contains: location, mode: 'insensitive' } },
//                 { remotePolicy: { in: ['REMOTE', 'HYBRID'] } },
//               ],
//             }),
//             ...(employmentType && employmentType.length > 0 && {
//               employmentType: { in: employmentType },
//             }),
//             ...(remotePolicy && remotePolicy.length > 0 && {
//               remotePolicy: { in: remotePolicy },
//             }),
//             ...(experienceLevel && experienceLevel.length > 0 && {
//               experienceLevel: { in: experienceLevel },
//             }),
//             ...(salaryRange && {
//               OR: [
//                 {
//                   AND: [
//                     { salaryMin: { gte: salaryRange.min } },
//                     { salaryMin: { lte: salaryRange.max } },
//                   ],
//                 },
//                 {
//                   AND: [
//                     { salaryMax: { gte: salaryRange.min } },
//                     { salaryMax: { lte: salaryRange.max } },
//                   ],
//                 },
//               ],
//             }),
//             ...(categories && categories.length > 0 && {
//               jobCategories: {
//                 some: {
//                   category: {
//                     slug: { in: categories }
//                   }
//                 }
//               }
//             }),
//           },
//           include: {
//             company: {
//               select: {
//                 id: true,
//                 name: true,
//                 logo: true,
//                 slug: true,
//                 location: true,
//                 description: true, // This should exist in your Company model
//                 coverImage: true, // This should exist in your Company model
//                 isVerified: true,
//               },
//             },
//             jobCategories: {
//               include: {
//                 category: true,
//               },
//             },
//           },
//           orderBy: [
//             { isFeatured: 'desc' },
//             { publishedAt: 'desc' },
//             { createdAt: 'desc' },
//           ],
//           take: limit + 1,
//           cursor: cursor ? { id: cursor } : undefined,
//         });

//         let nextCursor: typeof cursor | undefined = undefined;
//         if (jobs.length > limit) {
//           const nextItem = jobs.pop();
//           nextCursor = nextItem!.id;
//         }

//         // Transform the data to match your frontend interface
//         const transformedJobs = jobs.map(job => ({
//           id: job.id,
//           name: job.company.name,
//           title: job.title,
//           contract: job.employmentType,
//           time: formatTimeAgo(job.publishedAt || job.createdAt),
//           location: job.location,
//           image: job.company.coverImage || getDefaultJobImage(job.employmentType),
//           logo: job.company.logo || getDefaultLogo(),
//           description: job.company.description || `${job.company.name} recrute pour le poste de ${job.title}`,
//           offer: job.description.substring(0, 150) + (job.description.length > 150 ? '...' : ''),
//           tags: job.jobCategories.map(jc => jc.category.name),
//           salary: job.salaryMin || undefined,
//           remotePolicy: job.remotePolicy,
//           experienceLevel: job.experienceLevel,
//           companySlug: job.company.slug,
//           jobSlug: job.slug,
//         }));

//         return {
//           jobs: transformedJobs,
//           nextCursor,
//         };
//       } catch (error) {
//         console.error('Error fetching homepage jobs:', error);
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: 'Failed to fetch job listings',
//         });
//       }
//     }),

//   // Get job by ID and slug
//   getJobBySlug: baseProcedure
//     .input(z.object({ 
//       companySlug: z.string(),
//       jobSlug: z.string() 
//     }))
//     .query(async ({ input }) => {
//       const job = await prisma.jobPosting.findFirst({
//         where: { 
//           slug: input.jobSlug,
//           company: {
//             slug: input.companySlug
//           },
//           isActive: true,
//           publishedAt: { lte: new Date() },
//           expiresAt: { gt: new Date() },
//         },
//         include: {
//           company: {
//             select: {
//               id: true,
//               name: true,
//               logo: true,
//               slug: true,
//               description: true,
//               website: true,
//               location: true,
//               isVerified: true,
//               benefits: {
//                 where: { isActive: true },
//               },
//               commitments: {
//                 where: { isActive: true },
//               },
//             },
//           },
//           jobCategories: {
//             include: {
//               category: true,
//             },
//           },
//         },
//       });

//       if (!job) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Job not found',
//         });
//       }

//       return { job };
//     }),

//   // Increment job views
//   incrementJobViews: baseProcedure
//     .input(z.object({ jobId: z.string() }))
//     .mutation(async ({ input, ctx }) => {
//       // First find the user by clerkUserId if authenticated
//       let userId: string | undefined;
      
//       if (ctx.auth?.userId) {
//         const user = await prisma.user.findUnique({
//           where: { clerkUserId: ctx.auth.userId },
//           select: { id: true }
//         });
//         userId = user?.id;
//       }

//       await prisma.jobView.create({
//         data: {
//           jobPostingId: input.jobId,
//           userId: userId,
//           viewedAt: new Date(),
//         },
//       });

//       await prisma.jobPosting.update({
//         where: { id: input.jobId },
//         data: {
//           views: { increment: 1 },
//         },
//       });

//       return { success: true };
//     }),

//   // Get featured jobs
//   getFeaturedJobs: baseProcedure
//     .input(z.object({ limit: z.number().min(1).max(20).default(6) }))
//     .query(async ({ input }) => {
//       const jobs = await prisma.jobPosting.findMany({
//         where: {
//           isActive: true,
//           isFeatured: true,
//           publishedAt: { lte: new Date() },
//           expiresAt: { gt: new Date() },
//         },
//         include: {
//           company: {
//             select: {
//               id: true,
//               name: true,
//               logo: true,
//               slug: true,
//               location: true,
//               isVerified: true,
//               description: true, // This should exist in your Company model
//             coverImage: true, // This should exist in your Company model
//             },
//           },
//         },
//         orderBy: {
//           publishedAt: 'desc',
//         },
//         take: input.limit,
//       });

//       const transformedJobs = jobs.map(job => ({
//         id: job.id,
//         name: job.company.name,
//         title: job.title,
//         contract: job.employmentType,
//         time: formatTimeAgo(job.publishedAt || job.createdAt),
//         location: job.location,
//         image: job.company.coverImage || getDefaultJobImage(job.employmentType),
//         logo: job.company.logo || getDefaultLogo(),
//         description: job.company.description || `${job.company.name} recrute pour le poste de ${job.title}`,
//         offer: job.description.substring(0, 150) + (job.description.length > 150 ? '...' : ''),
//         salary: job.salaryMin || undefined,
//         remotePolicy: job.remotePolicy,
//         companySlug: job.company.slug,
//         jobSlug: job.slug,
//       }));

//       return { jobs: transformedJobs };
//     }),
// });

// // Helper functions
// function formatTimeAgo(date: Date): string {
//   const now = new Date();
//   const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
//   if (diffInSeconds < 60) return 'il y\'a quelques secondes';
//   if (diffInSeconds < 3600) return `il y'a ${Math.floor(diffInSeconds / 60)} min`;
//   if (diffInSeconds < 86400) return `il y'a ${Math.floor(diffInSeconds / 3600)} heures`;
//   if (diffInSeconds < 2592000) return `il y'a ${Math.floor(diffInSeconds / 86400)} jours`;
  
//   return `il y'a ${Math.floor(diffInSeconds / 2592000)} mois`;
// }

// function getDefaultJobImage(employmentType: EmploymentType): string {
//   const images = {
//     FULL_TIME: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     PART_TIME: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     CONTRACT: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     INTERNSHIP: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//     TEMPORARY: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//   };
  
//   return images[employmentType] || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
// }

// function getDefaultLogo(): string {
//   return 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
// }

// src/server/trpc/routers/jobPosting.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';
import type { JobPostingWithRelations, FormattedJobPosting } from '@/types/jobPosting';
import { EmploymentType, ExperienceLevel, RemotePolicy } from '@/lib/generated/prisma';

export const jobPostingRouter = createTRPCRouter({
    getActiveJobPostings: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(12),
      cursor: z.string().nullish(),
      search: z.string().optional(),
      location: z.string().optional(),
      employmentType: z.enum(EmploymentType).optional(),
      remotePolicy: z.enum(RemotePolicy).optional(),
      experienceLevel: z.enum(ExperienceLevel).optional(),
      salaryMin: z.number().optional(),
      salaryMax: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const { 
        limit, 
        cursor, 
        search, 
        location, 
        employmentType, 
        remotePolicy, 
        experienceLevel,
        salaryMin,
        salaryMax
      } = input;

      try {
        // Build the where clause dynamically
        const whereClause: any = {
          isActive: true,
          publishedAt: { lte: new Date() },
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ],
        };

        // Search filter
        if (search) {
          whereClause.OR = [
            ...(whereClause.OR || []),
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { requirements: { contains: search, mode: 'insensitive' } },
            { 
              company: { 
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } }
                ]
              } 
            }
          ];
        }

        // Location filter - handle separately to avoid type issues
        if (location) {
          const locationConditions: any[] = [
            { location: { contains: location, mode: 'insensitive' } }
          ];

          // Add remote policy conditions based on location keywords
          if (location.toLowerCase().includes('remote')) {
            locationConditions.push({ remotePolicy: { in: [RemotePolicy.REMOTE, RemotePolicy.HYBRID] } });
          }
          if (location.toLowerCase().includes('hybride') || location.toLowerCase().includes('hybrid')) {
            locationConditions.push({ remotePolicy: RemotePolicy.HYBRID });
          }
          if (location.toLowerCase().includes('onsite') || location.toLowerCase().includes('présentiel')) {
            locationConditions.push({ remotePolicy: RemotePolicy.ONSITE });
          }

          whereClause.OR = [
            ...(whereClause.OR || []),
            ...locationConditions
          ];
        }

        // Direct enum filters
        if (employmentType) {
          whereClause.employmentType = employmentType;
        }

        if (remotePolicy) {
          whereClause.remotePolicy = remotePolicy;
        }

        if (experienceLevel) {
          whereClause.experienceLevel = experienceLevel;
        }

        // Salary range filter
        if (salaryMin !== undefined || salaryMax !== undefined) {
          const salaryConditions: any[] = [];

          if (salaryMin !== undefined && salaryMax !== undefined) {
            salaryConditions.push(
              { AND: [{ salaryMin: { gte: salaryMin } }, { salaryMax: { lte: salaryMax } }] },
              { AND: [{ salaryMin: { gte: salaryMin } }, { salaryMax: null }] },
              { AND: [{ salaryMin: null }, { salaryMax: { lte: salaryMax } }] }
            );
          } else if (salaryMin !== undefined) {
            salaryConditions.push(
              { salaryMin: { gte: salaryMin } },
              { salaryMax: { gte: salaryMin } }
            );
          } else if (salaryMax !== undefined) {
            salaryConditions.push(
              { salaryMax: { lte: salaryMax } },
              { salaryMin: { lte: salaryMax } }
            );
          }

          whereClause.OR = [
            ...(whereClause.OR || []),
            ...salaryConditions
          ];
        }

        const jobs = await prisma.jobPosting.findMany({
          where: whereClause,
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                logoText: true,
                industries: true,
                location: true,
                isVerified: true,
                description: true,
              }
            },
            jobCategories: {
              include: {
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true
                  }
                }
              }
            }
          },
          orderBy: [
            { isFeatured: 'desc' },
            { publishedAt: 'desc' },
            { createdAt: 'desc' }
          ],
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
        }) as JobPostingWithRelations[];

        let nextCursor: typeof cursor | undefined = undefined;
        if (jobs.length > limit) {
          const nextItem = jobs.pop();
          nextCursor = nextItem!.id;
        }

        // Format the jobs with proper typing
        const formattedJobs: FormattedJobPosting[] = jobs.map(job => {
          return {
            id: job.id,
            name: job.company.name || 'Entreprise',
            title: job.title,
            contract: job.employmentType,
            time: formatTimeAgo(job.publishedAt || job.createdAt),
            location: job.location,
            image: job.company.logo || getDefaultCompanyImage(),
            logo: job.company.logo || getDefaultLogo(),
            description: job.company.description || `${job.company.name} recrute pour le poste de ${job.title}`,
            offer: job.description.substring(0, 150) + (job.description.length > 150 ? '...' : ''),
            tags: job.jobCategories.map(jc => jc.category.name),
            salary: job.salaryMin || undefined,
            remotePolicy: job.remotePolicy,
            experienceLevel: job.experienceLevel,
            isFeatured: job.isFeatured,
            company: {
              isVerified: job.company.isVerified || false,
              logoText: job.company.logoText || '',
              industries: job.company.industries || [],
            }
          };
        });

        return {
          jobs: formattedJobs,
          nextCursor,
        };
      } catch (error) {
        console.error('Error fetching job postings:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch job postings'
        });
      }
    }),

  getJobPosting: publicProcedure
    .input(z.object({
      id: z.string().optional(),
      slug: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { id, slug } = input;

      if (!id && !slug) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Either id or slug is required'
        });
      }

      try {
        const job = await prisma.jobPosting.findFirst({
          where: {
            OR: [
              ...(id ? [{ id }] : []),
              ...(slug ? [{ slug }] : [])
            ],
            isActive: true,
          },
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                logoText: true,
                description: true,
                website: true,
                industry: true,
                size: true,
                location: true,
                isVerified: true,
                benefits: {
                  where: { isActive: true },
                  select: { name: true, description: true, icon: true }
                },
                commitments: {
                  where: { isActive: true },
                  select: { name: true, description: true, icon: true }
                }
              }
            },
            jobCategories: {
              include: {
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true
                  }
                }
              }
            }
          }
        }) as JobPostingWithRelations | null;

        if (!job) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Job posting not found'
          });
        }

        // Increment view count
        await prisma.jobPosting.update({
          where: { id: job.id },
          data: { views: { increment: 1 } }
        });

        return { job };
      } catch (error) {
        console.error('Error fetching job posting:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch job posting'
        });
      }
    }),

  getFeaturedJobs: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(6) }))
    .query(async ({ input }) => {
      try {
        const jobs = await prisma.jobPosting.findMany({
          where: {
            isActive: true,
            isFeatured: true,
            publishedAt: { lte: new Date() },
            OR: [
              { expiresAt: null },
              { expiresAt: { gt: new Date() } }
            ],
          },
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                logoText: true,
                location: true,
                isVerified: true,
              }
            }
          },
          orderBy: [
            { publishedAt: 'desc' },
            { createdAt: 'desc' }
          ],
          take: input.limit,
        }) as JobPostingWithRelations[];

        const formattedJobs: FormattedJobPosting[] = jobs.map(job => ({
          id: job.id,
          name: job.company.name || 'Entreprise',
          title: job.title,
          contract: job.employmentType,
          time: formatTimeAgo(job.publishedAt || job.createdAt),
          location: job.location,
          image: job.company.logo || getDefaultCompanyImage(),
          logo: job.company.logo || getDefaultLogo(),
          description: `${job.company.name} recrute pour le poste de ${job.title}`,
          offer: job.description.substring(0, 150) + (job.description.length > 150 ? '...' : ''),
          salary: job.salaryMin || undefined,
          isFeatured: job.isFeatured,
         remotePolicy: job.remotePolicy,
        experienceLevel: job.experienceLevel,
        tags: job.jobCategories.map(jc => jc.category.name),
          company: {
            isVerified: job.company.isVerified || false,
            logoText: job.company.logoText || '',
          }
        }));

        return {
          jobs: formattedJobs
        };
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch featured jobs'
        });
      }
    }),

  // Add a new procedure to get filter options
  getFilterOptions: publicProcedure
    .query(async () => {
      try {
        const [locations, companies, categories] = await Promise.all([
          // Get distinct locations
          prisma.jobPosting.findMany({
            where: { isActive: true },
            select: { location: true },
            distinct: ['location'],
            take: 50
          }),
          // Get active companies
          prisma.company.findMany({
            where: { isActive: true, isVerified: true },
            select: { id: true, name: true, industries: true },
            take: 100
          }),
          // Get categories with job counts
          prisma.category.findMany({
            where: { isActive: true },
            include: {
              jobPostings: {
                where: { 
                  jobPosting: { 
                    isActive: true,
                    publishedAt: { lte: new Date() },
                    OR: [
                      { expiresAt: null },
                      { expiresAt: { gt: new Date() } }
                    ]
                  }
                },
                select: { jobPostingId: true }
              }
            }
          })
        ]);

        return {
          locations: locations.map(l => l.location).filter(Boolean),
          companies: companies.map(c => ({
            id: c.id,
            name: c.name,
            industries: c.industries
          })),
          categories: categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            jobCount: cat.jobPostings.length
          }))
        };
      } catch (error) {
        console.error('Error fetching filter options:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch filter options'
        });
      }
    }),
    






    // src/server/trpc/routers/jobPosting.ts - Add this procedure
getJobById: publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .query(async ({ input }) => {
    const { id } = input;

    try {
      const job = await prisma.jobPosting.findFirst({
        where: {
          id,
          isActive: true,
          publishedAt: { lte: new Date() },
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ],
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true,
              logoText: true,
              description: true,
              website: true,
              industry: true,
              size: true,
              location: true,
              isVerified: true,
              foundedYear: true,
              address: true,
              city: true,
              country: true,
              industries: true,
              stats: true,
              presentation: true,
        
            }
          },
          jobCategories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              }
            }
          }
        }
      }) as JobPostingWithRelations | null;

      if (!job) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Job posting not found'
        });
      }

      // Get related jobs (same company or same categories)
      const relatedJobs = await prisma.jobPosting.findMany({
        where: {
          id: { not: job.id },
          companyId: job.companyId,
          isActive: true,
          publishedAt: { lte: new Date() },
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ],
        },
        include: {
          company: {
            select: {
              name: true,
              logo: true,
              isVerified: true,
            }
          }
        },
        orderBy: [
          { isFeatured: 'desc' },
          { publishedAt: 'desc' }
        ],
        take: 3,
      });

      // Format the job
      const formattedJob: FormattedJobPosting = {
        id: job.id,
        name: job.company.name || 'Entreprise',
        title: job.title,
        contract: job.employmentType,
        time: formatTimeAgo(job.publishedAt || job.createdAt),
        location: job.location,
        image: job.company.logo || getDefaultCompanyImage(),
        logo: job.company.logo || getDefaultLogo(),
        description: job.company.description || `${job.company.name} recrute pour le poste de ${job.title}`,
        offer: job.description,
        tags: job.jobCategories.map(jc => jc.category.name),
        salary: job.salaryMin || undefined,
        salaryMax: job.salaryMax || undefined,
        currency: job.currency,
        remotePolicy: job.remotePolicy,
        experienceLevel: job.experienceLevel,
        isFeatured: job.isFeatured,
        company: {
          isVerified: job.company.isVerified || false,
          logoText: job.company.logoText || '',
          industries: job.company.industries || [],
        },
        // Add full job details
        // fullDescription: job.description,
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || '',
        benefits: job.benefits || '',
        applicationUrl: job.applicationUrl || '',
      };

      // Format related jobs
      const formattedRelatedJobs = relatedJobs.map(job => ({
        id: job.id,
        title: job.title,
        employmentType: job.employmentType,
        location: job.location,
        remotePolicy: job.remotePolicy,
        time: formatTimeAgo(job.publishedAt || job.createdAt),
        company: {
          name: job.company.name,
          isVerified: job.company.isVerified || false,
        }
      }));

      return {
        job: formattedJob,
        relatedJobs: formattedRelatedJobs,
        company: job.company
      };
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch job posting'
      });
    }
  }),


});

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMinutes < 1) return "à l'instant";
  if (diffInMinutes < 60) return `il y'a ${diffInMinutes} min`;
  if (diffInHours < 24) return `il y'a ${diffInHours} h`;
  if (diffInDays === 1) return "hier";
  if (diffInDays < 7) return `il y'a ${diffInDays} jours`;
  if (diffInWeeks === 1) return "il y'a 1 semaine";
  if (diffInWeeks < 4) return `il y'a ${diffInWeeks} semaines`;
  if (diffInMonths === 1) return "il y'a 1 mois";
  if (diffInMonths < 12) return `il y'a ${diffInMonths} mois`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}

// Helper function to get default company image
function getDefaultCompanyImage(): string {
  const defaultImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  ];
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

// Helper function to get default logo
function getDefaultLogo(): string {
  const defaultLogos = [
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  ];
  return defaultLogos[Math.floor(Math.random() * defaultLogos.length)];
}