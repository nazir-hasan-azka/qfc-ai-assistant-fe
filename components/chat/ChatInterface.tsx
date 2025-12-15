'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUp, ChevronDown, PlusCircle, X, FileText, Link as LinkIcon, Image as ImageIcon, Upload, Check, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ChatInterfaceProps {
  className?: string
  iconPath?: string
}

type ChatMode = 'consulting' | 'form'
type ChatState = 'icon' | 'minimized' | 'expanded'
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

export function ChatInterface({ 
  className,
  iconPath = '/images/chatbot-icon.png' 
}: ChatInterfaceProps) {
  const [mode, setMode] = useState<ChatMode>('form')
  const [chatState, setChatState] = useState<ChatState>('icon')
  const [inputValue, setInputValue] = useState('')
  const [uploadTab, setUploadTab] = useState<UploadTab>('file')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
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
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    // Check if user is requesting file upload component
    if (inputValue.toLowerCase().trim() === 'file upload component') {
      setShowFileUpload(true)
      
      // Add assistant response
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
      // Regular assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I received your message. Type "File Upload Component" to activate file upload functionality.',
          sender: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }, 500)
    }
    
    setInputValue('')
  }

  const handleIconClick = () => {
    setChatState('expanded')
  }

  const handleMinimizeToggle = () => {
    if (chatState === 'minimized') {
      setChatState('expanded')
    } else if (chatState === 'expanded') {
      setChatState('minimized')
    }
  }

  const handleClose = () => {
    setChatState('icon')
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

  // State 1: Circular Icon Button
  if (chatState === 'icon') {
    return (
      <button
        onClick={handleIconClick}
        className={cn(
          'fixed bottom-5 right-5 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-[1000]',
          className
        )}
        aria-label="Open QFC Assistant"
      >
        <Image
          src={iconPath}
          alt="QFC Assistant"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
      </button>
    )
  }

  // State 2: Minimized Bar
  if (chatState === 'minimized') {
    return (
      <div
        className={cn(
          'fixed bottom-0 right-5 bg-white shadow-[0_-4px_81px_#EFEFEF] flex flex-col transition-all duration-300 w-[200px] rounded-t-xl z-[1000]',
          className
        )}
      >
        <div className="flex flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 rounded-t-xl hover:bg-gray-50 transition-colors">
          <button
            onClick={handleMinimizeToggle}
            className="flex flex-row items-center justify-between w-full"
          >
            <h2 className="text-sm font-semibold font-['Inter'] text-black">
              QFC Assistant
            </h2>
            <ChevronDown className="w-4 h-4 text-gray-600 transition-transform" />
          </button>
        </div>
      </div>
    )
  }

  // State 3: Expanded Widget
  return (
    <div
      className={cn(
        'fixed bottom-0 right-5 bg-white shadow-[0_-4px_81px_#EFEFEF] flex flex-col transition-all duration-300 w-[398px] rounded-t-2xl h-[699px] z-[1000]',
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100 rounded-t-2xl">
        <h2 className="text-base font-semibold font-['Inter'] text-black">
          QFC Assistant
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMinimizeToggle}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Minimize chat"
          >
            <ChevronDown className="w-5 h-5 text-gray-600 rotate-180 transition-transform" />
          </button>
          
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-4 py-3 border-b border-gray-50">
        <div className="flex flex-row justify-center items-center p-1 gap-1 bg-[#F5F0F4] rounded-xl">
          <button
            onClick={() => setMode('consulting')}
            className={cn(
              'flex-1 flex flex-row justify-center items-center px-5 py-2.5 gap-2 rounded-lg text-sm font-medium font-["Inter"] text-center transition-all',
              mode === 'consulting'
                ? 'bg-[#7D6378] text-white shadow-sm'
                : 'bg-transparent text-[#6B6B6B]'
            )}
          >
            Consulting AI
          </button>
          <button
            onClick={() => setMode('form')}
            className={cn(
              'flex-1 flex flex-row justify-center items-center px-5 py-2.5 gap-2 rounded-lg text-sm font-medium font-["Inter"] text-center transition-all',
              mode === 'form'
                ? 'bg-[#7D6378] text-white shadow-sm'
                : 'bg-transparent text-[#6B6B6B]'
            )}
          >
            Form Assistant
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto scrollbar-custom bg-[#F9F9F9] rounded-2xl mx-3 mb-3 mt-2">
        {mode === 'form' && showFileUpload ? (
          /* Form Assistant - File Upload UI */
          <div className="flex flex-col h-full p-4">
            {isAnalyzing ? (
              /* Analysis Loading Screen */
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-base font-medium text-gray-700 mb-8">
                  This process may take a few moments
                </p>
                
                <div className="relative w-48 h-48 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-80 animate-pulse" />
                  
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-1">
                        {analysisProgress}%
                      </div>
                      <div className="text-sm font-medium text-white/90">
                        Analyzing
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-spin-slow" />
                </div>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    {[
                      { num: 1, label: 'Introduction', status: 'complete' },
                      { num: 2, label: 'Legal', status: 'current' },
                      { num: 3, label: 'QFC Entity', status: 'pending' },
                      { num: 4, label: 'Shareholders', status: 'pending' },
                      { num: 5, label: 'Financial Info', status: 'pending' },
                      { num: 6, label: 'Review', status: 'pending' },
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1">
                        <div className="flex items-center w-full">
                          {idx > 0 && (
                            <div className={cn(
                              'flex-1 h-0.5',
                              step.status === 'complete' ? 'bg-green-500' : 'bg-gray-300'
                            )} />
                          )}
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold',
                            step.status === 'complete' && 'bg-green-500 text-white',
                            step.status === 'current' && 'bg-yellow-400 text-white',
                            step.status === 'pending' && 'bg-gray-300 text-gray-600'
                          )}>
                            {step.status === 'complete' ? <Check className="w-3 h-3" /> : step.num}
                          </div>
                          {idx < 5 && (
                            <div className={cn(
                              'flex-1 h-0.5',
                              step.status === 'complete' ? 'bg-green-500' : 'bg-gray-300'
                            )} />
                          )}
                        </div>
                        <span className={cn(
                          'text-[9px] font-medium mt-1 text-center',
                          step.status === 'current' ? 'text-green-600' : 'text-gray-500'
                        )}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="flex-1 flex flex-col">
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept={uploadTab === 'image' ? 'image/*' : '.pdf,.jpg,.jpeg,.png'}
                      className="hidden"
                    />
                    
                    <button
                      onClick={handleUploadClick}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-3"
                    >
                      Upload
                    </button>

                    <p className="text-base font-medium text-gray-900 mb-1">
                      {selectedFile ? selectedFile.name : 'Choose file to upload'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, JPG, JPEG, PNG.
                    </p>
                  </div>

                  {/* Tab Buttons */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setUploadTab('file')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all',
                        uploadTab === 'file'
                          ? 'bg-gray-100 border-gray-300 text-gray-900'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <FileText className="w-4 h-4" />
                      File
                    </button>
                    <button
                      onClick={() => setUploadTab('url')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all',
                        uploadTab === 'url'
                          ? 'bg-gray-100 border-gray-300 text-gray-900'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <LinkIcon className="w-4 h-4" />
                      URL
                    </button>
                    <button
                      onClick={() => setUploadTab('image')}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all',
                        uploadTab === 'image'
                          ? 'bg-gray-100 border-gray-300 text-gray-900'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image
                    </button>
                  </div>

                  {/* URL Input */}
                  {uploadTab === 'url' && (
                    <div className="mb-4">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Enter URL..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-['Inter'] outline-none focus:border-[#7D6378] transition-colors"
                      />
                    </div>
                  )}

                  {/* Uploaded Files Grid */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {file.type === 'url' ? (
                                <LinkIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              ) : file.type === 'image' ? (
                                <ImageIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              )}
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {file.type === 'url' && file.url ? (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline truncate"
                            >
                              {file.url}
                            </a>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {file.size} / {file.maxSize}
                              </span>
                              {file.status === 'uploading' ? (
                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  In progress
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                  <Check className="w-3 h-3" />
                                  Completed
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirmDisabled()}
                    className={cn(
                      'w-full px-6 py-3 rounded-lg text-base font-medium transition-all',
                      isConfirmDisabled()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[#7D6378] text-white hover:bg-[#6D5368]'
                    )}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Chat Messages Area */
          <div className="flex flex-col gap-4 p-4">
            {messages.length === 0 ? (
              <div className="text-sm text-[#6B6B6B] font-['Inter'] text-center py-8">
                Type "File Upload Component" to activate file upload functionality.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3 items-start',
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {/* Avatar */}
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                  )}>
                    <span className="text-white text-xs font-semibold">
                      {message.sender === 'user' ? 'U' : 'A'}
                    </span>
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={cn(
                    'max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] font-["Inter"]',
                    message.sender === 'user'
                      ? 'bg-[#7D6378] text-white rounded-tr-sm'
                      : 'bg-white text-gray-900 rounded-tl-sm'
                  )}>
                    {message.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex flex-col items-center px-4 pb-4 gap-2 bg-white">
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex-1 flex flex-row items-center px-4 py-2.5 gap-3 bg-[#F5F5F5] rounded-full">
            <div className="flex-none">
              <PlusCircle 
                className="w-4 h-4 text-[#A6A6A6]" 
                strokeWidth={1.5}
              />
            </div>
            
            <input
              type="text"
              placeholder="Ask me"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-[13px] font-normal font-['Inter'] text-[#6B6B6B] bg-transparent outline-none placeholder:text-[#A6A6A6]"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="flex flex-row justify-center items-center w-10 h-10 bg-[#F5F5F5] rounded-full hover:bg-[#ECECEC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <ArrowUp className="w-5 h-5 text-[#8B8B8B]" strokeWidth={2} />
          </button>
        </div>

        <p className="text-[11px] font-normal font-['Inter'] text-[#A6A6A6] text-center">
          AI can make mistakes, so double-check it
        </p>
      </div>
    </div>
  )
}

ChatInterface.displayName = 'ChatInterface'
