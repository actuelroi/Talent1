// import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import { prisma } from '@/lib/db';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: NextRequest) {
//   try {
//     const { companyId, email, companyName } = await request.json();

//     // Generate verification token
//     const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

//     // Update company with verification token
//     await prisma.company.update({
//       where: { id: companyId },
//       data: {
//         verificationToken,
//         verificationStatus: 'PENDING',
//       },
//     });

//     // Send verification email
//     const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-company?token=${verificationToken}&companyId=${companyId}`;
    
//     const { data, error } = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: email,
//       subject: `Vérifiez votre entreprise - ${companyName}`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <style>
//                 body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                 .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//                 .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
//                 .content { background: #f9fafb; padding: 30px; }
//                 .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
//                 .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <h1>Vérification de votre entreprise</h1>
//                 </div>
//                 <div class="content">
//                     <h2>Bonjour,</h2>
//                     <p>Vous avez récemment créé un compte pour l'entreprise <strong>${companyName}</strong>.</p>
//                     <p>Pour accéder à votre tableau de bord, veuillez vérifier votre adresse email professionnelle en cliquant sur le bouton ci-dessous :</p>
                    
//                     <div style="text-align: center; margin: 30px 0;">
//                         <a href="${verificationUrl}" class="button">
//                             Vérifier mon entreprise
//                         </a>
//                     </div>
                    
//                     <p>Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
//                     <p style="word-break: break-all; color: #6b7280; font-size: 14px;">
//                         ${verificationUrl}
//                     </p>
                    
//                     <p><strong>Attention :</strong> Ce lien expirera dans 24 heures.</p>
//                 </div>
//                 <div class="footer">
//                     <p>Si vous n'avez pas créé ce compte, veuillez ignorer cet email.</p>
//                     <p>© ${new Date().getFullYear()} Your App Name. Tous droits réservés.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//       `,
//     });

//     if (error) {
//       console.error('Resend error:', error);
//       return NextResponse.json(
//         { error: 'Failed to send verification email' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Verification email sent' 
//     });
//   } catch (error) {
//     console.error('Error in send-verification-email:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { companyId, email, companyName } = await request.json();

    console.log('📧 Sending verification email for:', { companyId, email, companyName });

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    console.log('🔑 Generated token:', verificationToken);

    // Update company with verification token - make sure this succeeds
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        verificationToken: verificationToken,
        verificationStatus: 'PENDING',
      },
    });

    console.log('✅ Token stored in database for company:', updatedCompany.name);

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-company?token=${verificationToken}&companyId=${companyId}`;
    
    console.log('🔗 Verification URL:', verificationUrl);

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
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
      console.error('❌ Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    console.log('✅ Email sent successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent',
      token: verificationToken, // For debugging
      companyId: companyId
    });
  } catch (error) {
    console.error('❌ Error in send-verification-email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}