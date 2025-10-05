// // app/register/company/success/page.tsx
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, Clock, Mail, Building } from 'lucide-react';
// import Link from 'next/link';

// export default function RegistrationSuccessPage() {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect if not authenticated
//     if (isLoaded && !user) {
//       router.push('/sign-in');
//     }
//   }, [user, isLoaded, router]);

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <Card className="w-full max-w-2xl">
//         <CardContent className="p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-10 w-10 text-green-600" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Demande d'inscription envoyée !
//             </h1>
//             <p className="text-gray-600">
//               Votre entreprise est en attente de vérification
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Clock className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Notre équipe vérifie vos informations sous 24-48h
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Mail className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Notification par email</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous recevrez un email une fois vérifié
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Building className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous pourrez gérer plusieurs entreprises
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Ajoutez des collaborateurs après vérification
//               </p>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button asChild variant="outline">
//                 <Link href="/">
//                   Retour à l'accueil
//                 </Link>
//               </Button>
              
//               <Button asChild>
//                 <Link href="/sign-in">
//                   Se connecter
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// app/register/company/success/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import { useTRPC } from '@/trpc/client';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, Clock, Mail, Building, RefreshCw } from 'lucide-react';
// import Link from 'next/link';
// import { useQuery } from '@tanstack/react-query';

// export default function RegistrationSuccessPage() {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();
//   const trpc = useTRPC();
//   const [lastChecked, setLastChecked] = useState<Date>(new Date());
//   const [isManualRefreshing, setIsManualRefreshing] = useState(false);

//   // Query to check user's companies
//   const { data: companiesData, refetch, isFetching } = useQuery(
//     trpc.company.getUserCompanies.queryOptions(undefined, {
//       enabled: !!user && isLoaded,
//       refetchInterval: 30000, // Check every 30 seconds
//       refetchOnWindowFocus: true,
//     })
//   );

//   useEffect(() => {
//     // Redirect if not authenticated
//     if (isLoaded && !user) {
//       router.push('/sign-in');
//       return;
//     }

//     // Check if user has any verified companies
//     if (companiesData?.companies) {
//       const verifiedCompany = companiesData.companies.find(
//         company => company.verificationStatus === 'VERIFIED'
//       );

//       if (verifiedCompany) {
//         // Redirect to dashboard when company is verified
//         router.push('/compagny-dashboard/menu/1');
//       }
//     }
//   }, [user, isLoaded, companiesData, router]);

//   // Manual refresh function
//   const handleManualRefresh = async () => {
//     setIsManualRefreshing(true);
//     setLastChecked(new Date());
//     await refetch();
//     setIsManualRefreshing(false);
//   };

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   const isRefreshing = isFetching || isManualRefreshing;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <Card className="w-full max-w-2xl">
//         <CardContent className="p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-10 w-10 text-green-600" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Demande d'inscription envoyée !
//             </h1>
//             <p className="text-gray-600">
//               Votre entreprise est en attente de vérification
//             </p>
            
//             {/* Auto-refresh status */}
//             <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
//               <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//               <span>
//                 {isRefreshing ? 'Vérification en cours...' : 'Vérification automatique toutes les 30 secondes'}
//               </span>
//             </div>
            
//             {lastChecked && (
//               <p className="text-xs text-gray-400 mt-1">
//                 Dernière vérification: {lastChecked.toLocaleTimeString('fr-FR')}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Clock className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Notre équipe vérifie vos informations sous 24-48h
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Mail className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Notification par email</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous recevrez un email une fois vérifié
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Building className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous pourrez gérer plusieurs entreprises
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Ajoutez des collaborateurs après vérification
//               </p>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button 
//                 onClick={handleManualRefresh}
//                 disabled={isRefreshing}
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                 {isRefreshing ? 'Vérification...' : 'Vérifier maintenant'}
//               </Button>
              
//               <Button asChild variant="outline">
//                 <Link href="/">
//                   Retour à l'accueil
//                 </Link>
//               </Button>
              
//               <Button asChild>
//                 <Link href="/sign-in">
//                   Se connecter
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// // app/register/company/success/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import { useTRPC } from '@/trpc/client';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, Clock, Mail, Building, RefreshCw } from 'lucide-react';
// import Link from 'next/link';
// import { useQuery } from '@tanstack/react-query';

