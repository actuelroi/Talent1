// src/app/jobs/[id]/components/CompanyCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Heart } from 'lucide-react';
import Link from 'next/link';
import { Company, CompanyBenefit, CompanyCommitment } from '@/lib/generated/prisma';


interface CompanyCardProps {
  company: Company & {
    benefits: CompanyBenefit[];
    commitments: CompanyCommitment[];
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const formatEmployeeCount = (size: string | null) => {
    if (!size) return 'Taille non spécifiée';
    
    const sizeMap = {
      'SIZE_1_10': '1-10 employés',
      'SIZE_11_50': '11-50 employés',
      'SIZE_51_200': '51-200 employés',
      'SIZE_201_500': '201-500 employés',
      'SIZE_501_1000': '501-1000 employés',
      'SIZE_1000_PLUS': '1000+ employés',
    };
    
    return sizeMap[size as keyof typeof sizeMap] || size;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-600">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-lg">{company.name}</h3>
            <p className="text-gray-600 text-sm">{company.industry}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{company.city}, {company.country}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{formatEmployeeCount(company.size)}</span>
          </div>
          
          {company.foundedYear && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Fondée en {company.foundedYear}</span>
            </div>
          )}
        </div>
        
        {company.description && (
          <p className="text-gray-700 text-sm mb-6 line-clamp-3">
            {company.description}
          </p>
        )}
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href={`/companies/${company.slug}`}>
              Voir le profil
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Suivre l'entreprise
          </Button>
        </div>
        
        {company.benefits.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">Avantages</h4>
            <div className="space-y-2">
              {company.benefits.slice(0, 3).map(benefit => (
                <div key={benefit.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{benefit.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}