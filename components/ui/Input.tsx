import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, leftIcon, rightIcon, fullWidth = true, disabled, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && <label htmlFor={inputId} className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'w-full rounded-lg border px-4 py-2.5 text-sm transition-all',
              'focus:outline-none focus:ring-2',
              !hasError && 'border-gray-300 focus:border-qfc-primary focus:ring-qfc-primary/20',
              hasError && 'border-error-500 focus:ring-error-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            disabled={disabled}
            aria-invalid={hasError}
            {...props}
          />
          {hasError && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-error-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>
        {error && <p className="text-xs text-error-500">{error}</p>}
        {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
