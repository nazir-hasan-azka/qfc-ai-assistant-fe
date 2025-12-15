'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useChat } from '@/contexts/ChatProvider'
import { ChatMessage, LoadingMessage, UserDecisionButton } from './ChatMessage'
import { StepIndicator, useSteps } from './StepIndicator'
import { FileUploadZone } from './FileUploadZone'

export interface ChatBoxProps {
  className?: string
  showStepIndicator?: boolean
  showFileUpload?: boolean
}

export function ChatBox({
  className,
  showStepIndicator = false,
  showFileUpload = false,
}: ChatBoxProps) {
  const { messages, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { steps, currentStep } = useSteps(2, 6)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  return (
    <div
      className={cn(
        'flex flex-col h-full w-full overflow-hidden bg-white',
        className
      )}
    >
      {/* Messages Container */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto scrollbar-custom px-4 py-6">
        {/* Example conversation from the image */}
        {messages.length === 0 && (
          <>
            {/* Initial centered question */}
            <ChatMessage
              role="centered"
              content="Would you like to continue with AI assistance or complete the form manually?"
            />

            {/* User decision */}
            <UserDecisionButton
              label="Use AI to complete the form"
              onClick={() => console.log('Use AI clicked')}
            />

            {/* Assistant response */}
            <ChatMessage
              role="assistant"
              content="Excellent choice. Before I can start completing your application, there is one essential step you must complete. You need to review and acknowledge the general registration guidelines and legal terms.

These guidelines are required by QFC and must be confirmed before any company data is submitted.

I'll be monitoring your session in the background when you return, I'll take you straight to the next section without repeating any previous steps, Once you confirm your acknowledgement"
            />

            {/* Next decision */}
            <UserDecisionButton
              label="Review & Acknowledge"
              onClick={() => console.log('Review clicked')}
            />
          </>
        )}

        {/* Actual messages from ChatProvider */}
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && <LoadingMessage />}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Step Indicator */}
      {showStepIndicator && (
        <div className="border-t border-gray-100 bg-white">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      )}

      {/* File Upload Zone */}
      {showFileUpload && (
        <div className="px-4 py-4 border-t border-gray-100 bg-white">
          <FileUploadZone
            onFilesSelected={(files) => console.log('Files selected:', files)}
            maxFiles={5}
            maxFileSize={10}
          />
        </div>
      )}
    </div>
  )
}

ChatBox.displayName = 'ChatBox'
