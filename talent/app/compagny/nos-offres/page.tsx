// // src/app/companies/l-oreal/nos-offres/page.tsx
// import Header from "@/components/Header";

import Header from "../_components/Header";
import CompanyHeader from "./_components/CompanyHeader";
import FiltersSidebar from "./_components/FiltersSidebar";
import FooterSection from "./_components/FooterSection";
import JobsList from "./_components/JobsList";
import Navigation from "./_components/Navigation";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { MapPin, Briefcase, Calendar, Filter, Search } from "lucide-react";
// import FooterSection from "../_components/FooterSection";

// export default function LorealJobsPage() {
//   // Sample job data
//   const jobs = [
//     {
//       title: "6-month Internship - Assurance Qualité - JANVIER 2026",
//       type: "Stage",
//       location: "Aulnay",
//       remote: true,
//       time: "il y a 9 heures"
//     },
//     {
//       title: "STAGE 6 MOIS - Développement d'ingrédients cosmétiques innovants",
//       type: "Stage",
//       location: "Paris",
//       remote: true,
//       time: "il y a 9 heures"
//     },
//     {
//       title: "STAGE 6 MOIS - MARKETING - DERMATOLOGICAL BEAUTY DIVISION",
//       type: "Stage",
//       location: "Levallois-Perret",
//       remote: true,
//       time: "hier"
//     },
//     {
//       title: "6 month internship - Luxe division Customer Care Projects",
//       type: "Stage",
//       location: "Orléans",
//       remote: true,
//       time: "hier"
//     },
//     {
//       title: "CDI - Technicien(ne) de recherche en analyse physicochimique",
//       type: "CDI",
//       location: "Aulnay",
//       remote: true,
//       time: "hier"
//     },
//     {
//       title: "STAGE 6 MOIS - RETAIL DESIGN - JANVIER 2026",
//       type: "Stage",
//       location: "Levallois-Perret",
//       remote: true,
//       time: "hier"
//     },
//     {
//       title: "Cyberdefense Project Manager",
//       type: "CDI",
//       location: "Saint-Ouen",
//       remote: true,
//       time: "il y a 3 jours"
//     },
//     {
//       title: "ServiceNow Architect",
//       type: "CDI",
//       location: "Saint-Ouen",
//       remote: true,
//       time: "il y a 4 jours"
//     }
//   ];

//   const jobTypes = ["Stage", "CDI", "CDD / Temporaire"];
//   const locations = ["Paris", "Clichy", "Levallois-Perret", "Aulnay", "Orléans", "Saint-Ouen", "Saint-Quentin", "Cambrai"];
//   const professions = ["Marketing", "R&D", "Qualité", "Supply Chain", "RH", "IT", "Production", "Juridique"];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Company Header */}
//         <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-8">
//           <div className="container max-w-6xl mx-auto px-4">
//             <div className="flex flex-col md:flex-row items-start gap-6">
//               <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
//                 <span className="text-xl font-bold text-gray-800">L'Oréal</span>
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                   <div>
//                     <h1 className="text-3xl font-bold text-gray-900">L'Oréal Groupe</h1>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Badge variant="secondary">Cosmétique</Badge>
//                       <Badge variant="secondary">E-commerce</Badge>
//                       <Badge variant="secondary">Luxe</Badge>
//                     </div>
//                   </div>
//                   <Button className="bg-blue-600 hover:bg-blue-700">Suivre</Button>
//                 </div>
                
//                 <div className="flex items-center gap-2 text-gray-600 mb-4">
//                   <MapPin className="h-5 w-5" />
//                   <span>Clichy</span>
//                 </div>
                
//                 <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
//                   Voir le site
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Navigation */}
//         <section className="bg-white border-b">
//           <div className="container max-w-6xl mx-auto px-4">
//             <nav className="flex overflow-x-auto gap-8 py-4">
//               <a href="/companies/l-oreal" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Profil</a>
//               <a href="/companies/l-oreal/nos-offres" className="whitespace-nowrap font-medium text-gray-900 border-b-2 border-blue-600 pb-1">Jobs</a>
//               <a href="#metiers" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Métiers</a>
//               <a href="#diversity" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">Diversité</a>
//               <a href="#rse" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900">RSE</a>
//             </nav>
//           </div>
//         </section>

