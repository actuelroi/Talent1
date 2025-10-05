// // src/app/company/jobs/new/components/JobForm.tsx

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Save, Plus, Trash2 } from 'lucide-react';
// import { useState } from 'react';

// interface JobFormProps {
//   formData: any;
//   onChange: (field: string, value: any) => void;
//   onSubmit: (e: React.FormEvent) => void;
//   isSubmitting: boolean;
// }

// export default function JobForm({ formData, onChange, onSubmit, isSubmitting }: JobFormProps) {
//   const [requirements, setRequirements] = useState<string[]>(['']);
//   const [responsibilities, setResponsibilities] = useState<string[]>(['']);
//   const [benefits, setBenefits] = useState<string[]>(['']);

//   const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, items: string[]) => {
//     setter([...items, '']);
//   };

//   const updateListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, items: string[], index: number, value: string) => {
//     const newItems = [...items];
//     newItems[index] = value;
//     setter(newItems);
//   };

//   const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, items: string[], index: number) => {
//     const newItems = items.filter((_, i) => i !== index);
//     setter(newItems);
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-6">
//       {/* Basic Information */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Informations de base</CardTitle>
//           <CardDescription>
//             Les informations principales de votre offre d'emploi
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="title">Titre du poste *</Label>
//             <Input
//               id="title"
//               value={formData.title}
//               onChange={(e) => onChange('title', e.target.value)}
//               placeholder="Ex: Développeur Frontend React"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="employmentType">Type de contrat *</Label>
//               <Select
//                 value={formData.employmentType}
//                 onValueChange={(value) => onChange('employmentType', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionnez un type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="full_time">CDI</SelectItem>
//                   <SelectItem value="part_time">Temps partiel</SelectItem>
//                   <SelectItem value="contract">CDD</SelectItem>
//                   <SelectItem value="internship">Stage</SelectItem>
//                   <SelectItem value="temporary">Intérim</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label htmlFor="experienceLevel">Niveau d'expérience *</Label>
//               <Select
//                 value={formData.experienceLevel}
//                 onValueChange={(value) => onChange('experienceLevel', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionnez un niveau" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="internship">Stage</SelectItem>
//                   <SelectItem value="entry_level">Débutant</SelectItem>
//                   <SelectItem value="junior">Junior (1-3 ans)</SelectItem>
//                   <SelectItem value="mid_level">Confirmé (3-5 ans)</SelectItem>
//                   <SelectItem value="senior">Senior (5+ ans)</SelectItem>
//                   <SelectItem value="lead">Lead/Manager</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="location">Localisation *</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => onChange('location', e.target.value)}
//                 placeholder="Ex: Paris, France"
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="remotePolicy">Mode de travail *</Label>
//               <Select
//                 value={formData.remotePolicy}
//                 onValueChange={(value) => onChange('remotePolicy', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionnez un mode" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="onsite">Sur site</SelectItem>
//                   <SelectItem value="hybrid">Hybride</SelectItem>
//                   <SelectItem value="remote">100% télétravail</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <Label htmlFor="salaryMin">Salaire minimum (optionnel)</Label>
//               <Input
//                 id="salaryMin"
//                 type="number"
//                 value={formData.salaryMin}
//                 onChange={(e) => onChange('salaryMin', e.target.value)}
//                 placeholder="Ex: 40000"
//               />
//             </div>

//             <div>
//               <Label htmlFor="salaryMax">Salaire maximum (optionnel)</Label>
//               <Input
//                 id="salaryMax"
//                 type="number"
//                 value={formData.salaryMax}
//                 onChange={(e) => onChange('salaryMax', e.target.value)}
//                 placeholder="Ex: 55000"
//               />
//             </div>

