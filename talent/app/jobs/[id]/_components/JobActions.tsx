// // src/app/companies/l-oreal/jobs/[slug]/components/JobActions.tsx
// import { Button } from "@/components/ui/button";
// import { Heart, Share2 } from "lucide-react";
// import Link from "next/link";

// export default function JobActions() {
//   return (
//     <div className="flex flex-col sm:flex-row gap-4">
//       <Link href="/compagny/postuler">
//       <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
//         Postuler
//       </Button>
//       </Link>
      
//       <Button variant="outline" className="flex items-center gap-2">
//         <Heart className="h-4 w-4" />
//         Sauvegarder
//       </Button>
      
//       <Button variant="outline" className="flex items-center gap-2">
//         <Share2 className="h-4 w-4" />
//         Partager
//       </Button>
//     </div>
//   );
// }



// src/app/jobs/[id]/_components/JobActions.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark, Clock, ExternalLink } from "lucide-react";
import { FormattedJobPosting } from "@/types/jobPosting";
import { useState } from "react";

interface JobActionsProps {
  job: FormattedJobPosting;
}

export default function JobActions({ job }: JobActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = () => {
      // Handle internal application process
      // You can redirect to an internal application form
      window.location.href = `/postuler/${job.id}`;

  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} - ${job.name}`,
          text: job.description?.substring(0, 200) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement actual save functionality
    console.log('Job saved status:', !isSaved);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleApply}
            size="lg"
          >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>Postuler maintenant</span>
  
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleShare}
              size="sm"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
            
            <Button 
              variant={isSaved ? "default" : "outline"} 
              className="flex items-center gap-2"
              onClick={handleSave}
              size="sm"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Sauvegardé' : 'Sauvegarder'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Postée {job.time}</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <span>{job.views || 0} vues</span>
            <span>•</span>
            <span>{job.applicantsCount || 0} candidatures</span>
          </div>
        </div>

        {job.applicationUrl && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Note :</strong> Cette offre redirige vers le site de l'entreprise pour postuler.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}