//         <div className="container max-w-6xl mx-auto px-4 py-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Filters Sidebar */}
//             <div className="lg:w-1/4">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h2 className="text-xl font-bold">Filtres</h2>
//                     <Filter className="h-5 w-5 text-gray-500" />
//                   </div>

//                   {/* Search Input */}
//                   <div className="mb-6">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
//                       <Input
//                         placeholder="Recherchez par job, mot-clé ou entreprise"
//                         className="pl-10"
//                       />
//                     </div>
//                   </div>

//                   {/* Location Filter */}
//                   <div className="mb-6">
//                     <Label className="font-medium mb-2 block">Localisation</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="N'importe où" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {locations.map((location, index) => (
//                           <SelectItem key={index} value={location.toLowerCase()}>
//                             {location}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Job Type Filter */}
//                   <div className="mb-6">
//                     <Label className="font-medium mb-2 block">Type de job</Label>
//                     <div className="space-y-2">
//                       {jobTypes.map((type, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <Checkbox id={`type-${index}`} />
//                           <Label htmlFor={`type-${index}`} className="text-sm">{type}</Label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Remote Work Filter */}
//                   <div className="mb-6">
//                     <Label className="font-medium mb-2 block">Télétravail</Label>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="remote" />
//                       <Label htmlFor="remote" className="text-sm">Télétravail possible</Label>
//                     </div>
//                   </div>

//                   {/* Profession Filter */}
//                   <div className="mb-6">
//                     <Label className="font-medium mb-2 block">Professions</Label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Tous les filtres" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {professions.map((profession, index) => (
//                           <SelectItem key={index} value={profession.toLowerCase()}>
//                             {profession}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <Button variant="outline" className="w-full">
//                     Appliquer les filtres
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Jobs List */}
//             <div className="lg:w-3/4">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold">Jobs</h2>
//                 <div className="flex items-center gap-4">
//                   <span className="text-gray-600">93 offres</span>
//                   <Select defaultValue="pertinence">
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Trier par" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pertinence">Pertinence</SelectItem>
//                       <SelectItem value="date">Date</SelectItem>
//                       <SelectItem value="localisation">Localisation</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {jobs.map((job, index) => (
//                   <Card key={index} className="hover:shadow-md transition-shadow">
//                     <CardContent className="p-6">
//                       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                         <div className="flex-1">
//                           <h3 className="font-bold text-lg mb-2">{job.title}</h3>
//                           <div className="flex flex-wrap items-center gap-2 mb-3">
//                             <Badge variant="outline" className="flex items-center gap-1">
//                               <Briefcase className="h-3 w-3" />
//                               {job.type}
//                             </Badge>
//                             <Badge variant="outline" className="flex items-center gap-1">
//                               <MapPin className="h-3 w-3" />
//                               {job.location}
//                             </Badge>
//                             {job.remote && (
//                               <Badge variant="secondary" className="flex items-center gap-1">
//                                 Télétravail fréquent
//                               </Badge>
//                             )}
//                           </div>
//                           <p className="text-gray-500 text-sm flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             {job.time}
//                           </p>
//                         </div>
//                         <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
//                           Postuler
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8">
//                 <div className="flex items-center gap-2">
//                   <Button variant="outline" className="w-10 h-10 p-0">1</Button>
//                   <Button variant="outline" className="w-10 h-10 p-0">2</Button>
//                   <Button variant="outline" className="w-10 h-10 p-0">3</Button>
//                   <Button variant="outline" className="w-10 h-10 p-0">4</Button>
//                   <Button variant="outline" className="w-10 h-10 p-0">→</Button>
//                 </div>
//               </div>

//               {/* Feedback Section */}
//               <Card className="mt-8 bg-blue-50 border-blue-200">
//                 <CardContent className="p-6">
//                   <h3 className="font-bold text-lg mb-2">Êtes-vous satisfaits de votre expérience de recherche ?</h3>
//                   <p className="text-gray-700 mb-4">
//                     Vos feedbacks nous permettent d'améliorer l'expérience Welcome to the Jungle.
//                   </p>
//                   <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
//                     Donner mon avis
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
//       <FooterSection />
//     </div>
//   );
// }


// src/app/companies/l-oreal/nos-offres/page.tsx


export default function LorealJobsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <CompanyHeader />
        <Navigation />
        
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <FiltersSidebar />
            <JobsList />
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}