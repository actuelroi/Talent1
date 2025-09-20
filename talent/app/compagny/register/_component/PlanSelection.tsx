// src/app/register/company/components/PlanSelection.tsx
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';

interface PlanSelectionProps {
  formData: {
    plan: string;
    agreeTerms: boolean;
    agreePrivacy: boolean;
    receiveNewsletter: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PlanSelection({ formData, onChange }: PlanSelectionProps) {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Gratuit',
      description: 'Parfait pour découvrir la plateforme',
      features: [
        '1 offre d\'emploi active',
        'Profil entreprise basique',
        'Support par email',
        'Analytics de base'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '99€/mois',
      description: 'Idéal pour les PME en croissance',
      features: [
        '5 offres d\'emploi actives',
        'Profil entreprise complet',
        'Support prioritaire',
        'Analytics avancés',
        'Multi-diffusion vers 3 plateformes'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Sur mesure',
      description: 'Solution complète pour les grandes entreprises',
      features: [
        'Offres d emploi illimitées',
        'Profil entreprise premium',
        'Support dédié 24/7',
        'Analytics complets',
        'Multi-diffusion illimitée',
        'Intégrations personnalisées'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Choisissez votre plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(plan => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all ${
                formData.plan === plan.id 
                  ? 'border-2 border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${plan.recommended ? 'ring-2 ring-blue-200' : ''}`}
              onClick={() => onChange({ target: { name: 'plan', value: plan.id } } as any)}
            >
              <CardContent className="p-6">
                {plan.recommended && (
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-4 inline-block">
                    Recommandé
                  </div>
                )}
                
                <h4 className="font-bold text-lg mb-1">{plan.name}</h4>
                <p className="text-2xl font-bold text-gray-900 mb-2">{plan.price}</p>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-center mt-4">
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    formData.plan === plan.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.plan === plan.id && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) => onChange({ target: { name: 'agreeTerms', checked } } as any)}
            required
          />
          <Label htmlFor="agreeTerms" className="font-normal">
            J'accepte les <a href="#" className="text-blue-600 hover:underline">Conditions d'utilisation</a> et la <a href="#" className="text-blue-600 hover:underline">Politique de confidentialité</a> *
          </Label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="receiveNewsletter"
            name="receiveNewsletter"
            checked={formData.receiveNewsletter}
            onCheckedChange={(checked) => onChange({ target: { name: 'receiveNewsletter', checked } } as any)}
          />
          <Label htmlFor="receiveNewsletter" className="font-normal">
            Je souhaite recevoir la newsletter et des conseils pour améliorer mon recrutement
          </Label>
        </div>
      </div>
    </div>
  );
}