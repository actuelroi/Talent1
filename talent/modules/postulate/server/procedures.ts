// // src/server/trpc/routers/application.ts - Updated
// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, baseProcedure } from '@/trpc/init';
// import { prisma } from '@/lib/db';



// export const applicationRouter = createTRPCRouter({
//   // Check if user already applied
//   // checkExistingApplication: baseProcedure
//   //   .input(z.object({ jobId: z.string() }))
//   //   .query(async ({ ctx, input }) => {
//   //     if (!ctx.auth.userId) {
//   //       return { hasApplied: false };
//   //     }

//   //     const existingApplication = await prisma.jobApplication.findFirst({
//   //       where: {
//   //         jobPostingId: input.jobId,
//   //         userId: ctx.auth.userId,
//   //       },
//   //     });

//   //     return { 
//   //       hasApplied: !!existingApplication,
//   //       application: existingApplication 
//   //     };
//   //   }),

//   // Submit application with improved file handling
//   // submitApplication: baseProcedure
//   //   .input(z.object({
//   //     jobId: z.string(),
//   //     personalInfo: z.object({
//   //       firstName: z.string().min(1, "Le prénom est requis"),
//   //       lastName: z.string().min(1, "Le nom est requis"),
//   //       email: z.string().email("Email invalide"),
//   //       phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
//   //       linkedin: z.string().url("URL LinkedIn invalide").optional().or(z.literal('')),
//   //       portfolio: z.string().url("URL de portfolio invalide").optional().or(z.literal('')),
//   //       message: z.string().max(1000, "Le message ne doit pas dépasser 1000 caractères").optional(),
//   //     }),
//   //     resumeFile: z.object({
//   //       name: z.string().min(1, "Nom du fichier requis"),
//   //       type: z.string().refine(
//   //         (type) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(type),
//   //         "Type de fichier non supporté. Utilisez PDF, DOC ou DOCX."
//   //       ),
//   //       data: z.string().min(1, "Fichier requis"), // base64 encoded
//   //     }),
//   //     coverLetterFile: z.object({
//   //       name: z.string().min(1, "Nom du fichier requis"),
//   //       type: z.string().refine(
//   //         (type) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(type),
//   //         "Type de fichier non supporté. Utilisez PDF, DOC ou DOCX."
//   //       ),
//   //       data: z.string().min(1, "Fichier requis"),
//   //     }).optional(),
//   //   }))
//   //   .mutation(async ({ ctx, input }) => {
//   //     if (!ctx.auth.userId) {
//   //       throw new TRPCError({ 
//   //         code: 'UNAUTHORIZED', 
//   //         message: 'Vous devez être connecté pour postuler' 
//   //       });
//   //     }

//   //     // Check if job exists and is active
//   //     const job = await prisma.jobPosting.findFirst({
//   //       where: {
//   //         id: input.jobId,
//   //         isActive: true,
//   //         publishedAt: { lte: new Date() },
//   //         OR: [
//   //           { expiresAt: null },
//   //           { expiresAt: { gt: new Date() } }
//   //         ],
//   //       },
//   //       include: {
//   //         company: true
//   //       }
//   //     });

//   //     if (!job) {
//   //       throw new TRPCError({
//   //         code: 'NOT_FOUND',
//   //         message: 'Offre non trouvée ou expirée'
//   //       });
//   //     }

//   //     // Check if user already applied
//   //     const existingApplication = await prisma.jobApplication.findFirst({
//   //       where: {
//   //         jobPostingId: input.jobId,
//   //         userId: ctx.auth.userId,
//   //       },
//   //     });

//   //     if (existingApplication) {
//   //       throw new TRPCError({
//   //         code: 'CONFLICT',
//   //         message: 'Vous avez déjà postulé à cette offre'
//   //       });
//   //     }

//   //     try {
//   //       // Generate unique file names
//   //       const timestamp = Date.now();
//   //       const resumeFileName = `resume-${timestamp}-${input.personalInfo.firstName}-${input.personalInfo.lastName}`;
//   //       const coverLetterFileName = `cover-letter-${timestamp}-${input.personalInfo.firstName}-${input.personalInfo.lastName}`;

//   //       // Upload files to storage
//   //       const resumeUrl = await uploadFile(
//   //         input.resumeFile.data,
//   //         resumeFileName,
//   //         input.resumeFile.type
//   //       );

//   //       let coverLetterUrl = undefined;
//   //       if (input.coverLetterFile) {
//   //         coverLetterUrl = await uploadFile(
//   //           input.coverLetterFile.data,
//   //           coverLetterFileName,
//   //           input.coverLetterFile.type
//   //         );
//   //       }

