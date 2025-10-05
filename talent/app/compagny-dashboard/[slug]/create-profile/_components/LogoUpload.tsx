// src/app/companies/create-profile/components/LogoUpload.tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image, X } from 'lucide-react';

interface LogoUploadProps {
  onFileChange: (file: File | null, preview: string) => void;
  currentPreview: string;
}

export default function LogoUpload({ onFileChange, currentPreview }: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    // Check file type (images only)
    if (!file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image (JPG, PNG, etc.)');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Le logo ne doit pas dépasser 2MB');
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
        id="logo"
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
            Glissez-déposez votre logo ou cliquez pour parcourir
          </p>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG ou WebP (max. 2MB). Recommandé: 400×400px
          </p>
          <Button type="button" variant="outline" className="mt-4">
            <Upload className="h-4 w-4 mr-2" />
            Choisir un logo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={currentPreview} 
                alt="Aperçu du logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeFile}
              className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Votre logo apparaîtra dans un cercle sur votre profil
          </p>
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        <p><strong>Conseil :</strong> Utilisez un logo carré ou circulaire avec un fond transparent (PNG).</p>
        <p>Évitez les logos avec des détails trop fins qui pourraient être perdus.</p>
      </div>
    </div>
  );
}