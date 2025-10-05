// components/DebugRedirect.tsx (temporary - remove after debugging)
'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { useCompany } from '@/contexts/CompanyVerificationContext';

export function DebugRedirect() {
  const { companies, verifiedCompanies, pendingCompanies, isLoading } = useCompany();
  const pathname = usePathname();

  useEffect(() => {
    console.log('🐛 DEBUG REDIRECT:', {
      pathname,
      isLoading,
      totalCompanies: companies.length,
      verifiedCompanies: verifiedCompanies.length,
      pendingCompanies: pendingCompanies.length,
      companies: companies.map(c => `${c.name} (${c.verificationStatus})`)
    });
  }, [pathname, isLoading, companies, verifiedCompanies, pendingCompanies]);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50 text-xs max-w-xs">
        <strong>Debug Redirect:</strong>
        <div>Path: {pathname}</div>
        <div>Companies: {companies.length}</div>
        <div>Verified: {verifiedCompanies.length}</div>
        <div>Pending: {pendingCompanies.length}</div>
      </div>
    );
  }

  return null;
}