

// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { 
//   RiStoreLine, 
//   RiFlaskLine, 
//   RiSettingsLine, 
//   RiComputerLine, 
//   RiLineChartLine,
//   RiUserHeartLine,
//   RiMegaphoneLine,
//   RiArrowRightLine,
//   RiPlayLine,
//   RiTeamLine,
//   RiEditLine,
//   RiAddLine,
//   RiDeleteBinLine,
//   RiSaveLine,
//   RiCloseLine
// } from '@remixicon/react';
// import Image from 'next/image';
// import { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// // Types
// interface Testimonial {
//   name: string;
//   role: string;
//   image: string;
//   quote?: string;
//   video?: boolean;
// }

// interface Subcategory {
//   title: string;
//   description: string;
//   fullDescription?: string;
//   testimonials?: Testimonial[];
// }

// interface Innovation {
//   title: string;
//   description: string;
//   image: string;
// }

// interface Metier {
//   id: string;
//   title: string;
//   icon: any;
//   color: string;
//   description: string;
//   fullDescription: string;
//   testimonials?: Testimonial[];
//   subcategories?: Subcategory[];
//   innovations?: Innovation[];
//   openPositions: number;
// }

// const defaultMetiers: Metier[] = [
//   {
//     id: 'retail',
//     title: 'RETAIL',
//     icon: RiStoreLine,
//     color: 'bg-purple-100 text-purple-600',
//     description: 'La convergence des mondes online et offline modifie l\'expérience de vente de nos clients du monde entier.',
//     fullDescription: `La réalité augmentée, l'intelligence artificielle et le big data améliorent l'expérience du consommateur tout en mettant l'accent sur la connaissance et le service client.

// Notre objectif principal est d'offrir aux clients une expérience personnalisée, et ce, quel que soit le canal de distribution. Nos équipes veillent à ce que les clients du monde entier vivent une expérience inoubliable à chaque fois qu'ils entrent dans l'une de nos boutiques.`,
//     testimonials: [
//       {
//         name: 'Renaud',
//         role: 'Retail Marketing - L\'Oréal Groupe',
//         image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
//         video: true
//       }
//     ],
//     openPositions: 23
//   },
//   // ... autres métiers
// ];

// const iconOptions = {
//   RiStoreLine: RiStoreLine,
//   RiFlaskLine: RiFlaskLine,
//   RiSettingsLine: RiSettingsLine,
//   RiComputerLine: RiComputerLine,
//   RiLineChartLine: RiLineChartLine,
//   RiUserHeartLine: RiUserHeartLine,
//   RiMegaphoneLine: RiMegaphoneLine
// };

// const colorOptions = [
//   { value: 'bg-purple-100 text-purple-600', label: 'Violet' },
//   { value: 'bg-blue-100 text-blue-600', label: 'Bleu' },
//   { value: 'bg-green-100 text-green-600', label: 'Vert' },
//   { value: 'bg-orange-100 text-orange-600', label: 'Orange' },
//   { value: 'bg-red-100 text-red-600', label: 'Rouge' },
//   { value: 'bg-pink-100 text-pink-600', label: 'Rose' },
//   { value: 'bg-yellow-100 text-yellow-600', label: 'Jaune' },
//   { value: 'bg-gray-100 text-gray-600', label: 'Gris' }
// ];

// export default function MetiersPage() {
//   const [metiers, setMetiers] = useState<Metier[]>(defaultMetiers);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingMetier, setEditingMetier] = useState<Metier | null>(null);
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

//   // CRUD Operations
//   const createMetier = (metierData: Omit<Metier, 'id'>) => {
//     const newMetier: Metier = {
//       ...metierData,
//       id: Math.random().toString(36).substr(2, 9)
//     };
//     setMetiers([...metiers, newMetier]);
//     setIsCreateDialogOpen(false);
//   };

//   const updateMetier = (id: string, updates: Partial<Metier>) => {
//     setMetiers(metiers.map(metier => metier.id === id ? { ...metier, ...updates } : metier));
//     setEditingMetier(null);
//   };

//   const deleteMetier = (id: string) => {
//     setMetiers(metiers.filter(metier => metier.id !== id));
//   };

