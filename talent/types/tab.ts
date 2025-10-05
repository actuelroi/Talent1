// types/tab.ts
export interface CustomTab {
  id: string;
  label: string;
  content: string;
  type: 'text' | 'html' | 'component';
  createdAt: Date;
  updatedAt: Date;
}

export interface TabContentProps {
  content: string;
  type: 'text' | 'html' | 'component';
  onUpdate?: (content: string) => void;
  isEditing?: boolean;
}