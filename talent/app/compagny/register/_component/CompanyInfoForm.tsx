// // src/app/register/company/components/CompanyInfoForm.tsx
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface CompanyInfoFormProps {
//   formData: {
//     companyName: string;
//     companySize: string;
//     industry: string;
//     website: string;
//     phone: string;
//     address: string;
//     city: string;
//     postalCode: string;
//     country: string;
//   };
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   errors: Record<string, string>;
//   isCheckingAvailability: boolean;
// }

// export default function CompanyInfoForm({ formData, onChange }: CompanyInfoFormProps) {
//   const industries = [
//     'Technologie',
//     'Santé',
//     'Finance',
//     'Éducation',
//     'Commerce de détail',
//     'Manufacturing',
//     'Services professionnels',
//     'Immobilier',
//     'Transport',
//     'Médias',
//     'Hôtellerie',
//     'Autre'
//   ];

//   const companySizes = [
//     '1-10 employés',
//     '11-50 employés',
//     '51-200 employés',
//     '201-500 employés',
//     '501-1000 employés',
//     '1000+ employés'
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="md:col-span-2 space-y-2">
//         <Label htmlFor="companyName">Nom de l'entreprise *</Label>
//         <Input
//           id="companyName"
//           name="companyName"
//           value={formData.companyName}
//           onChange={onChange}
//           required
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="industry">Secteur d'activité *</Label>
//         <Select
//           name="industry"
//           value={formData.industry}
//           onValueChange={(value) => onChange({ target: { name: 'industry', value } } as any)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Sélectionnez un secteur" />
//           </SelectTrigger>
//           <SelectContent>
//             {industries.map(industry => (
//               <SelectItem key={industry} value={industry}>{industry}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="companySize">Taille de l'entreprise *</Label>
//         <Select
//           name="companySize"
//           value={formData.companySize}
//           onValueChange={(value) => onChange({ target: { name: 'companySize', value } } as any)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Sélectionnez une taille" />
//           </SelectTrigger>
//           <SelectContent>
//             {companySizes.map(size => (
//               <SelectItem key={size} value={size}>{size}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="website">Site web</Label>
//         <Input
//           id="website"
//           name="website"
//           type="url"
//           value={formData.website}
//           onChange={onChange}
//           placeholder="https://www.votre-entreprise.com"
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="phone">Téléphone</Label>
//         <Input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="md:col-span-2 space-y-2">
//         <Label htmlFor="address">Adresse</Label>
//         <Input
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="city">Ville</Label>
//         <Input
//           id="city"
//           name="city"
//           value={formData.city}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="postalCode">Code postal</Label>
//         <Input
//           id="postalCode"
//           name="postalCode"
//           value={formData.postalCode}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="country">Pays</Label>
//         <Select
//           name="country"
//           value={formData.country}
//           onValueChange={(value) => onChange({ target: { name: 'country', value } } as any)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Sélectionnez un pays" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="France">France</SelectItem>
//             <SelectItem value="Belgique">Belgique</SelectItem>
//             <SelectItem value="Suisse">Suisse</SelectItem>
//             <SelectItem value="Canada">Canada</SelectItem>
//             <SelectItem value="Autre">Autre</SelectItem>
//             <SelectItem value="Cote d'ivoire">Cote d'ivoire</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }



// // src/app/register/company/components/CompanyInfoForm.tsx
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface CompanyInfoFormProps {
//   formData: {
//     companyName: string;
//     companySize: string;
//     industry: string;
//     website: string;
//     phone: string;
//     address: string;
//     city: string;
//     postalCode: string;
//     country: string;
//   };
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   errors: Record<string, string>;
//   isCheckingAvailability: boolean;
// }

// export default function CompanyInfoForm({ formData, onChange, errors, isCheckingAvailability }: CompanyInfoFormProps) {
//   const industries = [
//     'Technologie',
//     'Santé',
//     'Finance',
//     'Éducation',
//     'Commerce de détail',
//     'Manufacturing',
//     'Services professionnels',
//     'Immobilier',
//     'Transport',
//     'Médias',
//     'Hôtellerie',
//     'Autre'
//   ];

//   const companySizes = [
//     '1-10 employés',
//     '11-50 employés',
//     '51-200 employés',
//     '201-500 employés',
//     '501-1000 employés',
//     '1000+ employés'
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="md:col-span-2 space-y-2">
//         <Label htmlFor="companyName">Nom de l'entreprise *</Label>
//         <Input
//           id="companyName"
//           name="companyName"
//           value={formData.companyName}
//           onChange={onChange}
//           required
//           className={errors.companyName ? 'border-red-500' : ''}
//           disabled={isCheckingAvailability}
//         />
//         {errors.companyName && (
//           <p className="text-sm text-red-600 mt-1">{errors.companyName}</p>
//         )}
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="industry">Secteur d'activité *</Label>
//         <Select
//           name="industry"
//           value={formData.industry}
//           onValueChange={(value) => onChange({ target: { name: 'industry', value } } as any)}
//         >
//           <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
//             <SelectValue placeholder="Sélectionnez un secteur" />
//           </SelectTrigger>
//           <SelectContent>
//             {industries.map(industry => (
//               <SelectItem key={industry} value={industry}>{industry}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         {errors.industry && (
//           <p className="text-sm text-red-600 mt-1">{errors.industry}</p>
//         )}
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="companySize">Taille de l'entreprise *</Label>
//         <Select
//           name="companySize"
//           value={formData.companySize}
//           onValueChange={(value) => onChange({ target: { name: 'companySize', value } } as any)}
//         >
//           <SelectTrigger className={errors.companySize ? 'border-red-500' : ''}>
//             <SelectValue placeholder="Sélectionnez une taille" />
//           </SelectTrigger>
//           <SelectContent>
//             {companySizes.map(size => (
//               <SelectItem key={size} value={size}>{size}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         {errors.companySize && (
//           <p className="text-sm text-red-600 mt-1">{errors.companySize}</p>
//         )}
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="website">Site web</Label>
//         <Input
//           id="website"
//           name="website"
//           type="url"
//           value={formData.website}
//           onChange={onChange}
//           placeholder="https://www.votre-entreprise.com"
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="phone">Téléphone</Label>
//         <Input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="md:col-span-2 space-y-2">
//         <Label htmlFor="address">Adresse</Label>
//         <Input
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="city">Ville</Label>
//         <Input
//           id="city"
//           name="city"
//           value={formData.city}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="postalCode">Code postal</Label>
//         <Input
//           id="postalCode"
//           name="postalCode"
//           value={formData.postalCode}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="country">Pays</Label>
//         <Select
//           name="country"
//           value={formData.country}
//           onValueChange={(value) => onChange({ target: { name: 'country', value } } as any)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Sélectionnez un pays" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="France">France</SelectItem>
//             <SelectItem value="Belgique">Belgique</SelectItem>
//             <SelectItem value="Suisse">Suisse</SelectItem>
//             <SelectItem value="Canada">Canada</SelectItem>
//             <SelectItem value="Autre">Autre</SelectItem>
//             <SelectItem value="Cote d'ivoire">Cote d'ivoire</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }



// src/app/register/company/components/CompanyInfoForm.tsx
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';

interface CompanyInfoFormProps {
  isCheckingAvailability: boolean;
}

export default function CompanyInfoForm({ isCheckingAvailability }: CompanyInfoFormProps) {
  const { control } = useFormContext();

  const industries = [
    'Technologie', 'Santé', 'Finance', 'Éducation', 'Commerce de détail',
    'Manufacturing', 'Services professionnels', 'Immobilier', 'Transport',
    'Médias', 'Hôtellerie', 'Autre'
  ];

  const companySizes = [
    { label: '1-10 employés', value: 'SIZE_1_10' },
    { label: '11-50 employés', value: 'SIZE_11_50' },
    { label: '51-200 employés', value: 'SIZE_51_200' },
    { label: '201-500 employés', value: 'SIZE_201_500' },
    { label: '501-1000 employés', value: 'SIZE_501_1000' },
    { label: '1000+ employés', value: 'SIZE_1000_PLUS' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Company Name */}
      <FormField
        control={control}
        name="company.companyName"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <Label htmlFor="companyName">Nom de l'entreprise *</Label>
            <FormControl>
              <Input
                {...field}
                id="companyName"
                placeholder="Nom de votre entreprise"
                disabled={isCheckingAvailability}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Industry */}
      <FormField
        control={control}
        name="company.industry"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="industry">Secteur d'activité *</Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Company Size */}
      <FormField
        control={control}
        name="company.companySize"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="companySize">Taille de l'entreprise *</Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {companySizes.map(size => (
                  <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Website */}
      <FormField
        control={control}
        name="company.website"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="website">Site web</Label>
            <FormControl>
              <Input
                {...field}
                id="website"
                placeholder="https://www.votre-entreprise.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone */}
      <FormField
        control={control}
        name="company.phone"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="phone">Téléphone</Label>
            <FormControl>
              <Input {...field} id="phone" type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address */}
      <FormField
        control={control}
        name="company.address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <Label htmlFor="address">Adresse</Label>
            <FormControl>
              <Input {...field} id="address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City */}
      <FormField
        control={control}
        name="company.city"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="city">Ville</Label>
            <FormControl>
              <Input {...field} id="city" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Postal Code */}
      <FormField
        control={control}
        name="company.postalCode"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="postalCode">Code postal</Label>
            <FormControl>
              <Input {...field} id="postalCode" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country */}
      <FormField
        control={control}
        name="company.country"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="country">Pays</Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un pays" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Belgique">Belgique</SelectItem>
                <SelectItem value="Suisse">Suisse</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
                <SelectItem value="Cote d'ivoire">Cote d'ivoire</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}