//   const duplicateMetier = (metier: Metier) => {
//     const newMetier: Metier = {
//       ...metier,
//       id: Math.random().toString(36).substr(2, 9),
//       title: `${metier.title} (copie)`
//     };
//     setMetiers([newMetier, ...metiers]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container max-w-7xl mx-auto px-4 py-12">
//           <div className="flex justify-between items-center mb-6">
//             <div className="text-center max-w-4xl mx-auto">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 Gestion des Métiers
//               </h1>
//               <p className="text-xl text-gray-600">
//                 Gérez la présentation des métiers de votre entreprise. Créez, modifiez et organisez les différentes filières.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Button 
//                 variant={isEditing ? "default" : "outline"}
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="flex items-center gap-2"
//               >
//                 <RiEditLine className="h-4 w-4" />
//                 {isEditing ? 'Terminer édition' : 'Mode édition'}
//               </Button>
//               <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//                 <Button 
//                   className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
//                   onClick={() => setIsCreateDialogOpen(true)}
//                 >
//                   <RiAddLine className="h-4 w-4" />
//                   Nouveau métier
//                 </Button>
//                 <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Créer un nouveau métier</DialogTitle>
//                   </DialogHeader>
//                   <MetierForm 
//                     onSubmit={createMetier} 
//                     onCancel={() => setIsCreateDialogOpen(false)}
//                   />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Métiers Grid */}
//       <div className="container max-w-7xl mx-auto px-4 py-12">
//         <div className="grid gap-8">
//           {metiers.map((metier) => (
//             <EditableMetierSection 
//               key={metier.id} 
//               metier={metier} 
//               isEditing={isEditing}
//               onEdit={setEditingMetier}
//               onUpdate={updateMetier}
//               onDelete={deleteMetier}
//               onDuplicate={duplicateMetier}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Edit Dialog */}
//       <Dialog open={!!editingMetier} onOpenChange={(open) => !open && setEditingMetier(null)}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Modifier le métier</DialogTitle>
//           </DialogHeader>
//           {editingMetier && (
//             <MetierForm 
//               metier={editingMetier}
//               onSubmit={(data) => updateMetier(editingMetier.id, data)}
//               onCancel={() => setEditingMetier(null)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// // Composant de formulaire pour créer/modifier les métiers
// function MetierForm({ 
//   metier, 
//   onSubmit, 
//   onCancel 
// }: { 
//   metier?: Metier;
//   onSubmit: (data: Omit<Metier, 'id'>) => void;
//   onCancel: () => void;
// }) {
//   const [formData, setFormData] = useState<Omit<Metier, 'id'>>(metier || {
//     title: "",
//     icon: RiStoreLine,
//     color: "bg-purple-100 text-purple-600",
//     description: "",
//     fullDescription: "",
//     testimonials: [],
//     subcategories: [],
//     innovations: [],
//     openPositions: 0
//   });

