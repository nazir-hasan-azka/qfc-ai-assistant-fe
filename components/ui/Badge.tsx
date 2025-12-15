import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({ className, variant = 'default', size = 'md', removable = false, onRemove, children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    info: 'bg-brand-50 text-brand-700',
    primary: 'bg-qfc-primary/10 text-qfc-primary',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', variants[variant], sizes[size], className)} {...props}>
      {children}
      {removable && onRemove && (
        <button type="button" onClick={onRemove} className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10">
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

export function StatusBadge({ status }: { status: 'online' | 'offline' | 'busy' | 'away' }) {
  const statusConfig = {
    online: { variant: 'success' as const, label: 'Online' },
    offline: { variant: 'default' as const, label: 'Offline' },
    busy: { variant: 'error' as const, label: 'Busy' },
    away: { variant: 'warning' as const, label: 'Away' },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