//   //       // Create application in database
//   //       const application = await prisma.jobApplication.create({
//   //         data: {
//   //           jobPostingId: input.jobId,
//   //           userId: ctx.auth.userId,
//   //           firstName: input.personalInfo.firstName,
//   //           lastName: input.personalInfo.lastName,
//   //           email: input.personalInfo.email,
//   //           phone: input.personalInfo.phone,
//   //           linkedin: input.personalInfo.linkedin,
//   //           portfolio: input.personalInfo.portfolio,
//   //           message: input.personalInfo.message,
//   //           resumeUrl,
//   //           coverLetterUrl,
//   //         },
//   //       });

//   //       // Increment application count on job posting
//   //       await prisma.jobPosting.update({
//   //         where: { id: input.jobId },
//   //         data: { applicationCount: { increment: 1 } }
//   //       });

//   //       // TODO: Send notification email to company
//   //       // TODO: Send confirmation email to candidate

//   //       return { 
//   //         success: true, 
//   //         applicationId: application.id,
//   //         companyName: job.company.name,
//   //         jobTitle: job.title,
//   //         appliedAt: application.appliedAt
//   //       };

//   //     } catch (error) {
//   //       console.error('Error submitting application:', error);
        
//   //       if (error instanceof TRPCError) {
//   //         throw error;
//   //       }
        
//   //       throw new TRPCError({
//   //         code: 'INTERNAL_SERVER_ERROR',
//   //         message: 'Erreur lors de la soumission de la candidature'
//   //       });
//   //     }
//   //   }),

//   checkExistingApplication: baseProcedure
//     .input(z.object({ jobId: z.string() }))
//     .query(async ({ ctx, input }) => {
//       if (!ctx.auth.userId) {
//         return { hasApplied: false };
//       }

//       const existingApplication = await prisma.jobApplication.findFirst({
//         where: {
//           jobPostingId: input.jobId,
//           userId: ctx.auth.userId,
//         },
//       });

//       return { 
//         hasApplied: !!existingApplication,
//         application: existingApplication 
//       };
//     }),

//   // Updated submitApplication without file upload logic
//   submitApplication: baseProcedure
//     .input(z.object({
//       jobId: z.string(),
//       personalInfo: z.object({
//         firstName: z.string().min(1, "Le prénom est requis"),
//         lastName: z.string().min(1, "Le nom est requis"),
//         email: z.email("Email invalide"),
//         phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
//         linkedin: z.url("URL LinkedIn invalide").optional().or(z.literal('')),
//         portfolio: z.url("URL de portfolio invalide").optional().or(z.literal('')),
//         message: z.string().max(1000, "Le message ne doit pas dépasser 1000 caractères").optional(),
//       }),
//       resumeUrl: z.string().url("URL du CV invalide"),
//       coverLetterUrl: z.string().url("URL de la lettre de motivation invalide").optional(),
//     }))
//     .mutation(async ({ ctx, input }) => {
//       if (!ctx.auth.userId) {
//         throw new TRPCError({ 
//           code: 'UNAUTHORIZED', 
//           message: 'Vous devez être connecté pour postuler' 
//         });
//       }

//       // Check if job exists and is active
//       const job = await prisma.jobPosting.findFirst({
//         where: {
//           id: input.jobId,
//           isActive: true,
//           publishedAt: { lte: new Date() },
//           OR: [
//             { expiresAt: null },
//             { expiresAt: { gt: new Date() } }
//           ],
//         },
//         include: {
//           company: true
//         }
//       });

//       if (!job) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Offre non trouvée ou expirée'
//         });
//       }

//       // Check if user already applied
//       const existingApplication = await prisma.jobApplication.findFirst({
//         where: {
//           jobPostingId: input.jobId,
//           userId: ctx.auth.userId,
//         },
//       });

//       if (existingApplication) {
//         throw new TRPCError({
//           code: 'CONFLICT',
//           message: 'Vous avez déjà postulé à cette offre'
//         });
//       }

//       try {
//         // Create application in database
//         const application = await prisma.jobApplication.create({
//           data: {
//             jobPostingId: input.jobId,
//             userId: ctx.auth.userId,
//             firstName: input.personalInfo.firstName,
//             lastName: input.personalInfo.lastName,
//             email: input.personalInfo.email,
//             phone: input.personalInfo.phone,
//             linkedin: input.personalInfo.linkedin,
//             portfolio: input.personalInfo.portfolio,
//             message: input.personalInfo.message,
//             resumeUrl: input.resumeUrl,
//             coverLetterUrl: input.coverLetterUrl,
//           },
//         });

//         // Increment application count on job posting
//         await prisma.jobPosting.update({
//           where: { id: input.jobId },
//           data: { applicationCount: { increment: 1 } }
//         });

