// app/admin/companies/page.tsx
'use client';

import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

interface PendingCompany {
  id: string;
  name: string;
  email: string;
  industry: string;
  size: string | null;
  website: string | null;
  createdAt: Date;
  adminName: string;
}

export default function AdminCompaniesPage() {
  const trpc = useTRPC();
  const { toast } = useToast()

  const { data: pendingCompanies, refetch } =
    useQuery(trpc.admin.getPendingCompanies.queryOptions());

  const verifyCompanyMutation =
    useMutation(trpc.admin.verifyCompany.mutationOptions({
      onSuccess: () => refetch(),
    }));

  const rejectCompanyMutation =
    useMutation(trpc.admin.rejectCompany.mutationOptions({
      onSuccess: () => refetch(),
    }));

  // In your AdminCompaniesPage.tsx - add send verification function
  const sendVerificationEmailMutation =
    useMutation(trpc.admin.sendVerificationEmail.mutationOptions());

  const handleSendVerification = async (company: PendingCompany) => {
    try {
      await sendVerificationEmailMutation.mutateAsync({
        companyId: company.id,
        email: company.email,
        companyName: company.name,
      });

      toast({
        title: "Email envoyé",
        description: "L'email de vérification a été envoyé",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de vérification",
        variant: "destructive"
      });
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Entreprises en attente</h1>

      {pendingCompanies?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune entreprise en attente de vérification</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingCompanies?.map((company: PendingCompany) => (
            <Card key={company.id}>
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Email administrateur</p>
                    <p className="text-sm text-gray-600">{company.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Industrie</p>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taille</p>
                    <p className="text-sm text-gray-600">{company.size || 'Non spécifiée'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Site web</p>
                    <p className="text-sm text-gray-600">{company.website || 'Non spécifié'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Administrateur</p>
                    <p className="text-sm text-gray-600">{company.adminName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date de création</p>
                    <p className="text-sm text-gray-600">
                      {new Date(company.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                
                  <Button
                    onClick={() => handleSendVerification(company)}
                    disabled={sendVerificationEmailMutation.isPending}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {sendVerificationEmailMutation.isPending ? 'Envoi...' : 'Envoyer vérification'}
                  </Button>

                  {/* <Button
                    onClick={() => verifyCompanyMutation.mutate({ companyId: company.id })}
                    disabled={verifyCompanyMutation.isPending}
                    variant="default"
                  >
                    {verifyCompanyMutation.isPending ? 'Vérification...' : 'Vérifier'}
                  </Button> */}

                  <Button
                    onClick={() => rejectCompanyMutation.mutate({
                      companyId: company.id,
                      reason: 'Manuel rejection'
                    })}
                    disabled={rejectCompanyMutation.isPending}
                    variant="outline"
                  >
                    {rejectCompanyMutation.isPending ? 'Rejet...' : 'Rejeter'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}