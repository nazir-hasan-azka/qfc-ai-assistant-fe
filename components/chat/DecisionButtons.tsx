'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

export interface DecisionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

export function DecisionButton({
  children,
  variant = 'primary',
  icon,
  className,
  ...props
}: DecisionButtonProps) {
  return (
    <button
      className={cn(
        'flex flex-row justify-center items-center px-4 py-2 gap-2.5 h-[30px] rounded-[50px] font-["Geologica"] font-light text-xs leading-[15px] transition-all hover:opacity-90',
        variant === 'primary' &&
          'bg-[#F6F6F6] text-[#4E4E4E] hover:bg-[#ECECEC]',
        variant === 'secondary' &&
          'bg-white border border-black/10 text-[#4E4E4E] hover:bg-gray-50',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="flex-none">{icon}</span>}
    </button>
  )
}

DecisionButton.displayName = 'DecisionButton'

// Decision Group Component
export interface DecisionGroupProps {
  buttons: Array<{
    label: string
    onClick: () => void
    icon?: React.ReactNode
    variant?: 'primary' | 'secondary'
  }>
  alignment?: 'left' | 'right' | 'center'
  className?: string
}

export function DecisionGroup({
  buttons,
  alignment = 'right',
  className,
}: DecisionGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-row items-center px-3 gap-2.5 w-full h-[46px]',
        alignment === 'right' && 'justify-end',
        alignment === 'center' && 'justify-center',
        alignment === 'left' && 'justify-start',
        className
      )}
    >
      {buttons.map((button, index) => (
        <DecisionButton
          key={index}
          variant={button.variant}
          onClick={button.onClick}
          icon={button.icon}
        >
          {button.label}
        </DecisionButton>
      ))}
    </div>
  )
}

DecisionGroup.displayName = 'DecisionGroup'

// Pre-defined Decision Buttons
export const AIDecisionButtons = {
  UseAI: ({ onClick }: { onClick: () => void }) => (
    <DecisionButton onClick={onClick} icon={<Sparkles className="w-[18px] h-[21px]" />}>
      Use AI to complete the form
    </DecisionButton>
  ),

  CompleteManually: ({ onClick }: { onClick: () => void }) => (
    <DecisionButton variant="secondary" onClick={onClick}>
      Complete manually
    </DecisionButton>
  ),

  ReadGuidelines: ({ onClick }: { onClick: () => void }) => (
    <DecisionButton onClick={onClick} icon={<Sparkles className="w-[18px] h-[21px]" />}>
      Read Guidelines
    </DecisionButton>
  ),

  ReviewAcknowledge: ({ onClick }: { onClick: () => void }) => (
    <DecisionButton onClick={onClick} icon={<Sparkles className="w-[18px] h-[21px]" />}>
      Review & Acknowledge
    </DecisionButton>
  ),

  ExplainFurther: ({ onClick }: { onClick: () => void }) => (
    <DecisionButton onClick={onClick} icon={<Sparkles className="w-[18px] h-[21px]" />}>
      Explain Further
    </DecisionButton>
  ),
}
