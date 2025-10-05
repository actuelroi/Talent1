

// // src/app/register/company/components/RegistrationForm.tsx
// // src/app/register/company/components/RegistrationForm.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { useTRPC } from '@/trpc/client';
// import CompanyInfoForm from './CompanyInfoForm';
// import AccountInfoForm from './AccountInfoForm';
// import PlanSelection from './PlanSelection';

// import { completeRegistrationSchema, type RegistrationFormData } from '../../../../types/registrationSchema';
// import { useUser } from '@clerk/nextjs';
// import Link from 'next/link';

// interface RegistrationFormProps {
//   onComplete: () => void;
// }

// export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
//   const router = useRouter();
//   const trpc = useTRPC();
//   const { toast } = useToast();
//   const { user, isLoaded } = useUser();
//   const [clerkUserId, setClerkUserId] = useState<string | null>(null);
//   const [created, isCreated] = useState(false);

//   useEffect(() => {
//     if (isLoaded && user) {
//       setClerkUserId(user.id);
//     }
//   }, [user, isLoaded])

//   // Get default values from the schema
//   const defaultValues: RegistrationFormData = {
//     company: {
//       companyName: '',
//       companySize: 'SIZE_1_10',
//       industry: '',
//       website: '',
//       phone: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       country: 'France', // ✅ This must match the schema
//     },
//     account: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       jobTitle: '',
//       department: '',
//     },
//     plan: {
//       plan: 'starter',
//       agreeTerms: false,
//       agreePrivacy: false,
//       receiveNewsletter: true,
//     },
//   };

//   const form = useForm<RegistrationFormData>({
//     resolver: zodResolver(completeRegistrationSchema) as any, // ✅ Use type assertion as a last resort
//     defaultValues,
//     mode: 'onChange',
//   });

//   const registerCompanyMutation = useMutation(
//     trpc.companyRegistration.registerCompany.mutationOptions()
//   );

//   const checkAvailabilityMutation = useMutation(
//     trpc.companyRegistration.checkCompanyAvailability.mutationOptions()
//   );

//   const validateStep = async (step: number): Promise<boolean> => {
//     const fields = getStepFields(step);
//     const result = await form.trigger(fields as any);
    
//     if (step === 1 && result) {
//       const companyName = form.getValues('company.companyName');
//       const email = form.getValues('account.email');
      
//       if (companyName && email) {
//         try {
//           setIsCheckingAvailability(true);
//           const availabilityResult = await checkAvailabilityMutation.mutateAsync({
//             companyName,
//             email,
//           });

//           if (!availabilityResult.companyAvailable) {
//             form.setError('company.companyName', {
//               type: 'manual',
//               message: 'Ce nom d\'entreprise existe déjà',
//             });
//             return false;
//           }
//           if (!availabilityResult.emailAvailable) {
//             form.setError('account.email', {
//               type: 'manual',
//               message: 'Cet email est déjà enregistré',
//             });
//             return false;
//           }
//         } catch (error: any) {
//           console.error('Availability check failed:', error);
//           toast({
//             title: "Erreur de vérification",
//             description: "Une erreur s'est produite lors de la vérification de disponibilité.",
//             variant: "destructive"
//           });
//         } finally {
//           setIsCheckingAvailability(false);
//         }
//       }
//     }

//     return result;
//   };

//   const getStepFields = (step: number): (keyof RegistrationFormData)[] => {
//     switch (step) {
//       case 1:
//         return ['company' as keyof RegistrationFormData];
//       case 2:
//         return ['account' as keyof RegistrationFormData];
//       case 3:
//         return ['plan' as keyof RegistrationFormData];
//       default:
//         return [];
//     }
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

//   // ✅ Fix the onSubmit type issue
//   const onSubmit = async (data: RegistrationFormData) => {
//     if (!clerkUserId) {
//       toast({
//         title: "Erreur d'authentification",
//         description: "Veuillez vous connecter d'abord",
//         variant: "destructive"
//       });
//       return;
//     }
//     toast({
//       title: "Traitement en cours",
//       description: "Création de votre compte entreprise...",
//       variant: "default",
//     });

//     try {
//       const result = await registerCompanyMutation.mutateAsync({...data,  clerkUserId} );
      
//       toast({
//         title: "Inscription réussie !",
//         description: "Votre compte entreprise a été créé avec succès.",
//         variant: "success"
//       });
      
//       onComplete();
//     } catch (error: any) {
//       console.error('Registration failed:', error);
      
