


// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { useTRPC } from '@/trpc/client';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter, usePathname } from 'next/navigation';

// interface Company {
//   id: string;
//   name: string;
//   slug: string;
//   verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
//   isActive: boolean;
//   role: string;
//   memberSince: Date;
//   adminEmail?: string;
// }

// interface CompanyContextType {
//   companies: Company[];
//   currentCompany: Company | null;
//   isLoading: boolean;
//   setCurrentCompany: (company: Company) => void;
//   refetchCompanies: () => void;
//   verifiedCompanies: Company[];
//   pendingCompanies: Company[];
//   lastRegisteredCompany: Company | null;
//   refreshCompanyData: () => Promise<void>;
// }

// const CompanyContext = createContext<CompanyContextType>({
//   companies: [],
//   currentCompany: null,
//   isLoading: true,
//   setCurrentCompany: () => {},
//   refetchCompanies: () => {},
//   verifiedCompanies: [],
//   pendingCompanies: [],
//   lastRegisteredCompany: null,
//   refreshCompanyData: async () => {},
// });

// export function CompanyProvider({ children }: { children: React.ReactNode }) {
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const trpc = useTRPC();
  
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
//   const [lastRegisteredCompany, setLastRegisteredCompany] = useState<Company | null>(null);

//   const { 
//     data, 
//     isLoading: queryLoading, 
//     refetch,
//     isFetching 
//   } = useQuery({
//     ...trpc.company.getUserCompanies.queryOptions(),
//     enabled: !!user && isUserLoaded,
//     retry: false,
//     staleTime: 1000 * 30, // 30 seconds
//   });

//   // Filter companies by status
//   const verifiedCompanies = companies.filter(c => c.verificationStatus === 'VERIFIED');
//   const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');

//   // Refresh company data function
//   const refreshCompanyData = async () => {
//     await refetch();
//   };

//   useEffect(() => {
//     if (!isUserLoaded) return;

//     if (user && data?.companies) {
//       const previousCompanies = companies;
//       const newCompanies = data.companies;
//       setCompanies(newCompanies);
      
//       // Detect if this is a fresh registration (no previous companies)
//       const isFreshRegistration = previousCompanies.length === 0 && newCompanies.length > 0;
      
//       // Set current company: prefer verified companies, then first company
//       const verifiedCompany = newCompanies.find(c => c.verificationStatus === 'VERIFIED');
//       const firstCompany = newCompanies[0];
      
//       const newCurrentCompany = verifiedCompany || firstCompany || null;
//       setCurrentCompany(newCurrentCompany);

//       // If this is a fresh registration, track the newly registered company
//       if (isFreshRegistration && firstCompany) {
//         console.log('🎯 CONTEXT - Fresh registration detected:', firstCompany.name);
//         setLastRegisteredCompany(firstCompany);
        
//         // Store in localStorage for persistence
//         localStorage.setItem('lastRegisteredCompanyId', firstCompany.id);
//       }

//       // Handle automatic redirection logic
//       handleAutomaticRedirect(newCompanies, newCurrentCompany, isFreshRegistration);
//     } else if (!user) {
//       // Reset state when user logs out
//       setCompanies([]);
//       setCurrentCompany(null);
//       setLastRegisteredCompany(null);
//       localStorage.removeItem('lastRegisteredCompanyId');
//     }
//   }, [user, data, isUserLoaded]);

//   const handleAutomaticRedirect = (
//     companies: Company[], 
//     currentCompany: Company | null, 
//     isFreshRegistration: boolean
//   ) => {
//     const isOnSuccessPage = pathname === '/register/success';
//     const hasVerifiedCompanies = verifiedCompanies.length > 0;
//     const isOnDashboard = pathname?.startsWith('/compagny-dashboard');

//     console.log('🔍 CONTEXT - Redirect Check:', {
//       isOnSuccessPage,
//       isFreshRegistration,
//       hasVerifiedCompanies,
//       verifiedCount: verifiedCompanies.length,
//       pendingCount: pendingCompanies.length,
//       lastRegisteredCompany: lastRegisteredCompany?.name,
//       pathname
//     });

