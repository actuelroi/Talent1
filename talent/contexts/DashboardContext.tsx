// contexts/DashboardContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useCompany } from './CompanyVerificationContext';

interface DashboardData {
  companyProfile: any;
  stats: any[];
  employeeTestimonials: any[];
  companyPresentation: any;
  companyLookingFor: any;
  companyBenefits: any;
  metiers: any[];
  rseData: any;
}

interface DashboardContextType {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  refetchDashboard: () => void;
  updateDashboard: (section: string, data: any) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({
  dashboardData: null,
  isLoading: true,
  refetchDashboard: () => {},
  updateDashboard: async () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { currentCompany } = useCompany();
  const trpc = useTRPC();

  const { data, isLoading, refetch } = useQuery({
    ...trpc.companyDashboard.getCompanyDashboard.queryOptions({
      companyId: currentCompany?.id || ''
    }),
    enabled: !!currentCompany?.id,
  });



  const updateDashboard = async (section: string, data: any) => {
    if (!currentCompany?.id) {
      throw new Error('No company selected');
    }

    try {
      // Use the appropriate mutation based on the section
      const mutationMap: any = {
        profile: trpc.companyDashboard.updateCompanyProfile,
        stats: trpc.companyDashboard.updateCompanyStats,
        testimonials: trpc.companyDashboard.updateEmployeeTestimonials,
        presentation: trpc.companyDashboard.updateCompanyPresentation,
        lookingFor: trpc.companyDashboard.updateCompanyLookingFor,
        benefits: trpc.companyDashboard.updateCompanyBenefits,
        metiers: trpc.companyDashboard.updateMetiers,
        rse: trpc.companyDashboard.updateRSEData,
      };

      const mutation = mutationMap[section];
      if (mutation) {
        await mutation.mutateAsync({
          companyId: currentCompany.id,
          [section]: data
        });
        refetch(); // Refresh data
      }
    } catch (error) {
      console.error(`Failed to update ${section}:`, error);
      throw error;
    }
  };

  const value = {
    dashboardData: data || null,
    isLoading,
    refetchDashboard: refetch,
    updateDashboard,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};