// "use client"


// import { Badge } from "@/components/ui/badge"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarTrigger,
//   SidebarProvider,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import {
//   RiDashboardLine,
//   RiUserLine,
//   RiFileListLine,
//   RiStarLine,
//   RiSettingsLine,
//   RiTeamLine,
//   RiCalendarLine,
//   RiBarChart2Fill,
//   RiLogoutBoxLine
// } from "@remixicon/react"
// import { MessageSquare, Users } from "lucide-react"

// // Header component that responds to sidebar state
// function SidebarHeaderContent() {
//   const { state } = useSidebar()
  
//   if (state === 'collapsed') {
//     return null // Hide header when sidebar is collapsed
//   }
  
//   return (
//     <div className=" flex items-center gap-3 p-2">
//       <h2 className="text-lg font-semibold">Espace Entreprise</h2>
//     </div>
//   )
// }

// export function CompagnySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   // This is sample data.
//   const menuItems = [
//     { id: 'dashboard', label: 'Tableau de bord', href:`/compagny-dashboard/menu/${1}`, icon: RiDashboardLine },
//     { id: 'profile', label: 'Profil entreprise', href: '/compagny-dashboard/profile', icon: RiUserLine },
//     { id: 'candidature', label: 'CVs réçus', href: '/compagny-dashboard/candidature', icon: RiFileListLine },
//     { id: 'jobs', label: 'Offres d\'emploi', href: '/compagny-dashboard/jobs', icon: RiFileListLine },
//     { id: 'messages', label: 'Messages', href: '/compagny-dashboard/messages', icon: MessageSquare,badge:'3 nouveaux messages' },
//     { id: 'recherches', label: 'Recherche Profil', href: '/compagny-dashboard/recherche-profil', icon: Users },
   
//     { id: 'calendar', label: 'Calendrier', href: '/compagny-dashboard/calendar', icon: RiCalendarLine },
//     { id: 'analytics', label: 'Analytics', href: '/compagny-dashboard/analytics', icon: RiBarChart2Fill },
//     { id: 'featured', label: 'À la une', href: '/compagny-dashboard/featured', icon: RiStarLine },
//     { id: 'team', label: 'Équipe', href: '/compagny-dashboard/teams', icon: RiTeamLine },
//     { id: 'settings', label: 'Paramètres', href: '/compagny-dashboard/settings', icon: RiSettingsLine },
//   ];

//   return (
 
//       <Sidebar {...props} collapsible="icon" className="bg-white border-r border-gray-200 sticky top-0 w-55">
//         <SidebarHeader>
//           <SidebarHeaderContent />
//         </SidebarHeader>
//         <SidebarContent className="mt-4">
//           <SidebarMenu className="space-y-2 px-4">
//             {menuItems.map((item) => (
//               <SidebarMenuItem key={item.id}>
//                 <SidebarMenuButton
//                   asChild
//                   className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <a href={item.href} className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors">
//                     {item.icon && (
//                       <item.icon className="h-5 w-5 text-gray-600" />
//                     )}
//                     <span className="text-sm font-medium">{item.label}</span>
//                     {item.badge?  <Badge variant="destructive">3 nouveaux messages</Badge> : ''}
//                   </a>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarContent>
        
//         <SidebarFooter>
//           <hr className="border-t border-border mx-2 -mt-px" />
//           <SidebarMenu>
//             <SidebarMenuItem>
//               <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
//                 <RiLogoutBoxLine
//                   className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
//                   size={22}
//                   aria-hidden="true"
//                 />
//                 <span>Sign Out</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarFooter>
//         <SidebarRail />
//       </Sidebar>
  
//   )
// }



"use client"

import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useCompany } from "@/contexts/CompanyVerificationContext"
import {
  RiDashboardLine,
  RiUserLine,
  RiFileListLine,
  RiStarLine,
  RiSettingsLine,
  RiTeamLine,
  RiCalendarLine,
  RiBarChart2Fill,
  RiLogoutBoxLine
} from "@remixicon/react"
import { MessageSquare, Users } from "lucide-react"


// Header component that responds to sidebar state
function SidebarHeaderContent() {
  const { state } = useSidebar()
  
  if (state === 'collapsed') {
    return null // Hide header when sidebar is collapsed
  }
  
  return (
    <div className=" flex items-center gap-3 p-2">
      <h2 className="text-lg font-semibold">Espace Entreprise</h2>
    </div>
  )
}

export function CompagnySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentCompany } = useCompany()
  
  // This is sample data.
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', href:`/compagny-dashboard/${currentCompany?.slug}/menu`, icon: RiDashboardLine },
    { id: 'profile', label: 'Profil entreprise', href: `/compagny-dashboard/${currentCompany?.slug}/profile`, icon: RiUserLine },
    { id: 'candidature', label: 'CVs réçus', href: `/compagny-dashboard/${currentCompany?.slug}/candidature`, icon: RiFileListLine },
    { id: 'jobs', label: 'Offres d\'emploi', href: `/compagny-dashboard/${currentCompany?.slug}/jobs`, icon: RiFileListLine },
    { id: 'messages', label: 'Messages', href: `/compagny-dashboard/${currentCompany?.slug}/messages`, icon: MessageSquare,badge:'3 nouveaux messages' },
    { id: 'recherches', label: 'Recherche Profil', href: `/compagny-dashboard/${currentCompany?.slug}/recherche-profil`, icon: Users },
   
    { id: 'calendar', label: 'Calendrier', href: `/compagny-dashboard/${currentCompany?.slug}/calendar`, icon: RiCalendarLine },
    { id: 'analytics', label: 'Analytics', href: `/compagny-dashboard/${currentCompany?.slug}/analytics`, icon: RiBarChart2Fill },
    { id: 'featured', label: 'À la une', href: `/compagny-dashboard/${currentCompany?.slug}/featured`, icon: RiStarLine },
    { id: 'team', label: 'Équipe', href: `/compagny-dashboard/${currentCompany?.slug}/teams`, icon: RiTeamLine },
    { id: 'settings', label: 'Paramètres', href: `/compagny-dashboard/${currentCompany?.slug}/settings`, icon: RiSettingsLine },
  ];

  return (
      <Sidebar {...props} collapsible="icon" className="bg-white border-r border-gray-200 sticky top-0 w-55">
        <SidebarHeader>
          <SidebarHeaderContent />
        </SidebarHeader>
        <SidebarContent className="mt-4">
          <SidebarMenu className="space-y-2 px-4">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <a href={item.href} className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 transition-colors">
                    {item.icon && (
                      <item.icon className="h-5 w-5 text-gray-600" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge?  <Badge variant="destructive">3 nouveaux messages</Badge> : ''}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter>
          <hr className="border-t border-border mx-2 -mt-px" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
                <RiLogoutBoxLine
                  className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                  size={22}
                  aria-hidden="true"
                />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}