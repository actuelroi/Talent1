// // src/app/companies/l-oreal/jobs/[slug]/postuler/components/FileUpload.tsx
// 'use client';

// import { useState, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Upload, FileText, X } from 'lucide-react';

// interface FileUploadProps {
//   formData: {
//     resume: File | null;
//     coverLetter: File | null;
//   };
//   onFileChange: (name: string, file: File | null) => void;
// }

// export default function FileUpload({ formData, onFileChange }: FileUploadProps) {
//   const resumeRef = useRef<HTMLInputElement>(null);
//   const coverLetterRef = useRef<HTMLInputElement>(null);
//   const [dragActive, setDragActive] = useState(false);

//   const handleFile = (file: File, name: string) => {
//     // Check file type (PDF, DOC, DOCX)
//     const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//     if (!validTypes.includes(file.type)) {
//       alert('Veuillez télécharger un fichier PDF, DOC ou DOCX');
//       return;
//     }
    
//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('Le fichier ne doit pas dépasser 5MB');
//       return;
//     }
    
//     onFileChange(name, file);
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent, name: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFile(e.dataTransfer.files[0], name);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       handleFile(e.target.files[0], name);
//     }
//   };

//   const removeFile = (name: string) => {
//     onFileChange(name, null);
//     if (name === 'resume' && resumeRef.current) {
//       resumeRef.current.value = '';
//     }
//     if (name === 'coverLetter' && coverLetterRef.current) {
//       coverLetterRef.current.value = '';
//     }
//   };

//   const FilePreview = ({ file, name }: { file: File; name: string }) => (
//     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//       <div className="flex items-center gap-2">
//         <FileText className="h-5 w-5 text-blue-600" />
//         <div>
//           <p className="text-sm font-medium">{file.name}</p>
//           <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
//         </div>
//       </div>
//       <Button
//         type="button"
//         variant="ghost"
//         size="sm"
//         onClick={() => removeFile(name)}
//         className="h-8 w-8 p-0"
//       >
//         <X className="h-4 w-4" />
//       </Button>
//     </div>
//   );

//   const FileUploadArea = ({ name, title, required }: { name: string; title: string; required?: boolean }) => (
//     <div className="space-y-2">
//       <Label htmlFor={name}>
//         {title} {required && <span className="text-red-500">*</span>}
//       </Label>
      
//       <input
//         ref={name === 'resume' ? resumeRef : coverLetterRef}
//         type="file"
//         id={name}
//         name={name}
//         onChange={(e) => handleChange(e, name)}
//         accept=".pdf,.doc,.docx"
//         className="hidden"
//       />
      
//       {(!formData[name as keyof typeof formData] || formData[name as keyof typeof formData] === null) ? (
//         <div
//           className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//             dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={(e) => handleDrop(e, name)}
//           onClick={() => {
//             const ref = name === 'resume' ? resumeRef : coverLetterRef;
//             if (ref.current) ref.current.click();
//           }}
//         >
//           <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//           <p className="text-sm font-medium text-gray-700">
//             Glissez-déposez votre fichier ou cliquez pour parcourir
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             PDF, DOC ou DOCX (max. 5MB)
//           </p>
//         </div>
//       ) : (
//         <FilePreview file={formData[name as keyof typeof formData] as File} name={name} />
//       )}
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <FileUploadArea name="resume" title="CV" required />
//       <FileUploadArea name="coverLetter" title="Lettre de motivation" />
//     </div>
//   );
// }

// Enhanced FileUpload component with better progress handling
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileText, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FileUploadProps {
  formData: {
    resume: File | null;
    coverLetter: File | null;
  };
  onFileChange: (name: string, file: File | null) => void;
  isUploading?: boolean;
  progress?: number;
  errors?: {
    resume?: string;
    coverLetter?: string;
  };
}

export default function FileUpload({ 
  formData, 
  onFileChange, 
  isUploading = false, 
  progress = 0,
  errors = {} 
}: FileUploadProps) {
  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());

  const handleFile = (file: File, name: string) => {
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert('Veuillez télécharger un fichier PDF, DOC ou DOCX');
      return;
    }
    
    if (file.size > 4 * 1024 * 1024) {
      alert('Le fichier ne doit pas dépasser 4MB');
      return;
    }
    
    onFileChange(name, file);
    // Mark as uploaded when file is selected
    setUploadedFiles(prev => new Set(prev).add(name));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], name);
    }
  };

  const removeFile = (name: string) => {
    onFileChange(name, null);
    const ref = name === 'resume' ? resumeRef : coverLetterRef;
    if (ref.current) ref.current.value = '';
    setUploadedFiles(prev => {
      const newSet = new Set(prev);
      newSet.delete(name);
      return newSet;
    });
  };

  const FilePreview = ({ file, name }: { file: File; name: string }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-2">
        {uploadedFiles.has(name) && progress === 100 ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <FileText className="h-5 w-5 text-blue-600" />
        )}
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          {isUploading && uploadedFiles.has(name) && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{progress}%</span>
            </div>
          )}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => removeFile(name)}
        className="h-8 w-8 p-0"
        disabled={isUploading}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  const FileUploadArea = ({ name, title, required }: { name: string; title: string; required?: boolean }) => {
    const error = errors[name as keyof typeof errors];
    const hasFile = formData[name as keyof typeof formData] !== null;
    
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>
          {title} {required && <span className="text-red-500">*</span>}
        </Label>
        
        <input
          ref={name === 'resume' ? resumeRef : coverLetterRef}
          type="file"
          id={name}
          name={name}
          onChange={(e) => handleChange(e, name)}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          disabled={isUploading}
        />
        
        {!hasFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              error ? 'border-red-300 bg-red-50' : 
              isUploading ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 
              'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              if (isUploading) return;
              const ref = name === 'resume' ? resumeRef : coverLetterRef;
              if (ref.current) ref.current.click();
            }}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progression</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Cliquez pour sélectionner un fichier
                </p>
              </>
            )}
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC ou DOCX (max. 4MB)
            </p>
          </div>
        ) : (
          <FilePreview 
            file={formData[name as keyof typeof formData] as File} 
            name={name} 
          />
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <FileUploadArea name="resume" title="CV" required />
      <FileUploadArea name="coverLetter" title="Lettre de motivation" />
      
      {isUploading && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              <p className="text-sm font-medium text-blue-800">
                Téléchargement des fichiers...
              </p>
            </div>
            <span className="text-sm font-semibold text-blue-700">{progress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-600 mt-2 text-center">
            Ne quittez pas cette page pendant le téléchargement
          </p>
        </div>
      )}
    </div>
  );
}