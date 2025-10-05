

// 'use client'

// import React, { useState } from 'react'
// import { Card, CardContent } from "./ui/card"
// import Image from "next/image"
// import { Button } from "./ui/button"
// import { Clock, MapPin } from "lucide-react"
// import Link from "next/link"
// import { companiesData, Company } from '@/constant/mockData'


// const CompagnyCard = () => {
//   const [visibleOffers, setVisibleOffers] = useState(6)
//   const offersPerPage = 3

//   const loadMoreOffers = () => {
//     setVisibleOffers(prev => prev + offersPerPage)
//   }

//   return (
//     <section className="container mx-auto px-2 py-8">
//       <h1 className="font-semibold text-2xl mb-6">Découvrez les offres</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {companiesData.slice(0, visibleOffers).map((company: Company) => (

//           <Card key={company.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
//             <CardContent className="p-4 space-y-4">
//               <div className="relative w-full h-40 rounded-md overflow-hidden">
//                 <Image
//                   src={company.image}
//                   alt={company.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="relative w-16 h-16">
//                   <Image
//                     src={company.logo}
//                     alt={`${company.name} Logo`}
//                     fill
//                     className="rounded-full object-contain"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-lg font-semibold">{company.title}</p>
//                       <div className="flex items-center gap-1 mt-1">
//                         <p className="text-sm text-gray-500">{company.contract}</p>
//                         <span className="text-gray-400">•</span>
//                         <MapPin size={12} className="text-red-500" />
//                         <p className="text-sm text-gray-500">{company.location}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Clock size={12} />
//                       <p>{company.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <h2 className="text-xl font-bold">Nous recherchons un {company.title}</h2>
//               <div className="space-y-2 text-sm text-gray-700">
//                 <div>
//                   <h4 className="font-semibold">Description de l'entreprise</h4>
//                   <p className="line-clamp-2">{company.description}</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">L'offre</h3>
//                   <p className="line-clamp-2">{company.offer}</p>
//                 </div>
//               </div>
//               <Link href={`/jobs/${company.id}`}>
//                 <Button className="mt-2 w-full">Voir plus</Button>
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       {visibleOffers < companiesData.length && (
//         <div className="flex justify-center items-center mt-8">
//           <Button 
//             onClick={loadMoreOffers}
//             className="cursor-pointer"
//           >
//             Voir plus d'offres
//           </Button>
//         </div>
//       )}
//     </section>
//   )
// }

// export default CompagnyCard

// // components/CompagnyCard.tsx
// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Card, CardContent } from "./ui/card"
// import Image from "next/image"
// import { Button } from "./ui/button"
// import { Clock, MapPin, Star, Building, Filter } from "lucide-react"
// import Link from "next/link"

// import type { FormattedJobPosting } from '@/types/jobPosting'
// import SecondPart from './SecondPart'
// import { useTRPC } from '@/trpc/client'
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

// interface FilterState {
//   search: string
//   secteur: string[]
//   niveau: string[]
//   type: string[]
//   durée: string[]
//   prix: string[]
//   localite: string[]
//   contrat: string[]
//   domaine: string[]
// }

// const CompanyCard = () => {
//   const [visibleOffers, setVisibleOffers] = useState(6)
//   const [filters, setFilters] = useState<FilterState>({
//     search: '',
//     secteur: [],
//     niveau: [],
//     type: [],
//     durée: [],
//     prix: [],
//     localite: [],
//     contrat: [],
//     domaine: []
//   })
//   const [searchTerm, setSearchTerm] = useState('')
//   const offersPerPage = 6
//   const trpc = useTRPC()

//   // Convert frontend filters to backend filters
//   const getBackendFilters = (filters: FilterState) => {
//     const backendFilters: any = {}

//     // Search term
//     if (filters.search) {
//       backendFilters.search = filters.search
//     }

//     // Location filter
//     if (filters.localite.length > 0) {
//       backendFilters.location = filters.localite.join(',')
//     }

//     // Employment type filter (convert to enum)
//     if (filters.contrat.length > 0) {
//       const contractMap: { [key: string]: any } = {
//         'FULL_TIME': 'FULL_TIME',
//         'PART_TIME': 'PART_TIME',
//         'CONTRACT': 'CONTRACT', 
//         'INTERNSHIP': 'INTERNSHIP',
//         'TEMPORARY': 'TEMPORARY'
//       };
//       const contractValue = filters.contrat[0];
//       if (contractMap[contractValue]) {
//         backendFilters.employmentType = contractMap[contractValue];
//       }
//     }

//     // Remote policy filter
//     if (filters.localite.some(loc => loc === 'remote')) {
//       backendFilters.remotePolicy = 'REMOTE';
//     } else if (filters.localite.some(loc => loc === 'hybride')) {
//       backendFilters.remotePolicy = 'HYBRID';
//     }

//     // Salary range filter
//     if (filters.prix.length > 0) {
//       const priceFilter = filters.prix[0];
//       switch (priceFilter) {
//         case 'moins1000':
//           backendFilters.salaryMin = 0
//           backendFilters.salaryMax = 1000
//           break
//         case '1000a2000':
//           backendFilters.salaryMin = 1000
//           backendFilters.salaryMax = 2000
//           break
//         case '2000a3000':
//           backendFilters.salaryMin = 2000
//           backendFilters.salaryMax = 3000
//           break
//         case '3000a4000':
//           backendFilters.salaryMin = 3000
//           backendFilters.salaryMax = 4000
//           break
//         case 'plus4000':
//           backendFilters.salaryMin = 4000
//           break
//         default:
//           break
//       }
//     }

//     return backendFilters
//   }

//   const { data: jobsData, isLoading, error, refetch } = useQuery(trpc.publishedJob.getActiveJobPostings.queryOptions({
//     limit: visibleOffers,
//     ...getBackendFilters(filters)
//   },{
//     refetchOnWindowFocus: false,
//    placeholderData: (previousData) => previousData, 
//   }))

// //   const {
// //   data,
// //   error,
// //   fetchNextPage,
// //   hasNextPage,
// //   isFetchingNextPage,
// //   refetch,
// //   isLoading,
// // } = useInfiniteQuery({
// //   ...trpc.publishedJob.getActiveJobPostings.queryOptions({
// //     ...getBackendFilters(filters),
// //     limit: 6,
// //   }),
// //   getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
// //   refetchOnWindowFocus: false,
// //   placeholderData: (previousData) => previousData, // replaces keepPreviousData
// // })

  

//   // Refetch when filters change
//   useEffect(() => {
//     refetch()
//   }, [filters, visibleOffers, refetch])

//   const loadMoreOffers = () => {
//     setVisibleOffers(prev => prev + offersPerPage)
//   }

//   const handleFiltersChange = (newFilters: FilterState) => {
//     setFilters(newFilters)
//     setVisibleOffers(6) // Reset to first page when filters change
//   }

//   const handleSearch = (search: string) => {
//     setFilters(prev => ({ ...prev, search }))
//     setSearchTerm(search)
//     setVisibleOffers(6)
//   }

//   const formatContractType = (contract: string) => {
//     const contractMap: { [key: string]: string } = {
//       'FULL_TIME': 'CDI',
//       'PART_TIME': 'Temps partiel',
//       'CONTRACT': 'CDD',
//       'INTERNSHIP': 'Stage',
//       'TEMPORARY': 'Intérim'
//     }
//     return contractMap[contract] || contract
//   }

//   const formatExperienceLevel = (level: string) => {
//     const levelMap: { [key: string]: string } = {
//       'INTERNSHIP': 'Stage',
//       'ENTRY_LEVEL': 'Débutant',
//       'JUNIOR': 'Junior',
//       'MID_LEVEL': 'Intermédiaire',
//       'SENIOR': 'Senior',
//       'LEAD': 'Lead',
//       'EXECUTIVE': 'Direction'
//     }
//     return levelMap[level] || level
//   }

//   const formatRemotePolicy = (policy: string) => {
//     const policyMap: { [key: string]: string } = {
//       'ONSITE': 'Présentiel',
//       'HYBRID': 'Hybride',
//       'REMOTE': 'Distanciel'
//     }
//     return policyMap[policy] || policy
//   }

//   const clearAllFilters = () => {
//     setFilters({
//       search: '',
//       secteur: [],
//       niveau: [],
//       type: [],
//       durée: [],
//       prix: [],
//       localite: [],
//       contrat: [],
//       domaine: []
//     })
//     setSearchTerm('')
//     setVisibleOffers(6)
//   }

//   const activeFilterCount = Object.values(filters).reduce((count, filterArray) => {
//     if (Array.isArray(filterArray)) {
//       return count + filterArray.length
//     }
//     return count
//   }, 0) + (filters.search ? 1 : 0)

//   const jobs: FormattedJobPosting[] = jobsData?.jobs || []

//   // const jobs = data?.pages.flatMap((page) => page.jobs) ?? []


//   if (isLoading) {
//     return (
//       <section className="container mx-auto px-2 py-8">
//         <h1 className="font-semibold text-2xl mb-6">Découvrez les offres</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Card key={index} className="overflow-hidden shadow-lg animate-pulse">
//               <CardContent className="p-4 space-y-4">
//                 <div className="w-full h-40 bg-gray-200 rounded-md"></div>
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="container mx-auto px-2 py-8">
//         <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg">
//           <Building className="mx-auto h-12 w-12 text-red-400 mb-4" />
//           <h3 className="text-lg font-medium text-red-800 mb-2">
//             Erreur lors du chargement des offres
//           </h3>
//           <p className="text-red-600 mb-4">{error.message}</p>
//           <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
//             Réessayer
//           </Button>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="container mx-auto px-2 py-8">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="font-semibold text-2xl">Découvrez les offres</h1>
//         {activeFilterCount > 0 && (
//           <div className="flex items-center gap-2 text-sm text-blue-600">
//             <Filter size={16} />
//             <span>{activeFilterCount} filtre(s) actif(s)</span>
//           </div>
//         )}
//       </div>
      
//       {/* Filters Section */}
//       <div className="mb-8">
//         <SecondPart 
//           onFiltersChange={handleFiltersChange}
//           onSearch={handleSearch}
//           initialSearch={searchTerm}
//         />
//       </div>

//       {/* Results Count */}
//       <div className="mb-6 text-gray-600 flex items-center justify-between">
//         <p>
//           {jobs.length > 0 ? (
//             <>
//               <span className="font-semibold">{jobs.length}</span> offre(s) trouvée(s)
//               {searchTerm && ` pour "${searchTerm}"`}
//             </>
//           ) : (
//             'Aucune offre trouvée'
//           )}
//         </p>
//         {activeFilterCount > 0 && (
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={clearAllFilters}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             Effacer tous les filtres
//           </Button>
//         )}
//       </div>
      
//       {jobs.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <Building className="mx-auto h-12 w-12 text-gray-400" />
//           <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune offre disponible</h3>
//           <p className="mt-2 text-gray-500 mb-4">
//             Aucune offre d'emploi ne correspond à vos critères de recherche.
//           </p>
//           <Button 
//             className="cursor-pointer"
//             onClick={clearAllFilters}
//           >
//             Réinitialiser les filtres
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.map((job) => (
//               <Card 
//                 key={job.id} 
//                 className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
//                   job.isFeatured ? 'border-2 border-yellow-400' : 'border-gray-200'
//                 }`}
//               >
//                 {job.isFeatured && (
//                   <div className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 flex items-center gap-1">
//                     <Star className="h-3 w-3 fill-current" />
//                     Offre en vedette
//                   </div>
//                 )}
                
//                 <CardContent className="p-4 space-y-4">
//                   <div className="relative w-full h-40 rounded-md overflow-hidden">
//                     <Image
//                       src={job.image}
//                       alt={job.name}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     {job.company.isVerified && (
//                       <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                         <Star className="h-3 w-3 fill-current" />
//                         Vérifié
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-16 h-16 flex-shrink-0">
//                       <Image
//                         src={job.logo}
//                         alt={`${job.name} Logo`}
//                         fill
//                         className="rounded-full object-cover border-2 border-gray-100"
//                         sizes="64px"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start gap-2">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-lg font-semibold truncate">{job.title}</p>
//                           <div className="flex items-center gap-1 mt-1 flex-wrap">
//                             <p className="text-sm text-gray-500">{formatContractType(job.contract)}</p>
//                             <span className="text-gray-400">•</span>
//                             <MapPin size={12} className="text-red-500 flex-shrink-0" />
//                             <p className="text-sm text-gray-500 truncate">{job.location}</p>
//                           </div>
//                           {job.salary && (
//                             <p className="text-sm text-green-600 font-semibold mt-1">
//                               {job.salary.toLocaleString('fr-FR')} €/mois
//                             </p>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
//                           <Clock size={12} />
//                           <p className="whitespace-nowrap">{job.time}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <h2 className="text-xl font-bold line-clamp-1">Nous recherchons un {job.title}</h2>
                  
//                   <div className="space-y-2 text-sm text-gray-700">
//                     <div>
//                       <h4 className="font-semibold">Description de l'entreprise</h4>
//                       <p className="line-clamp-2">{job.description}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold">L'offre</h3>
//                       <p className="line-clamp-2">{job.offer}</p>
//                     </div>
//                   </div>

//                   {job.tags && job.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1">
//                       {job.tags.slice(0, 3).map((tag, index) => (
//                         <span 
//                           key={index}
//                           className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="bg-gray-100 px-2 py-1 rounded">
//                       {formatExperienceLevel(job.experienceLevel)}
//                     </span>
//                     <span className="bg-gray-100 px-2 py-1 rounded">
//                       {formatRemotePolicy(job.remotePolicy)}
//                     </span>
//                   </div>

//                   <Link href={`/jobs/${job.id}`}>
//                     <Button className="mt-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
//                       Voir plus
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {jobsData?.nextCursor && (
//             <div className="flex justify-center items-center mt-8">
//               <Button 
//                 onClick={loadMoreOffers}
//                 className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Chargement...' : 'Voir plus d\'offres'}
//               </Button>
//             </div>
//           )}

//           {/* {hasNextPage && (
//   <div className="flex justify-center items-center mt-8">
//     <Button
//       onClick={() => fetchNextPage()}
//       className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8"
//       disabled={isFetchingNextPage}
//     >
//       {isFetchingNextPage ? 'Chargement...' : 'Voir plus d\'offres'}
//     </Button>
//   </div>
// )} */}

//         </>
//       )}
//     </section>
//   )
// }

// export default CompanyCard



















// components/CompagnyCard.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Clock, MapPin, Star, Building, Filter } from "lucide-react"
import Link from "next/link"

import type { FormattedJobPosting } from '@/types/jobPosting'
import SecondPart from './SecondPart'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

interface FilterState {
  search: string
  secteur: string[]
  niveau: string[]
  type: string[]
  durée: string[]
  prix: string[]
  localite: string[]
  contrat: string[]
  domaine: string[]
}

const CompanyCard = () => {
  const [visibleOffers, setVisibleOffers] = useState(6)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    secteur: [],
    niveau: [],
    type: [],
    durée: [],
    prix: [],
    localite: [],
    contrat: [],
    domaine: []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const offersPerPage = 6
  const trpc = useTRPC()

  // Debug: log what useTRPC returns
  React.useEffect(() => {
    console.log('useTRPC returns:', trpc)
    console.log('Available methods:', Object.keys(trpc))
  }, [trpc])

  // Convert frontend filters to backend filters
  const getBackendFilters = useCallback((filters: FilterState) => {
    const backendFilters: any = {}

    // Search term
    if (filters.search) {
      backendFilters.search = filters.search
    }

    // Location filter
    if (filters.localite.length > 0) {
      backendFilters.location = filters.localite.join(',')
    }

    // Employment type filter (convert to enum)
    if (filters.contrat.length > 0) {
      const contractMap: { [key: string]: any } = {
        'FULL_TIME': 'FULL_TIME',
        'PART_TIME': 'PART_TIME',
        'CONTRACT': 'CONTRACT', 
        'INTERNSHIP': 'INTERNSHIP',
        'TEMPORARY': 'TEMPORARY'
      };
      const contractValue = filters.contrat[0];
      if (contractMap[contractValue]) {
        backendFilters.employmentType = contractMap[contractValue];
      }
    }

    // Remote policy filter
    if (filters.localite.some(loc => loc === 'remote')) {
      backendFilters.remotePolicy = 'REMOTE';
    } else if (filters.localite.some(loc => loc === 'hybride')) {
      backendFilters.remotePolicy = 'HYBRID';
    }

    // Salary range filter
    if (filters.prix.length > 0) {
      const priceFilter = filters.prix[0];
      switch (priceFilter) {
        case 'moins1000':
          backendFilters.salaryMin = 0
          backendFilters.salaryMax = 1000
          break
        case '1000a2000':
          backendFilters.salaryMin = 1000
          backendFilters.salaryMax = 2000
          break
        case '2000a3000':
          backendFilters.salaryMin = 2000
          backendFilters.salaryMax = 3000
          break
        case '3000a4000':
          backendFilters.salaryMin = 3000
          backendFilters.salaryMax = 4000
          break
        case 'plus4000':
          backendFilters.salaryMin = 4000
          break
        default:
          break
      }
    }

    return backendFilters
  }, [])

  // Handle filters change from SecondPart
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setVisibleOffers(6) // Reset to first page when filters change
  }, [])

  // Handle search from SecondPart
  const handleSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }))
    setSearchTerm(search)
    setVisibleOffers(6)
  }, [])

   const { data: jobsData, isLoading, error, refetch } = useQuery(trpc.publishedJob.getActiveJobPostings.queryOptions({
    limit: visibleOffers,
    ...getBackendFilters(filters)
  },{
    refetchOnWindowFocus: false,
   placeholderData: (previousData) => previousData, 
  }))
  // Refetch when filters change
  useEffect(() => {
    refetch()
  }, [filters, visibleOffers, refetch])

  const loadMoreOffers = () => {
    setVisibleOffers(prev => prev + offersPerPage)
  }

  const formatContractType = (contract: string) => {
    const contractMap: { [key: string]: string } = {
      'FULL_TIME': 'CDI',
      'PART_TIME': 'Temps partiel',
      'CONTRACT': 'CDD',
      'INTERNSHIP': 'Stage',
      'TEMPORARY': 'Intérim'
    }
    return contractMap[contract] || contract
  }

  const formatExperienceLevel = (level: string) => {
    const levelMap: { [key: string]: string } = {
      'INTERNSHIP': 'Stage',
      'ENTRY_LEVEL': 'Débutant',
      'JUNIOR': 'Junior',
      'MID_LEVEL': 'Intermédiaire',
      'SENIOR': 'Senior',
      'LEAD': 'Lead',
      'EXECUTIVE': 'Direction'
    }
    return levelMap[level] || level
  }

  const formatRemotePolicy = (policy: string) => {
    const policyMap: { [key: string]: string } = {
      'ONSITE': 'Présentiel',
      'HYBRID': 'Hybride',
      'REMOTE': 'Distanciel'
    }
    return policyMap[policy] || policy
  }

  const clearAllFilters = () => {
    setFilters({
      search: '',
      secteur: [],
      niveau: [],
      type: [],
      durée: [],
      prix: [],
      localite: [],
      contrat: [],
      domaine: []
    })
    setSearchTerm('')
    setVisibleOffers(6)
  }

  const activeFilterCount = Object.values(filters).reduce((count, filterArray) => {
    if (Array.isArray(filterArray)) {
      return count + filterArray.length
    }
    return count
  }, 0) + (filters.search ? 1 : 0)

  const jobs: FormattedJobPosting[] = jobsData?.jobs || []

  if (isLoading) {
    return (
      <section className="container mx-auto px-2 py-8">
        <h1 className="font-semibold text-2xl mb-6">Découvrez les offres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden shadow-lg animate-pulse">
              <CardContent className="p-4 space-y-4">
                <div className="w-full h-40 bg-gray-200 rounded-md"></div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-2 py-8">
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg">
          <Building className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Erreur lors du chargement des offres
          </h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
            Réessayer
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-2 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-semibold text-2xl">Découvrez les offres</h1>
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Filter size={16} />
            <span>{activeFilterCount} filtre(s) actif(s)</span>
          </div>
        )}
      </div>
      

      {/* Rest of your component remains the same */}
      {/* ... */}
       {/* Filters Section */}
      <div className="mb-8">
        <SecondPart 
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          initialSearch={searchTerm}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600 flex items-center justify-between">
        <p>
          {jobs.length > 0 ? (
            <>
              <span className="font-semibold">{jobs.length}</span> offre(s) trouvée(s)
              {searchTerm && ` pour "${searchTerm}"`}
            </>
          ) : (
            'Aucune offre trouvée'
          )}
        </p>
        {activeFilterCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            Effacer tous les filtres
          </Button>
        )}
      </div>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune offre disponible</h3>
          <p className="mt-2 text-gray-500 mb-4">
            Aucune offre d'emploi ne correspond à vos critères de recherche.
          </p>
          <Button 
            className="cursor-pointer"
            onClick={clearAllFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card 
                key={job.id} 
                className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
                  job.isFeatured ? 'border-2 border-green-600' : 'border-gray-200'
                }`}
              >
                {job.isFeatured && (
                  <div className="bg-blue-400 text-yellow-900 text-xs font-semibold px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Offre en vedette
                  </div>
                )}
                
                <CardContent className="p-4 space-y-4">
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <Image
                      src={job.image}
                      alt={job.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {job.company.isVerified && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Vérifié
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={job.logo}
                        alt={`${job.name} Logo`}
                        fill
                        className="rounded-full object-cover border-2 border-gray-100"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold truncate">{job.title}</p>
                          <div className="flex items-center gap-1 mt-1 flex-wrap">
                            <p className="text-sm text-gray-500">{formatContractType(job.contract)}</p>
                            <span className="text-gray-400">•</span>
                            <MapPin size={12} className="text-red-500 flex-shrink-0" />
                            <p className="text-sm text-gray-500 truncate">{job.location}</p>
                          </div>
                          {job.salary && (
                            <p className="text-sm text-green-600 font-semibold mt-1">
                              {job.salary.toLocaleString('fr-FR')} €/mois
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
                          <Clock size={12} />
                          <p className="whitespace-nowrap">{job.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold line-clamp-1">Nous recherchons un {job.title}</h2>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>
                      <h4 className="font-semibold">Description de l'entreprise</h4>
                      <p className="line-clamp-2">{job.description}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">L'offre</h3>
                      <p className="line-clamp-2">{job.offer}</p>
                    </div>
                  </div>

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {formatExperienceLevel(job.experienceLevel)}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {formatRemotePolicy(job.remotePolicy)}
                    </span>
                  </div>

                  <Link href={`/jobs/${job.id}`}>
                    <Button className="mt-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
                      Voir plus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {jobsData?.nextCursor && (
            <div className="flex justify-center items-center mt-8">
              <Button 
                onClick={loadMoreOffers}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8"
                disabled={isLoading}
              >
                {isLoading ? 'Chargement...' : 'Voir plus d\'offres'}
              </Button>
            </div>
          )}

          {/* {hasNextPage && (
  <div className="flex justify-center items-center mt-8">
    <Button
      onClick={() => fetchNextPage()}
      className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8"
      disabled={isFetchingNextPage}
    >
      {isFetchingNextPage ? 'Chargement...' : 'Voir plus d\'offres'}
    </Button>
  </div>
)} */}

        </>
      )}
    </section>
  )
}

export default CompanyCard

// // components/CompagnyCard.tsx
// 'use client'

// import React, { useState, useCallback, useMemo } from 'react'
// import { Card, CardContent } from "./ui/card"
// import Image from "next/image"
// import { Button } from "./ui/button"
// import { Clock, MapPin, Star, Building, Filter } from "lucide-react"
// import Link from "next/link"
// import { useInfiniteQuery } from '@tanstack/react-query'

// import type { FormattedJobPosting } from '@/types/jobPosting'
// import SecondPart from './SecondPart'

// interface FilterState {
//   search: string
//   secteur: string[]
//   niveau: string[]
//   type: string[]
//   durée: string[]
//   prix: string[]
//   localite: string[]
//   contrat: string[]
//   domaine: string[]
// }

// interface CompanyCardProps {
//   trpc: any
// }

// const CompanyCard: React.FC<CompanyCardProps> = ({ trpc }) => {
//   const [filters, setFilters] = useState<FilterState>({
//     search: '',
//     secteur: [],
//     niveau: [],
//     type: [],
//     durée: [],
//     prix: [],
//     localite: [],
//     contrat: [],
//     domaine: []
//   })
  
//   const [searchTerm, setSearchTerm] = useState('')
//   const offersPerPage = 6

//   // Memoize backend filters to prevent unnecessary recalculations
//   const backendFilters = useMemo(() => {
//     const backendFilters: any = {}

//     // Search term
//     if (filters.search) {
//       backendFilters.search = filters.search
//     }

//     // Location filter
//     if (filters.localite.length > 0) {
//       backendFilters.location = filters.localite.join(',')
//     }

//     // Employment type filter
//     if (filters.contrat.length > 0) {
//       const contractMap: { [key: string]: any } = {
//         'FULL_TIME': 'FULL_TIME',
//         'PART_TIME': 'PART_TIME',
//         'CONTRACT': 'CONTRACT', 
//         'INTERNSHIP': 'INTERNSHIP',
//         'TEMPORARY': 'TEMPORARY'
//       };
//       const contractValue = filters.contrat[0];
//       if (contractMap[contractValue]) {
//         backendFilters.employmentType = contractMap[contractValue];
//       }
//     }

//     // Remote policy filter
//     if (filters.localite.some(loc => loc === 'remote')) {
//       backendFilters.remotePolicy = 'REMOTE';
//     } else if (filters.localite.some(loc => loc === 'hybride')) {
//       backendFilters.remotePolicy = 'HYBRID';
//     }

//     // Salary range filter
//     if (filters.prix.length > 0) {
//       const priceFilter = filters.prix[0];
//       switch (priceFilter) {
//         case 'moins1000':
//           backendFilters.salaryMin = 0
//           backendFilters.salaryMax = 1000
//           break
//         case '1000a2000':
//           backendFilters.salaryMin = 1000
//           backendFilters.salaryMax = 2000
//           break
//         case '2000a3000':
//           backendFilters.salaryMin = 2000
//           backendFilters.salaryMax = 3000
//           break
//         case '3000a4000':
//           backendFilters.salaryMin = 3000
//           backendFilters.salaryMax = 4000
//           break
//         case 'plus4000':
//           backendFilters.salaryMin = 4000
//           break
//         default:
//           break
//       }
//     }

//     return backendFilters
//   }, [filters])

//   // Infinite query implementation
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ['jobs', 'infinite', backendFilters],
//     queryFn: async ({ pageParam }) => {
//       if (!trpc?.publishedJob?.getActiveJobPostings) {
//         throw new Error('TRPC client not properly initialized')
//       }
      
//       const result = await trpc.publishedJob.getActiveJobPostings.query({
//         limit: offersPerPage,
//         cursor: pageParam,
//         ...backendFilters
//       })
      
//       return result
//     },
//     initialPageParam: undefined as string | undefined,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     retry: 2,
//   })

//   // Handle filters change from SecondPart
//   const handleFiltersChange = useCallback((newFilters: FilterState) => {
//     setFilters(newFilters)
//   }, [])

//   // Handle search from SecondPart
//   const handleSearch = useCallback((search: string) => {
//     setFilters(prev => ({ ...prev, search }))
//     setSearchTerm(search)
//   }, [])

//   const formatContractType = (contract: string) => {
//     const contractMap: { [key: string]: string } = {
//       'FULL_TIME': 'CDI',
//       'PART_TIME': 'Temps partiel',
//       'CONTRACT': 'CDD',
//       'INTERNSHIP': 'Stage',
//       'TEMPORARY': 'Intérim'
//     }
//     return contractMap[contract] || contract
//   }

//   const formatExperienceLevel = (level: string) => {
//     const levelMap: { [key: string]: string } = {
//       'INTERNSHIP': 'Stage',
//       'ENTRY_LEVEL': 'Débutant',
//       'JUNIOR': 'Junior',
//       'MID_LEVEL': 'Intermédiaire',
//       'SENIOR': 'Senior',
//       'LEAD': 'Lead',
//       'EXECUTIVE': 'Direction'
//     }
//     return levelMap[level] || level
//   }

//   const formatRemotePolicy = (policy: string) => {
//     const policyMap: { [key: string]: string } = {
//       'ONSITE': 'Présentiel',
//       'HYBRID': 'Hybride',
//       'REMOTE': 'Distanciel'
//     }
//     return policyMap[policy] || policy
//   }

//   const clearAllFilters = () => {
//     setFilters({
//       search: '',
//       secteur: [],
//       niveau: [],
//       type: [],
//       durée: [],
//       prix: [],
//       localite: [],
//       contrat: [],
//       domaine: []
//     })
//     setSearchTerm('')
//   }

//   const activeFilterCount = Object.values(filters).reduce((count, filterArray) => {
//     if (Array.isArray(filterArray)) {
//       return count + filterArray.length
//     }
//     return count
//   }, 0) + (filters.search ? 1 : 0)

//   // Flatten all jobs from all pages
//   const allJobs = useMemo(() => {
//     return data?.pages.flatMap(page => page.jobs) || []
//   }, [data])

//   const isLoading = status === 'pending'
//   const isError = status === 'error'

//   if (isLoading && !data) {
//     return (
//       <section className="container mx-auto px-2 py-8">
//         <h1 className="font-semibold text-2xl mb-6">Découvrez les offres</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <Card key={index} className="overflow-hidden shadow-lg animate-pulse">
//               <CardContent className="p-4 space-y-4">
//                 <div className="w-full h-40 bg-gray-200 rounded-md"></div>
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//                   <div className="flex-1 space-y-2">
//                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>
//     )
//   }

//   if (isError) {
//     return (
//       <section className="container mx-auto px-2 py-8">
//         <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg">
//           <Building className="mx-auto h-12 w-12 text-red-400 mb-4" />
//           <h3 className="text-lg font-medium text-red-800 mb-2">
//             Erreur lors du chargement des offres
//           </h3>
//           <p className="text-red-600 mb-4">{error?.message || 'Une erreur est survenue'}</p>
//           <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700">
//             Réessayer
//           </Button>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="container mx-auto px-2 py-8">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="font-semibold text-2xl">Découvrez les offres</h1>
//         {activeFilterCount > 0 && (
//           <div className="flex items-center gap-2 text-sm text-blue-600">
//             <Filter size={16} />
//             <span>{activeFilterCount} filtre(s) actif(s)</span>
//           </div>
//         )}
//       </div>
      
//       {/* Filters Section */}
//       <div className="mb-8">
//         <SecondPart 
//           onFiltersChange={handleFiltersChange}
//           onSearch={handleSearch}
//           initialSearch={searchTerm}
//         />
//       </div>

//       {/* Results Count */}
//       <div className="mb-6 text-gray-600 flex items-center justify-between">
//         <p>
//           {allJobs.length > 0 ? (
//             <>
//               <span className="font-semibold">{allJobs.length}</span> offre(s) trouvée(s)
//               {searchTerm && ` pour "${searchTerm}"`}
//             </>
//           ) : (
//             'Aucune offre trouvée'
//           )}
//         </p>
//         {activeFilterCount > 0 && (
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={clearAllFilters}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             Effacer tous les filtres
//           </Button>
//         )}
//       </div>
      
//       {allJobs.length === 0 && !isLoading ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <Building className="mx-auto h-12 w-12 text-gray-400" />
//           <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune offre disponible</h3>
//           <p className="mt-2 text-gray-500 mb-4">
//             Aucune offre d'emploi ne correspond à vos critères de recherche.
//           </p>
//           <Button 
//             className="cursor-pointer"
//             onClick={clearAllFilters}
//           >
//             Réinitialiser les filtres
//           </Button>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {allJobs.map((job) => (
//               <Card 
//                 key={job.id} 
//                 className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
//                   job.isFeatured ? 'border-2 border-yellow-400' : 'border-gray-200'
//                 }`}
//               >
//                 {job.isFeatured && (
//                   <div className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 flex items-center gap-1">
//                     <Star className="h-3 w-3 fill-current" />
//                     Offre en vedette
//                   </div>
//                 )}
                