// export default function RegistrationSuccessPage() {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();
//   const trpc = useTRPC();
//   const [lastChecked, setLastChecked] = useState<Date>(new Date());
//   const [isManualRefreshing, setIsManualRefreshing] = useState(false);
//   const [debugInfo, setDebugInfo] = useState<string>('');

//   // Query to check user's companies
//   const { data: companiesData, refetch, isFetching } = useQuery({
//     ...trpc.company.getUserCompanies.queryOptions(),
//     enabled: !!user && isLoaded,
//     refetchInterval: 10000, // Check every 10 seconds for faster response
//     refetchOnWindowFocus: true,
//   });

//   useEffect(() => {
//     console.log('🔍 DEBUG - Companies data:', companiesData);
    
//     if (companiesData?.companies) {
//       const verifiedCompany = companiesData.companies.find(
//         company => company.verificationStatus === 'VERIFIED'
//       );

//       console.log('🔍 DEBUG - Verified company found:', verifiedCompany);
//       console.log('🔍 DEBUG - All companies:', companiesData.companies);

//       if (verifiedCompany) {
//         setDebugInfo(`✅ Company verified! Redirecting to dashboard... Company: ${verifiedCompany.name}`);
//         console.log('🚀 Redirecting to dashboard with company:', verifiedCompany);
//         // Redirect to dashboard when company is verified
//         router.push('/compagny-dashboard/menu/1');
//       } else {
//         setDebugInfo(`⏳ No verified companies yet. Found ${companiesData.companies.length} companies with status: ${companiesData.companies.map(c => c.verificationStatus).join(', ')}`);
//       }
//     } else if (companiesData) {
//       setDebugInfo('📭 No companies found for user');
//     }
//   }, [companiesData, router]);

//   useEffect(() => {
//   console.log('🔍 SUCCESS PAGE - User:', user?.id, user?.emailAddresses[0]?.emailAddress);
//   console.log('🔍 SUCCESS PAGE - Companies data:', companiesData);
  
//   if (companiesData?.companies) {
//     const verifiedCompany = companiesData.companies.find(
//       company => company.verificationStatus === 'VERIFIED'
//     );

//     console.log('🔍 SUCCESS PAGE - Verified company:', verifiedCompany);

//     if (verifiedCompany) {
//       console.log('🚀 SUCCESS PAGE - Redirecting to dashboard!');
//       router.push('/compagny-dashboard/menu/1');
//     }
//   }
// }, [companiesData, router, user]);

// useEffect(() => {
//   console.log('🔍 SUCCESS PAGE - User Clerk ID:', user?.id);
//   console.log('🔍 SUCCESS PAGE - User email:', user?.emailAddresses[0]?.emailAddress);
//   console.log('🔍 SUCCESS PAGE - Companies data:', companiesData);
  
//   if (companiesData?.companies) {
//     console.log('🔍 SUCCESS PAGE - Number of companies found:', companiesData.companies.length);
    
//     companiesData.companies.forEach((company, index) => {
//       console.log(`🔍 SUCCESS PAGE - Company ${index + 1}:`, {
//         name: company.name,
//         status: company.verificationStatus,
//         id: company.id
//       });
//     });

//     const verifiedCompany = companiesData.companies.find(
//       company => company.verificationStatus === 'VERIFIED'
//     );

//     if (verifiedCompany) {
//       console.log('🚀 SUCCESS PAGE - Verified company found! Redirecting...', verifiedCompany);
//       setDebugInfo(`✅ Company verified! Redirecting to dashboard... Company: ${verifiedCompany.name}`);
//       router.push('/compagny-dashboard/menu/1');
//     } else {
//       setDebugInfo(`⏳ No verified companies. Found ${companiesData.companies.length} companies. Statuses: ${companiesData.companies.map(c => `${c.name}: ${c.verificationStatus}`).join(', ')}`);
//     }
//   } else {
//     setDebugInfo('📭 No companies data received from API');
//   }
// }, [companiesData, router, user]);

//   useEffect(() => {
//     // Redirect if not authenticated
//     if (isLoaded && !user) {
//       setDebugInfo('🔐 User not authenticated, redirecting to sign-in');
//       router.push('/sign-in');
//       return;
//     }

