// src/app/register/company/components/RegistrationForm.tsx
// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import CompanyInfoForm from './CompanyInfoForm';
// import AccountInfoForm from './AccountInfoForm';
// import PlanSelection from './PlanSelection';
// import { useMutation } from '@tanstack/react-query';
// import { useTRPC } from '@/trpc/client';

// interface RegistrationFormProps {
//   onComplete: () => void;
// }

// export default function RegistrationForm({ onComplete }: RegistrationFormProps) {

//   const trpc = useTRPC()

//   const [currentStep, setCurrentStep] = useState(1);

//   const registerCompany =useMutation(trpc.companyRegistration.registerCompany.mutationOptions());
//   const checkAvailability = useMutation( trpc.companyRegistration.checkCompanyAvailability.mutationOptions());



//   const [formData, setFormData] = useState({
//     // Company Information
//     companyName: '',
//     companySize: '',
//     industry: '',
//     website: '',
//     phone: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: 'France',

//     // Account Information
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     jobTitle: '',
//     department: '',

//     // Plan Selection
//     plan: 'starter',

//     // Terms
//     agreeTerms: false,
//     agreePrivacy: false,
//     receiveNewsletter: true,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

//     setFormData(prev => ({ 
//       ...prev, 
//       [name]: type === 'checkbox' ? checked : value 
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form data
//     if (currentStep === 1 && (!formData.companyName || !formData.industry || !formData.companySize)) {
//       alert('Veuillez remplir tous les champs obligatoires');
//       return;
//     }

//     if (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.password)) {
//       alert('Veuillez remplir tous les champs obligatoires');
//       return;
//     }

//     if (currentStep === 2 && formData.password !== formData.confirmPassword) {
//       alert('Les mots de passe ne correspondent pas');
//       return;
//     }

//     // if (currentStep === 3 && !formData.agreeTerms) {
//     //   alert('Vous devez accepter les conditions d\'utilisation');
//     //   return;
//     // }

//     if (currentStep < 3) {
//       nextStep();
//     } else {
//       // Submit registration (in a real app, this would call an API)
//       console.log('Registration data:', formData);
//       onComplete();
//     }
//   };

//   const nextStep = () => {
//     setCurrentStep(prev => prev + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => prev - 1);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Étape {currentStep} sur 3: {
//               currentStep === 1 ? 'Informations entreprise' :
//               currentStep === 2 ? 'Informations compte' :
//               'Choisir un plan'
//             }
//           </CardTitle>
//           <CardDescription>
//             {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
//             {currentStep === 2 && 'Créez votre compte administrateur'}
//             {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {currentStep === 1 && (
//             <CompanyInfoForm formData={formData} onChange={handleInputChange} />
//           )}

//           {currentStep === 2 && (
//             <AccountInfoForm formData={formData} onChange={handleInputChange} />
//           )}

//           {currentStep === 3 && (
//             <PlanSelection formData={formData} onChange={handleInputChange} />
//           )}
//         </CardContent>
//       </Card>

//       <div className="flex justify-between">
//         {currentStep > 1 ? (
//           <Button type="button" variant="outline" onClick={prevStep}>
//             Précédent
//           </Button>
//         ) : (
//           <div></div>
//         )}

//         {currentStep < 3 ? (
//           <Button type="button" onClick={nextStep}>
//             Suivant
//           </Button>
//         ) : (
//           <Button type="submit">
//             Créer mon compte
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// }



// // src/app/register/company/components/RegistrationForm.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { useTRPC } from '@/trpc/client';
// import CompanyInfoForm from './CompanyInfoForm';
// import AccountInfoForm from './AccountInfoForm';
// import PlanSelection from './PlanSelection';

// interface RegistrationFormProps {
//   onComplete: () => void;
// }

// export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
//   const router = useRouter();
//   const trpc = useTRPC();
//   const { toast } = useToast();

//   const registerCompanyMutation = useMutation(
//     trpc.companyRegistration.registerCompany.mutationOptions()
//   );

//   const checkAvailabilityMutation = useMutation(
//     trpc.companyRegistration.checkCompanyAvailability.mutationOptions()
//   );