//                 <CardContent className="p-4 space-y-4">
//                   <div className="relative w-full h-40 rounded-md overflow-hidden">
//                     <Image
//                       src={job.image}
//                       alt={job.name}
//                       fill
//                       className="object-cover"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       priority={job.isFeatured}
//                     />
//                     {job.company.isVerified && (
//                       <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                         <Star className="h-3 w-3 fill-current" />
//                         Vérifié
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="relative w-16 h-16 flex-shrink-0">
//                       <Image
//                         src={job.logo}
//                         alt={`${job.name} Logo`}
//                         fill
//                         className="rounded-full object-cover border-2 border-gray-100"
//                         sizes="64px"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start gap-2">
//                         <div className="flex-1 min-w-0">
//                           <p className="text-lg font-semibold truncate">{job.title}</p>
//                           <div className="flex items-center gap-1 mt-1 flex-wrap">
//                             <p className="text-sm text-gray-500">{formatContractType(job.contract)}</p>
//                             <span className="text-gray-400">•</span>
//                             <MapPin size={12} className="text-red-500 flex-shrink-0" />
//                             <p className="text-sm text-gray-500 truncate">{job.location}</p>
//                           </div>
//                           {job.salary && (
//                             <p className="text-sm text-green-600 font-semibold mt-1">
//                               {job.salary.toLocaleString('fr-FR')} €/mois
//                             </p>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
//                           <Clock size={12} />
//                           <p className="whitespace-nowrap">{job.time}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <h2 className="text-xl font-bold line-clamp-1">Nous recherchons un {job.title}</h2>
                  