//   const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'image'>>({ 
//     name: "", 
//     role: "", 
//     quote: "" 
//   });
//   const [newSubcategory, setNewSubcategory] = useState<Omit<Subcategory, 'testimonials'>>({ 
//     title: "", 
//     description: "" 
//   });
//   const [newInnovation, setNewInnovation] = useState<Omit<Innovation, 'image'>>({ 
//     title: "", 
//     description: "" 
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const addTestimonial = () => {
//     if (newTestimonial.name && newTestimonial.role) {
//       setFormData({
//         ...formData,
//         testimonials: [...(formData.testimonials || []), {
//           ...newTestimonial,
//           image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
//         }]
//       });
//       setNewTestimonial({ name: "", role: "", quote: "" });
//     }
//   };

//   const removeTestimonial = (index: number) => {
//     setFormData({
//       ...formData,
//       testimonials: formData.testimonials?.filter((_, i) => i !== index) || []
//     });
//   };

//   const addSubcategory = () => {
//     if (newSubcategory.title && newSubcategory.description) {
//       setFormData({
//         ...formData,
//         subcategories: [...(formData.subcategories || []), {
//           ...newSubcategory,
//           testimonials: []
//         }]
//       });
//       setNewSubcategory({ title: "", description: "" });
//     }
//   };

//   const removeSubcategory = (index: number) => {
//     setFormData({
//       ...formData,
//       subcategories: formData.subcategories?.filter((_, i) => i !== index) || []
//     });
//   };

//   const addInnovation = () => {
//     if (newInnovation.title && newInnovation.description) {
//       setFormData({
//         ...formData,
//         innovations: [...(formData.innovations || []), {
//           ...newInnovation,
//           image: "/api/placeholder/300/200"
//         }]
//       });
//       setNewInnovation({ title: "", description: "" });
//     }
//   };

//   const removeInnovation = (index: number) => {
//     setFormData({
//       ...formData,
//       innovations: formData.innovations?.filter((_, i) => i !== index) || []
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-medium">Titre du métier *</label>
//           <Input
//             value={formData.title}
//             onChange={(e) => setFormData({...formData, title: e.target.value})}
//             required
//           />
//         </div>
        
//         <div>
//           <label className="text-sm font-medium">Icône</label>
//           <select
//             value={Object.keys(iconOptions).find(key => iconOptions[key as keyof typeof iconOptions] === formData.icon)}
//             onChange={(e) => setFormData({...formData, icon: iconOptions[e.target.value as keyof typeof iconOptions]})}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           >
//             {Object.keys(iconOptions).map(key => (
//               <option key={key} value={key}>{key}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Couleur</label>
//           <select
//             value={formData.color}
//             onChange={(e) => setFormData({...formData, color: e.target.value})}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           >
//             {colorOptions.map(color => (
//               <option key={color.value} value={color.value}>{color.label}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Postes ouverts</label>
//           <Input
//             type="number"
//             value={formData.openPositions}
//             onChange={(e) => setFormData({...formData, openPositions: parseInt(e.target.value) || 0})}
//           />
//         </div>
//       </div>

//       <div>
//         <label className="text-sm font-medium">Description courte *</label>
//         <Textarea
//           value={formData.description}
//           onChange={(e) => setFormData({...formData, description: e.target.value})}
//           rows={2}
//           required
//         />
//       </div>

//       <div>
//         <label className="text-sm font-medium">Description complète *</label>
//         <Textarea
//           value={formData.fullDescription}
//           onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
//           rows={4}
//           required
//         />
//       </div>

//       {/* Témoignages */}
//       <div>
//         <label className="text-sm font-medium">Témoignages</label>
//         <div className="space-y-3 mb-3">
//           {formData.testimonials?.map((testimonial, index) => (
//             <div key={index} className="flex items-center gap-3 p-3 border rounded">
//               <div className="flex-1">
//                 <div className="flex gap-2">
//                   <Input
//                     value={testimonial.name}
//                     onChange={(e) => {
//                       const newTestimonials = [...(formData.testimonials || [])];
//                       newTestimonials[index].name = e.target.value;
//                       setFormData({...formData, testimonials: newTestimonials});
//                     }}
//                     placeholder="Nom"
//                     className="flex-1"
//                   />
//                   <Input
//                     value={testimonial.role}
//                     onChange={(e) => {
//                       const newTestimonials = [...(formData.testimonials || [])];
//                       newTestimonials[index].role = e.target.value;
//                       setFormData({...formData, testimonials: newTestimonials});
//                     }}
//                     placeholder="Rôle"
//                     className="flex-1"
//                   />
//                 </div>
//                 <Textarea
//                   value={testimonial.quote || ""}
//                   onChange={(e) => {
//                     const newTestimonials = [...(formData.testimonials || [])];
//                     newTestimonials[index].quote = e.target.value;
//                     setFormData({...formData, testimonials: newTestimonials});
//                   }}
//                   placeholder="Citation"
//                   rows={2}
//                   className="mt-2"
//                 />
//               </div>
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeTestimonial(index)}
//               >
//                 <RiDeleteBinLine className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
//           <Input
//             value={newTestimonial.name}
//             onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
//             placeholder="Nom"
//           />
//           <Input
//             value={newTestimonial.role}
//             onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
//             placeholder="Rôle"
//           />
//           <Input
//             value={newTestimonial.quote || ""}
//             onChange={(e) => setNewTestimonial({...newTestimonial, quote: e.target.value})}
//             placeholder="Citation"
//           />
//         </div>
//         <Button type="button" onClick={addTestimonial} variant="outline" className="w-full">
//           <RiAddLine className="h-4 w-4 mr-2" />
//           Ajouter un témoignage
//         </Button>
//       </div>

//       {/* Sous-catégories */}
//       <div>
//         <label className="text-sm font-medium">Sous-catégories</label>
//         <div className="space-y-4 mb-3">
//           {formData.subcategories?.map((subcategory, index) => (
//             <div key={index} className="p-4 border rounded space-y-3">
//               <div className="flex gap-2">
//                 <Input
//                   value={subcategory.title}
//                   onChange={(e) => {
//                     const newSubcategories = [...(formData.subcategories || [])];
//                     newSubcategories[index].title = e.target.value;
//                     setFormData({...formData, subcategories: newSubcategories});
//                   }}
//                   placeholder="Titre de la sous-catégorie"
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => removeSubcategory(index)}
//                 >
//                   <RiDeleteBinLine className="h-4 w-4" />
//                 </Button>
//               </div>
//               <Textarea
//                 value={subcategory.description}
//                 onChange={(e) => {
//                   const newSubcategories = [...(formData.subcategories || [])];
//                   newSubcategories[index].description = e.target.value;
//                   setFormData({...formData, subcategories: newSubcategories});
//                 }}
//                 placeholder="Description"
//                 rows={2}
//               />
//             </div>
//           ))}
//         </div>
        
//         <div className="space-y-2 mb-3">
//           <Input
//             value={newSubcategory.title}
//             onChange={(e) => setNewSubcategory({...newSubcategory, title: e.target.value})}
//             placeholder="Titre de la sous-catégorie"
//           />
//           <Textarea
//             value={newSubcategory.description}
//             onChange={(e) => setNewSubcategory({...newSubcategory, description: e.target.value})}
//             placeholder="Description"
//             rows={2}
//           />
//         </div>
//         <Button type="button" onClick={addSubcategory} variant="outline" className="w-full">
//           <RiAddLine className="h-4 w-4 mr-2" />
//           Ajouter une sous-catégorie
//         </Button>
//       </div>

