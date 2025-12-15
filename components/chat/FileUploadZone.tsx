'use client'

import React, { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Upload,
  FileText,
  Link2,
  Image as ImageIcon,
  X,
  Loader2,
} from 'lucide-react'

export interface FileUploadZoneProps {
  onFilesSelected?: (files: File[]) => void
  onUrlSubmit?: (url: string) => void
  maxFiles?: number
  maxFileSize?: number // in MB
  acceptedFileTypes?: string[]
  className?: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: 'file' | 'url' | 'image'
  url?: string
  status: 'uploading' | 'completed' | 'error'
  progress?: number
}

export function FileUploadZone({
  onFilesSelected,
  onUrlSubmit,
  maxFiles = 10,
  maxFileSize = 10, // 10MB
  acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  className,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [maxFiles, maxFileSize]
  )

  const handleFiles = (files: File[]) => {
    // Validate files
    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is ${maxFileSize}MB`)
        return false
      }
      if (
        acceptedFileTypes.length > 0 &&
        !acceptedFileTypes.includes(file.type)
      ) {
        alert(`File ${file.name} type not supported`)
        return false
      }
      return true
    })

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Add files to uploaded list
    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      status: 'uploading' as const,
      progress: 40,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: 'completed' as const, progress: 100 }
              : f
          )
        )
      }, 1000 + index * 500)
    })

    onFilesSelected?.(validFiles)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(0) + ' MB'
  }

  return (
    <div className={cn('flex flex-col gap-3 w-full', className)}>
      {/* Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col justify-center items-center px-3 py-5 gap-5 w-full min-h-[191px] bg-[#FBFBFB] border border-dashed rounded-xl transition-all',
          isDragging
            ? 'border-[#C868B5] bg-[#FFFDFF]'
            : 'border-black/20 hover:border-[#C868B5]/40 hover:bg-[#FFFDFF]'
        )}
      >
        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-row justify-center items-center px-3 gap-2.5 h-[33px] bg-white border border-black/10 rounded-[11px] hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-normal font-['Geologica'] text-center tracking-[-0.02em] text-[#4E4E4E]">
            Upload
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Instructions */}
        <div className="flex flex-col items-start gap-2 w-full max-w-[333px]">
          <p className="text-sm font-normal font-['Geologica'] text-center text-[#333333] w-full">
            Choose file to upload
          </p>
          <p className="text-[10px] font-light font-['Geologica'] leading-3 text-center text-[#4E4E4E] w-full">
            PDF, JPG, JPEG, PNG.
          </p>
        </div>
      </div>

      {/* Upload Options */}
      <div className="flex flex-row items-start gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex flex-row justify-center items-center px-2 py-1 gap-1 h-[21px] rounded-md border transition-colors',
            isDragging
              ? 'bg-[#FFF9FE] border-[#C868B5]'
              : 'bg-[#F1F1F1] border-black/20 hover:border-[#C868B5]'
          )}
        >
          <FileText className="w-3 h-3 text-[#4E4E4E]" />
          <span className="text-[10px] font-light font-['Geologica'] leading-3 text-center text-[#4E4E4E]">
            File
          </span>
        </button>

        <button className="flex flex-row justify-center items-center px-2 py-1 gap-1 h-[21px] rounded-md border border-black/20 hover:border-[#C868B5] transition-colors">
          <Link2 className="w-3 h-3 text-[#4E4E4E]" />
          <span className="text-[10px] font-light font-['Geologica'] leading-3 text-center text-[#4E4E4E]">
            URL
          </span>
        </button>

        <button className="flex flex-row justify-center items-center px-2 py-1 gap-1 h-[21px] rounded-md border border-black/20 hover:border-[#C868B5] transition-colors">
          <ImageIcon className="w-3 h-3 text-[#4E4E4E]" />
          <span className="text-[10px] font-light font-['Geologica'] leading-3 text-center text-[#4E4E4E]">
            Image
          </span>
        </button>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex flex-col items-start p-3 gap-2 border border-black/10 rounded-xl"
            >
              <div className="flex flex-row justify-between items-center w-full gap-2">
                <div className="flex flex-row items-center gap-4 flex-1">
                  {/* Progress Circle */}
                  {file.status === 'uploading' && (
                    <div className="relative w-5 h-5">
                      <svg className="w-5 h-5 -rotate-90">
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="#D9D9D9"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="#01B544"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${(file.progress || 0) * 0.5} 50`}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[5px] font-light font-['Geologica'] leading-[6px] text-[#4E4E4E]">
                          {file.progress}%
                        </span>
                      </div>
                    </div>
                  )}

                  {file.status === 'completed' && (
                    <div className="w-5 h-5 rounded-full bg-[#01B544] flex items-center justify-center">
                      <span className="text-[5px] font-light text-white">✓</span>
                    </div>
                  )}

                  {/* File Info */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <p className="text-sm font-normal font-['Geologica'] leading-[18px] text-[#4E4E4E]">
                      {file.name}
                    </p>
                    <div className="flex flex-row items-start gap-1.5">
                      <span className="text-[8px] font-light font-['Geologica'] leading-[10px] text-[#4E4E4E]">
                        {formatFileSize(file.size)} / {formatFileSize(file.size)}
                      </span>
                      {file.status === 'uploading' && (
                        <div className="flex flex-row items-center gap-0.5">
                          <Loader2 className="w-2 h-2 animate-spin text-[#868686]" />
                          <span className="text-[8px] font-light font-['Geologica'] leading-[10px] text-[#868686]">
                            In progress
                          </span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <span className="text-[8px] font-light font-['Geologica'] leading-[10px] text-[#327B45]">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-none w-4 h-4 hover:opacity-70 transition-opacity"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-[#4E4E4E]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

FileUploadZone.displayName = 'FileUploadZone'
