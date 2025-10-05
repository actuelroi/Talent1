export interface ProfileCustomizationProps {
  onComplete: (data: { backgroundImage?: File; logoImage?: File }) => void;
  companyName?: string;
}

export interface BackgroundUploadProps {
  onFileChange: (file: File | null, preview: string) => void;
  currentPreview: string;
}

export interface LogoUploadProps {
  onFileChange: (file: File | null, preview: string) => void;
  currentPreview: string;
}

export interface PreviewSectionProps {
  backgroundPreview: string;
  logoPreview: string;
  companyName: string;
}