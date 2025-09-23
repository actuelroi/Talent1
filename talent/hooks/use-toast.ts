// utils/toast.ts
import { toast as sonnerToast } from 'sonner';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const toast = (props: ToastProps) => {
    const { 
      title, 
      description, 
      variant = 'default', 
      duration = 4000,
      action 
    } = props;
    
    const toastOptions = {
      description,
      duration,
      ...(action && {
        action: {
          label: action.label,
          onClick: action.onClick,
        },
      }),
    };

    switch (variant) {
      case 'destructive':
        return sonnerToast.error(title, toastOptions);
      case 'success':
        return sonnerToast.success(title, toastOptions);
      case 'warning':
        return sonnerToast.warning(title, toastOptions);
      case 'info':
        return sonnerToast.info(title, toastOptions);
      default:
        return sonnerToast(title, toastOptions);
    }
  };

  return {
    toast,
    dismiss: sonnerToast.dismiss,
    promise: sonnerToast.promise,
    loading: sonnerToast.loading,
  };
}

// Enhanced toast utilities with better typing
export const toast = {
  success: (title: string, description?: string, options?: any) => 
    sonnerToast.success(title, { description, ...options }),
  error: (title: string, description?: string, options?: any) => 
    sonnerToast.error(title, { description, ...options }),
  warning: (title: string, description?: string, options?: any) => 
    sonnerToast.warning(title, { description, ...options }),
  info: (title: string, description?: string, options?: any) => 
    sonnerToast.info(title, { description, ...options }),
  loading: (title: string, description?: string, options?: any) => 
    sonnerToast.loading(title, { description, ...options }),
  dismiss: sonnerToast.dismiss,
  promise: sonnerToast.promise,
};