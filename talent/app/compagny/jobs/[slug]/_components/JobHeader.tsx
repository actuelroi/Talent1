// src/app/companies/l-oreal/jobs/[slug]/components/JobHeader.tsx
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";

export default function JobHeader() {
  return (
    <div className="space-y-4">
      <Link href="/" className="text-blue-600 hover:underline flex items-center">
        ← Retour
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900">
        STAGE 6 MOIS - À partir de janvier 2026 - Performance - CAUDRY- INGENIEUR - 200 000 FCFA mensuel
      </h1>
      
      <div className="flex flex-wrap items-center gap-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          Stage
        </Badge>
        
        <Badge variant="outline" className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          Cambrai
        </Badge>
        
        <Badge variant="secondary" className="flex items-center gap-1">
          Télétravail fréquent
        </Badge>
        
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          il y a 7 jours
        </span>
      </div>
      
      <div className="text-gray-600">
        <strong>Salaire :</strong> Non spécifié
      </div>
    </div>
  );
}