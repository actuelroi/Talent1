// src/server/trpc/routers/admin.ts
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';




const resend = new Resend(process.env.RESEND_API_KEY);

// Add this function to send emails with Resend
async function sendVerificationEmailWithResend({
  to,
  companyName,
  verificationUrl
}: {
  to: string;
  companyName: string;
  verificationUrl: string;
}) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: `Vérifiez votre entreprise - ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
              .content { background: #f9fafb; padding: 30px; }
              .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Vérification de votre entreprise</h1>
              </div>
              <div class="content">
                  <h2>Bonjour,</h2>
                  <p>Vous avez récemment créé un compte pour l'entreprise <strong>${companyName}</strong>.</p>
                  <p>Pour accéder à votre tableau de bord, veuillez vérifier votre adresse email professionnelle en cliquant sur le bouton ci-dessous :</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                      <a href="${verificationUrl}" class="button">
                          Vérifier mon entreprise
                      </a>
                  </div>
                  
                  <p>Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
                  <p style="word-break: break-all; color: #6b7280; font-size: 14px;">
                      ${verificationUrl}
                  </p>
                  
                  <p><strong>Attention :</strong> Ce lien expirera dans 24 heures.</p>
              </div>
              <div class="footer">
                  <p>Si vous n'avez pas créé ce compte, veuillez ignorer cet email.</p>
                  <p>© ${new Date().getFullYear()} Your App Name. Tous droits réservés.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

export const adminRouter = createTRPCRouter({
  getPendingCompanies: baseProcedure
    .query(async () => {
      const pendingCompanies = await prisma.company.findMany({
        where: {
          verificationStatus: 'PENDING',
          isActive: true,
        },
        include: {
          members: {
            where: {
              role: 'ADMIN',
              isActive: true,
            },
            include: {
              user: {
                select: {
                  email: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Transform the data to include admin email
      return pendingCompanies.map(company => ({
        id: company.id,
        name: company.name,
        email: company.members[0]?.user?.email || 'No admin email',
        industry: company.industry || 'Not specified',
        size: company.size,
        website: company.website,
        createdAt: company.createdAt,
        adminName: company.members[0]?.user 
          ? `${company.members[0].user.firstName} ${company.members[0].user.lastName}`
          : 'No admin name',
      }));
    }),

  verifyCompany: baseProcedure
    .input(z.object({
      companyId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const company = await prisma.company.update({
        where: {
          id: input.companyId,
          verificationStatus: 'PENDING', // Only update pending companies
        },
        data: {
          verificationStatus: 'VERIFIED',
          verifiedAt: new Date(),
          verifiedBy: 'admin', // You might want to track which admin verified it
        },
      });

      if (!company) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Company not found or already verified',
        });
      }

      return { success: true, company };
    }),

  rejectCompany: baseProcedure
    .input(z.object({
      companyId: z.string(),
      reason: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const company = await prisma.company.update({
        where: {
          id: input.companyId,
          verificationStatus: 'PENDING',
        },
        data: {
          verificationStatus: 'REJECTED',
          rejectionReason: input.reason,
        },
      });

      if (!company) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Company not found or already processed',
        });
      }

      return { success: true, company };
    }),
    // Add to your admin router
//  sendVerificationEmail: baseProcedure
//     .input(z.object({
//       companyId: z.string(),
//       email: z.string().email(),
//       companyName: z.string(),
//     }))
//     .mutation(async ({ input }) => {
//       const { companyId, email, companyName } = input;

//       // Generate new verification token
//       const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

//       // Update company with new token
//       await prisma.company.update({
//         where: { id: companyId },
//         data: { verificationToken },
//       });

//       // Create verification URL
//       const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-company?token=${verificationToken}&companyId=${companyId}`;
      
//       // Send email using Resend
//       await sendVerificationEmailWithResend({
//         to: email,
//         companyName,
//         verificationUrl
//       });

//       return { success: true, message: 'Verification email sent' };
//     }),

// src/server/trpc/routers/admin.ts
sendVerificationEmail: baseProcedure
  .input(z.object({
    companyId: z.string(),
    email: z.string().email(),
    companyName: z.string(),
  }))
  .mutation(async ({ input }) => {
    const { companyId, email, companyName } = input;

    // Check if company already has a valid token
    const existingCompany = await prisma.company.findUnique({
      where: { id: companyId },
      select: { verificationToken: true }
    });

    let verificationToken = existingCompany?.verificationToken;

    // Only generate new token if one doesn't exist
    if (!verificationToken) {
      verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // Update company with new token
      await prisma.company.update({
        where: { id: companyId },
        data: { verificationToken },
      });
    }

    console.log('🔑 Using token for admin resend:', verificationToken);

    // Create verification URL
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-company?token=${verificationToken}&companyId=${companyId}`;
    
    // Send email using Resend
    await sendVerificationEmailWithResend({
      to: email,
      companyName,
      verificationUrl
    });

    return { success: true, message: 'Verification email sent' };
  }),

});