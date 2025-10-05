// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const token = searchParams.get('token');
//     const companyId = searchParams.get('companyId');

//     if (!token || !companyId) {
//       return NextResponse.redirect(new URL('/verification-error?error=missing_params', request.url));
//     }

//     // Verify the token and company
//     const company = await prisma.company.findFirst({
//       where: {
//         id: companyId,
//         verificationToken: token,
//         verificationStatus: 'PENDING',
//       },
//       include: {
//         members: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     if (!company) {
//       return NextResponse.redirect(new URL('/verification-error?error=invalid_token', request.url));
//     }

//     // Update company as verified
//     await prisma.company.update({
//       where: { id: companyId },
//       data: {
//         verificationStatus: 'VERIFIED',
//         isVerified: true,
//         verifiedAt: new Date(),
//         verificationToken: null, // Clear the token
//       },
//     });

//     // Redirect to dashboard with company slug
//     const dashboardUrl = new URL(`/compagny-dashboard/${company.slug}/profile`, request.url);
    
//     // Add success parameters
//     dashboardUrl.searchParams.set('verified', 'true');
//     dashboardUrl.searchParams.set('company', company.name);

//     return NextResponse.redirect(dashboardUrl);
//   } catch (error) {
//     console.error('Verification error:', error);
//     return NextResponse.redirect(new URL('/verification-error?error=server_error', request.url));
//   }
// }


// app/api/verify-company/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const companyId = searchParams.get('companyId');

    console.log('🔍 Verification attempt:', { token, companyId });

    if (!token || !companyId) {
      console.log('❌ Missing parameters');
      return NextResponse.redirect(new URL('/verification-error?error=missing_params', request.url));
    }

    // Find the company with the verification token
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        verificationToken: token,
        verificationStatus: 'PENDING',
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log('🔍 Company found:', company ? 'Yes' : 'No');
    
    if (!company) {
      console.log('❌ Invalid token or company not found');
      
      // Debug: Check what tokens exist for this company
      const debugCompany = await prisma.company.findUnique({
        where: { id: companyId },
        select: { 
          name: true, 
          verificationStatus: true, 
          verificationToken: true,
          verifiedAt: true 
        }
      });
      
      console.log('🔍 Debug company info:', debugCompany);
      
      // Check if company is already verified
      if (debugCompany?.verificationStatus === 'VERIFIED') {
        console.log('ℹ️ Company already verified, redirecting to dashboard');
        const verifiedCompany = await prisma.company.findUnique({
          where: { id: companyId },
          select: { slug: true, name: true }
        });
        
        if (verifiedCompany) {
          const dashboardUrl = new URL(`/compagny-dashboard/${verifiedCompany.slug}/profile`, request.url);
          dashboardUrl.searchParams.set('already_verified', 'true');
          return NextResponse.redirect(dashboardUrl);
        }
      }
      
      return NextResponse.redirect(new URL('/verification-error?error=invalid_token', request.url));
    }

    console.log('✅ Token verified, updating company status');

    // Update company as verified
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        verificationStatus: 'VERIFIED',
        isVerified: true,
        verifiedAt: new Date(),
        verificationToken: null, // Clear the token after verification
      },
    });

    console.log('✅ Company verified successfully:', updatedCompany.name);

    // Redirect to dashboard with company slug
    const dashboardUrl = new URL(`/compagny-dashboard/${updatedCompany.slug}/profile`, request.url);
    
    // Add success parameters
    dashboardUrl.searchParams.set('verified', 'true');
    dashboardUrl.searchParams.set('company', updatedCompany.name);

    return NextResponse.redirect(dashboardUrl);
  } catch (error) {
    console.error('❌ Verification error:', error);
    return NextResponse.redirect(new URL('/verification-error?error=server_error', request.url));
  }
}