//     // Rule 1: If user is on success page AND has verified companies → redirect to dashboard
//     if (isOnSuccessPage && hasVerifiedCompanies) {
//       console.log('🚀 CONTEXT - Has verified companies, redirecting to dashboard');
//       const verifiedCompany = verifiedCompanies[0];
//       router.push(`/compagny-dashboard/${verifiedCompany.slug}/menu/1`);
//       return;
//     }

//     // Rule 2: If user is on dashboard but has NO verified companies → redirect to success page
//     if (isOnDashboard && !hasVerifiedCompanies && companies.length > 0) {
//       console.log('🚀 CONTEXT - No verified companies, redirecting to success page');
//       router.push('/register/success');
//       return;
//     }

//     // Rule 3: If user has no companies at all and is on success page → redirect to registration
//     if (isOnSuccessPage && companies.length === 0) {
//       console.log('🚀 CONTEXT - No companies found, redirecting to registration');
//       router.push('/register/company');
//       return;
//     }

//     // Rule 4: Fresh registration - check if newly registered company gets verified
//     if (isOnSuccessPage && isFreshRegistration && lastRegisteredCompany) {
//       const newlyRegisteredCompany = companies.find(c => c.id === lastRegisteredCompany.id);
      
//       if (newlyRegisteredCompany?.verificationStatus === 'VERIFIED') {
//         console.log('🚀 CONTEXT - Newly registered company verified! Redirecting to dashboard');
//         router.push(`/compagny-dashboard/${newlyRegisteredCompany.slug}/menu/1`);
//         return;
//       }
//     }
//   };

//   const value = {
//     companies,
//     currentCompany,
//     isLoading: queryLoading || !isUserLoaded || isFetching,
//     setCurrentCompany: (company: Company) => {
//       setCurrentCompany(company);
//       localStorage.setItem('currentCompanyId', company.id);
//     },
//     refetchCompanies: refetch,
//     verifiedCompanies,
//     pendingCompanies,
//     lastRegisteredCompany,
//     refreshCompanyData,
//   };

//   return (
//     <CompanyContext.Provider value={value}>
//       {children}
//     </CompanyContext.Provider>
//   );
// }

// export const useCompany = () => {
//   const context = useContext(CompanyContext);
//   if (!context) {
//     throw new Error('useCompany must be used within CompanyProvider');
//   }
//   return context;
// };





























'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTRPC } from '@/trpc/client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Update the interface to match both database and update types
interface Company {
  id: string;
  name: string;
  slug: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  isActive: boolean;
  role: string;
  memberSince: Date;
  // Company profile data - nullable for database, optional for updates
  logoText?: string | null;
  industries?: string[];
  location?: string | null;
  website?: string | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  stats?: any;
  presentation?: string[];
}

// Separate type for update data that matches the mutation input
type CompanyUpdateData = {
  name?: string;
  logoText?: string;
  industries?: string[];
  location?: string;
  website?: string;
  gradientFrom?: string;
  gradientTo?: string;
  stats?: any;
  presentation?: string[];
}

interface CompanyContextType {
  companies: Company[];
  currentCompany: Company | null;
  isLoading: boolean;
  setCurrentCompany: (company: Company) => void;
  refetchCompanies: () => void;
  verifiedCompanies: Company[];
  pendingCompanies: Company[];
  lastRegisteredCompany: Company | null;
  refreshCompanyData: () => Promise<void>; // Fix: Return Promise<void>
  updateCompanyData: (data: CompanyUpdateData) => Promise<void>;
  isUpdating: boolean;
}