//     if (isLoaded && user) {
//       setDebugInfo(`👤 User loaded: ${user.emailAddresses[0]?.emailAddress}`);
//     }
//   }, [user, isLoaded, router]);

//   // Manual refresh function
//   const handleManualRefresh = async () => {
//     setIsManualRefreshing(true);
//     setLastChecked(new Date());
//     setDebugInfo('🔄 Manual refresh triggered...');
//     await refetch();
//     setIsManualRefreshing(false);
//   };

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   const isRefreshing = isFetching || isManualRefreshing;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <Card className="w-full max-w-2xl">
//         <CardContent className="p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-10 w-10 text-green-600" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Demande d'inscription envoyée !
//             </h1>
//             <p className="text-gray-600">
//               Votre entreprise est en attente de vérification
//             </p>
            
//             {/* Debug info - remove in production */}
//             {process.env.NODE_ENV === 'development' && debugInfo && (
//               <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
//                 <strong>Debug:</strong> {debugInfo}
//               </div>
//             )}
            
//             {/* Auto-refresh status */}
//             <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
//               <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//               <span>
//                 {isRefreshing ? 'Vérification en cours...' : 'Vérification automatique toutes les 10 secondes'}
//               </span>
//             </div>
            
//             {lastChecked && (
//               <p className="text-xs text-gray-400 mt-1">
//                 Dernière vérification: {lastChecked.toLocaleTimeString('fr-FR')}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Clock className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Notre équipe vérifie vos informations sous 24-48h
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Mail className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Notification par email</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous recevrez un email une fois vérifié
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Building className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous pourrez gérer plusieurs entreprises
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Ajoutez des collaborateurs après vérification
//               </p>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button 
//                 onClick={handleManualRefresh}
//                 disabled={isRefreshing}
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                 {isRefreshing ? 'Vérification...' : 'Vérifier maintenant'}
//               </Button>
              
//               <Button asChild variant="outline">
//                 <Link href="/">
//                   Retour à l'accueil
//                 </Link>
//               </Button>
              
//               <Button asChild>
//                 <Link href="/sign-in">
//                   Se connecter
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /// app/register/company/success/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';

// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, Clock, Mail, Building, RefreshCw, ArrowRight, AlertCircle } from 'lucide-react';
// import Link from 'next/link';
// import { Badge } from '@/components/ui/badge';
// import { useCompany } from '@/contexts/CompanyVerificationContext';

// export default function RegistrationSuccessPage() {
//   const { 
//     verifiedCompanies, 
//     pendingCompanies, 
//     refetchCompanies, 
//     isLoading, 
//     currentCompany,
//     lastRegisteredCompany
//   } = useCompany();
  
//   const [lastChecked, setLastChecked] = useState<Date>(new Date());
//   const [isManualRefreshing, setIsManualRefreshing] = useState(false);
//   const [checkCount, setCheckCount] = useState(0);

//   const isRefreshing = isLoading || isManualRefreshing;
//   const hasVerifiedCompanies = verifiedCompanies.length > 0;
//   const currentNewCompany = lastRegisteredCompany || currentCompany;

//   // Manual refresh function
//   const handleManualRefresh = async () => {
//     setIsManualRefreshing(true);
//     setLastChecked(new Date());
//     setCheckCount(prev => prev + 1);
//     console.log('🔄 Manual refresh triggered');
//     await refetchCompanies();
//     setIsManualRefreshing(false);
//   };

//   // Resend verification email function
//   const handleResendVerification = async () => {
//     if (!currentNewCompany) return;
    
//     try {
//       const response = await fetch('/api/send-verification-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           companyId: currentNewCompany.id,
//           email: currentNewCompany.adminEmail, // You'll need to get this from your context
//           companyName: currentNewCompany.name,
//         }),
//       });

//       if (response.ok) {
//         alert('Email de vérification renvoyé avec succès!');
//       } else {
//         alert('Erreur lors de l\'envoi de l\'email');
//       }
//     } catch (error) {
//       console.error('Error resending verification:', error);
//       alert('Erreur lors de l\'envoi de l\'email');
//     }
//   };