//                   <div className="space-y-2 text-sm text-gray-700">
//                     <div>
//                       <h4 className="font-semibold">Description de l'entreprise</h4>
//                       <p className="line-clamp-2">{job.description}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold">L'offre</h3>
//                       <p className="line-clamp-2">{job.offer}</p>
//                     </div>
//                   </div>

//                   {job.tags && job.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1">
//                       {job.tags.slice(0, 3).map((tag:any, index:any) => (
//                         <span 
//                           key={index}
//                           className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span className="bg-gray-100 px-2 py-1 rounded">
//                       {formatExperienceLevel(job.experienceLevel)}
//                     </span>
//                     <span className="bg-gray-100 px-2 py-1 rounded">
//                       {formatRemotePolicy(job.remotePolicy)}
//                     </span>
//                   </div>

//                   <Link href={`/jobs/${job.id}`} className="block">
//                     <Button className="mt-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
//                       Voir plus
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
            
//             {/* Loading skeletons for next page */}
//             {isFetchingNextPage && Array.from({ length: offersPerPage }).map((_, index) => (
//               <Card key={`loading-${index}`} className="overflow-hidden shadow-lg animate-pulse">
//                 <CardContent className="p-4 space-y-4">
//                   <div className="w-full h-40 bg-gray-200 rounded-md"></div>
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//                     <div className="flex-1 space-y-2">
//                       <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                       <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {hasNextPage && (
//             <div className="flex justify-center items-center mt-8">
//               <Button 
//                 onClick={() => fetchNextPage()}
//                 className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8"
//                 disabled={isFetchingNextPage}
//               >
//                 {isFetchingNextPage ? 'Chargement...' : 'Voir plus d\'offres'}
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   )
// }

// export default CompanyCard