//         return { 
//           success: true, 
//           applicationId: application.id,
//           companyName: job.company.name,
//           jobTitle: job.title,
//           appliedAt: application.appliedAt
//         };

//       } catch (error) {
//         console.error('Error submitting application:', error);
        
//         if (error instanceof TRPCError) {
//           throw error;
//         }
        
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: 'Erreur lors de la soumission de la candidature'
//         });
//       }
//     }),

//   // Get user's applications with pagination
//   getUserApplications: baseProcedure
//     .input(z.object({
//       page: z.number().min(1).default(1),
//       limit: z.number().min(1).max(50).default(10),
//     }))
//     .query(async ({ ctx, input }) => {
//       if (!ctx.auth.userId) {
//         throw new TRPCError({ code: 'UNAUTHORIZED' });
//       }

//       const skip = (input.page - 1) * input.limit;

//       const [applications, totalCount] = await Promise.all([
//         prisma.jobApplication.findMany({
//           where: {
//             userId: ctx.auth.userId,
//           },
//           include: {
//             jobPosting: {
//               include: {
//                 company: {
//                   select: {
//                     id: true,
//                     name: true,
//                     logo: true,
//                     isVerified: true,
//                     slug: true,
//                   }
//                 }
//               }
//             }
//           },
//           orderBy: {
//             appliedAt: 'desc'
//           },
//           skip,
//           take: input.limit,
//         }),
//         prisma.jobApplication.count({
//           where: {
//             userId: ctx.auth.userId,
//           },
//         })
//       ]);

//       return { 
//         applications,
//         pagination: {
//           page: input.page,
//           limit: input.limit,
//           totalCount,
//           totalPages: Math.ceil(totalCount / input.limit),
//           hasNextPage: skip + input.limit < totalCount,
//           hasPrevPage: input.page > 1,
//         }
//       };
//     }),

//   // Withdraw application
//   withdrawApplication: baseProcedure
//     .input(z.object({ applicationId: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       if (!ctx.auth.userId) {
//         throw new TRPCError({ code: 'UNAUTHORIZED' });
//       }

//       const application = await prisma.jobApplication.findFirst({
//         where: {
//           id: input.applicationId,
//           userId: ctx.auth.userId,
//         },
//       });

//       if (!application) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: 'Candidature non trouvée'
//         });
//       }

//       if (application.status !== 'PENDING') {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Impossible de retirer cette candidature'
//         });
//       }

//       const updatedApplication = await prisma.jobApplication.update({
//         where: { id: input.applicationId },
//         data: { status: 'WITHDRAWN' }
//       });

//       // Decrement application count on job posting
//       await prisma.jobPosting.update({
//         where: { id: application.jobPostingId },
//         data: { applicationCount: { decrement: 1 } }
//       });

//       return { success: true, application: updatedApplication };
//     }),
// });



// src/server/trpc/routers/application.ts - UPDATED
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';

const ApplicationStatus = z.enum(['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN']);

// Helper function to ensure user is authenticated
const ensureAuthenticated = (ctx: any) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED', 
      message: 'Vous devez être connecté pour effectuer cette action' 
    });
  }
  return ctx.auth.userId;
};

