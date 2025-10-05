'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, X, Download } from 'lucide-react';

interface BackgroundUploadProps {
  onFileChange: (file: File | null, previewUrl: string) => void;
  currentPreview?: string;
}

export default function BackgroundUpload({ onFileChange, currentPreview }: BackgroundUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image (JPG, PNG, etc.)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }
    
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

  const downloadBackground = () => {
    if (!currentPreview) return;
    
    const link = document.createElement('a');
    link.href = currentPreview;
    link.download = 'company_background.png';
    link.click();
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
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700">
            Glissez-déposez votre image ou cliquez pour parcourir
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG ou WebP (max. 5MB). Recommandé: 1200×400px
          </p>
          <Button type="button" variant="outline" className="mt-3" size="sm">
            <Upload className="h-3 w-3 mr-1" />
            Choisir une image
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
            <img 
              src={currentPreview} 
              alt="Aperçu de l'image de fond" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={downloadBackground}
              className="bg-green-500 hover:bg-green-600"
              title="Télécharger l'image"
            >
              <Download className="h-3 w-3 text-white" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeFile}
              title="Supprimer l'image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}