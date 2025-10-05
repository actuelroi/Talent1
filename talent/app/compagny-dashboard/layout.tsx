
// import { TRPCReactProvider } from "@/trpc/client";
// import { Toaster } from "@/components/ui/sonner";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { CompagnySidebar } from "./_components/sidebar";






// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (

//         <TRPCReactProvider>
//             <Toaster richColors />
//             <SidebarProvider>
//   <div className="flex w-full min-h-screen">
//     <CompagnySidebar />
//     <main className="flex-1 overflow-x-hidden">
//       {children}
//     </main>
//   </div>
// </SidebarProvider>

//         </TRPCReactProvider>

//     );
// }




'use client';


import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanyProvider } from '@/contexts/CompanyVerificationContext';
import { CompagnySidebar } from './_components/sidebar';
import { CompanyRedirectGuard } from './_components/CompanyRedirectGuard';
import { DebugRedirect } from './_components/DebugRedirect';

export default function CompanyLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <CompanyProvider>
      <SidebarProvider>
        <CompanyRedirectGuard>
        
        <div className="flex min-h-screen w-full">
          <CompagnySidebar  />
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </div>
        </CompanyRedirectGuard>
      </SidebarProvider>
    </CompanyProvider>
  );
}











// // app/compagny-dashboard/layout.tsx
// 'use client';


// import { SidebarProvider } from '@/components/ui/sidebar';
// import { CompanySwitcher } from '@/components/CompanySwitcher';

// import { CompagnySidebar } from './_components/sidebar';
// import { CompanyProvider } from '@/contexts/CompanyVerificationContext';

// export default function CompanyDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <CompanyProvider>
//       <SidebarProvider>
//         <div className="flex min-h-screen">
//           <CompagnySidebar />
//           <main className="flex-1 overflow-auto">
//             {/* Header with company switcher */}
//             <header className="border-b bg-white p-4">
//               <div className="max-w-7xl mx-auto flex justify-between items-center">
//                 <div className="w-64">
//                   <CompanySwitcher />
//                 </div>
//                 {/* Other header content */}
//               </div>
//             </header>
//             {children}
//           </main>
//         </div>
//       </SidebarProvider>
//     </CompanyProvider>
//   );
// }