//       {/* Innovations */}
//       <div>
//         <label className="text-sm font-medium">Innovations</label>
//         <div className="space-y-3 mb-3">
//           {formData.innovations?.map((innovation, index) => (
//             <div key={index} className="flex items-center gap-3 p-3 border rounded">
//               <div className="flex-1 space-y-2">
//                 <Input
//                   value={innovation.title}
//                   onChange={(e) => {
//                     const newInnovations = [...(formData.innovations || [])];
//                     newInnovations[index].title = e.target.value;
//                     setFormData({...formData, innovations: newInnovations});
//                   }}
//                   placeholder="Titre de l'innovation"
//                 />
//                 <Textarea
//                   value={innovation.description}
//                   onChange={(e) => {
//                     const newInnovations = [...(formData.innovations || [])];
//                     newInnovations[index].description = e.target.value;
//                     setFormData({...formData, innovations: newInnovations});
//                   }}
//                   placeholder="Description"
//                   rows={2}
//                 />
//               </div>
//               <Button
//                 type="button"
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => removeInnovation(index)}
//               >
//                 <RiDeleteBinLine className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}
//         </div>
        
//         <div className="space-y-2 mb-3">
//           <Input
//             value={newInnovation.title}
//             onChange={(e) => setNewInnovation({...newInnovation, title: e.target.value})}
//             placeholder="Titre de l'innovation"
//           />
//           <Textarea
//             value={newInnovation.description}
//             onChange={(e) => setNewInnovation({...newInnovation, description: e.target.value})}
//             placeholder="Description"
//             rows={2}
//           />
//         </div>
//         <Button type="button" onClick={addInnovation} variant="outline" className="w-full">
//           <RiAddLine className="h-4 w-4 mr-2" />
//           Ajouter une innovation
//         </Button>
//       </div>

//       <div className="flex justify-end gap-3 pt-4 border-t">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Annuler
//         </Button>
//         <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
//           <RiSaveLine className="h-4 w-4" />
//           {metier ? 'Modifier' : 'Créer'} le métier
//         </Button>
//       </div>
//     </form>
//   );
// }

// // Composant de section de métier éditable
// function EditableMetierSection({ 
//   metier, 
//   isEditing, 
//   onEdit, 
//   onUpdate, 
//   onDelete, 
//   onDuplicate 
// }: { 
//   metier: Metier;
//   isEditing: boolean;
//   onEdit: (metier: Metier) => void;
//   onUpdate: (id: string, updates: Partial<Metier>) => void;
//   onDelete: (id: string) => void;
//   onDuplicate: (metier: Metier) => void;
// }) {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const IconComponent = metier.icon;

//   return (
//     <Card className="hover:shadow-lg transition-shadow">
//       <CardContent className="p-0">
//         {/* Header */}
//         <div className="p-8">
//           <div className="flex items-start justify-between">
//             <div className="flex items-start gap-6 flex-1">
//               <div className={`p-3 rounded-lg ${metier.color} flex-shrink-0`}>
//                 <IconComponent className="h-8 w-8" />
//               </div>
              
//               <div className="flex-1">
//                 {isEditing ? (
//                   <Input
//                     value={metier.title}
//                     onChange={(e) => onUpdate(metier.id, { title: e.target.value })}
//                     className="text-2xl font-bold mb-2"
//                   />
//                 ) : (
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                     {metier.title}
//                   </h2>
//                 )}
                
//                 {isEditing ? (
//                   <Textarea
//                     value={metier.description}
//                     onChange={(e) => onUpdate(metier.id, { description: e.target.value })}
//                     rows={2}
//                     className="mb-4"
//                   />
//                 ) : (
//                   <p className="text-gray-600 text-lg mb-4">
//                     {metier.description}
//                   </p>
//                 )}
                
//                 {isEditing ? (
//                   <div className="flex items-center gap-2">
//                     <Input
//                       type="number"
//                       value={metier.openPositions}
//                       onChange={(e) => onUpdate(metier.id, { openPositions: parseInt(e.target.value) || 0 })}
//                       className="w-20"
//                     />
//                     <span className="text-gray-600">postes ouverts</span>
//                   </div>
//                 ) : (
//                   <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                     {metier.openPositions} postes ouverts
//                   </Badge>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               {isEditing && (
//                 <>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onEdit(metier)}
//                     className="text-blue-600"
//                     title="Modifier en détail"
//                   >
//                     <RiEditLine className="h-5 w-5" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onDuplicate(metier)}
//                     className="text-green-600"
//                     title="Dupliquer"
//                   >
//                     <RiAddLine className="h-5 w-5" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => onDelete(metier.id)}
//                     className="text-red-600"
//                     title="Supprimer"
//                   >
//                     <RiDeleteBinLine className="h-5 w-5" />
//                   </Button>
//                 </>
//               )}
//               <Button 
//                 variant="ghost" 
//                 size="icon"
//                 onClick={() => setIsExpanded(!isExpanded)}
//               >
//                 <RiArrowRightLine className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="px-8 pb-8 border-t">
//             <div className="pt-6">
//               {/* Main Description */}
//               <div className="mb-8">
//                 {isEditing ? (
//                   <Textarea
//                     value={metier.fullDescription}
//                     onChange={(e) => onUpdate(metier.id, { fullDescription: e.target.value })}
//                     rows={6}
//                     className="w-full"
//                   />
//                 ) : (
//                   <div className="prose prose-lg max-w-none">
//                     {metier.fullDescription.split('\n').map((paragraph, index) => (
//                       <p key={index} className="text-gray-700 mb-4">
//                         {paragraph}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Le reste du contenu reste similaire mais avec des contrôles d'édition */}
//               {/* ... */}

