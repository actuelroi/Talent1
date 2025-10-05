// // src/app/companies/l-oreal/jobs/[slug]/page.tsx

// import Link from "next/link";

// import CompanyInfo from "./_components/CompanyInfo";
// import FAQSection from "./_components/FAQSection";
// import JobActions from "./_components/JobActions";
// import JobDescription from "./_components/JobDescription";
// import JobHeader from "./_components/JobHeader";
// import RelatedJobs from "./_components/RelatedJobs";
// import { Button } from "@/components/ui/button";
// import FooterSection from "@/app/compagny/_components/FooterSection";

// export default function JobDetailPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* <Header /> */}
//       <main className="flex-1">
//         <div className="container max-w-6xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-8">
//               <JobHeader />
//               <JobActions />
//               <JobDescription />
             
//               <FAQSection />
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-8">
//               <CompanyInfo />
//               <RelatedJobs />
//             </div>
//           </div>
//         </div>
//       </main>
//       <FooterSection />
//     </div>
//   );
// }


// src/app/jobs/[id]/page.tsx
import { notFound } from "next/navigation";
import { TRPCReactProvider } from "@/trpc/client";
import JobDetailContent from "./_components/JobDetailContent";


interface PageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: PageProps) {
  return (
    <TRPCReactProvider>
      <JobDetailContent jobId={params.id} />
    </TRPCReactProvider>
  );
}