export const applicationRouter = createTRPCRouter({
  checkExistingApplication: baseProcedure
    .input(z.object({ 
      jobId: z.string().min(1, "ID de l'offre requis") 
    }))
    .query(async ({ ctx, input }) => {
      const userId = ensureAuthenticated(ctx);

      const existingApplication = await prisma.jobApplication.findFirst({
        where: {
          jobPostingId: input.jobId,
          userId: userId,
          status: { not: 'WITHDRAWN' }
        },
        select: {
          id: true,
          status: true,
          appliedAt: true
        }
      });

      return { 
        hasApplied: !!existingApplication,
        application: existingApplication 
      };
    }),

  submitApplication: baseProcedure
    .input(z.object({
      jobId: z.string().min(1, "ID de l'offre requis"),
      personalInfo: z.object({
        firstName: z.string().min(1, "Le prénom est requis").max(50, "Le prénom est trop long"),
        lastName: z.string().min(1, "Le nom est requis").max(50, "Le nom est trop long"),
        email: z.string().email("Email invalide").max(100, "L'email est trop long"),
        phone: z.string().min(10, "Numéro de téléphone invalide").max(20, "Numéro de téléphone trop long").optional(),
        linkedin: z.string().url("URL LinkedIn invalide").max(200, "URL trop longue").optional().or(z.literal('')),
        portfolio: z.string().url("URL de portfolio invalide").max(200, "URL trop longue").optional().or(z.literal('')),
        message: z.string().max(2000, "Le message ne doit pas dépasser 2000 caractères").optional(),
      }),
      resumeUrl: z.string().url("URL du CV invalide"),
      coverLetterUrl: z.string().url("URL de la lettre de motivation invalide").optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ensureAuthenticated(ctx);

      // Validate job exists and is active
      const job = await prisma.jobPosting.findFirst({
        where: {
          id: input.jobId,
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
              slug: true
            }
          }
        }
      });

      if (!job) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Offre non trouvée, expirée ou inactive'
        });
      }

      // Check for existing application
      const existingApplication = await prisma.jobApplication.findFirst({
        where: {
          jobPostingId: input.jobId,
          userId: userId,
          status: { not: 'WITHDRAWN' }
        }
      });

      if (existingApplication) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Vous avez déjà postulé à cette offre'
        });
      }

      try {
        // Create application in database within a transaction
        const result = await prisma.$transaction(async (tx) => {
          const application = await tx.jobApplication.create({
            data: {
              jobPostingId: input.jobId,
              userId: userId, // Now guaranteed to be string
              firstName: input.personalInfo.firstName.trim(),
              lastName: input.personalInfo.lastName.trim(),
              email: input.personalInfo.email.toLowerCase().trim(),
              phone: input.personalInfo.phone?.trim(),
              linkedin: input.personalInfo.linkedin?.trim(),
              portfolio: input.personalInfo.portfolio?.trim(),
              message: input.personalInfo.message?.trim(),
              resumeUrl: input.resumeUrl,
              coverLetterUrl: input.coverLetterUrl,
              status: 'PENDING',
            },
          });

          // Increment application count
          await tx.jobPosting.update({
            where: { id: input.jobId },
            data: { 
              applicationCount: { increment: 1 },
              updatedAt: new Date()
            }
          });

          return application;
        });

        // TODO: Send notifications (email to company, confirmation to candidate)
        console.log(`New application submitted: ${result.id} for job ${input.jobId} by user ${userId}`);

        return { 
          success: true, 
          applicationId: result.id,
          companyName: job.company.name,
          jobTitle: job.title,
          appliedAt: result.appliedAt
        };

      } catch (error) {
        console.error('Database error submitting application:', error);
        
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la soumission de la candidature'
        });
      }
    }),

  getUserApplications: baseProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(50).default(10),
      status: ApplicationStatus.optional(),
    }))
    .query(async ({ ctx, input }) => {
      const userId = ensureAuthenticated(ctx);

      const skip = (input.page - 1) * input.limit;
      const where = {
        userId: userId,
        ...(input.status && { status: input.status })
      };

      const [applications, totalCount] = await Promise.all([
        prisma.jobApplication.findMany({
          where,
          include: {
            jobPosting: {
              include: {
                company: {
                  select: {
                    id: true,
                    name: true,
                    logo: true,
                    isVerified: true,
                    slug: true,
                  }
                }
              }
            }
          },
          orderBy: {
            appliedAt: 'desc'
          },
          skip,
          take: input.limit,
        }),
        prisma.jobApplication.count({ where })
      ]);

      return { 
        applications,
        pagination: {
          page: input.page,
          limit: input.limit,
          totalCount,
          totalPages: Math.ceil(totalCount / input.limit),
          hasNextPage: skip + input.limit < totalCount,
          hasPrevPage: input.page > 1,
        }
      };
    }),

  withdrawApplication: baseProcedure
    .input(z.object({ 
      applicationId: z.string().min(1, "ID de candidature requis") 
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ensureAuthenticated(ctx);

      const application = await prisma.jobApplication.findFirst({
        where: {
          id: input.applicationId,
          userId: userId,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Candidature non trouvée'
        });
      }

      if (application.status !== 'PENDING') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Impossible de retirer cette candidature'
        });
      }

      const result = await prisma.$transaction(async (tx) => {
        const updatedApplication = await tx.jobApplication.update({
          where: { id: input.applicationId },
          data: { status: 'WITHDRAWN' }
        });

        // Decrement application count
        await tx.jobPosting.update({
          where: { id: application.jobPostingId },
          data: { 
            applicationCount: { decrement: 1 },
            updatedAt: new Date()
          }
        });

        return updatedApplication;
      });

      return { success: true, application: result };
    }),

  getApplicationStats: baseProcedure
    .query(async ({ ctx }) => {
      const userId = ensureAuthenticated(ctx);

      const stats = await prisma.jobApplication.groupBy({
        by: ['status'],
        where: {
          userId: userId,
        },
        _count: {
          id: true,
        },
      });

      const total = stats.reduce((sum, stat) => sum + stat._count.id, 0);

      return {
        total,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat.status] = stat._count.id;
          return acc;
        }, {} as Record<string, number>)
      };
    }),
});