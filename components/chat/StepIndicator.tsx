'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export type Step = {
  id: number
  label: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

const defaultSteps: Step[] = [
  { id: 1, label: 'introduction', status: 'completed' },
  { id: 2, label: 'Legal', status: 'current' },
  { id: 3, label: 'QFC Entity', status: 'upcoming' },
  { id: 4, label: 'Shareholders', status: 'upcoming' },
  { id: 5, label: 'Financial Info', status: 'upcoming' },
  { id: 6, label: 'Review', status: 'upcoming' },
]

export function StepIndicator({
  steps = defaultSteps,
  currentStep,
  className,
}: StepIndicatorProps) {
  // Calculate progress percentage
  const completedSteps = steps.filter((s) => s.status === 'completed').length
  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 w-full px-2.5 py-5',
        className
      )}
    >
      {/* Steps */}
      <div className="flex flex-row justify-end items-center gap-5 w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center gap-1"
            style={{ width: 'auto' }}
          >
            {/* Step Circle */}
            <div className="relative">
              {step.status === 'completed' ? (
                <div className="w-5 h-5 rounded-full bg-[#01B544] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              ) : step.status === 'current' ? (
                <div className="w-5 h-5 rounded-full bg-[#F7FF00] flex items-center justify-center">
                  <span className="text-[10px] font-light font-['Geologica'] text-black leading-3">
                    {step.id}
                  </span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#F4F4F4] flex items-center justify-center">
                  <span className="text-[10px] font-light font-['Geologica'] text-black leading-3">
                    {step.id}
                  </span>
                </div>
              )}
            </div>

            {/* Step Label */}
            <span className="text-[8px] font-light font-['Geologica'] leading-[10px] text-black text-center whitespace-nowrap">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-1.5 bg-[#F4F4F4] rounded-[28px] overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#01B544] to-[#F7FF00] rounded-[28px] transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

StepIndicator.displayName = 'StepIndicator'

// Hook to manage step state
export function useSteps(initialStep: number = 1, totalSteps: number = 6) {
  const [currentStep, setCurrentStep] = React.useState(initialStep)

  const steps: Step[] = Array.from({ length: totalSteps }, (_, index) => {
    const stepNumber = index + 1
    let status: Step['status'] = 'upcoming'

    if (stepNumber < currentStep) {
      status = 'completed'
    } else if (stepNumber === currentStep) {
      status = 'current'
    }

    return {
      id: stepNumber,
      label: getStepLabel(stepNumber),
      status,
    }
  })

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }

  return {
    steps,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
  }
}

function getStepLabel(step: number): string {
  const labels: Record<number, string> = {
    1: 'introduction',
    2: 'Legal',
    3: 'QFC Entity',
    4: 'Shareholders',
    5: 'Financial Info',
    6: 'Review',
  }
  return labels[step] || `Step ${step}`
}
