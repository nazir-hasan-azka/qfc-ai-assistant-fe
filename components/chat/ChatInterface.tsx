'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUp, ChevronLeft, PlusCircle, FileText, Link as LinkIcon, Image as ImageIcon, Check, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ChatInterfaceProps {
  className?: string
  iconPath?: string
}

type ChatMode = 'consulting' | 'form'
type UploadTab = 'file' | 'url' | 'image'

interface UploadedFile {
  id: string
  name: string
  size: string
  maxSize: string
  status: 'uploading' | 'completed'
  type: 'file' | 'url' | 'image'
  url?: string
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

const STEPS = [
  { num: 1, label: 'Introduction' },
  { num: 2, label: 'Legal' },
  { num: 3, label: 'QFC Entity' },
  { num: 4, label: 'Shareholders' },
  { num: 5, label: 'Finance' },
  { num: 6, label: 'Review' },
]

export function ChatInterface({ 
  className,
  iconPath = '/images/chatbot-icon.png' 
}: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ChatMode>('form')
  const [currentStep, setCurrentStep] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [uploadTab, setUploadTab] = useState<UploadTab>('file')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Welcome to the Qatar Financial Centre (QFC).
I'm your AI Assistant, here to help you complete the company incorporation process in a clear, structured, and efficient way.

Here's how I will assist you:
• I will guide you through each stage.
• I will collect the documents needed for the application.
• I will analyse the files you upload to understand your business model, legal structure, and expected activities.
• I will pre-fill your entire application wherever possible — you will only review and confirm.

Would you like to continue with AI assistance or complete the form manually?`,
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [hasChosenPath, setHasChosenPath] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnalyzing) {
      interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setIsAnalyzing(false)
            return 100
          }
          return prev + 10
        })
      }, 300)
    }
    return () => clearInterval(interval)
  }, [isAnalyzing])

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    if (inputValue.toLowerCase().trim() === 'file upload component') {
      setShowFileUpload(true)
      
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'File upload component is now active. You can upload files, URLs, or images.',
          sender: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }, 500)
    } else {
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I received your message. How can I help you further?',
          sender: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }, 500)
    }
    
    setInputValue('')
  }

  const handleUseAI = () => {
    setHasChosenPath(true)
    const userMessage: Message = {
      id: Date.now().toString(),
      text: 'Use AI',
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Great choice! Let\'s get started. I\'ll guide you through each step of the application process. First, let me collect some information about your company.',
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 500)
  }

  const handleCompleteManually = () => {
    setHasChosenPath(true)
    const userMessage: Message = {
      id: Date.now().toString(),
      text: 'Complete manually',
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'No problem! You can complete the form manually. I\'ll still be here if you need any assistance along the way.',
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 500)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleConfirm = () => {
    if (uploadTab === 'file' && selectedFile) {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: selectedFile.name,
        size: '80 KB',
        maxSize: '120KB',
        status: 'uploading',
        type: 'file'
      }
      setUploadedFiles(prev => [...prev, newFile])
      
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: 'completed' } : f)
        )
        
        if (uploadedFiles.length >= 0) {
          setIsAnalyzing(true)
          setAnalysisProgress(0)
        }
      }, 2000)
      
      setSelectedFile(null)
    } else if (uploadTab === 'url' && urlInput) {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: 'Website link',
        size: '',
        maxSize: '',
        status: 'completed',
        type: 'url',
        url: urlInput
      }
      setUploadedFiles(prev => [...prev, newFile])
      setUrlInput('')
      
      setIsAnalyzing(true)
      setAnalysisProgress(0)
    } else if (uploadTab === 'image' && selectedFile) {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: 'Image',
        size: '80 KB',
        maxSize: '120KB',
        status: 'uploading',
        type: 'image'
      }
      setUploadedFiles(prev => [...prev, newFile])
      
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: 'completed' } : f)
        )
        
        setIsAnalyzing(true)
        setAnalysisProgress(0)
      }, 2000)
      
      setSelectedFile(null)
    }
  }

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
  }

  const isConfirmDisabled = () => {
    if (uploadTab === 'file') return !selectedFile
    if (uploadTab === 'url') return !urlInput.trim()
    if (uploadTab === 'image') return !selectedFile
    return true
  }

  // Closed state - White sidebar with icon at top, arrow at bottom
  if (!isOpen) {
    return (
      <div className={cn(
        'fixed top-0 right-0 h-full bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.08)] flex flex-col w-[80px] z-[1000]',
        className
      )}>
        <div className="flex-1 flex flex-col items-center justify-between py-6">
          {/* AI Icon at TOP */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Open QFC Assistant"
          >
            <Image
              src={iconPath}
              alt="QFC Assistant"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover"
            />
          </button>

          {/* Arrow at BOTTOM */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Expand chat"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    )
  }

  // Opened state - Full chat panel (right sidebar)
  return (
    <div className={cn(
      'fixed top-0 right-0 h-full bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.08)] flex flex-col w-[520px] z-[1000]',
      className
    )}>
      {/* Header - Full Width (No close button) */}
      <div className="flex flex-row items-center px-5 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Image
            src={iconPath}
            alt="QFC Assistant"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold font-['Inter'] text-black">
            QFC Assistant
          </h2>
        </div>
      </div>

      {/* Mode Toggle - Full Width */}
      <div className="px-5 py-3 bg-white">
        <div className="flex flex-row justify-center items-center gap-2">
          <button
            onClick={() => setMode('consulting')}
            className={cn(
              'flex-1 flex flex-row justify-center items-center px-6 py-3 rounded-full text-sm font-medium font-["Inter"] text-center transition-all border',
              mode === 'consulting'
                ? 'bg-[#7D6378] text-white border-[#7D6378]'
                : 'bg-white text-[#6B6B6B] border-gray-300 hover:bg-gray-50'
            )}
          >
            Consulting AI
          </button>
          <button
            onClick={() => setMode('form')}
            className={cn(
              'flex-1 flex flex-row justify-center items-center px-6 py-3 rounded-full text-sm font-medium font-["Inter"] text-center transition-all border',
              mode === 'form'
                ? 'bg-[#7D6378] text-white border-[#7D6378]'
                : 'bg-white text-[#6B6B6B] border-gray-300 hover:bg-gray-50'
            )}
          >
            Form Assistant
          </button>
        </div>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Vertical Step Indicator with Close Arrow at Bottom */}
        <div className="w-24 flex-shrink-0 py-6 px-3 bg-white border-r border-gray-100 flex flex-col">
          {/* Steps */}
          <div className="flex flex-col items-center gap-1 flex-1">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="flex flex-col items-center">
                {/* Connector Line Above (except first) */}
                {idx > 0 && (
                  <div className={cn(
                    'w-0.5 h-4',
                    idx < currentStep ? 'bg-[#7D6378]' : 'bg-gray-300'
                  )} />
                )}
                
                {/* Step Circle */}
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  idx + 1 === currentStep && 'bg-[#7D6378] text-white',
                  idx + 1 < currentStep && 'bg-[#7D6378] text-white',
                  idx + 1 > currentStep && 'bg-gray-200 text-gray-500'
                )}>
                  {idx + 1 < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.num
                  )}
                </div>
                
                {/* Step Label */}
                <span className={cn(
                  'text-[10px] font-medium mt-1 text-center leading-tight',
                  idx + 1 === currentStep ? 'text-[#7D6378]' : 'text-gray-500'
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Close Arrow at Bottom of Left Sidebar */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Collapse chat"
            >
              <ChevronLeft className="w-6 h-6 text-gray-500 rotate-180" />
            </button>
          </div>
        </div>

        {/* Right Side - Chat Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3 items-start',
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {/* Avatar */}
                  {message.sender === 'assistant' && (
                    <Image
                      src={iconPath}
                      alt="AI"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  
                  {/* Message Bubble */}
                  <div className={cn(
                    'max-w-[85%] text-[14px] font-["Inter"] leading-relaxed whitespace-pre-line',
                    message.sender === 'user'
                      ? 'bg-[#7D6378] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm'
                      : 'text-gray-700'
                  )}>
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area - Full Width */}
      <div className="bg-white border-t border-gray-100 px-4 py-4">
        {!hasChosenPath ? (
          /* Initial Choice Buttons - Full Width */
          <div className="flex items-center gap-3">
            {/* Action Buttons - Take full space */}
            <button
              onClick={handleUseAI}
              className="flex-1 px-6 py-3 bg-[#7D6378] text-white rounded-full text-sm font-medium hover:bg-[#6D5368] transition-colors"
            >
              Use AI
            </button>
            
            <button
              onClick={handleCompleteManually}
              className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Complete manually
            </button>
          </div>
        ) : (
          /* Chat Input - Full Width */
          <div className="flex items-center gap-3">
            {/* Input Field - Takes full space */}
            <div className="flex-1 flex flex-row items-center px-4 py-2.5 gap-3 bg-[#F5F5F5] rounded-full">
              <PlusCircle 
                className="w-5 h-5 text-[#A6A6A6] cursor-pointer hover:text-gray-600 flex-shrink-0" 
                strokeWidth={1.5}
              />
              
              <input
                type="text"
                placeholder="Ask me"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 text-[14px] font-normal font-['Inter'] text-gray-700 bg-transparent outline-none placeholder:text-[#A6A6A6]"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 flex items-center justify-center bg-[#F5F5F5] rounded-full hover:bg-[#ECECEC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <ArrowUp className="w-5 h-5 text-[#8B8B8B]" strokeWidth={2} />
            </button>
          </div>
        )}
        
        {/* Disclaimer - Full Width */}
        <p className="text-[11px] font-normal font-['Inter'] text-[#A6A6A6] text-center mt-3">
          AI can make mistakes, so double-check it
        </p>
      </div>
    </div>
  )
}

ChatInterface.displayName = 'ChatInterface'
