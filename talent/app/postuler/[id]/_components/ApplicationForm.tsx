// // src/app/companies/l-oreal/jobs/[slug]/postuler/components/ApplicationForm.tsx
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import PersonalInfoForm from './PersonalInfoForm';
// import FileUpload from './FileUpload';

// interface ApplicationFormProps {
//   onSubmit: () => void;
// }

// export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     linkedin: '',
//     portfolio: '',
//     message: '',
//     resume: null as File | null,
//     coverLetter: null as File | null,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (name: string, file: File | null) => {
//     setFormData(prev => ({ ...prev, [name]: file }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Validate form data
//     if (!formData.resume) {
//       alert('Veuillez télécharger votre CV');
//       return;
//     }
    
//     // Submit application (in a real app, this would call an API)
//     console.log('Application data:', formData);
//     onSubmit();
//   };

//   const nextStep = () => {
//     if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
//       alert('Veuillez remplir tous les champs obligatoires');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const prevStep = () => {
//     setCurrentStep(1);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {currentStep === 1 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Informations personnelles</CardTitle>
//             <CardDescription>
//               Renseignez vos coordonnées pour que L'Oréal puisse vous contacter.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <PersonalInfoForm 
//               formData={formData} 
//               onChange={handleInputChange} 
//             />
//             <div className="flex justify-end mt-6">
//               <Button type="button" onClick={nextStep}>
//                 Suivant
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {currentStep === 2 && (
//         <>
//           <Card>
//             <CardHeader>
//               <CardTitle>Documents de candidature</CardTitle>
//               <CardDescription>
//                 Téléchargez votre CV et votre lettre de motivation (optionnel mais recommandé).
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <FileUpload 
//                 formData={formData} 
//                 onFileChange={handleFileChange} 
//               />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Message complémentaire</CardTitle>
//               <CardDescription>
//                 Ajoutez un message pour compléter votre candidature (optionnel).
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Pourquoi souhaitez-vous rejoindre L'Oréal ? Qu'est-ce qui vous motive pour ce poste ?"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex justify-between">
//             <Button type="button" variant="outline" onClick={prevStep}>
//               Retour
//             </Button>
//             <Button type="submit">
//               Envoyer ma candidature
//             </Button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// }



// // src/app/postuler/[id]/_components/ApplicationForm.tsx
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import PersonalInfoForm from './PersonalInfoForm';
// import FileUpload from './FileUpload';

// interface ApplicationFormProps {
//   jobId: string;
//   onSubmit: (applicationData: any) => Promise<void>;
// }

// export default function ApplicationForm({ jobId, onSubmit }: ApplicationFormProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     linkedin: '',
//     portfolio: '',
//     message: '',
//     resume: null as File | null,
//     coverLetter: null as File | null,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (name: string, file: File | null) => {
//     setFormData(prev => ({ ...prev, [name]: file }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate form data
//     if (!formData.resume) {
//       alert('Veuillez télécharger votre CV');
//       return;
//     }

//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('Veuillez remplir tous les champs obligatoires');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Convert files to base64
//       const resumeBase64 = await fileToBase64(formData.resume);
//       let coverLetterBase64 = undefined;

//       if (formData.coverLetter) {
//         coverLetterBase64 = await fileToBase64(formData.coverLetter);
//       }

//       const applicationData = {
//         jobId,
//         personalInfo: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           linkedin: formData.linkedin,
//           portfolio: formData.portfolio,
//           message: formData.message,
//         },
//         resumeFile: {
//           name: formData.resume.name,
//           type: formData.resume.type,
//           data: resumeBase64,
//         },
//         ...(coverLetterBase64 && formData.coverLetter ? {
//           coverLetterFile: {
//             name: formData.coverLetter.name,
//             type: formData.coverLetter.type,
//             data: coverLetterBase64,
//           }
//         } : {})
//       };

//       await onSubmit(applicationData);

//     } catch (error) {
//       console.error('Error processing application:', error);
//       alert('Erreur lors du traitement des fichiers. Veuillez réessayer.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = error => reject(error);
//     });
//   };

//   const nextStep = () => {
//     if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
//       alert('Veuillez remplir tous les champs obligatoires');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const prevStep = () => {
//     setCurrentStep(1);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {currentStep === 1 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Informations personnelles</CardTitle>
//             <CardDescription>
//               Renseignez vos coordonnées pour que l'entreprise puisse vous contacter.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <PersonalInfoForm 
//               formData={formData} 
//               onChange={handleInputChange} 
//             />
//             <div className="flex justify-end mt-6">
//               <Button type="button" onClick={nextStep}>
//                 Suivant
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {currentStep === 2 && (
//         <>
//           <Card>
//             <CardHeader>
//               <CardTitle>Documents de candidature</CardTitle>
//               <CardDescription>
//                 Téléchargez votre CV et votre lettre de motivation (optionnel mais recommandé).
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <FileUpload 
//                 formData={formData} 
//                 onFileChange={handleFileChange} 
//               />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Message complémentaire</CardTitle>
//               <CardDescription>
//                 Ajoutez un message pour compléter votre candidature (optionnel).
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Pourquoi souhaitez-vous rejoindre cette entreprise ? Qu'est-ce qui vous motive pour ce poste ?"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex justify-between">
//             <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
//               Retour
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
//             </Button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// }


// src/app/postuler/[id]/_components/ApplicationForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoForm from './PersonalInfoForm';
import FileUpload from './FileUpload';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ApplicationFormProps {
  jobId: string;
  onSubmit: (applicationData: any) => Promise<void>;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  message: string;
  resume: File | null;
  coverLetter: File | null;
}

export default function ApplicationForm({ jobId, onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { uploadFile, isUploading, progress, error: uploadError } = useFileUpload();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    message: '',
    resume: null,
    coverLetter: null,
  });

  const [uploadErrors, setUploadErrors] = useState<{resume?: string; coverLetter?: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (uploadErrors[name as keyof typeof uploadErrors]) {
      setUploadErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setSubmitError(null);
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
    // Clear errors when new file is selected
    if (uploadErrors[name as keyof typeof uploadErrors]) {
      setUploadErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setSubmitError(null);
  };

  const validateStep1 = (): boolean => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push('Le prénom est requis');
    if (!formData.lastName.trim()) errors.push('Le nom est requis');
    if (!formData.email.trim()) errors.push('L\'email est requis');
    
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!formData.resume) {
      setUploadErrors(prev => ({ ...prev, resume: 'Veuillez télécharger votre CV' }));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    
    // Validate all steps
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🚀 Starting application submission process...");
      
      // Upload resume
      console.log("📤 Uploading resume...");
      const resumeUploadResult = await uploadFile(formData.resume!);
      console.log("✅ Resume uploaded:", resumeUploadResult.url);
      
      // Upload cover letter if provided
      let coverLetterUploadResult = null;
      if (formData.coverLetter) {
        console.log("📤 Uploading cover letter...");
        coverLetterUploadResult = await uploadFile(formData.coverLetter);
        console.log("✅ Cover letter uploaded:", coverLetterUploadResult.url);
      }

      // Prepare application data
      const applicationData = {
        jobId,
        personalInfo: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone?.trim(),
          linkedin: formData.linkedin?.trim(),
          portfolio: formData.portfolio?.trim(),
          message: formData.message?.trim(),
        },
        resumeUrl: resumeUploadResult.url,
        coverLetterUrl: coverLetterUploadResult?.url,
      };

      console.log("📝 Submitting application data...");
      
      // Submit application
      await onSubmit(applicationData);
      console.log("🎉 Application submitted successfully!");
      
      setSubmitSuccess(true);

    } catch (error) {
      console.error('❌ Error in application process:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
    setSubmitError(null);
  };

  const isSubmitDisabled = isSubmitting || isUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {submitSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Candidature soumise avec succès!
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Erreur de téléchargement: {uploadError}</AlertDescription>
        </Alert>
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Renseignez vos coordonnées pour que l'entreprise puisse vous contacter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalInfoForm 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <div className="flex justify-end mt-6">
              <Button type="button" onClick={nextStep}>
                Suivant
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Documents de candidature</CardTitle>
              <CardDescription>
                Téléchargez votre CV et votre lettre de motivation (optionnel mais recommandé).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                formData={formData} 
                onFileChange={handleFileChange} 
                isUploading={isUploading}
                progress={progress}
                errors={uploadErrors}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message complémentaire</CardTitle>
              <CardDescription>
                Ajoutez un message pour compléter votre candidature (optionnel).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Pourquoi souhaitez-vous rejoindre cette entreprise ? Qu'est-ce qui vous motive pour ce poste ?"
                    maxLength={2000}
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.message.length}/2000 caractères
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitDisabled}>
              Retour
            </Button>
            
            <div className="flex items-center gap-4">
              {isUploading && (
                <div className="text-sm text-gray-600">
                  Téléchargement... {progress}%
                </div>
              )}
              <Button type="submit" disabled={isSubmitDisabled} className="min-w-32">
                {isSubmitDisabled ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Envoi...
                  </div>
                ) : (
                  'Envoyer ma candidature'
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}