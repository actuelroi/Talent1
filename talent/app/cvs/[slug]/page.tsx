// src/app/company/cvs/[id]/page.tsx
import { notFound } from "next/navigation";
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
import { RiArrowLeftLine, RiDownloadLine, RiStarLine, RiStarFill, RiMailLine, RiPhoneLine } from "@remixicon/react";
import Link from "next/link";

// Mock CV data - in a real app, this would come from a database
const cvData = {
  id: "1",
  candidate: "Marie Dupont",
  email: "marie.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  position: "Développeur Frontend Senior",
  experience: "5 ans",
  location: "Paris, France",
  status: "Nouveau",
  date: "2024-01-15",
  match: 92,
  starred: true,
  skills: ["React", "TypeScript", "Next.js", "Node.js", "CSS/SASS"],
  education: "Master en Informatique - Université Paris-Saclay",
  languages: ["Français (Natif)", "Anglais (Courant)", "Espagnol (Intermédiaire)"],
  summary: "Développeuse frontend passionnée avec 5 ans d'expérience dans la création d'applications web modernes et réactives. Expertise en React et TypeScript."
};

interface CVDetailPageProps {
  params: {
    id: string;
  };
}

export default function CVDetailPage({ params }: CVDetailPageProps) {
  const cv = cvData; // In a real app, fetch by ID

  if (!cv) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
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
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/company/dashboard">Tableau de bord</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/company/cvs">CVs reçus</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{cv.candidate}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto">
            <UserDropdown />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 py-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/company/cvs">
                  <RiArrowLeftLine className="h-4 w-4 mr-2" />
                  Retour
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">{cv.candidate}</h1>
                <p className="text-muted-foreground">{cv.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                {cv.starred ? (
                  <RiStarFill className="h-4 w-4 text-yellow-500 mr-2" />
                ) : (
                  <RiStarLine className="h-4 w-4 mr-2" />
                )}
                Favoris
              </Button>
              <Button variant="outline" size="sm">
                <RiDownloadLine className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button size="sm">
                <RiMailLine className="h-4 w-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {cv.candidate.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold">{cv.candidate}</h3>
                  <p className="text-muted-foreground">{cv.position}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <RiMailLine className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cv.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiPhoneLine className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cv.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Détails</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expérience:</span>
                      <span>{cv.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Localisation:</span>
                      <span>{cv.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Match:</span>
                      <span className="font-medium text-green-600">{cv.match}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CV content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6 space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="font-semibold mb-2">Profil</h3>
                  <p className="text-muted-foreground">{cv.summary}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold mb-2">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-semibold mb-2">Expérience professionnelle</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Développeur Frontend Senior - Google</h4>
                      <p className="text-sm text-muted-foreground">2020 - Présent | Paris, France</p>
                      <p className="text-sm mt-1">Développement d'applications web complexes avec React et TypeScript.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Développeur Frontend - Amazon</h4>
                      <p className="text-sm text-muted-foreground">2018 - 2020 | Lyon, France</p>
                      <p className="text-sm mt-1">Création d'interfaces utilisateur responsive et accessibles.</p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="font-semibold mb-2">Formation</h3>
                  <p className="text-muted-foreground">{cv.education}</p>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="font-semibold mb-2">Langues</h3>
                  <div className="space-y-2">
                    {cv.languages.map((language, index) => (
                      <p key={index} className="text-muted-foreground">{language}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}