export interface CompanyData {
  name: string;
  logo: string;
  slogan: string; // AJOUTEZ CETTE LIGNE
  logoText: string;
  backgroundImage: string;
  backgroundGradient: string;
  industry: string;
  location: string;
  website: string;
  foundedYear: number;
  employees: number;
  genderRatio: string;
  revenue: string;
  description: string;
  benefits: string[];
  commitments: string[];
}

export interface HeaderProps {
  companyData: CompanyData;
  onUpdate: (data: Partial<CompanyData>) => void;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string;
  onSave: (value: string) => Promise<void> | void;
  isTextarea?: boolean;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  isLoading?: boolean;
}


// types/company.ts
export interface Company {
  id: string;
  name: string;
  slug: string;
  logoText?: string | null;
  industries: string[];
  location?: string | null;
  website?: string | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  stats?: any;
  presentation: string[];
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  isVerified: boolean;
  description?: string | null;
  industry?: string | null;
  size?: string | null;
  logo?: string | null;
  coverImage?: string | null;
  foundedYear?: number | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  members: Array<{
    user: {
      firstName: string;
      lastName: string;
      email: string;
      avatar?: string | null;
    };
    role: string;
    jobTitle?: string | null;
    department?: string | null;
  }>;
}

export interface CompanyResponse {
  company: Company;
}