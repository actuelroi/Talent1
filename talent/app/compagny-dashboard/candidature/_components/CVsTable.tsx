// // src/app/company/dashboard/components/CVsTable.tsx
// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   RiEyeLine,
//   RiDownloadLine,
//   RiStarLine,
//   RiStarFill,
//   RiMoreLine,
//   RiSearchLine,
// } from "@remixicon/react";
// import Link from "next/link";

// // Mock CV data
// const cvData = [
//   {
//     id: "1",
//     candidate: "Marie Dupont",
//     position: "Développeur Frontend",
//     experience: "5 ans",
//     location: "Paris, France",
//     status: "Nouveau",
//     date: "2024-01-15",
//     match: 92,
//     starred: true
//   },
//   {
//     id: "2",
//     candidate: "Pierre Martin",
//     position: "Product Manager",
//     experience: "7 ans",
//     location: "Lyon, France",
//     status: "Reviewé",
//     date: "2024-01-14",
//     match: 85,
//     starred: false
//   },
//   {
//     id: "3",
//     candidate: "Sophie Lambert",
//     position: "UX Designer",
//     experience: "4 ans",
//     location: "Toulouse, France",
//     status: "Entretien",
//     date: "2024-01-13",
//     match: 78,
//     starred: true
//   },
//   {
//     id: "4",
//     candidate: "Thomas Bernard",
//     position: "Data Scientist",
//     experience: "6 ans",
//     location: "Bordeaux, France",
//     status: "Nouveau",
//     date: "2024-01-12",
//     match: 95,
//     starred: false
//   }
// ];

// export default function CVsTable() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cvs, setCvs] = useState(cvData);

//   const toggleStar = (id: string) => {
//     setCvs(cvs.map(cv => 
//       cv.id === id ? { ...cv, starred: !cv.starred } : cv
//     ));
//   };

//   const filteredCVs = cvs.filter(cv =>
//     cv.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     cv.position.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusVariant = (status: string) => {
//     switch (status) {
//       case "Nouveau": return "default";
//       case "Reviewé": return "secondary";
//       case "Entretien": return "outline";
//       default: return "default";
//     }
//   };

//   return (
//     <div className="border rounded-lg">
//       {/* Search bar */}
//       <div className="p-4 border-b">
//         <div className="relative">
//           <RiSearchLine className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <input
//             type="text"
//             placeholder="Rechercher un candidat ou poste..."
//             className="w-full pl-9 pr-4 py-2 border rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Candidat</TableHead>
//             <TableHead>Poste</TableHead>
//             <TableHead>Expérience</TableHead>
//             <TableHead>Localisation</TableHead>
//             <TableHead>Statut</TableHead>
//             <TableHead>Match</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredCVs.map((cv) => (
//             <TableRow key={cv.id}>
//               <TableCell className="font-medium">{cv.candidate}</TableCell>
//               <TableCell>{cv.position}</TableCell>
//               <TableCell>{cv.experience}</TableCell>
//               <TableCell>{cv.location}</TableCell>
//               <TableCell>
//                 <Badge variant={getStatusVariant(cv.status)}>
//                   {cv.status}
//                 </Badge>
//               </TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   <div className="w-16 bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-green-600 h-2 rounded-full" 
//                       style={{ width: `${cv.match}%` }}
//                     />
//                   </div>
//                   <span className="text-sm">{cv.match}%</span>
//                 </div>
//               </TableCell>
//               <TableCell>{new Date(cv.date).toLocaleDateString('fr-FR')}</TableCell>
//               <TableCell className="text-right">
//                 <div className="flex items-center justify-end gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => toggleStar(cv.id)}
//                   >
//                     {cv.starred ? (
//                       <RiStarFill className="h-4 w-4 text-yellow-500" />
//                     ) : (
//                       <RiStarLine className="h-4 w-4" />
//                     )}
//                   </Button>
//                   <Button variant="ghost" size="icon" asChild>
//                     <Link href={`/company/cvs/${cv.id}`}>
//                       <RiEyeLine className="h-4 w-4" />
//                     </Link>
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <RiDownloadLine className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <RiMoreLine className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


