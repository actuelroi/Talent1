// src/app/company/dashboard/components/CVsTable.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RiEyeLine,
  RiDownloadLine,
  RiStarLine,
  RiStarFill,
  RiMoreLine,
  RiSearchLine,
} from "@remixicon/react";
import Link from "next/link";

// Mock CV data
const cvData = [
  {
    id: "1",
    candidate: "Marie Dupont",
    position: "Développeur Frontend",
    experience: "5 ans",
    location: "Paris, France",
    status: "Nouveau",
    date: "2024-01-15",
    match: 92,
    starred: true
  },
  {
    id: "2",
    candidate: "Pierre Martin",
    position: "Product Manager",
    experience: "7 ans",
    location: "Lyon, France",
    status: "Reviewé",
    date: "2024-01-14",
    match: 85,
    starred: false
  },
  {
    id: "3",
    candidate: "Sophie Lambert",
    position: "UX Designer",
    experience: "4 ans",
    location: "Toulouse, France",
    status: "Entretien",
    date: "2024-01-13",
    match: 78,
    starred: true
  },
  {
    id: "4",
    candidate: "Thomas Bernard",
    position: "Data Scientist",
    experience: "6 ans",
    location: "Bordeaux, France",
    status: "Nouveau",
    date: "2024-01-12",
    match: 95,
    starred: false
  }
];

export default function CVsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cvs, setCvs] = useState(cvData);

  const toggleStar = (id: string) => {
    setCvs(cvs.map(cv => 
      cv.id === id ? { ...cv, starred: !cv.starred } : cv
    ));
  };

  const filteredCVs = cvs.filter(cv =>
    cv.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Nouveau": return "default";
      case "Reviewé": return "secondary";
      case "Entretien": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="border rounded-lg">
      {/* Search bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un candidat ou poste..."
            className="w-full pl-9 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidat</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Expérience</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCVs.map((cv) => (
            <TableRow key={cv.id}>
              <TableCell className="font-medium">{cv.candidate}</TableCell>
              <TableCell>{cv.position}</TableCell>
              <TableCell>{cv.experience}</TableCell>
              <TableCell>{cv.location}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(cv.status)}>
                  {cv.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${cv.match}%` }}
                    />
                  </div>
                  <span className="text-sm">{cv.match}%</span>
                </div>
              </TableCell>
              <TableCell>{new Date(cv.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleStar(cv.id)}
                  >
                    {cv.starred ? (
                      <RiStarFill className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <RiStarLine className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/company/cvs/${cv.id}`}>
                      <RiEyeLine className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <RiDownloadLine className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <RiMoreLine className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}