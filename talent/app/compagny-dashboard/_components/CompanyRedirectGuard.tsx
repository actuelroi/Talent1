// 'use client';

// import { useEffect } from 'react';

// import { useRouter, usePathname } from 'next/navigation';
// import { useCompany } from '@/contexts/CompanyVerificationContext';

// export function CompanyRedirectGuard({ children }: { children: React.ReactNode }) {
//   const { verifiedCompanies, pendingCompanies, isLoading, companies } = useCompany();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (isLoading) {
//       console.log('🛡️ Redirect Guard: Loading companies...');
//       return;
//     }

//     const isOnDashboard = pathname?.startsWith('/compagny-dashboard');
//     const isOnSuccessPage = pathname === '/register/success';
//     const hasVerifiedCompanies = verifiedCompanies.length > 0;
//     const hasPendingCompanies = pendingCompanies.length > 0;
//     const hasNoCompanies = companies.length === 0;

//     console.log('🛡️ Redirect Guard State:', {
//       pathname,
//       isOnDashboard,
//       isOnSuccessPage,
//       hasVerifiedCompanies,
//       hasPendingCompanies,
//       hasNoCompanies,
//       verifiedCount: verifiedCompanies.length,
//       pendingCount: pendingCompanies.length,
//       totalCompanies: companies.length
//     });

//     // Rule 1: If user is on dashboard but has no companies → redirect to registration
//     if (isOnDashboard && hasNoCompanies) {
//       console.log('🛡️ No companies found, redirecting to registration');
//       router.push('/register/company');
//       return;
//     }

//     // Rule 2: If user is on success page AND has verified companies → redirect to profile
//     if (isOnSuccessPage && hasVerifiedCompanies) {
//       console.log('🛡️ Has verified companies, redirecting from success to profile');
//       const verifiedCompany = verifiedCompanies[0];
//       router.push(`/compagny-dashboard/${verifiedCompany.slug}/profile`);
//       return;
//     }

//     // Rule 3: If user is on success page AND has pending companies → stay on success page
//     if (isOnSuccessPage && hasPendingCompanies && !hasVerifiedCompanies) {
//       console.log('🛡️ Has pending companies, staying on success page');
//       return;
//     }

//     // Rule 4: If user is on dashboard with pending companies → allow access
//     if (isOnDashboard && hasPendingCompanies && !hasVerifiedCompanies) {
//       console.log('🛡️ Allowing access to dashboard with pending companies');
//       return;
//     }

//     // Rule 5: If user is on dashboard with verified companies → allow access
//     if (isOnDashboard && hasVerifiedCompanies) {
//       console.log('🛡️ Allowing access to dashboard with verified companies');
//       return;
//     }

//   }, [companies, verifiedCompanies, pendingCompanies, isLoading, pathname, router]);

//   // Show loading state while checking redirect
//   if (isLoading && pathname?.startsWith('/compagny-dashboard')) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Chargement de votre espace entreprise...</p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

'use client';

import { useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { useCompany } from '@/contexts/CompanyVerificationContext';

export function CompanyRedirectGuard({ children }: { children: React.ReactNode }) {
  const { verifiedCompanies, pendingCompanies, isLoading, companies } = useCompany();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      console.log('🛡️ Redirect Guard: Loading companies...');
      return;
    }

    const isOnDashboard = pathname?.startsWith('/compagny-dashboard');
    const isOnSuccessPage = pathname === '/register/success';
    const hasCompanies = companies.length > 0;
    const hasVerifiedCompanies = verifiedCompanies.length > 0;
    const hasPendingCompanies = pendingCompanies.length > 0;

    console.log('🛡️ Redirect Guard - Final State:', {
      pathname,
      isOnDashboard,
      isOnSuccessPage,
      hasCompanies,
      hasVerifiedCompanies,
      hasPendingCompanies,
      verifiedCount: verifiedCompanies.length,
      pendingCount: pendingCompanies.length,
      totalCompanies: companies.length,
      companiesList: companies.map(c => ({ name: c.name, status: c.verificationStatus }))
    });

    // // Rule 1: If user is on dashboard but has NO companies → redirect to registration
    // if (isOnDashboard && !hasCompanies) {
    //   console.log('🛡️ No companies found, redirecting to registration');
    //   router.push('/register');
    //   return;
    // }

    // Rule 2: If user is on success page AND has verified companies → redirect to profile
    if (isOnSuccessPage && hasVerifiedCompanies) {
      console.log('🛡️ Has verified companies, redirecting from success to profile');
      const verifiedCompany = verifiedCompanies[0];
      router.push(`/compagny-dashboard/${verifiedCompany.slug}/profile`);
      return;
    }

    // Rule 3: If user is on success page AND has pending companies → stay on success page
    if (isOnSuccessPage && hasPendingCompanies && !hasVerifiedCompanies) {
      console.log('🛡️ Has pending companies, staying on success page');
      return;
    }

    // Rule 4: If user is on dashboard with ANY companies → ALLOW ACCESS (don't redirect)
    if (isOnDashboard && hasCompanies) {
      console.log('🛡️ Allowing access to dashboard - user has companies');
      return;
    }

    console.log('🛡️ No redirect conditions matched - allowing access');

  }, [companies, verifiedCompanies, pendingCompanies, isLoading, pathname, router]);

  // Show loading state while checking redirect
  if (isLoading && pathname?.startsWith('/compagny-dashboard')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre espace entreprise...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}