//               {/* CTA */}
//               <div className="flex justify-between items-center pt-6 border-t">
//                 <div>
//                   <h4 className="font-semibold mb-2">Intéressé par ce métier ?</h4>
//                   <p className="text-gray-600">Postulez à nos offres en {metier.title.split(' ')[0]}</p>
//                 </div>
//                 <Button className="bg-blue-600 hover:bg-blue-700">
//                   Voir les offres
//                   <RiArrowRightLine className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }



















'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  RiStoreLine, 
  RiFlaskLine, 
  RiSettingsLine, 
  RiComputerLine, 
  RiLineChartLine,
  RiUserHeartLine,
  RiMegaphoneLine,
  RiArrowRightLine,
  RiPlayLine,
  RiTeamLine,
  RiEditLine,
  RiAddLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiCloseLine
} from '@remixicon/react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useParams } from "next/navigation";
import { useCompanyBySlug } from "@/hooks/useCompanyBySlug";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote?: string;
  video?: boolean;
}

interface Subcategory {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  testimonials?: Testimonial[];
}

interface Innovation {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Metier {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  fullDescription: string;
  testimonials?: Testimonial[];
  subcategories?: Subcategory[];
  innovations?: Innovation[];
  openPositions: number;
  companyId: string;
  order: number;
}

// Helper function to parse metiers from JSON
function parseMetiers(data: any): Metier[] {
  if (!data) return [];
  
  try {
    if (Array.isArray(data)) {
      return data;
    }
    
    if (typeof data === 'string') {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error parsing metiers:', error);
    return [];
  }
}

const iconOptions = {
  RiStoreLine: RiStoreLine,
  RiFlaskLine: RiFlaskLine,
  RiSettingsLine: RiSettingsLine,
  RiComputerLine: RiComputerLine,
  RiLineChartLine: RiLineChartLine,
  RiUserHeartLine: RiUserHeartLine,
  RiMegaphoneLine: RiMegaphoneLine
};

const colorOptions = [
  { value: 'bg-purple-100 text-purple-600', label: 'Violet' },
  { value: 'bg-blue-100 text-blue-600', label: 'Bleu' },
  { value: 'bg-green-100 text-green-600', label: 'Vert' },
  { value: 'bg-orange-100 text-orange-600', label: 'Orange' },
  { value: 'bg-red-100 text-red-600', label: 'Rouge' },
  { value: 'bg-pink-100 text-pink-600', label: 'Rose' },
  { value: 'bg-yellow-100 text-yellow-600', label: 'Jaune' },
  { value: 'bg-gray-100 text-gray-600', label: 'Gris' }
];

export default function MetiersPage() {
  const [metiers, setMetiers] = useState<Metier[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMetier, setEditingMetier] = useState<Metier | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const params = useParams();
  const slug = params.slug as string;
  const trpc = useTRPC();
  
  // Get company data
  const { data: companyResponse, isLoading, refetch } = useCompanyBySlug(slug);
  const companyData = companyResponse?.company;

  // Get metiers from company data
  useEffect(() => {
    if (companyData?.metiers) {
      const parsedMetiers = parseMetiers(companyData.metiers);
      setMetiers(parsedMetiers);
    }
  }, [companyData]);

  // Update company mutation
  const updateCompanyMutation = useMutation({
    ...trpc.company.updateCompany.mutationOptions(),
    onSuccess: () => {
      toast.success('Métiers enregistrés avec succès!');
      refetch();
    },
    onError: (error) => {
      toast.error('Erreur lors de la sauvegarde');
      console.error('Failed to update company metiers:', error);
    },
  });

  // Save all metiers to database
  const saveMetiersToDatabase = async (updatedMetiers: Metier[]) => {
    if (!companyData) return;

    try {
      await updateCompanyMutation.mutateAsync({
        companyId: companyData.id,
        data: {
          metiers: updatedMetiers
        }
      });
    } catch (error) {
      console.error('Failed to save metiers:', error);
      throw error;
    }
  };

  // CRUD Operations
  const createMetier = async (metierData: Omit<Metier, 'id' | 'companyId'>) => {
    if (!companyData) return;

    const newMetier: Metier = {
      ...metierData,
      id: Math.random().toString(36).substr(2, 9),
      companyId: companyData.id
    };

    const updatedMetiers = [...metiers, newMetier];
    setMetiers(updatedMetiers);
    
    try {
      await saveMetiersToDatabase(updatedMetiers);
      setIsCreateDialogOpen(false);
    } catch (error) {
      // Revert local state if save fails
      setMetiers(metiers);
    }
  };

  const updateMetier = async (id: string, updates: Partial<Metier>) => {
    if (!companyData) return;

    const updatedMetiers = metiers.map(metier => 
      metier.id === id ? { ...metier, ...updates } : metier
    );

    setMetiers(updatedMetiers);
    
    try {
      await saveMetiersToDatabase(updatedMetiers);
      setEditingMetier(null);
    } catch (error) {
      // Revert local state if save fails
      setMetiers(metiers);
    }
  };

  const deleteMetier = async (id: string) => {
    if (!companyData) return;

    const updatedMetiers = metiers.filter(metier => metier.id !== id);
    setMetiers(updatedMetiers);
    
    try {
      await saveMetiersToDatabase(updatedMetiers);
    } catch (error) {
      // Revert local state if save fails
      setMetiers(metiers);
    }
  };

  const duplicateMetier = async (metier: Metier) => {
    if (!companyData) return;

    const newMetier: Metier = {
      ...metier,
      id: Math.random().toString(36).substr(2, 9),
      title: `${metier.title} (copie)`,
      companyId: companyData.id
    };

    const updatedMetiers = [newMetier, ...metiers];
    setMetiers(updatedMetiers);
    
    try {
      await saveMetiersToDatabase(updatedMetiers);
    } catch (error) {
      // Revert local state if save fails
      setMetiers(metiers);
    }
  };

  // Save button handler
  const handleSaveAll = async () => {
    try {
      await saveMetiersToDatabase(metiers);
      setIsEditing(false);
      toast.success('Tous les métiers ont été enregistrés!');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleCancel = () => {
    // Reset to original metiers from database
    if (companyData?.metiers) {
      const parsedMetiers = parseMetiers(companyData.metiers);
      setMetiers(parsedMetiers);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Gestion des Métiers
              </h1>
              <p className="text-xl text-gray-600">
                Gérez la présentation des métiers de votre entreprise. Créez, modifiez et organisez les différentes filières.
              </p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={handleCancel}
                    disabled={updateCompanyMutation.isPending}
                  >
                    Annuler
                  </Button>
                  <Button 
                    variant="default"
                    onClick={handleSaveAll}
                    disabled={updateCompanyMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    <RiSaveLine className="h-4 w-4" />
                    {updateCompanyMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder tout'}
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <RiEditLine className="h-4 w-4" />
                  Mode édition
                </Button>
              )}
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => setIsCreateDialogOpen(true)}
                  disabled={updateCompanyMutation.isPending}
                >
                  <RiAddLine className="h-4 w-4" />
                  Nouveau métier
                </Button>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau métier</DialogTitle>
                  </DialogHeader>
                  <MetierForm 
                    onSubmit={createMetier} 
                    onCancel={() => setIsCreateDialogOpen(false)}
                    isSubmitting={updateCompanyMutation.isPending}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Métiers Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {metiers.length === 0 && !isEditing ? (
          <Card className="text-center py-12">
            <CardContent>
              <RiTeamLine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun métier configuré
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre premier métier pour présenter les différentes filières de votre entreprise.
              </p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={updateCompanyMutation.isPending}
              >
                <RiAddLine className="h-4 w-4 mr-2" />
                Créer un métier
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            {metiers.map((metier) => (
              <EditableMetierSection 
                key={metier.id} 
                metier={metier} 
                isEditing={isEditing}
                onEdit={setEditingMetier}
                onUpdate={updateMetier}
                onDelete={deleteMetier}
                onDuplicate={duplicateMetier}
                isSubmitting={updateCompanyMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMetier} onOpenChange={(open) => !open && setEditingMetier(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le métier</DialogTitle>
          </DialogHeader>
          {editingMetier && (
            <MetierForm 
              metier={editingMetier}
              onSubmit={(data) => updateMetier(editingMetier.id, data)}
              onCancel={() => setEditingMetier(null)}
              isSubmitting={updateCompanyMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// MetierForm component (keep your existing form component)
function MetierForm({ 
  metier, 
  onSubmit, 
  onCancel,
  isSubmitting = false
}: { 
  metier?: Metier;
  onSubmit: (data: Omit<Metier, 'id' | 'companyId'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}) {
  const [formData, setFormData] = useState<Omit<Metier, 'id' | 'companyId'>>(metier || {
    title: "",
    icon: "RiStoreLine",
    color: "bg-purple-100 text-purple-600",
    description: "",
    fullDescription: "",
    testimonials: [],
    subcategories: [],
    innovations: [],
    openPositions: 0,
    order: 0
  });
 const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id' | 'image'>>({ 
    name: "", 
    role: "", 
    quote: "" 
  });
  const [newSubcategory, setNewSubcategory] = useState<Omit<Subcategory, 'id' | 'testimonials'>>({ 
    title: "", 
    description: "" 
  });
  const [newInnovation, setNewInnovation] = useState<Omit<Innovation, 'id' | 'image'>>({ 
    title: "", 
    description: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.role) {
      setFormData({
        ...formData,
        testimonials: [...(formData.testimonials || []), {
          ...newTestimonial,
          id: Math.random().toString(36).substr(2, 9),
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }]
      });
      setNewTestimonial({ name: "", role: "", quote: "" });
    }
  };

  const removeTestimonial = (index: number) => {
    setFormData({
      ...formData,
      testimonials: formData.testimonials?.filter((_, i) => i !== index) || []
    });
  };

  const addSubcategory = () => {
    if (newSubcategory.title && newSubcategory.description) {
      setFormData({
        ...formData,
        subcategories: [...(formData.subcategories || []), {
          ...newSubcategory,
          id: Math.random().toString(36).substr(2, 9),
          testimonials: []
        }]
      });
      setNewSubcategory({ title: "", description: "" });
    }
  };

  const removeSubcategory = (index: number) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories?.filter((_, i) => i !== index) || []
    });
  };

  const addInnovation = () => {
    if (newInnovation.title && newInnovation.description) {
      setFormData({
        ...formData,
        innovations: [...(formData.innovations || []), {
          ...newInnovation,
          id: Math.random().toString(36).substr(2, 9),
          image: "/api/placeholder/300/200"
        }]
      });
      setNewInnovation({ title: "", description: "" });
    }
  };

  const removeInnovation = (index: number) => {
    setFormData({
      ...formData,
      innovations: formData.innovations?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Keep all your existing form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Titre du métier *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Icône</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData({...formData, icon: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={isSubmitting}
          >
            {Object.keys(iconOptions).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Couleur</label>
          <select
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={isSubmitting}
          >
            {colorOptions.map(color => (
              <option key={color.value} value={color.value}>{color.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Postes ouverts</label>
          <Input
            type="number"
            value={formData.openPositions}
            onChange={(e) => setFormData({...formData, openPositions: parseInt(e.target.value) || 0})}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description courte *</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={2}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description complète *</label>
        <Textarea
          value={formData.fullDescription}
          onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
          rows={4}
          required
          disabled={isSubmitting}
        />
      </div>
<div>
        <label className="text-sm font-medium">Témoignages</label>
        <div className="space-y-3 mb-3">
          {formData.testimonials?.map((testimonial, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded">
              <div className="flex-1">
                <div className="flex gap-2">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => {
                      const newTestimonials = [...(formData.testimonials || [])];
                      newTestimonials[index].name = e.target.value;
                      setFormData({...formData, testimonials: newTestimonials});
                    }}
                    placeholder="Nom"
                    className="flex-1"
                  />
                  <Input
                    value={testimonial.role}
                    onChange={(e) => {
                      const newTestimonials = [...(formData.testimonials || [])];
                      newTestimonials[index].role = e.target.value;
                      setFormData({...formData, testimonials: newTestimonials});
                    }}
                    placeholder="Rôle"
                    className="flex-1"
                  />
                </div>
                <Textarea
                  value={testimonial.quote || ""}
                  onChange={(e) => {
                    const newTestimonials = [...(formData.testimonials || [])];
                    newTestimonials[index].quote = e.target.value;
                    setFormData({...formData, testimonials: newTestimonials});
                  }}
                  placeholder="Citation"
                  rows={2}
                  className="mt-2"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeTestimonial(index)}
              >
                <RiDeleteBinLine className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          <Input
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
            placeholder="Nom"
          />
          <Input
            value={newTestimonial.role}
            onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
            placeholder="Rôle"
          />
          <Input
            value={newTestimonial.quote || ""}
            onChange={(e) => setNewTestimonial({...newTestimonial, quote: e.target.value})}
            placeholder="Citation"
          />
        </div>
        <Button type="button" onClick={addTestimonial} variant="outline" className="w-full">
          <RiAddLine className="h-4 w-4 mr-2" />
          Ajouter un témoignage
        </Button>
      </div>

      {/* Sous-catégories */}
      <div>
        <label className="text-sm font-medium">Sous-catégories</label>
        <div className="space-y-4 mb-3">
          {formData.subcategories?.map((subcategory, index) => (
            <div key={index} className="p-4 border rounded space-y-3">
              <div className="flex gap-2">
                <Input
                  value={subcategory.title}
                  onChange={(e) => {
                    const newSubcategories = [...(formData.subcategories || [])];
                    newSubcategories[index].title = e.target.value;
                    setFormData({...formData, subcategories: newSubcategories});
                  }}
                  placeholder="Titre de la sous-catégorie"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSubcategory(index)}
                >
                  <RiDeleteBinLine className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={subcategory.description}
                onChange={(e) => {
                  const newSubcategories = [...(formData.subcategories || [])];
                  newSubcategories[index].description = e.target.value;
                  setFormData({...formData, subcategories: newSubcategories});
                }}
                placeholder="Description"
                rows={2}
              />
            </div>
          ))}
        </div>
        
        <div className="space-y-2 mb-3">
          <Input
            value={newSubcategory.title}
            onChange={(e) => setNewSubcategory({...newSubcategory, title: e.target.value})}
            placeholder="Titre de la sous-catégorie"
          />
          <Textarea
            value={newSubcategory.description}
            onChange={(e) => setNewSubcategory({...newSubcategory, description: e.target.value})}
            placeholder="Description"
            rows={2}
          />
        </div>
        <Button type="button" onClick={addSubcategory} variant="outline" className="w-full">
          <RiAddLine className="h-4 w-4 mr-2" />
          Ajouter une sous-catégorie
        </Button>
      </div>

      {/* Innovations */}
      <div>
        <label className="text-sm font-medium">Innovations</label>
        <div className="space-y-3 mb-3">
          {formData.innovations?.map((innovation, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded">
              <div className="flex-1 space-y-2">
                <Input
                  value={innovation.title}
                  onChange={(e) => {
                    const newInnovations = [...(formData.innovations || [])];
                    newInnovations[index].title = e.target.value;
                    setFormData({...formData, innovations: newInnovations});
                  }}
                  placeholder="Titre de l'innovation"
                />
                <Textarea
                  value={innovation.description}
                  onChange={(e) => {
                    const newInnovations = [...(formData.innovations || [])];
                    newInnovations[index].description = e.target.value;
                    setFormData({...formData, innovations: newInnovations});
                  }}
                  placeholder="Description"
                  rows={2}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeInnovation(index)}
              >
                <RiDeleteBinLine className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="space-y-2 mb-3">
          <Input
            value={newInnovation.title}
            onChange={(e) => setNewInnovation({...newInnovation, title: e.target.value})}
            placeholder="Titre de l'innovation"
          />
          <Textarea
            value={newInnovation.description}
            onChange={(e) => setNewInnovation({...newInnovation, description: e.target.value})}
            placeholder="Description"
            rows={2}
          />
        </div>
        <Button type="button" onClick={addInnovation} variant="outline" className="w-full">
          <RiAddLine className="h-4 w-4 mr-2" />
          Ajouter une innovation
        </Button>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          disabled={isSubmitting}
        >
          <RiSaveLine className="h-4 w-4" />
          {isSubmitting ? 'Sauvegarde...' : (metier ? 'Modifier' : 'Créer')} le métier
        </Button>
      </div>
    </form>
  );
}

// EditableMetierSection component (keep your existing component)
function EditableMetierSection({ 
  metier, 
  isEditing, 
  onEdit, 
  onUpdate, 
  onDelete, 
  onDuplicate,
  isSubmitting = false
}: { 
  metier: Metier;
  isEditing: boolean;
  onEdit: (metier: Metier) => void;
  onUpdate: (id: string, updates: Partial<Metier>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (metier: Metier) => void;
  isSubmitting?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = iconOptions[metier.icon as keyof typeof iconOptions] || RiStoreLine;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6 flex-1">
              <div className={`p-3 rounded-lg ${metier.color} flex-shrink-0`}>
                <IconComponent className="h-8 w-8" />
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={metier.title}
                    onChange={(e) => onUpdate(metier.id, { title: e.target.value })}
                    className="text-2xl font-bold mb-2"
                    disabled={isSubmitting}
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {metier.title}
                  </h2>
                )}
                
                {/* ... rest of your component */}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isEditing && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(metier)}
                    className="text-blue-600"
                    title="Modifier en détail"
                    disabled={isSubmitting}
                  >
                    <RiEditLine className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDuplicate(metier)}
                    className="text-green-600"
                    title="Dupliquer"
                    disabled={isSubmitting}
                  >
                    <RiAddLine className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(metier.id)}
                    className="text-red-600"
                    title="Supprimer"
                    disabled={isSubmitting}
                  >
                    <RiDeleteBinLine className="h-5 w-5" />
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                disabled={isSubmitting}
              >
                <RiArrowRightLine className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* ... rest of your expanded content */}
        {isExpanded && (
          <div className="px-8 pb-8 border-t">
            <div className="pt-6">
              <div className="mb-8">
                {isEditing ? (
                  <Textarea
                    value={metier.fullDescription}
                    onChange={(e) => onUpdate(metier.id, { fullDescription: e.target.value })}
                    rows={6}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                ) : (
                  <div className="prose prose-lg max-w-none">
                    {metier.fullDescription.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <div>
                  <h4 className="font-semibold mb-2">Intéressé par ce métier ?</h4>
                  <p className="text-gray-600">Postulez à nos offres en {metier.title.split(' ')[0]}</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  Voir les offres
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}