//   // Get admin email from company members
//   const getAdminEmail = (company: any) => {
//     if (company.adminEmail) return company.adminEmail;
//     if (company.members && company.members.length > 0) {
//       const adminMember = company.members.find((member: any) => 
//         member.role === 'ADMIN' && member.user
//       );
//       return adminMember?.user?.email || 'Email non disponible';
//     }
//     return 'Email non disponible';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <Card className="w-full max-w-2xl">
//         <CardContent className="p-8">
//           <div className="text-center mb-8">
//             {/* Dynamic icon based on status */}
//             <div className="flex justify-center mb-4">
//               <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
//                 currentNewCompany?.verificationStatus === 'VERIFIED' 
//                   ? 'bg-green-100' 
//                   : 'bg-blue-100'
//               }`}>
//                 {currentNewCompany?.verificationStatus === 'VERIFIED' ? (
//                   <CheckCircle className="h-10 w-10 text-green-600" />
//                 ) : (
//                   <Clock className="h-10 w-10 text-blue-600" />
//                 )}
//               </div>
//             </div>

//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               {currentNewCompany?.verificationStatus === 'VERIFIED' 
//                 ? 'Entreprise Vérifiée !' 
//                 : 'Demande d\'inscription envoyée !'
//               }
//             </h1>
            
//             <p className="text-gray-600">
//               {currentNewCompany?.verificationStatus === 'VERIFIED' 
//                 ? 'Votre entreprise a été approuvée. Redirection...'
//                 : 'Votre entreprise est en attente de vérification'
//               }
//             </p>
            
//             {/* Current company info */}
//             {currentNewCompany && (
//               <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                 <p className="font-medium">Votre entreprise:</p>
//                 <p className="text-lg font-semibold text-gray-900">{currentNewCompany.name}</p>
//                 <Badge variant={
//                   currentNewCompany.verificationStatus === 'VERIFIED' ? 'default' : 'secondary'
//                 } className="mt-1">
//                   {currentNewCompany.verificationStatus === 'VERIFIED' 
//                     ? '✅ Vérifiée' 
//                     : '⏳ En attente de vérification'
//                   }
//                 </Badge>
                
//                 {/* Email verification info */}
//                 {currentNewCompany.verificationStatus !== 'VERIFIED' && (
//                   <div className="mt-3 p-2 bg-white rounded border">
//                     <p className="text-sm font-medium">Vérification par email:</p>
//                     <p className="text-sm text-gray-600">
//                       Un email de vérification a été envoyé à: 
//                       <strong> {getAdminEmail(currentNewCompany)}</strong>
//                     </p>
//                     <Button 
//                       onClick={handleResendVerification}
//                       variant="outline" 
//                       size="sm" 
//                       className="mt-2"
//                     >
//                       <Mail className="h-4 w-4 mr-2" />
//                       Renvoyer l'email
//                     </Button>
//                   </div>
//                 )}
                
//                 {currentNewCompany.verificationStatus === 'VERIFIED' && (
//                   <p className="text-sm text-green-600 mt-2">
//                     🎉 Félicitations ! Redirection automatique vers le tableau de bord...
//                   </p>
//                 )}
//               </div>
//             )}
//          </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Clock className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Notre équipe vérifie vos informations sous 24-48h
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Mail className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Notification par email</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous recevrez un email une fois vérifié
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Building className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous pourrez gérer plusieurs entreprises
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Ajoutez des collaborateurs après vérification
//               </p>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               {currentNewCompany?.verificationStatus === 'VERIFIED' 
//                 ? '✅ Votre entreprise est vérifiée ! Redirection automatique...'
//                 : 'Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.'
//               }
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button 
//                 onClick={handleManualRefresh}
//                 disabled={isRefreshing || currentNewCompany?.verificationStatus === 'VERIFIED'}
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                 {isRefreshing ? 'Vérification...' : 'Vérifier maintenant'}
//               </Button>

//               {/* Show dashboard button if user has any verified companies */}
//               {hasVerifiedCompanies && (
//                 <Button asChild className="flex items-center gap-2">
//                   <Link href="/compagny-dashboard/menu/1">
//                     Tableau de bord
//                     <ArrowRight className="h-4 w-4" />
//                   </Link>
//                 </Button>
//               )}
              
