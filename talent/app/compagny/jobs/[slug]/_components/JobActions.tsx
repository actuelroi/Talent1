// src/app/companies/l-oreal/jobs/[slug]/components/JobActions.tsx
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default function JobActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/compagny/postuler">
      <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
        Postuler
      </Button>
      </Link>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Heart className="h-4 w-4" />
        Sauvegarder
      </Button>
      
      <Button variant="outline" className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Partager
      </Button>
    </div>
  );
}