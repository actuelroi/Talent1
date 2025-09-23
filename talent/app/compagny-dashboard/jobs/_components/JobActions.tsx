// src/app/company/jobs/components/JobActions.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  RiMoreLine,
  RiEditLine,
  RiEyeLine,
  RiShareLine,

  RiFileCopyLine,
  RiDeleteBinLine,
} from '@remixicon/react';

interface JobActionsProps {
  job: any;
  onDelete: (jobId: number) => void;
  onUpdate: (job: any) => void;
}

export default function JobActions({ job, onDelete, onUpdate }: JobActionsProps) {
  const handleDuplicate = () => {
    const duplicatedJob = {
      ...job,
      id: Date.now(),
      title: `${job.title} (Copie)`,
      status: 'draft',
      applications: 0,
      views: 0,
      publicationDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onUpdate(duplicatedJob);
  };

  return (
    <div className="flex gap-2 ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RiMoreLine className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <RiEditLine className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiEyeLine className="h-4 w-4 mr-2" />
            Aperçu
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiShareLine className="h-4 w-4 mr-2" />
            Partager
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <RiFileCopyLine className="h-4 w-4 mr-2" />
            Dupliquer
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => onDelete(job.id)}
          >
            <RiDeleteBinLine className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}