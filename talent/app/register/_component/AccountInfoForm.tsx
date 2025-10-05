// // src/app/register/company/components/AccountInfoForm.tsx
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// interface AccountInfoFormProps {
//   formData: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     jobTitle: string;
//     department: string;
//   };
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   errors: Record<string, string>;
// }

// export default function AccountInfoForm({ formData, onChange }: AccountInfoFormProps) {
//   const departments = [
//     'Ressources Humaines',
//     'Recrutement',
//     'Direction',
//     'Marketing',
//     'IT',
//     'Finance',
//     'Opérations',
//     'Autre'
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="space-y-2">
//         <Label htmlFor="firstName">Prénom *</Label>
//         <Input
//           id="firstName"
//           name="firstName"
//           value={formData.firstName}
//           onChange={onChange}
//           required
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="lastName">Nom *</Label>
//         <Input
//           id="lastName"
//           name="lastName"
//           value={formData.lastName}
//           onChange={onChange}
//           required
//         />
//       </div>
      
//       <div className="md:col-span-2 space-y-2">
//         <Label htmlFor="email">Email professionnel *</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={onChange}
//           required
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="jobTitle">Poste</Label>
//         <Input
//           id="jobTitle"
//           name="jobTitle"
//           value={formData.jobTitle}
//           onChange={onChange}
//         />
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="department">Département</Label>
//         <select
//           id="department"
//           name="department"
//           value={formData.department}
//           onChange={onChange as any}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Sélectionnez un département</option>
//           {departments.map(dept => (
//             <option key={dept} value={dept}>{dept}</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="password">Mot de passe *</Label>
//         <Input
//           id="password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={onChange}
//           required
//         />
//         <p className="text-xs text-gray-500 mt-1">
//           Minimum 8 caractères, avec des lettres et des chiffres
//         </p>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
//         <Input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={onChange}
//           required
//         />
//       </div>
      
//     </div>
//   );
// }


// src/app/register/company/components/AccountInfoForm.tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';

export default function AccountInfoForm() {
  const { control } = useFormContext();

  const departments = [
    'Ressources Humaines',
    'Recrutement',
    'Direction',
    'Marketing',
    'IT',
    'Finance',
    'Opérations',
    'Autre'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <FormField
        control={control}
        name="account.firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prénom *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Votre prénom" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last Name */}
      <FormField
        control={control}
        name="account.lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Votre nom" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={control}
        name="account.email"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Email professionnel *</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="votre@email.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Title */}
      <FormField
        control={control}
        name="account.jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Poste</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Votre poste" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Department */}
      <FormField
        control={control}
        name="account.department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Département</FormLabel>
            <FormControl>
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez un département</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
}