'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { EditModalProps } from "@/types/company";

export default function EditModal({
  isOpen,
  onClose,
  title,
  value,
  onSave,
  isTextarea = false,
  label,
  placeholder,
  maxLength,
  isLoading = false,
}: EditModalProps) {
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setEditedValue(value);
      setError("");
    }
  }, [isOpen, value]);

  const handleSave = async () => {
    if (!editedValue.trim()) {
      setError("Ce champ ne peut pas être vide");
      return;
    }

    if (maxLength && editedValue.length > maxLength) {
      setError(`Le texte ne peut pas dépasser ${maxLength} caractères`);
      return;
    }

    try {
      await onSave(editedValue.trim());
      onClose();
    } catch (err) {
      setError("Erreur lors de la sauvegarde");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTextarea) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          {label && (
            <DialogDescription className="text-sm text-gray-600">
              {label}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            {isTextarea ? (
              <Textarea
                value={editedValue}
                onChange={(e) => {
                  setEditedValue(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={6}
                className="resize-none"
                disabled={isLoading}
              />
            ) : (
              <Input
                value={editedValue}
                onChange={(e) => {
                  setEditedValue(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
              />
            )}
            
            <div className="flex justify-between items-center">
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {maxLength && (
                <p className={`text-xs ml-auto ${
                  editedValue.length > maxLength ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {editedValue.length}/{maxLength}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isLoading || !editedValue.trim()}
              className="min-w-20"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Enregistrer"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}