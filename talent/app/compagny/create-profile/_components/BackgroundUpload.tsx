// src/app/companies/create-profile/components/BackgroundUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image, X } from 'lucide-react';

interface BackgroundUploadProps {
  onFileChange: (file: File | null, preview: string) => void;
  currentPreview: string;
}

export default function BackgroundUpload({ onFileChange, currentPreview }: BackgroundUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    // Check file type (images only)
    if (!file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image (JPG, PNG, etc.)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      onFileChange(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    onFileChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        id="background"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {!currentPreview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-700">
            Glissez-déposez votre image ou cliquez pour parcourir
          </p>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG ou WebP (max. 5MB). Recommandé: 1200×400px
          </p>
          <Button type="button" variant="outline" className="mt-4">
            <Upload className="h-4 w-4 mr-2" />
            Choisir une image
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={currentPreview} 
              alt="Aperçu de l'image de fond" 
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeFile}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        <p><strong>Conseil :</strong> Utilisez une image haute qualité qui représente votre entreprise.</p>
        <p>Évitez les images avec du texte important qui pourrait être coupé.</p>
      </div>
    </div>
  );
}