//             <div>
//               <Label htmlFor="currency">Devise</Label>
//               <Select
//                 value={formData.currency}
//                 onValueChange={(value) => onChange('currency', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionnez une devise" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="EUR">EUR (€)</SelectItem>
//                   <SelectItem value="USD">USD ($)</SelectItem>
//                   <SelectItem value="GBP">GBP (£)</SelectItem>
//                   <SelectItem value="CHF">CHF (CHF)</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Job Description */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Description du poste</CardTitle>
//           <CardDescription>
//             Décrivez le poste, la mission et le contexte
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="description">Description *</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => onChange('description', e.target.value)}
//                 placeholder="Décrivez le poste, l'équipe, les challenges..."
//                 rows={5}
//                 required
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Responsibilities */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Responsabilités</CardTitle>
//           <CardDescription>
//             Les principales missions et responsabilités du poste
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {responsibilities.map((item, index) => (
//               <div key={index} className="flex items-start gap-2">
//                 <Input
//                   value={item}
//                   onChange={(e) => updateListItem(setResponsibilities, responsibilities, index, e.target.value)}
//                   placeholder="Ex: Développer de nouvelles fonctionnalités frontend"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="icon"
//                   onClick={() => removeListItem(setResponsibilities, responsibilities, index)}
//                   disabled={responsibilities.length === 1}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => addListItem(setResponsibilities, responsibilities)}
//               className="flex items-center gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Ajouter une responsabilité
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Requirements */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Exigences et compétences</CardTitle>
//           <CardDescription>
//             Les compétences et qualifications requises pour ce poste
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {requirements.map((item, index) => (
//               <div key={index} className="flex items-start gap-2">
//                 <Input
//                   value={item}
//                   onChange={(e) => updateListItem(setRequirements, requirements, index, e.target.value)}
//                   placeholder="Ex: 3+ ans d'expérience avec React"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="icon"
//                   onClick={() => removeListItem(setRequirements, requirements, index)}
//                   disabled={requirements.length === 1}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => addListItem(setRequirements, requirements)}
//               className="flex items-center gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Ajouter une exigence
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Benefits */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Avantages</CardTitle>
//           <CardDescription>
//             Les avantages et perks offerts avec ce poste
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {benefits.map((item, index) => (
//               <div key={index} className="flex items-start gap-2">
//                 <Input
//                   value={item}
//                   onChange={(e) => updateListItem(setBenefits, benefits, index, e.target.value)}
//                   placeholder="Ex: Tickets restaurant, mutuelle, télétravail"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="icon"
//                   onClick={() => removeListItem(setBenefits, benefits, index)}
//                   disabled={benefits.length === 1}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => addListItem(setBenefits, benefits)}
//               className="flex items-center gap-2"
//             >
//               <Plus className="h-4 w-4" />
//               Ajouter un avantage
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Additional Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Paramètres supplémentaires</CardTitle>
//           <CardDescription>
//             Configurez les options de publication de votre offre
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="applicationUrl">URL de candidature (optionnel)</Label>
//             <Input
//               id="applicationUrl"
//               type="url"
//               value={formData.applicationUrl}
//               onChange={(e) => onChange('applicationUrl', e.target.value)}
//               placeholder="https://votre-site.com/candidature"
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Laissez vide pour utiliser notre système de candidature intégré
//             </p>
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <Label htmlFor="isActive">Offre active</Label>
//               <p className="text-sm text-gray-500">
//                 L'offre sera visible par les candidats
//               </p>
//             </div>
//             <Switch
//               id="isActive"
//               checked={formData.isActive}
//               onCheckedChange={(checked) => onChange('isActive', checked)}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <Label htmlFor="isFeatured">Offre en vedette</Label>
//               <p className="text-sm text-gray-500">
//                 L'offre sera mise en avant sur la plateforme
//               </p>
//             </div>
//             <Switch
//               id="isFeatured"
//               checked={formData.isFeatured}
//               onCheckedChange={(checked) => onChange('isFeatured', checked)}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Submit Button */}
//       <div className="flex gap-4">
//         <Button type="button" variant="outline" className="flex-1">
//           Enregistrer comme brouillon
//         </Button>
//         <Button 
//           type="submit" 
//           className="flex-1 bg-blue-600 hover:bg-blue-700"
//           disabled={isSubmitting || !formData.title || !formData.description}
//         >
//           {isSubmitting ? (
//             <>
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//               Publication...
//             </>
//           ) : (
//             <>
//               <Save className="h-4 w-4 mr-2" />
//               Publier l'offre
//             </>
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// }

// new/_components/JobForm.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState, useCallback } from 'react';

interface JobFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function JobForm({ formData, onChange, onSubmit, isSubmitting }: JobFormProps) {
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);

  // Use useCallback to prevent infinite re-renders
  const updateListAndFormData = useCallback((
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    items: string[],
    field: string
  ) => {
    const filteredItems = items.filter(item => item.trim());
    const formattedValue = filteredItems.join('\n');
    onChange(field, formattedValue || '');
  }, [onChange]);

  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, items: string[]) => {
    const newItems = [...items, ''];
    setter(newItems);
  };

  const updateListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    items: string[], 
    index: number, 
    value: string,
    field: string
  ) => {
    const newItems = [...items];
    newItems[index] = value;
    setter(newItems);
    
    // Update form data immediately
    const filteredItems = newItems.filter(item => item.trim());
    const formattedValue = filteredItems.join('\n');
    onChange(field, formattedValue || '');
  };

  const removeListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    items: string[], 
    index: number,
    field: string
  ) => {
    const newItems = items.filter((_, i) => i !== index);
    setter(newItems);
    
    // Update form data immediately
    const filteredItems = newItems.filter(item => item.trim());
    const formattedValue = filteredItems.join('\n');
    onChange(field, formattedValue || '');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de base</CardTitle>
          <CardDescription>
            Les informations principales de votre offre d'emploi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titre du poste *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Ex: Développeur Frontend React"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employmentType">Type de contrat *</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => onChange('employmentType', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI</SelectItem>
                  <SelectItem value="CDD">CDD</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Alternance">Alternance</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                  <SelectItem value="Intérim">Intérim</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experienceLevel">Niveau d'expérience *</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => onChange('experienceLevel', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Étudiant">Étudiant</SelectItem>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="1-3 ans">Junior (1-3 ans)</SelectItem>
                  <SelectItem value="3-5 ans">Confirmé (3-5 ans)</SelectItem>
                  <SelectItem value="5-8 ans">Senior (5-8 ans)</SelectItem>
                  <SelectItem value="8+ ans">Expert (8+ ans)</SelectItem>
                  <SelectItem value="Lead/Manager">Lead/Manager</SelectItem>
                  <SelectItem value="Directeur">Directeur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => onChange('location', e.target.value)}
                placeholder="Ex: Paris, France"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="remotePolicy">Mode de travail *</Label>
              <Select
                value={formData.remotePolicy}
                onValueChange={(value) => onChange('remotePolicy', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sur site">Sur site</SelectItem>
                  <SelectItem value="Hybride">Hybride</SelectItem>
                  <SelectItem value="100% télétravail">100% télétravail</SelectItem>
                  <SelectItem value="Télétravail fréquent">Télétravail fréquent</SelectItem>
                  <SelectItem value="Télétravail occasionnel">Télétravail occasionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salaryMin">Salaire minimum (optionnel)</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin || ''}
                onChange={(e) => onChange('salaryMin', e.target.value ? parseInt(e.target.value) : 0)}
                placeholder="Ex: 40000"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="salaryMax">Salaire maximum (optionnel)</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax || ''}
                onChange={(e) => onChange('salaryMax', e.target.value ? parseInt(e.target.value) : 0)}
                placeholder="Ex: 55000"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="currency">Devise</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => onChange('currency', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CHF">CHF (CHF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description du poste</CardTitle>
          <CardDescription>
            Décrivez le poste, la mission et le contexte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Décrivez le poste, l'équipe, les challenges..."
                rows={5}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsibilities */}
      <Card>
        <CardHeader>
          <CardTitle>Responsabilités</CardTitle>
          <CardDescription>
            Les principales missions et responsabilités du poste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {responsibilities.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(setResponsibilities, responsibilities, index, e.target.value, 'responsibilities')}
                  placeholder="Ex: Développer de nouvelles fonctionnalités frontend"
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeListItem(setResponsibilities, responsibilities, index, 'responsibilities')}
                  disabled={responsibilities.length === 1 || isSubmitting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(setResponsibilities, responsibilities)}
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4" />
              Ajouter une responsabilité
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Exigences et compétences</CardTitle>
          <CardDescription>
            Les compétences et qualifications requises pour ce poste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requirements.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(setRequirements, requirements, index, e.target.value, 'requirements')}
                  placeholder="Ex: 3+ ans d'expérience avec React"
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeListItem(setRequirements, requirements, index, 'requirements')}
                  disabled={requirements.length === 1 || isSubmitting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(setRequirements, requirements)}
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4" />
              Ajouter une exigence
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Avantages</CardTitle>
          <CardDescription>
            Les avantages et perks offerts avec ce poste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateListItem(setBenefits, benefits, index, e.target.value, 'benefits')}
                  placeholder="Ex: Tickets restaurant, mutuelle, télétravail"
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeListItem(setBenefits, benefits, index, 'benefits')}
                  disabled={benefits.length === 1 || isSubmitting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addListItem(setBenefits, benefits)}
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4" />
              Ajouter un avantage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres supplémentaires</CardTitle>
          <CardDescription>
            Configurez les options de publication de votre offre
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="applicationUrl">URL de candidature (optionnel)</Label>
            <Input
              id="applicationUrl"
              type="url"
              value={formData.applicationUrl}
              onChange={(e) => onChange('applicationUrl', e.target.value)}
              placeholder="https://votre-site.com/candidature"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-1">
              Laissez vide pour utiliser notre système de candidature intégré
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isActive">Offre active</Label>
              <p className="text-sm text-gray-500">
                L'offre sera visible par les candidats
              </p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => onChange('isActive', checked)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isFeatured">Offre en vedette</Label>
              <p className="text-sm text-gray-500">
                L'offre sera mise en avant sur la plateforme
              </p>
            </div>
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => onChange('isFeatured', checked)}
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting || !formData.title || !formData.description}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Publication...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Publier l'offre
            </>
          )}
        </Button>
      </div>
    </form>
  );
}