//       if (error?.data?.code === 'CONFLICT') {
//         toast({
//           title: "Inscription échouée",
//           description: error.message,
//           variant: "destructive"
//         });
//       } else if (error?.message?.includes('Failed to fetch') || error?.name === 'TRPCClientError') {
//         toast({
//           title: "Erreur de connexion",
//           description: "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
//           variant: "destructive"
//         });
//       } else {
//         toast({
//           title: "Erreur inattendue",
//           description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
//           variant: "destructive"
//         });
//       }
//     }
//     if (!isLoaded) {
//     return <div>Chargement...</div>;
//   }

//   if (!user) {
//     return (
//       <div className="text-center">
//         <p>Veuillez vous connecter pour créer votre entreprise</p>
//         <Link href="/sign-in">
//           <Button>Se connecter</Button>
//         </Link>
//       </div>
//     );
//   }
//   };



//   return (

    
//     <FormProvider {...form}>
//       {/* ✅ Fix the form submission type */}
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         form.handleSubmit(onSubmit)(e);
//       }} className="space-y-6">
//         {form.formState.errors.root && (
//           <Alert variant="destructive">
//             <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
//           </Alert>
//         )}

//         <Card>
//           <CardHeader>
//             <CardTitle>
//               Étape {currentStep} sur 3: {
//                 currentStep === 1 ? 'Informations entreprise' :
//                 currentStep === 2 ? 'Informations compte' :
//                 'Choisir un plan'
//               }
//             </CardTitle>
//             <CardDescription>
//               {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
//               {currentStep === 2 && 'Créez votre compte administrateur'}
//               {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {currentStep === 1 && (
//               <CompanyInfoForm 
//                 isCheckingAvailability={isCheckingAvailability}
//               />
//             )}
            
//             {currentStep === 2 && (
//               <AccountInfoForm />
//             )}
            
//             {currentStep === 3 && (
//               <PlanSelection />
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex justify-between">
//           {currentStep > 1 ? (
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={prevStep}
//               disabled={registerCompanyMutation.isPending}
//             >
//               Précédent
//             </Button>
//           ) : (
//             <div></div>
//           )}
          
//           {currentStep < 3 ? (
//             <Button 
//               type="button" 
//               onClick={nextStep}
//               disabled={isCheckingAvailability || registerCompanyMutation.isPending}
//             >
//               {isCheckingAvailability ? 'Vérification...' : 'Suivant'}
//             </Button>
//           ) : (
//             <Button 
//               type="submit"
//               disabled={registerCompanyMutation.isPending || isCheckingAvailability}
//             >
//               {registerCompanyMutation.isPending ? 'Création...' : 'Créer mon compte'}
//             </Button>
//           )}
          
//         </div>
//       </form>
//     </FormProvider>
//   );
// }





// // src/app/register/company/components/RegistrationForm.tsx
// 'use client';

// import {  useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useToast } from '@/hooks/use-toast';
// import { useMutation } from '@tanstack/react-query';
// import { useTRPC } from '@/trpc/client';
// import CompanyInfoForm from './CompanyInfoForm';
// import AccountInfoForm from './AccountInfoForm';
// import PlanSelection from './PlanSelection';
// import { completeRegistrationSchema, type RegistrationFormData } from '@/types/registrationSchema';
// import { useUser } from '@clerk/nextjs';
// import Link from 'next/link';
// import { useCompany } from '@/contexts/CompanyVerificationContext';

// interface RegistrationFormProps {
//   onComplete: () => void;
// }

// function Spinner() {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
//     </div>
//   );
// }

// export default function RegistrationForm({ onComplete }: RegistrationFormProps) {



// // All hooks called unconditionally at the top
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
//   const router = useRouter();
//   const trpc = useTRPC();
//   const { toast } = useToast();
//   const { user, isLoaded } = useUser();

//   // Get default values - this is just variable assignment, not a hook
//   const defaultValues: RegistrationFormData = {
//     company: {
//       companyName: '',
//       companySize: 'SIZE_1_10',
//       industry: '',
//       website: '',
//       phone: '',
//       address: '',
//       city: '',
//       postalCode: '',
//       country: 'France',
//     },
//     account: {
//       firstName: user?.firstName || '',
//       lastName: user?.lastName || '',
//       email: user?.primaryEmailAddress?.emailAddress || '',
//       jobTitle: '',
//       department: '',
//     },
//     plan: {
//       plan: 'starter',
//       agreeTerms: false,
//       agreePrivacy: false,
//       receiveNewsletter: true,
//     },
//   };

