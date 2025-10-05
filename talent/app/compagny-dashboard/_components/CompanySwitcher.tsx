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
import { Building, Check, Badge, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCompany } from '@/contexts/CompanyVerificationContext';

export function CompanySwitcher() {
  const { currentCompany, verifiedCompanies, pendingCompanies, setCurrentCompany } = useCompany();

  if (verifiedCompanies.length === 0 && pendingCompanies.length === 0) {
    return (
      <Button asChild variant="outline" className="w-full justify-start">
        <Link href="/register/company">
          <Plus className="h-4 w-4 mr-2" />
          Créer une entreprise
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Building className="h-4 w-4 mr-2" />
          <span className="truncate">
            {currentCompany?.name || 'Sélectionner'}
          </span>
          {currentCompany?.verificationStatus === 'PENDING' && (
            <Badge  className="ml-2 text-xs bg-blend-hard-light">
              En attente
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        {/* Verified Companies */}
        {verifiedCompanies.length > 0 && (
          <>
            <DropdownMenuLabel>Entreprises vérifiées</DropdownMenuLabel>
            {verifiedCompanies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => setCurrentCompany(company)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="truncate">{company.name}</span>
                </div>
                {company.id === currentCompany?.id && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        {/* Pending Companies */}
        {pendingCompanies.length > 0 && (
          <>
            <DropdownMenuLabel>En attente de vérification</DropdownMenuLabel>
            {pendingCompanies.map((company) => (
              <DropdownMenuItem
                key={company.id}
                onClick={() => setCurrentCompany(company)}
                className="flex items-center justify-between cursor-pointer opacity-60"
                disabled
              >
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="truncate">{company.name}</span>
                </div>
                <Badge  className="text-xs bg-accent-foreground">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}