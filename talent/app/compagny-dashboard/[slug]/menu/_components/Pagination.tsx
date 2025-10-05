// src/app/companies/l-oreal/nos-offres/components/Pagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Pagination({ currentPage = 1, totalPages = 4 }: { currentPage?: number; totalPages?: number }) {
  const getPageUrl = (page: number) => {
    if (page === 1) return "/companies/l-oreal/nos-offres";
    return `/companies/l-oreal/nos-offres?page=${page}`;
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link href={getPageUrl(currentPage - 1)}>
            <Button variant="outline" className="w-10 h-10 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={getPageUrl(page)}>
            <Button
              variant={page === currentPage ? "default" : "outline"}
              className="w-10 h-10 p-0"
            >
              {page}
            </Button>
          </Link>
        ))}
        
        {currentPage < totalPages && (
          <Link href={getPageUrl(currentPage + 1)}>
            <Button variant="outline" className="w-10 h-10 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}