//               <Button asChild variant="outline">
//                 <Link href="/">
//                   Retour à l'accueil
//                 </Link>
//               </Button>
//             </div>
           
//             {/* Force redirect button if verification is stuck */}
//             {currentNewCompany?.verificationStatus === 'VERIFIED' && (
//               <div className="pt-4 border-t">
//                 <p className="text-xs text-gray-500 mb-2">
//                   La redirection ne fonctionne pas?
//                 </p>
//                 <Button asChild size="sm" variant="outline">
//                   <Link href="/compagny-dashboard/menu/1">
//                     Aller au tableau de bord manuellement
//                   </Link>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// // app/register/company/success/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, Clock, Mail, Building, RefreshCw, ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import { Badge } from '@/components/ui/badge';
// import { useCompany } from '@/contexts/CompanyVerificationContext';


// export default function RegistrationSuccessPage() {
//   const { 
//     verifiedCompanies, 
//     pendingCompanies, 
//     refreshCompanyData, 
//     isLoading, 
//     lastRegisteredCompany 
//   } = useCompany();
  
//   const [lastChecked, setLastChecked] = useState<Date>(new Date());
//   const [isManualRefreshing, setIsManualRefreshing] = useState(false);
//   const [checkCount, setCheckCount] = useState(0);

//   const isRefreshing = isLoading || isManualRefreshing;
//   const hasVerifiedCompanies = verifiedCompanies.length > 0;
//   const currentNewCompany = lastRegisteredCompany || pendingCompanies[0];

  

//   // return (
//   //   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//   //     <Card className="w-full max-w-2xl">
//   //       <CardContent className="p-8">



//   //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//   //           <div className="bg-blue-50 p-4 rounded-lg">
//   //             <Clock className="h-8 w-8 text-blue-600 mb-2" />
//   //             <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//   //             <p className="text-sm text-gray-600 mt-1">
//   //               Notre équipe vérifie vos informations sous 24-48h
//   //             </p>
//   //           </div>

//   //           <div className="bg-blue-50 p-4 rounded-lg">
//   //             <Mail className="h-8 w-8 text-blue-600 mb-2" />
//   //             <h3 className="font-semibold text-gray-900">Notification par email</h3>
//   //             <p className="text-sm text-gray-600 mt-1">
//   //               Vous recevrez un email une fois vérifié
//   //             </p>
//   //           </div>

//   //           <div className="bg-blue-50 p-4 rounded-lg">
//   //             <Building className="h-8 w-8 text-blue-600 mb-2" />
//   //             <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//   //             <p className="text-sm text-gray-600 mt-1">
//   //               Vous pourrez gérer plusieurs entreprises
//   //             </p>
//   //           </div>

//   //           <div className="bg-blue-50 p-4 rounded-lg">
//   //             <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//   //             <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//   //             <p className="text-sm text-gray-600 mt-1">
//   //               Ajoutez des collaborateurs après vérification
//   //             </p>
//   //           </div>
//   //         </div>

//   //         <div className="text-center space-y-4">
//   //           <p className="text-sm text-gray-600">
//   //             {hasVerifiedCompanies 
//   //               ? '✅ Votre entreprise est vérifiée ! Redirection automatique...'
//   //               : 'Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.'
//   //             }
//   //           </p>
            
//   //           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//   //             <Button 
//   //               onClick={handleManualRefresh}
//   //               disabled={isRefreshing || hasVerifiedCompanies}
//   //               variant="outline"
//   //               className="flex items-center gap-2"
//   //             >
//   //               <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//   //               {isRefreshing ? 'Vérification...' : 'Vérifier maintenant'}
//   //             </Button>

//   //             {/* Show dashboard button if user has any verified companies */}
//   //             {hasVerifiedCompanies && (
//   //               <Button asChild className="flex items-center gap-2">
//   //                 <Link href={`/compagny-dashboard/${verifiedCompanies[0].slug}/menu/1`}>
//   //                   Tableau de bord
//   //                   <ArrowRight className="h-4 w-4" />
//   //                 </Link>
//   //               </Button>
//   //             )}
              
//   //             <Button asChild variant="outline">
//   //               <Link href="/">
//   //                 Retour à l'accueil
//   //               </Link>
//   //             </Button>
//   //           </div>