// src/app/company/dashboard/_components/CVsTable.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiBardLine,
  RiFilter3Line,
  RiSearch2Line,
  RiVerifiedBadgeFill,
  RiCheckLine,
  RiMoreLine,
  RiFileTextLine,
  RiEyeLine,
  RiDownloadLine,
  RiShareLine,
} from "@remixicon/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Item = {
  id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  status: "Nouveau" | "En revue" | "Entretien" | "Rejeté" | "Embauché";
  location: string;
  verified: boolean;
  referral: {
    name: string;
    image: string;
  };
  match: number;
  joinDate: string;
  cvUrl: string;
  position: string;
  experience: string;
  skills: string[];
  lastUpdated: string;
};

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

interface GetColumnsProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  onViewCV: (item: Item) => void;
}

const getColumns = ({ data, setData, onViewCV }: GetColumnsProps): ColumnDef<Item>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Candidat",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          src={row.original.image}
          width={32}
          height={32}
          alt={row.getValue("name")}
        />
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-xs text-muted-foreground">{row.original.position}</div>
        </div>
      </div>
    ),
    size: 200,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-xs">{row.getValue("id")}</span>
    ),
    size: 100,
  },
  {
    header: "Statut",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        "Nouveau": "bg-blue-100 text-blue-800 border-blue-200",
        "En revue": "bg-yellow-100 text-yellow-800 border-yellow-200",
        "Entretien": "bg-purple-100 text-purple-800 border-purple-200",
        "Rejeté": "bg-red-100 text-red-800 border-red-200",
        "Embauché": "bg-green-100 text-green-800 border-green-200",
      };
      
      return (
        <Badge variant="outline" className={cn("text-xs", statusColors[status])}>
          {status}
        </Badge>
      );
    },
    size: 120,
    filterFn: statusFilterFn,
  },
  {
    header: "Localisation",
    accessorKey: "location",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("location")}</span>
    ),
    size: 140,
  },
  {
    header: "Expérience",
    accessorKey: "experience",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("experience")}</span>
    ),
    size: 120,
  },
  {
    header: "Match",
    accessorKey: "match",
    cell: ({ row }) => {
      const value = row.getValue("match") as number;
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Progress className="h-2 w-16" value={value} />
                <span className="text-sm font-medium">{value}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Correspondance avec le poste</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    size: 100,
  },
  {
    header: "CV",
    accessorKey: "cvUrl",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewCV(row.original)}
        className="flex items-center gap-2"
      >
        <RiFileTextLine size={16} />
        Voir CV
      </Button>
    ),
    size: 100,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <RowActions setData={setData} data={data} item={row.original} onViewCV={onViewCV} />
    ),
    size: 60,
    enableHiding: false,
  },
];

export default function CVsTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedCV, setSelectedCV] = useState<Item | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "match",
      desc: true,
    },
  ]);

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleViewCV = (item: Item) => {
    setSelectedCV(item);
  };

  const columns = useMemo(() => getColumns({ data, setData, onViewCV: handleViewCV }), [data]);

  // Update the mock data in the useEffect hook
