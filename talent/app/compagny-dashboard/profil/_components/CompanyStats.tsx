// src/app/company/dashboard/components/CompanyStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyStatsProps {
  companyData: any;
}

export default function CompanyStats({ companyData }: CompanyStatsProps) {
  const stats = [
    { label: "Année de création", value: companyData.foundedYear },
    { label: "Collaborateurs", value: companyData.employees.toLocaleString() },
    { label: "Parité", value: companyData.genderRatio },
    { label: "Chiffre d'affaires", value: companyData.revenue }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chiffres clés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}