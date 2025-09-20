// src/app/company/dashboard/components/CompanyHeader.tsx
import { Button } from '@/components/ui/button';
import { RiEarthLine, RiMapPinLine, RiEditLine } from "@remixicon/react";

interface CompanyHeaderProps {
  companyData: any;
}

export default function CompanyHeader({ companyData }: CompanyHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">L'Oréal</span>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{companyData.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-gray-600">
                  <RiMapPinLine className="h-4 w-4" />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <RiEarthLine className="h-4 w-4" />
                  <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {companyData.website.replace('https://', '')}
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {companyData.industry.split(', ').map((industry: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <RiEditLine className="h-4 w-4" />
              Modifier
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}