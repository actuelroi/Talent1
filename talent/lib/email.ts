// src/lib/email.ts
interface SendVerificationEmailParams {
  email: string;
  firstName: string;
  verificationToken: string;
  companyName: string;
}

// Fallback email implementation using console logging
const fallbackEmailService = {
  sendVerificationEmail: async (data: SendVerificationEmailParams) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${data.verificationToken}`;
    
    console.log('📧 Email verification (development mode):');
    console.log('To:', data.email);
    console.log('Verification URL:', verificationUrl);
    console.log('--- Email Content ---');
    console.log(`Welcome ${data.firstName}!`);
    console.log(`Please verify your email for ${data.companyName}`);
    console.log(`Click: ${verificationUrl}`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Email logged to console (development mode)' };
  }
};

// Try to use Resend if available, otherwise fallback
export const sendVerificationEmail = async (data: SendVerificationEmailParams): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if Resend is available
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${data.verificationToken}`;
      
      await resend.emails.send({
        from: 'noreply@yourdomain.com',
        to: data.email,
        subject: 'Verify Your Email Address',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #007bff; 
                color: white; 
                text-decoration: none; 
                border-radius: 4px; 
                margin: 20px 0; 
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Welcome to Our Platform, ${data.firstName}!</h2>
              <p>Thank you for registering ${data.companyName} on our platform.</p>
              <p>Please verify your email address by clicking the button below:</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p>${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
            </div>
          </body>
          </html>
        `,
      });

      return { success: true, message: 'Verification email sent successfully' };
    } else {
      // Use fallback in development or if Resend is not configured
      return await fallbackEmailService.sendVerificationEmail(data);
    }
  } catch (error) {
    console.error('Failed to send verification email:', error);
    
    // Fallback to console logging if Resend fails
    try {
      return await fallbackEmailService.sendVerificationEmail(data);
    } catch (fallbackError) {
      console.error('Fallback email service also failed:', fallbackError);
      throw new Error('Failed to send verification email');
    }
  }
};