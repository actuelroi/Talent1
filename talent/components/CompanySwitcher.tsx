// components/CompanySwitcher.tsx
'use client';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Building, Check, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useCompany } from '@/contexts/CompanyVerificationContext';

export function CompanySwitcher() {
  const { companies, currentCompany, setCurrentCompany } = useCompany();

  if (!currentCompany) return null;

  const verifiedCompanies = companies.filter(c => c.verificationStatus === 'VERIFIED');
  const pendingCompanies = companies.filter(c => c.verificationStatus === 'PENDING');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Building className="h-4 w-4 mr-2" />
          <span className="truncate">{currentCompany.name}</span>
          {currentCompany.verificationStatus === 'PENDING' && (
            <Badge variant="secondary" className="ml-2">
              En attente
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Mes entreprises</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Verified Companies */}
        {verifiedCompanies.map((company) => (
          <DropdownMenuItem
            key={company.id}
            onClick={() => setCurrentCompany(company)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              <span className="truncate">{company.name}</span>
            </div>
            {company.id === currentCompany.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
        
        {/* Pending Companies */}
        {pendingCompanies.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>En attente de vérification</DropdownMenuLabel>
            {pendingCompanies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => setCurrentCompany(company)}
                className="flex items-center justify-between opacity-60"
                disabled
              >
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="truncate">{company.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  En attente
                </Badge>
              </DropdownMenuItem>
            ))}
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/register/company" className="flex items-center cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une entreprise
          </Link>
        </DropdownMenuItem>
        
        {currentCompany.verificationStatus === 'VERIFIED' && (
          <DropdownMenuItem asChild>
            <Link href={`/compagny-dashboard/teams`} className="flex items-center cursor-pointer">
              <Users className="h-4 w-4 mr-2" />
              Gérer l'équipe
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}