//   const form = useForm<RegistrationFormData>({
//     resolver: zodResolver(completeRegistrationSchema) as any,
//     defaultValues,
//     mode: 'onChange',
//   });

//   const registerCompanyMutation = useMutation({
//     ...trpc.companyRegistration.registerCompany.mutationOptions(),
//     onError: (error: any) => {
//       console.error('Registration mutation error:', error);
//     },
//   });

//   const checkAvailabilityMutation = useMutation({
//     ...trpc.companyRegistration.checkCompanyAvailability.mutationOptions(),
//     onError: (error: any) => {
//       console.error('Availability check error:', error);
//     },
//   });

//   // Early return for loading and authentication states - AFTER all hooks
//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <Spinner />
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="text-center space-y-4">
//         <p>Veuillez vous connecter pour créer votre entreprise</p>
//         <Link href="/sign-in">
//           <Button>Se connecter</Button>
//         </Link>
//       </div>
//     );
//   }

//   // Rest of your component logic...
//   const validateStep = async (step: number): Promise<boolean> => {
//     const fields = getStepFields(step);
//     const result = await form.trigger(fields as any);
    
//     if (step === 1 && result) {
//       const companyName = form.getValues('company.companyName');
//       const email = form.getValues('account.email');
      
//       if (companyName && email) {
//         try {
//           setIsCheckingAvailability(true);
//           const availabilityResult = await checkAvailabilityMutation.mutateAsync({
//             companyName,
//             email,
//           });

//           if (!availabilityResult.companyAvailable) {
//             form.setError('company.companyName', {
//               type: 'manual',
//               message: 'Ce nom d\'entreprise existe déjà',
//             });
//             return false;
//           }
//           if (!availabilityResult.emailAvailable) {
//             form.setError('account.email', {
//               type: 'manual',
//               message: 'Cet email est déjà enregistré',
//             });
//             return false;
//           }
//         } catch (error: any) {
//           console.error('Availability check failed:', error);
//           toast({
//             title: "Erreur de vérification",
//             description: "Une erreur s'est produite lors de la vérification de disponibilité.",
//             variant: "destructive"
//           });
//           return false;
//         } finally {
//           setIsCheckingAvailability(false);
//         }
//       }
//     }

//     return result;
//   };

//   const getStepFields = (step: number): (keyof RegistrationFormData)[] => {
//     switch (step) {
//       case 1:
//         return ['company'];
//       case 2:
//         return ['account'];
//       case 3:
//         return ['plan'];
//       default:
//         return [];
//     }
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

//   const onSubmit = async (data: RegistrationFormData) => {
//     if (!user) {
//       toast({
//         title: "Erreur d'authentification",
//         description: "Veuillez vous connecter d'abord",
//         variant: "destructive"
//       });
//       return;
//     }

//     try {
//       const result = await registerCompanyMutation.mutateAsync({
//         ...data, 
//         clerkUserId: user.id
//       });
      
//       toast({
//         title: "Demande envoyée !",
//         description: "Votre entreprise est en attente de vérification.",
//         variant: "default"
//       });
      
//       router.push('/register/success');
      
//     } catch (error: any) {
//       console.error('Registration failed:', error);
//       toast({
//         title: "Erreur d'inscription",
//         description: error?.message || 'Une erreur inattendue s\'est produite',
//         variant: "destructive"
//       });
//     }
//   };



//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {form.formState.errors.root && (
//           <Alert variant="destructive">
//             <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
//           </Alert>
//         )}

//         <Card>
//           <CardHeader>
//             <CardTitle>
//               Étape {currentStep} sur 3: {
//                 currentStep === 1 ? 'Informations entreprise' :
//                 currentStep === 2 ? 'Informations compte' :
//                 'Choisir un plan'
//               }
//             </CardTitle>
//             <CardDescription>
//               {currentStep === 1 && 'Renseignez les informations concernant votre entreprise'}
//               {currentStep === 2 && 'Créez votre compte administrateur'}
//               {currentStep === 3 && 'Sélectionnez le plan qui correspond à vos besoins'}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {currentStep === 1 && (
//               <CompanyInfoForm 
//                 isCheckingAvailability={isCheckingAvailability}
//               />
//             )}
            
//             {currentStep === 2 && (
//               <AccountInfoForm />
//             )}
            