//   //           {/* Force redirect button if verification is stuck */}
//   //           {hasVerifiedCompanies && (
//   //             <div className="pt-4 border-t">
//   //               <p className="text-xs text-gray-500 mb-2">
//   //                 La redirection ne fonctionne pas?
//   //               </p>
//   //               <Button asChild size="sm" variant="outline">
//   //                 <Link href={`/compagny-dashboard/${verifiedCompanies[0].slug}/menu/1`}>
//   //                   Aller au tableau de bord manuellement
//   //                 </Link>
//   //               </Button>
//   //             </div>
//   //           )}
//   //         </div>
//   //       </CardContent>
//   //     </Card>
//   //   </div>
//   // );

//     return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <Card className="w-full max-w-2xl">
//         <CardContent className="p-8">
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="h-10 w-10 text-green-600" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Demande d'inscription envoyée !
//             </h1>
//             <p className="text-gray-600">
//               Votre entreprise est en attente de vérification
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Clock className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Notre équipe vérifie vos informations sous 24-48h
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Mail className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Notification par email</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous recevrez un email une fois vérifié
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <Building className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Accès multi-entreprise</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Vous pourrez gérer plusieurs entreprises
//               </p>
//             </div>

//             <div className="bg-blue-50 p-4 rounded-lg">
//               <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
//               <h3 className="font-semibold text-gray-900">Invitez votre équipe</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 Ajoutez des collaborateurs après vérification
//               </p>
//             </div>
//           </div>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               Vous serez automatiquement redirigé vers votre tableau de bord une fois vérifié.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <Button asChild variant="outline">
//                 <Link href="/">
//                   Retour à l'accueil
//                 </Link>
//               </Button>
              
//               <Button asChild>
//                 <Link href="/sign-in">
//                   Se connecter
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );


// }



// app/register/company/success/page.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Mail, Building, CheckCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useCompany } from "@/contexts/CompanyVerificationContext";


export default function RegistrationSuccessPage() {
  const { 
    verifiedCompanies, 
    pendingCompanies, 
    refreshCompanyData, 
    isLoading 
  } = useCompany();

  const hasVerifiedCompanies = verifiedCompanies.length > 0;
  const currentCompany = pendingCompanies[0] || verifiedCompanies[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          {/* <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                hasVerifiedCompanies ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {hasVerifiedCompanies ? (
                  <CheckCircle className="h-10 w-10 text-green-600" />
                ) : (
                  <Clock className="h-10 w-10 text-blue-600" />
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {hasVerifiedCompanies ? 'Entreprise Vérifiée !' : 'Demande d\'inscription envoyée !'}
            </h1>
            
            <p className="text-gray-600">
              {hasVerifiedCompanies 
                ? 'Votre entreprise a été approuvée.' 
                : 'Votre entreprise est en attente de vérification'
              }
            </p> */}
            
            {/* Current company info
            {currentCompany && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-medium">Votre entreprise:</p>
                <p className="text-lg font-semibold text-gray-900">{currentCompany.name}</p>
                <Badge variant={hasVerifiedCompanies ? 'default' : 'secondary'} className="mt-1">
                  {hasVerifiedCompanies ? '✅ Vérifiée' : '⏳ En attente de vérification'}
                </Badge>
              </div>
            )}
          </div> */}
          <div className="text-center mb-8">
           <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
             </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
               Demande d'inscription envoyée !
            </h1>
           <p className="text-gray-600">
              Votre entreprise est en attente de vérification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Vérification en cours</h3>
              <p className="text-sm text-gray-600 mt-1">
                Notre équipe vérifie vos informations sous 24-48h
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Notification par email</h3>
              <p className="text-sm text-gray-600 mt-1">
                Vous recevrez un email une fois vérifié
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={refreshCompanyData}
                disabled={isLoading || hasVerifiedCompanies}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Vérification...' : 'Vérifier maintenant'}
              </Button>

              {hasVerifiedCompanies && (
                <Button asChild className="flex items-center gap-2">
                  <Link href={`/compagny-dashboard/${verifiedCompanies[0].slug}/profile`}>
                    Accéder au tableau de bord
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline">
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}