// src/app/company/dashboard/components/BenefitsSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiEditLine } from "@remixicon/react";

interface BenefitsSectionProps {
  benefits: string[];
  commitments: string[];
  onUpdate: (data: any) => void;
}

export default function BenefitsSection({ benefits, commitments, onUpdate }: BenefitsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Nos avantages</span>
            <Button variant="outline" size="sm">
              <RiEditLine className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Nos engagements</span>
            <Button variant="outline" size="sm">
              <RiEditLine className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {commitments.map((commitment, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{commitment}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}