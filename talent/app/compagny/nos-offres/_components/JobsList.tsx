// src/app/companies/l-oreal/nos-offres/components/JobsList.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import Pagination from "./Pagination";
import FeedbackSection from "./FeedbackSection";

// Sample job data - in a real app, this would come from an API
const jobsData = {
  page1: [
    {
      title: "6-month Internship - Assurance Qualité - JANVIER 2026",
      type: "Stage",
      location: "Aulnay",
      remote: true,
      time: "il y a 9 heures"
    },
    {
      title: "STAGE 6 MOIS - Développement d'ingrédients cosmétiques innovants",
      type: "Stage",
      location: "Paris",
      remote: true,
      time: "il y a 9 heures"
    },
    {
      title: "STAGE 6 MOIS - MARKETING - DERMATOLOGICAL BEAUTY DIVISION",
      type: "Stage",
      location: "Levallois-Perret",
      remote: true,
      time: "hier"
    },
    {
      title: "6 month internship - Luxe division Customer Care Projects",
      type: "Stage",
      location: "Orléans",
      remote: true,
      time: "hier"
    },
    {
      title: "CDI - Technicien(ne) de recherche en analyse physicochimique",
      type: "CDI",
      location: "Aulnay",
      remote: true,
      time: "hier"
    },
    {
      title: "STAGE 6 MOIS - RETAIL DESIGN - JANVIER 2026",
      type: "Stage",
      location: "Levallois-Perret",
      remote: true,
      time: "hier"
    },
    {
      title: "Cyberdefense Project Manager",
      type: "CDI",
      location: "Saint-Ouen",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "ServiceNow Architect",
      type: "CDI",
      location: "Saint-Ouen",
      remote: true,
      time: "il y a 4 jours"
    }
  ],
  page2: [
    {
      title: "STAGE 6 MOIS - Supply Chain - Janvier 2026",
      type: "Stage",
      location: "Paris",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "Stage Chimie R&D - Plateforme SP2i",
      type: "Stage",
      location: "Paris",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "STAGE 6 MOIS | Direction Juridique Droit des Sociétés",
      type: "Stage",
      location: "Clichy",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "Journée de Recrutement de Stagiaires R&I",
      type: "Stage",
      location: "Clichy",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "Stage - Legal Operations / Transformation Juridique",
      type: "Stage",
      location: "Clichy",
      remote: true,
      time: "il y a 3 jours"
    },
    {
      title: "6-month internships - DATA - January or March 2026",
      type: "Stage",
      location: "Clichy",
      remote: true,
      time: "il y a 4 jours"
    },
    {
      title: "STAGE 6 MOIS - Laboratoire Packaging - CAUDRY",
      type: "Stage",
      location: "Cambrai",
      remote: true,
      time: "il y a 6 jours"
    },
    {
      title: "STAGE 6 MOIS - Qualité physico chimie - CAUDRY",
      type: "Stage",
      location: "Cambrai",
      remote: true,
      time: "il y a 6 jours"
    }
  ]
};

export default function JobsList({ currentPage = 1 }: { currentPage?: number }) {
  const jobs = jobsData[`page${currentPage}` as keyof typeof jobsData] || jobsData.page1;
  const totalJobs = 93;
  const totalPages = Math.ceil(totalJobs / 8);

  return (
    <div className="lg:w-3/4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Jobs</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{totalJobs} offres</span>
          <Select defaultValue="pertinence">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pertinence">Pertinence</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="localisation">Localisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    {job.remote && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Télétravail fréquent
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {job.time}
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                  Postuler
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <FeedbackSection />
    </div>
  );
}