// src/app/companies/l-oreal/jobs/[slug]/postuler/components/PersonalInfoForm.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInfoForm({ formData, onChange }: PersonalInfoFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom *</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">Nom *</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
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
      
      <div className="space-y-2">
        <Label htmlFor="linkedin">Profil LinkedIn</Label>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={onChange}
          placeholder="https://linkedin.com/in/votre-profil"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="portfolio">Portfolio / Site web</Label>
        <Input
          id="portfolio"
          name="portfolio"
          type="url"
          value={formData.portfolio}
          onChange={onChange}
          placeholder="https://votre-portfolio.com"
        />
      </div>
    </div>
  );
}