'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { User } from 'lucide-react'

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'centered'
  content: string
  timestamp?: Date
  avatar?: string
  className?: string
}

export function ChatMessage({
  role,
  content,
  timestamp,
  avatar,
  className,
}: ChatMessageProps) {
  const isAssistant = role === 'assistant' || role === 'system'
  const isUser = role === 'user'
  const isCentered = role === 'centered'

  // Centered message (like the initial question)
  if (isCentered) {
    return (
      <div className={cn('w-full flex justify-center px-6 py-4', className)}>
        <div className="text-center text-[15px] leading-[24px] font-normal text-[#4A4A4A] font-['Inter']">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-row items-start gap-3 w-full animate-[fadeUp_0.4s_ease-out]',
        isUser && 'justify-end',
        className
      )}
    >
      {/* Avatar */}
      {isAssistant && (
        <div className="flex-none w-[20px] h-[20px] relative mt-0.5">
          {avatar ? (
            <Image
              src={avatar}
              alt="QFC Assistant"
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#6B5B9E] to-[#8B7BB8] flex items-center justify-center shadow-sm">
              <span className="text-[10px] text-white font-semibold">Q</span>
            </div>
          )}
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'flex-1 font-["Inter"] font-normal leading-[24px]',
          isAssistant && 'text-[15px] text-[#4A4A4A] max-w-[620px]',
          isUser && 'text-[15px] text-[#4A4A4A] ml-auto max-w-[620px]'
        )}
      >
        {content}
      </div>
    </div>
  )
}

ChatMessage.displayName = 'ChatMessage'

// User Decision Button Component
export interface UserDecisionButtonProps {
  label: string
  onClick: () => void
  className?: string
}

export function UserDecisionButton({
  label,
  onClick,
  className,
}: UserDecisionButtonProps) {
  return (
    <div className={cn('w-full flex justify-end px-6 py-2', className)}>
      <button
        onClick={onClick}
        className="flex flex-row items-center gap-3 px-6 py-2.5 bg-[#EEEEEE] hover:bg-[#E5E5E5] rounded-[20px] transition-colors"
      >
        <span className="text-[15px] font-normal font-['Inter'] text-[#4A4A4A]">
          {label}
        </span>
        <User className="w-[18px] h-[18px] text-[#6B7AF5]" />
      </button>
    </div>
  )
}

UserDecisionButton.displayName = 'UserDecisionButton'

// Loading Message Component (typing indicator)
export function LoadingMessage() {
  return (
    <div className="flex flex-row items-start gap-3 w-full">
      {/* Avatar */}
      <div className="flex-none w-[20px] h-[20px] relative mt-0.5">
        <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#6B5B9E] to-[#8B7BB8] flex items-center justify-center shadow-sm">
          <span className="text-[10px] text-white font-semibold">Q</span>
        </div>
      </div>

      {/* Loading Dots */}
      <div className="flex items-center gap-1 py-1">
        <div className="flex gap-1 loading-dots">
          <span className="w-2 h-2 bg-[#7D6378] rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]" />
          <span
            className="w-2 h-2 bg-[#7D6378] rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]"
            style={{ animationDelay: '-0.16s' }}
          />
          <span
            className="w-2 h-2 bg-[#7D6378] rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]"
            style={{ animationDelay: '-0.32s' }}
          />
        </div>
      </div>
    </div>
  )
}

LoadingMessage.displayName = 'LoadingMessage'
