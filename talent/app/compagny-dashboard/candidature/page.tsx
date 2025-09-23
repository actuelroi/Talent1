// src/app/company/dashboard/page.tsx
import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import FeedbackDialog from "@/components/feedback-dialog";
import { RiScanLine, RiAddLine } from "@remixicon/react";

import Link from "next/link";
import DashboardStats from "./_components/DashboardStats";
import CVsTable from "./_components/CVsTable";
import CandidateSearch from "./_components/CandidateSearch";
import ContactsTable from "@/components/contacts-table";

export const metadata: Metadata = {
  title: "Tableau de bord entreprise - Crafted.is",
};

export default function CompanyDashboardPage() {
  return (

      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    <RiScanLine size={22} aria-hidden="true" />
                    <span className="sr-only">Dashboard</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Tableau de bord</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <FeedbackDialog />
            <UserDropdown />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 py-6">
          {/* Welcome section */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Bienvenue, L'Oréal!</h1>
              <p className="text-sm text-muted-foreground">
                Vue d'ensemble de vos candidatures et statistiques de recrutement
              </p>
            </div>
            <Link href="/compagny/new">
            <Button className="px-3 flex items-center gap-2">
              <RiAddLine size={16} />
              Créer une offre
            </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          <div className="min-h-[100vh] flex-1 md:min-h-min">
                      <CVsTable />
                    </div>
        </div>
      </SidebarInset>

  );
}