//             {currentStep === 3 && (
//               <PlanSelection />
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex justify-between items-center">
//           {currentStep > 1 ? (
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={prevStep}
//               disabled={registerCompanyMutation.isPending || isCheckingAvailability}
//             >
//               Précédent
//             </Button>
//           ) : (
//             <div></div>
//           )}
          
//           <div className="flex items-center gap-4">
//             {registerCompanyMutation.isPending && <Spinner />}
            
//             {currentStep < 3 ? (
//               <Button 
//                 type="button" 
//                 onClick={nextStep}
//                 disabled={isCheckingAvailability || registerCompanyMutation.isPending}
//               >
//                 {isCheckingAvailability ? 'Vérification...' : 'Suivant'}
//               </Button>
//             ) : (
//               <Button 
//                 type="submit"
//                 disabled={registerCompanyMutation.isPending || isCheckingAvailability}
//               >
//                 {registerCompanyMutation.isPending ? 'Création...' : 'Créer mon compte'}
//               </Button>
//             )}
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }




// src/app/register/company/components/RegistrationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import CompanyInfoForm from './CompanyInfoForm';
import AccountInfoForm from './AccountInfoForm';
import PlanSelection from './PlanSelection';
import { completeRegistrationSchema, type RegistrationFormData } from '@/types/registrationSchema';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useCompany } from '@/contexts/CompanyVerificationContext';
import { toast } from 'sonner';


interface RegistrationFormProps {
  onComplete: () => void;
}

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();

  const { user, isLoaded } = useUser();
  const { setCurrentCompany, refreshCompanyData } = useCompany(); // Add this

  // Get default values
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
      country: 'France',
    },
    account: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
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
    resolver: zodResolver(completeRegistrationSchema) as any,
    defaultValues,
    mode: 'onChange',
  });

  const registerCompanyMutation = useMutation({
    ...trpc.companyRegistration.registerCompany.mutationOptions(),
    onSuccess: async (result) => {
      // Refresh company data to include the new company
      await refreshCompanyData();
      
      // Store the newly created company in context
      if (result.companyId) {
        // Create a temporary company object for context
        const newCompany = {
          id: result.companyId,
          name: form.getValues('company.companyName'),
          slug: form.getValues('company.companyName').toLowerCase().replace(/\s+/g, '-'),
          verificationStatus: 'PENDING' as const,
          isActive: true,
          role: 'ADMIN',
          memberSince: new Date(),
        };
        setCurrentCompany(newCompany);
        
        // Store in localStorage for persistence
        localStorage.setItem('lastRegisteredCompanyId', result.companyId);
      }
    },
    onError: (error: any) => {
      console.error('Registration mutation error:', error);
    },
  });

  const checkAvailabilityMutation = useMutation({
    ...trpc.companyRegistration.checkCompanyAvailability.mutationOptions(),
    onError: (error: any) => {
      console.error('Availability check error:', error);
    },
  });

  // Early return for loading and authentication states
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center space-y-4">
        <p>Veuillez vous connecter pour créer votre entreprise</p>
        <Link href="/sign-in">
          <Button>Se connecter</Button>
        </Link>
      </div>
    );
  }

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
          toast.error('Erreur de vérification \n Une erreur s\'est produite lors de la vérification de disponibilité.')
          
          return false;
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
        return ['company'];
      case 2:
        return ['account'];
      case 3:
        return ['plan'];
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

  const onSubmit = async (data: RegistrationFormData) => {
    if (!user) {

       toast.error('Erreur d\'authentification \n Veuillez vous connecter d\'abord.');
      return;
    }

    try {
      const result = await registerCompanyMutation.mutateAsync({
        ...data, 
        clerkUserId: user.id
      });
      
      // Send verification email
      if (result.success && result.companyId) {
        await fetch('/api/send-verification-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: result.companyId,
            email: data.account.email,
            companyName: data.company.companyName,
          }),
        });
      }
       toast.success('Demande envoyée ! \n Votre entreprise est en attente de vérification.');
      
      
      // Redirect to success page with the new company info
      router.push('/register/success');
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast.error('Erreur d\'inscription \n ' + (error?.message || 'Une erreur inattendue s\'est produite'));
  
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex justify-between items-center">
          {currentStep > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={registerCompanyMutation.isPending || isCheckingAvailability}
            >
              Précédent
            </Button>
          ) : (
            <div></div>
          )}
          
          <div className="flex items-center gap-4">
            {registerCompanyMutation.isPending && <Spinner />}
            
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
        </div>
      </form>
    </FormProvider>
  );
}