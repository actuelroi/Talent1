


// // src/hooks/useFileUpload.ts
// import { useState } from 'react';
// import { useUploadThing } from '@/lib/uploadthing';

// export const useFileUpload = () => {
//   const [isUploading, setIsUploading] = useState(false);
//   const { startUpload } = useUploadThing("applicationDocuments");

//   const uploadFile = async (file: File): Promise<{ url: string; key: string }> => {
//     setIsUploading(true);
    
//     try {
//       console.log("Starting file upload:", file.name, file.size, file.type);
      
//       // Validate file type
//       const allowedTypes = [
//         'application/pdf',
//         'application/msword', 
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       ];
      
//       if (!allowedTypes.includes(file.type)) {
//         throw new Error('Type de fichier non supporté. Utilisez PDF, DOC ou DOCX.');
//       }

//       // Validate file size (4MB)
//       if (file.size > 4 * 1024 * 1024) {
//         throw new Error('Le fichier ne doit pas dépasser 4MB');
//       }

//       // Upload file using Uploadthing
//       const uploadResult = await startUpload([file]);
      
//       if (!uploadResult?.[0]) {
//         throw new Error('Échec du téléchargement');
//       }

//       const result = uploadResult[0];
      
//       if (!result.url) {
//         throw new Error('URL du fichier non disponible');
//       }

//       console.log("Upload successful:", result.url);
      
//       return {
//         url: result.url,
//         key: result.key || result.url.split('/').pop() || ''
//       };

//     } catch (error) {
//       console.error('Upload error:', error);
//       throw error;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return { uploadFile, isUploading };
// };

// src/hooks/useFileUpload.ts
import { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';

interface UploadResult {
  url: string;
  key: string;
  name: string;
  size: number;
}

interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<UploadResult>;
  uploadFiles: (files: File[]) => Promise<UploadResult[]>;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { startUpload } = useUploadThing("applicationDocuments", {
    onClientUploadComplete: () => {
      setIsUploading(false);
      setProgress(100);
      setError(null);
    },
    onUploadError: (error: Error) => {
      setIsUploading(false);
      setProgress(0);
      setError(error.message);
      console.error('Upload error:', error);
    },
    onUploadBegin: () => {
      setIsUploading(true);
      setProgress(0);
      setError(null);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  const validateFile = (file: File): void => {
    const allowedTypes = [
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 4 * 1024 * 1024; // 4MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Type de fichier non supporté. Utilisez PDF, DOC ou DOCX.');
    }

    if (file.size > maxSize) {
      throw new Error(`Le fichier "${file.name}" est trop volumineux. Maximum: 4MB.`);
    }

    if (file.size === 0) {
      throw new Error(`Le fichier "${file.name}" est vide.`);
    }
  };

  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      setError(null);
      validateFile(file);

      console.log(`Starting upload: ${file.name} (${file.size} bytes)`);
      
      const uploadResult = await startUpload([file]);
      
      if (!uploadResult?.[0]) {
        throw new Error('Échec du téléchargement - aucune réponse du serveur');
      }

      const result = uploadResult[0];
      
      if (!result.url) {
        throw new Error('URL du fichier non disponible');
      }

      console.log(`Upload successful: ${result.url}`);
      
      return {
        url: result.url,
        key: result.key || '',
        name: result.name || file.name,
        size: file.size
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors du téléchargement';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const uploadFiles = async (files: File[]): Promise<UploadResult[]> => {
    if (files.length === 0) return [];
    
    try {
      setError(null);
      
      // Validate all files first
      files.forEach(validateFile);

      console.log(`Starting batch upload of ${files.length} files`);
      
      const uploadResult = await startUpload(files);
      
      if (!uploadResult || uploadResult.length !== files.length) {
        throw new Error('Échec du téléchargement de certains fichiers');
      }

      return uploadResult.map((result, index) => ({
        url: result.url,
        key: result.key || '',
        name: result.name || files[index].name,
        size: files[index].size
      }));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue lors du téléchargement';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    uploadFile,
    uploadFiles,
    isUploading,
    progress,
    error
  };
};