useEffect(() => {
  async function fetchPosts() {
    try {
      // Simulating API call with mock data
      const mockData: Item[] = [
        {
          id: "CAN-001",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
          name: "Marie Dubois",
          email: "marie.dubois@email.com",
          phone: "+33 1 23 45 67 89",
          status: "Nouveau",
          location: "Paris, France",
          verified: true,
          referral: {
            name: "Jean Martin",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=20&h=20&fit=crop&crop=face",
          },
          match: 92,
          joinDate: "2024-01-15",
          cvUrl: "/cv/marie-dubois.pdf",
          position: "Développeuse Full Stack",
          experience: "5 ans",
          skills: ["React", "Node.js", "TypeScript", "Python"],
          lastUpdated: "2024-01-10",
        },
        {
          id: "CAN-002",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
          name: "Sophie Lambert",
          email: "sophie.lambert@email.com",
          phone: "+33 1 34 56 78 90",
          status: "En revue",
          location: "Lyon, France",
          verified: true,
          referral: {
            name: "Pierre Moreau",
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=20&h=20&fit=crop&crop=face",
          },
          match: 85,
          joinDate: "2024-01-12",
          cvUrl: "/cv/sophie-lambert.pdf",
          position: "Product Manager",
          experience: "7 ans",
          skills: ["Product Strategy", "Agile", "UX Research", "Analytics"],
          lastUpdated: "2024-01-08",
        },
        {
          id: "CAN-003",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
          name: "Thomas Bernard",
          email: "thomas.bernard@email.com",
          phone: "+33 1 45 67 89 01",
          status: "Entretien",
          location: "Marseille, France",
          verified: false,
          referral: {
            name: "Lucie Petit",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=20&h=20&fit=crop&crop=face",
          },
          match: 78,
          joinDate: "2024-01-05",
          cvUrl: "/cv/thomas-bernard.pdf",
          position: "Data Scientist",
          experience: "4 ans",
          skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
          lastUpdated: "2024-01-03",
        },
        {
          id: "CAN-004",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face",
          name: "Alexandre Martin",
          email: "alexandre.martin@email.com",
          phone: "+33 1 56 78 90 12",
          status: "Rejeté",
          location: "Toulouse, France",
          verified: true,
          referral: {
            name: "Émilie Roux",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=20&h=20&fit=crop&crop=face",
          },
          match: 65,
          joinDate: "2023-12-20",
          cvUrl: "/cv/alexandre-martin.pdf",
          position: "DevOps Engineer",
          experience: "6 ans",
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
          lastUpdated: "2023-12-18",
        },
        {
          id: "CAN-005",
          image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face",
          name: "Camille Leroy",
          email: "camille.leroy@email.com",
          phone: "+33 1 67 89 01 23",
          status: "Embauché",
          location: "Bordeaux, France",
          verified: true,
          referral: {
            name: "Nicolas Blanc",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=20&h=20&fit=crop&crop=face",
          },
          match: 95,
          joinDate: "2023-12-15",
          cvUrl: "/cv/camille-leroy.pdf",
          position: "UX Designer",
          experience: "8 ans",
          skills: ["Figma", "User Research", "Prototyping", "UI Design"],
          lastUpdated: "2023-12-10",
        },
      ];
      
      setData(mockData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }
  fetchPosts();
}, []);

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id),
    );
    setData(updatedData);
    table.resetRowSelection();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  const statusColumn = table.getColumn("status");
  const statusFacetedValues = statusColumn?.getFacetedUniqueValues();
  const statusFilterValue = statusColumn?.getFilterValue();

  const uniqueStatusValues = useMemo(() => {
    if (!statusColumn) return [];
    const values = Array.from(statusFacetedValues?.keys() ?? []);
    return values.sort();
  }, [statusColumn, statusFacetedValues]);

  const statusCounts = useMemo(() => {
    if (!statusColumn) return new Map();
    return statusFacetedValues ?? new Map();
  }, [statusColumn, statusFacetedValues]);

  const selectedStatuses = useMemo(() => {
    return (statusFilterValue as string[]) ?? [];
  }, [statusFilterValue]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4">
      {/* CV View Dialog */}
      <Dialog open={!!selectedCV} onOpenChange={() => setSelectedCV(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>CV de {selectedCV?.name}</DialogTitle>
            <DialogDescription>
              Poste: {selectedCV?.position} | Expérience: {selectedCV?.experience}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col h-full">
            <div className="flex gap-4 mb-4">
              <Button variant="outline" size="sm">
                <RiDownloadLine className="mr-2" size={16} />
                Télécharger
              </Button>
              <Button variant="outline" size="sm">
                <RiShareLine className="mr-2" size={16} />
                Partager
              </Button>
            </div>
            <div className="flex-1 border rounded-lg overflow-hidden">
              {selectedCV?.cvUrl ? (
                <iframe 
                  src={selectedCV.cvUrl} 
                  className="w-full h-full min-h-[500px]"
                  title={`CV de ${selectedCV.name}`}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <RiFileTextLine size={48} className="mb-4" />
                  <p>CV non disponible</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Filter by name */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9",
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Rechercher par nom"
              type="text"
              aria-label="Rechercher par nom"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
              <RiSearch2Line size={20} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/60 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <RiCloseCircleLine size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <RiDeleteBinLine
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Supprimer
                  <span className="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    <RiErrorWarningLine className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous sûr ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Vous allez supprimer {table.getSelectedRowModel().rows.length} candidat(s) sélectionné(s).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <RiFilter3Line
                  className="size-5 -ms-1.5 text-muted-foreground/60"
                  size={20}
                  aria-hidden="true"
                />
                Filtre
                {selectedStatuses.length > 0 && (
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="end">
              <div className="space-y-3">
                <div className="text-xs font-medium uppercase text-muted-foreground/60">
                  Statut
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {value}{" "}
                        <span className="ms-2 text-xs text-muted-foreground">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* New filter button */}
          <Button variant="outline">
            <RiBardLine
              className="size-5 -ms-1.5 text-muted-foreground/60"
              size={20}
              aria-hidden="true"
            />
            Nouveau filtre
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center gap-2",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: (
                            <RiArrowUpSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <RiArrowDownSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Chargement...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 h-[inherit]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun résultat trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
      </Table>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p
            className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page{" "}
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            sur <span className="text-foreground">{table.getPageCount()}</span>
            {" • "}
            <span className="text-foreground">{table.getRowCount()}</span> candidats au total
          </p>
          <Pagination className="w-auto">
            <PaginationContent className="gap-3">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Page précédente"
                >
                  Précédent
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Page suivante"
                >
                  Suivant
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
// Fix the RowActions component in the CVsTable.tsx file
function RowActions({
  setData,
  data,
  item,
  onViewCV,
}: {
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  data: Item[];
  item: Item;
  onViewCV: (item: Item) => void;
}) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          // Cycle through the status options
          const statusOrder = ["Nouveau", "En revue", "Entretien", "Rejeté", "Embauché"];
          const currentIndex = statusOrder.indexOf(item.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return {
            ...dataItem,
            status: statusOrder[nextIndex] as Item["status"],
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleVerifiedToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            verified: !item.verified,
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleDelete = () => {
    startUpdateTransition(() => {
      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      setData(updatedData);
      setShowDeleteDialog(false);
    });
  };

  const getNextStatus = (currentStatus: Item["status"]): Item["status"] => {
    const statusOrder = ["Nouveau", "En revue", "Entretien", "Rejeté", "Embauché"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex] as Item["status"];
  };

  const getStatusActionText = (currentStatus: Item["status"]): string => {
    const statusActions = {
      "Nouveau": "Marquer comme 'En revue'",
      "En revue": "Planifier un entretien",
      "Entretien": "Prendre une décision",
      "Rejeté": "Rouvrir la candidature",
      "Embauché": "Réinitialiser le statut"
    };
    return statusActions[currentStatus];
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-muted-foreground/60"
              aria-label="Actions"
            >
              <RiMoreLine className="size-5" size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onViewCV(item)}>
              <RiEyeLine className="mr-2" size={16} />
              Voir le CV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiDownloadLine className="mr-2" size={16} />
              Télécharger le CV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiShareLine className="mr-2" size={16} />
              Partager le profil
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleStatusToggle}
            disabled={isUpdatePending}
          >
            {getStatusActionText(item.status)}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleVerifiedToggle}
            disabled={isUpdatePending}
          >
            {item.verified ? "Marquer comme non vérifié" : "Marquer comme vérifié"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            variant="destructive"
            className="dark:data-[variant=destructive]:focus:bg-destructive/10"
          >
            <RiDeleteBinLine className="mr-2" size={16} />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Vous allez supprimer définitivement ce candidat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdatePending}
              className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}