// src/app/company/dashboard/components/DashboardStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { RiUserLine, RiFileListLine, RiCheckLine, RiTimeLine } from "@remixicon/react";

const stats = [
  {
    title: "Total CVs reçus",
    value: "427",
    change: "+12% ce mois-ci",
    icon: RiFileListLine,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Candidats qualifiés",
    value: "189",
    change: "+8% ce mois-ci",
    icon: RiUserLine,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Entretiens planifiés",
    value: "42",
    change: "+15% cette semaine",
    icon: RiTimeLine,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    title: "Embauches",
    value: "17",
    change: "+23% ce trimestre",
    icon: RiCheckLine,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}