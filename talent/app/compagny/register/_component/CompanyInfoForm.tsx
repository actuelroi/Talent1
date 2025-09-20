// src/app/register/company/components/CompanyInfoForm.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompanyInfoFormProps {
  formData: {
    companyName: string;
    companySize: string;
    industry: string;
    website: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function CompanyInfoForm({ formData, onChange }: CompanyInfoFormProps) {
  const industries = [
    'Technologie',
    'Santé',
    'Finance',
    'Éducation',
    'Commerce de détail',
    'Manufacturing',
    'Services professionnels',
    'Immobilier',
    'Transport',
    'Médias',
    'Hôtellerie',
    'Autre'
  ];

  const companySizes = [
    '1-10 employés',
    '11-50 employés',
    '51-200 employés',
    '201-500 employés',
    '501-1000 employés',
    '1000+ employés'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="companyName">Nom de l'entreprise *</Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Secteur d'activité *</Label>
        <Select
          name="industry"
          value={formData.industry}
          onValueChange={(value) => onChange({ target: { name: 'industry', value } } as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un secteur" />
          </SelectTrigger>
          <SelectContent>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companySize">Taille de l'entreprise *</Label>
        <Select
          name="companySize"
          value={formData.companySize}
          onValueChange={(value) => onChange({ target: { name: 'companySize', value } } as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une taille" />
          </SelectTrigger>
          <SelectContent>
            {companySizes.map(size => (
              <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Site web</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={onChange}
          placeholder="https://www.votre-entreprise.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
        />
      </div>
      
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">Ville</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="postalCode">Code postal</Label>
        <Input
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="country">Pays</Label>
        <Select
          name="country"
          value={formData.country}
          onValueChange={(value) => onChange({ target: { name: 'country', value } } as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Belgique">Belgique</SelectItem>
            <SelectItem value="Suisse">Suisse</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="Autre">Autre</SelectItem>
            <SelectItem value="Cote d'ivoire">Cote d'ivoire</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}