const CompanyContext = createContext<CompanyContextType>({
  companies: [],
  currentCompany: null,
  isLoading: true,
  setCurrentCompany: () => {},
  refetchCompanies: () => {},
  verifiedCompanies: [],
  pendingCompanies: [],
  lastRegisteredCompany: null,
  refreshCompanyData: async () => {}, // Fix: Return empty async function
  updateCompanyData: async () => {},
  isUpdating: false,
});

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const trpc = useTRPC();
  const router = useRouter();
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [lastRegisteredCompany, setLastRegisteredCompany] = useState<Company | null>(null);

  // Query to get user companies
  const { 
    data: companiesData, 
    isLoading: queryLoading, 
    refetch: refetchCompaniesQuery,
    isFetching 
  } = useQuery({
    ...trpc.company.getUserCompanies.queryOptions(),
    enabled: !!user && isUserLoaded,
    retry: false,
    staleTime: 1000 * 30,
  });

  // Mutation to update company data
  const updateCompanyMutation = useMutation({
    ...trpc.company.updateCompany.mutationOptions(),
    onSuccess: (_, variables) => {
      if (currentCompany) {
        const updatedCompany = { 
          ...currentCompany, 
          ...variables.data,
          logoText: variables.data.logoText || null,
          location: variables.data.location || null,
          website: variables.data.website || null,
          gradientFrom: variables.data.gradientFrom || null,
          gradientTo: variables.data.gradientTo || null,
        };
        setCurrentCompany(updatedCompany);
        setCompanies(prev => 
          prev.map(company => 
            company.id === currentCompany.id ? updatedCompany : company
          )
        );
      }
    },
  });

  // Filter companies by status
  const verifiedCompanies = companies.filter(c => c.verificationStatus === 'VERIFIED');
  const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');

  // Refresh company data function - FIXED: Returns Promise<void>
  const refreshCompanyData = async (): Promise<void> => {
    await refetchCompaniesQuery();
  };

  // Update company data function
  const updateCompanyData = async (data: CompanyUpdateData): Promise<void> => {
    if (!currentCompany) return;
    
    await updateCompanyMutation.mutateAsync({
      companyId: currentCompany.id,
      data
    });
  };

  // Refetch companies function
  const refetchCompanies = (): void => {
    refetchCompaniesQuery();
  };

  useEffect(() => {
    if (!isUserLoaded) return;

    if (user && companiesData?.companies) {
      const previousCompanies = companies;
      const newCompanies = companiesData.companies;
      setCompanies(newCompanies);
      
      // Check if we have a newly registered company from localStorage
      const lastRegisteredCompanyId = localStorage.getItem('lastRegisteredCompanyId');
      let newCurrentCompany = null;

      if (lastRegisteredCompanyId) {
        // Try to find the last registered company
        newCurrentCompany = newCompanies.find(c => c.id === lastRegisteredCompanyId);
        if (newCurrentCompany) {
          console.log('🎯 CONTEXT - Found last registered company:', newCurrentCompany.name);
          setLastRegisteredCompany(newCurrentCompany);
        } else {
          // Clear if not found
          localStorage.removeItem('lastRegisteredCompanyId');
        }
      }

      // If no last registered company, use the first verified company or first company
      if (!newCurrentCompany) {
        const verifiedCompany = newCompanies.find(c => c.verificationStatus === 'VERIFIED');
        newCurrentCompany = verifiedCompany || newCompanies[0] || null;
      }

      setCurrentCompany(newCurrentCompany);

    } else if (!user) {
      // Reset state when user logs out
      setCompanies([]);
      setCurrentCompany(null);
      setLastRegisteredCompany(null);
      localStorage.removeItem('lastRegisteredCompanyId');
      localStorage.removeItem('currentCompanyId');
    }
  }, [user, companiesData, isUserLoaded]);

  const value = {
    companies,
    currentCompany,
    isLoading: queryLoading || !isUserLoaded || isFetching,
    setCurrentCompany: (company: Company) => {
      setCurrentCompany(company);
      localStorage.setItem('currentCompanyId', company.id);
    },
    refetchCompanies,
    verifiedCompanies,
    pendingCompanies,
    lastRegisteredCompany,
    refreshCompanyData,
    updateCompanyData,
    isUpdating: updateCompanyMutation.isPending,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
};