//   const [formData, setFormData] = useState({
//     // Company Information
//     companyName: '',
//     companySize: 'SIZE_1_10' as "SIZE_1_10" | "SIZE_11_50" | "SIZE_51_200" | "SIZE_201_500" | "SIZE_501_1000" | "SIZE_1000_PLUS",
//     industry: '',
//     website: '',
//     phone: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     country: 'France',
    
//     // Account Information
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     jobTitle: '',
//     department: '',
    
//     // Plan Selection
//     plan: 'starter' as 'starter' | 'pro' | 'enterprise',
    
//     // Terms
//     agreeTerms: false,
//     agreePrivacy: false,
//     receiveNewsletter: true,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
//     setFormData(prev => ({ 
//       ...prev, 
//       [name]: type === 'checkbox' ? checked : value 
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateStep = async (step: number): Promise<boolean> => {
//     const newErrors: Record<string, string> = {};

//     if (step === 1) {
//       if (!formData.companyName.trim()) newErrors.companyName = 'Le nom de l\'entreprise est requis';
//       if (!formData.industry.trim()) newErrors.industry = 'Le secteur d\'activité est requis';
//       if (!formData.companySize.trim()) newErrors.companySize = 'La taille de l\'entreprise est requise';
      
//       // Check company availability
//       if (formData.companyName.trim() && formData.email.trim()) {
//         try {
//           setIsCheckingAvailability(true);
//           const result = await checkAvailabilityMutation.mutateAsync({
//             companyName: formData.companyName,
//             email: formData.email,
//           });

//           if (!result.companyAvailable) {
//             newErrors.companyName = 'Ce nom d\'entreprise existe déjà';
//           }
//           if (!result.emailAvailable) {
//             newErrors.email = 'Cet email est déjà enregistré';
//           }
//         } catch (error: any) {
//           console.error('Availability check failed:', error);
//           // Show specific error for availability check
//           if (error?.message?.includes('Failed to fetch')) {
//             toast({
//               title: "Erreur de connexion",
//               description: "Impossible de vérifier la disponibilité. Vérifiez votre connexion internet.",
//               variant: "destructive"
//             });
//           } else {
//             toast({
//               title: "Erreur de vérification",
//               description: "Une erreur s'est produite lors de la vérification de disponibilité.",
//               variant: "destructive"
//             });
//           }
//         } finally {
//           setIsCheckingAvailability(false);
//         }
//       }
//     }

//     if (step === 2) {
//       if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
//       if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
//       if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
//       else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
//       if (!formData.password) newErrors.password = 'Le mot de passe est requis';
//       else if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
//       else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
//         newErrors.password = 'Le mot de passe doit contenir des lettres et des chiffres';
//       }
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
//       }
//     }

//     if (step === 3) {
//       if (!formData.agreeTerms) newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
//       if (!formData.agreePrivacy) newErrors.agreePrivacy = 'Vous devez accepter la politique de confidentialité';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = async () => {
//     const isValid = await validateStep(currentStep);
//     if (isValid) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => prev - 1);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const isValid = await validateStep(3);
//     if (!isValid) return;

//     toast({
//       title: "Traitement en cours",
//       description: "Création de votre compte entreprise...",
//       variant: "default",
      
//     });

//     try {
//       const result = await registerCompanyMutation.mutateAsync({
//         company: {
//           companyName: formData.companyName,
//           companySize: formData.companySize,
//           industry: formData.industry,
//           website: formData.website,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           postalCode: formData.postalCode,
//           country: formData.country,
//         },
//         account: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           confirmPassword: formData.confirmPassword,
//           jobTitle: formData.jobTitle,
//           department: formData.department,
//         },
//         plan: {
//           plan: formData.plan,
//           agreeTerms: formData.agreeTerms,
//           agreePrivacy: formData.agreePrivacy,
//           receiveNewsletter: formData.receiveNewsletter,
//         },
//       });
      
//       // Dismiss processing toast

      
//       toast({
//         title: "Inscription réussie !",
//         description: "Votre compte entreprise a été créé avec succès. Veuillez vérifier votre email pour confirmation.",
//         variant: "success"
//       });
      
//       onComplete();
//     } catch (error: any) {
//       console.error('Registration failed:', error);
      
 

//       // Handle different types of errors
//       if (error?.data?.code === 'CONFLICT') {
//         toast({
//           title: "Inscription échouée",
//           description: error.message,
//           variant: "destructive"
//         });
//         setErrors({ submit: error.message });
//       } 
//       else if (error?.message?.includes('Failed to fetch') || error?.name === 'TRPCClientError') {
//         // Network error
//         toast({
//           title: "Erreur de connexion",
//           description: "Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.",
//           variant: "destructive"
//         });
//         setErrors({ submit: 'Erreur de connexion au serveur' });
//       }
//       else if (error?.data?.code === 'INTERNAL_SERVER_ERROR') {
//         // Server error
//         toast({
//           title: "Erreur serveur",
//           description: "Une erreur interne s'est produite. Veuillez réessayer dans quelques minutes.",
//           variant: "destructive"
//         });
//         setErrors({ submit: 'Erreur interne du serveur' });
//       }
//       else if (error?.data?.code === 'TOO_MANY_REQUESTS') {
//         // Rate limiting
//         toast({
//           title: "Trop de tentatives",
//           description: "Vous avez effectué trop de tentatives. Veuillez patienter avant de réessayer.",
//           variant: "destructive"
//         });
//         setErrors({ submit: 'Trop de tentatives, veuillez patienter' });
//       }
//       else {
//         // Generic error
//         toast({
//           title: "Erreur inattendue",
//           description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
//           variant: "destructive"
//         });
//         setErrors({ submit: 'Une erreur inattendue s\'est produite' });
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {errors.submit && (
//         <Alert variant="destructive">
//           <AlertDescription>{errors.submit}</AlertDescription>
//         </Alert>
//       )}

//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Étape {currentStep} sur 3: {
//               currentStep === 1 ? 'Informations entreprise' :
//               currentStep === 2 ? 'Informations compte' :
//               'Choisir un plan'
//             }
//           </CardTitle>
//           <CardDescription>
//             {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
//             {currentStep === 2 && 'Créez votre compte administrateur'}
//             {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {currentStep === 1 && (
//             <CompanyInfoForm 
//               formData={formData} 
//               onChange={handleInputChange}
//               errors={errors}
//               isCheckingAvailability={isCheckingAvailability}
//             />
//           )}
          
//           {currentStep === 2 && (
//             <AccountInfoForm 
//               formData={formData} 
//               onChange={handleInputChange}
//               errors={errors}
//             />
//           )}
          
//           {currentStep === 3 && (
//             <PlanSelection 
//               formData={formData} 
//               onChange={handleInputChange}
//               errors={errors}
//             />
//           )}
//         </CardContent>
//       </Card>

//       <div className="flex justify-between">
//         {currentStep > 1 ? (
//           <Button 
//             type="button" 
//             variant="outline" 
//             onClick={prevStep}
//             disabled={registerCompanyMutation.isPending}
//           >
//             Précédent
//           </Button>
//         ) : (
//           <div></div>
//         )}
        
//         {currentStep < 3 ? (
//           <Button 
//             type="button" 
//             onClick={nextStep}
//             disabled={isCheckingAvailability || registerCompanyMutation.isPending}
//           >
//             {isCheckingAvailability ? 'Vérification...' : 'Suivant'}
//           </Button>
//         ) : (
//           <Button 
//             type="submit"
//             disabled={registerCompanyMutation.isPending || isCheckingAvailability}
//           >
//             {registerCompanyMutation.isPending ? 'Création...' : 'Créer mon compte'}
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// }



// src/app/register/company/components/RegistrationForm.tsx
// src/app/register/company/components/RegistrationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import CompanyInfoForm from './CompanyInfoForm';
import AccountInfoForm from './AccountInfoForm';
import PlanSelection from './PlanSelection';

import { completeRegistrationSchema, type RegistrationFormData } from '../../../../types/registrationSchema';

interface RegistrationFormProps {
  onComplete: () => void;
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const { toast } = useToast();

  // Get default values from the schema
  const defaultValues: RegistrationFormData = {
    company: {
      companyName: '',
      companySize: 'SIZE_1_10',
      industry: '',
      website: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France', // ✅ This must match the schema
    },
    account: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobTitle: '',
      department: '',
    },
    plan: {
      plan: 'starter',
      agreeTerms: false,
      agreePrivacy: false,
      receiveNewsletter: true,
    },
  };

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(completeRegistrationSchema) as any, // ✅ Use type assertion as a last resort
    defaultValues,
    mode: 'onChange',
  });

  const registerCompanyMutation = useMutation(
    trpc.companyRegistration.registerCompany.mutationOptions()
  );

  const checkAvailabilityMutation = useMutation(
    trpc.companyRegistration.checkCompanyAvailability.mutationOptions()
  );

  const validateStep = async (step: number): Promise<boolean> => {
    const fields = getStepFields(step);
    const result = await form.trigger(fields as any);
    
    if (step === 1 && result) {
      const companyName = form.getValues('company.companyName');
      const email = form.getValues('account.email');
      
      if (companyName && email) {
        try {
          setIsCheckingAvailability(true);
          const availabilityResult = await checkAvailabilityMutation.mutateAsync({
            companyName,
            email,
          });

          if (!availabilityResult.companyAvailable) {
            form.setError('company.companyName', {
              type: 'manual',
              message: 'Ce nom d\'entreprise existe déjà',
            });
            return false;
          }
          if (!availabilityResult.emailAvailable) {
            form.setError('account.email', {
              type: 'manual',
              message: 'Cet email est déjà enregistré',
            });
            return false;
          }
        } catch (error: any) {
          console.error('Availability check failed:', error);
          toast({
            title: "Erreur de vérification",
            description: "Une erreur s'est produite lors de la vérification de disponibilité.",
            variant: "destructive"
          });
        } finally {
          setIsCheckingAvailability(false);
        }
      }
    }

    return result;
  };

  const getStepFields = (step: number): (keyof RegistrationFormData)[] => {
    switch (step) {
      case 1:
        return ['company' as keyof RegistrationFormData];
      case 2:
        return ['account' as keyof RegistrationFormData];
      case 3:
        return ['plan' as keyof RegistrationFormData];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // ✅ Fix the onSubmit type issue
  const onSubmit = async (data: RegistrationFormData) => {
    toast({
      title: "Traitement en cours",
      description: "Création de votre compte entreprise...",
      variant: "default",
    });

    try {
      const result = await registerCompanyMutation.mutateAsync(data);
      
      toast({
        title: "Inscription réussie !",
        description: "Votre compte entreprise a été créé avec succès.",
        variant: "success"
      });
      
      onComplete();
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      if (error?.data?.code === 'CONFLICT') {
        toast({
          title: "Inscription échouée",
          description: error.message,
          variant: "destructive"
        });
      } else if (error?.message?.includes('Failed to fetch') || error?.name === 'TRPCClientError') {
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erreur inattendue",
          description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <FormProvider {...form}>
      {/* ✅ Fix the form submission type */}
      <form onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(onSubmit)(e);
      }} className="space-y-6">
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Étape {currentStep} sur 3: {
                currentStep === 1 ? 'Informations entreprise' :
                currentStep === 2 ? 'Informations compte' :
                'Choisir un plan'
              }
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
              {currentStep === 2 && 'Créez votre compte administrateur'}
              {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <CompanyInfoForm 
                isCheckingAvailability={isCheckingAvailability}
              />
            )}
            
            {currentStep === 2 && (
              <AccountInfoForm />
            )}
            
            {currentStep === 3 && (
              <PlanSelection />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={registerCompanyMutation.isPending}
            >
              Précédent
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              disabled={isCheckingAvailability || registerCompanyMutation.isPending}
            >
              {isCheckingAvailability ? 'Vérification...' : 'Suivant'}
            </Button>
          ) : (
            <Button 
              type="submit"
              disabled={registerCompanyMutation.isPending || isCheckingAvailability}
            >
              {registerCompanyMutation.isPending ? 'Création...' : 'Créer mon compte'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}