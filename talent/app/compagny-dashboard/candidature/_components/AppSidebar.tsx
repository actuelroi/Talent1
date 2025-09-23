// src/app/company/components/AppSidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  RiDashboardLine,
  RiUserLine,
  RiFileListLine,
  RiSettingsLine,
  RiTeamLine,
  RiCalendarLine,
  RiChargingPile2Line,
  RiSearchEyeLine,
  RiDatabaseLine,
  RiNotificationLine,
} from "@remixicon/react";

// Menu items.
const items = [
  {
    title: "Tableau de bord",
    url: "/company/dashboard",
    icon: RiDashboardLine,
  },
  {
    title: "CVs reçus",
    url: "/company/cvs",
    icon: RiFileListLine,
    badge: "427",
  },
  {
    title: "Recherche de candidats",
    url: "/company/candidates",
    icon: RiSearchEyeLine,
  },
  {
    title: "Offres d'emploi",
    url: "/company/jobs",
    icon: RiDatabaseLine,
  },
  {
    title: "Équipe",
    url: "/company/team",
    icon: RiTeamLine,
  },
  {
    title: "Calendrier",
    url: "/company/calendar",
    icon: RiCalendarLine,
  },
  {
    title: "Analytics",
    url: "/company/analytics",
    icon: RiChargingPile2Line,
  },
  {
    title: "Notifications",
    url: "/company/notifications",
    icon: RiNotificationLine,
    badge: "12",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-md bg-blue-100 px-1 text-xs font-medium text-blue-600">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/company/profile">
                    <RiUserLine />
                    <span>Profil entreprise</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/company/settings">
                    <RiSettingsLine />
                    <span>Paramètres</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}