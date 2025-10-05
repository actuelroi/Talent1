'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, X, Download } from 'lucide-react';

interface LogoUploadProps {
  onFileChange: (file: File | null, previewUrl: string) => void;
  currentPreview?: string;
  logoText?: string;
  onLogoTextChange?: (text: string) => void;
}

export default function LogoUpload({ 
  onFileChange, 
  currentPreview, 
  logoText = "Logo",
  onLogoTextChange 
}: LogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez télécharger une image (JPG, PNG, etc.)');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      alert('Le logo ne doit pas dépasser 2MB');
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

  const downloadLogo = () => {
    if (!currentPreview) return;
    
    const link = document.createElement('a');
    link.href = currentPreview;
    link.download = 'company_logo.png';
    link.click();
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
            Glissez-déposez votre logo ou cliquez pour parcourir
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG ou WebP (max. 2MB). Recommandé: 400×400px
          </p>
          <Button type="button" variant="outline" className="mt-3" size="sm">
            <Upload className="h-3 w-3 mr-1" />
            Choisir un logo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center p-2 border-2 border-gray-200">
              <img 
                src={currentPreview} 
                alt="Aperçu du logo" 
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="absolute -top-2 -right-2 flex gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={downloadLogo}
                className="rounded-full h-6 w-6 p-0 bg-green-500 hover:bg-green-600"
                title="Télécharger le logo"
              >
                <Download className="h-3 w-3 text-white" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeFile}
                className="rounded-full h-6 w-6 p-0"
                title="Supprimer le logo"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {onLogoTextChange && (
            <div className="w-full">
              <label className="text-xs font-medium text-gray-700">Texte du logo</label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => onLogoTextChange(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded mt-1"
                placeholder="Entrez le texte du logo"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}