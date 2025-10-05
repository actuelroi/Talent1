import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobs = [
  {
    title: "6 month internship - Luxe division Customer Care Projects - L'Oréal Distribution Center",
    type: "Stage",
    location: "Orleans",
    remote: true
  },
  {
    title: "STAGE 6 MOIS - MARKETING - DERMATOLOGICAL BEAUTY DIVISION",
    type: "Stage",
    location: "Levallois-Perret",
    remote: true
  },
  {
    title: "CDI - Technicien(ne) de recherche en analyse physicochimique",
    type: "CDI",
    location: "Aulnay",
    remote: true
  }
];

export default function JobOpenings() {
  return (
    <Card id="jobs">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Derniers jobs</h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">{job.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Badge variant="outline">{job.type}</Badge>
                <span>{job.location}</span>
                {job.remote && <Badge variant="secondary">Télétravail fréquent</Badge>}
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
          Toutes nos offres
        </Button>
      </CardContent>
    </Card>
  );
}