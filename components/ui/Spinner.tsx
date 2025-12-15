import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  center?: boolean;
}

export function Spinner({ size = 'md', label, center = false }: SpinnerProps) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const content = (
    <>
      <Loader2 className={cn('animate-spin text-qfc-primary', sizes[size])} />
      {label && <span className="ml-2 text-sm text-gray-600">{label}</span>}
    </>
  );

  if (center) {
    return <div className="flex items-center justify-center">{content}</div>;
  }

  return <div className="inline-flex items-center">{content}</div>;
}

export function FullScreenSpinner({ label = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" />
        <p className="text-sm font-medium text-gray-700">{label}</p>
      </div>
    </div>
  );
}

export function LoadingDots() {
  return (
    <div className="loading-dots">
      <span /><span /><span />
    </div>
  );
}
