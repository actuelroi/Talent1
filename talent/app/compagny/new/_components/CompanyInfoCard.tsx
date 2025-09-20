// src/app/company/jobs/new/components/CompanyInfoCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Calendar, Globe } from 'lucide-react';

interface CompanyInfoCardProps {
  company: any;
}

export default function CompanyInfoCard({ company }: CompanyInfoCardProps) {
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
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{company.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{company.size}</span>
          </div>
          
          {company.foundedYear && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Fondée en {company.foundedYear}</span>
            </div>
          )}
          
          {company.website && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {company.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        
        {company.description && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-3">
              {company.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}