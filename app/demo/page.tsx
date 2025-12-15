'use client'

import React, { useState } from 'react'
import {
  ChatMessage,
  LoadingMessage,
  DecisionButton,
  DecisionGroup,
  AIDecisionButtons,
  StepIndicator,
  useSteps,
  FileUploadZone,
  ChatBox,
} from '@/components/chat'

export default function DemoPage() {
  const [showDemo, setShowDemo] = useState<string>('all')
  const { steps, currentStep, nextStep, prevStep } = useSteps(2, 6)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          QFC Chat Components Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Preview of all chat interface components based on Figma designs
        </p>

        {/* Demo Selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            'all',
            'messages',
            'decisions',
            'steps',
            'upload',
            'chatbox',
          ].map((demo) => (
            <button
              key={demo}
              onClick={() => setShowDemo(demo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showDemo === demo
                  ? 'bg-[#7D6378] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {demo.charAt(0).toUpperCase() + demo.slice(1)}
            </button>
          ))}
        </div>

        {/* Demos */}
        <div className="space-y-12">
          {/* Chat Messages */}
          {(showDemo === 'all' || showDemo === 'messages') && (
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Chat Messages
              </h2>
              <div className="max-w-[380px] space-y-6">
                <ChatMessage
                  role="assistant"
                  content="Welcome to the Qatar Financial Centre (QFC). I'm your AI Assistant, here to guide you through the company incorporation process step by step in a clear and efficient way. Would you like me to help you fill out the application automatically using AI assistance, or would you prefer to complete it manually yourself?"
                />
                <ChatMessage
                  role="user"
                  content="Yes, I would like to use AI assistance please."
                />
                <LoadingMessage />
              </div>
            </section>
          )}

          {/* Decision Buttons */}
          {(showDemo === 'all' || showDemo === 'decisions') && (
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Decision Buttons
              </h2>
              <div className="max-w-[380px] space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Initial Choice
                  </h3>
                  <DecisionGroup
                    buttons={[
                      {
                        label: 'Use AI to complete the form',
                        onClick: () => console.log('Use AI'),
                        icon: <span>✨</span>,
                      },
                      {
                        label: 'Complete manually',
                        onClick: () => console.log('Manual'),
                        variant: 'secondary',
                      },
                    ]}
                    alignment="right"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Guidelines Step
                  </h3>
                  <DecisionGroup
                    buttons={[
                      {
                        label: 'Review & Acknowledge',
                        onClick: () => console.log('Review'),
                        icon: <span>✨</span>,
                      },
                    ]}
                    alignment="right"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Pre-made Buttons
                  </h3>
                  <div className="space-y-3">
                    <AIDecisionButtons.UseAI
                      onClick={() => console.log('Use AI')}
                    />
                    <AIDecisionButtons.CompleteManually
                      onClick={() => console.log('Manual')}
                    />
                    <AIDecisionButtons.ReadGuidelines
                      onClick={() => console.log('Read')}
                    />
                    <AIDecisionButtons.ExplainFurther
                      onClick={() => console.log('Explain')}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Step Indicator */}
          {(showDemo === 'all' || showDemo === 'steps') && (
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Step Indicator
              </h2>
              <div className="max-w-[380px]">
                <StepIndicator steps={steps} currentStep={currentStep} />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Step
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === 6}
                    className="px-4 py-2 bg-[#7D6378] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Current Step: {currentStep} of 6
                </p>
              </div>
            </section>
          )}

          {/* File Upload Zone */}
          {(showDemo === 'all' || showDemo === 'upload') && (
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                File Upload Zone
              </h2>
              <div className="max-w-[380px]">
                <FileUploadZone
                  onFilesSelected={(files) =>
                    console.log('Files selected:', files)
                  }
                  maxFiles={5}
                  maxFileSize={10}
                />
              </div>
            </section>
          )}

          {/* Full ChatBox */}
          {(showDemo === 'all' || showDemo === 'chatbox') && (
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Complete ChatBox
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Basic Chat
                  </h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden h-[400px]">
                    <ChatBox />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    With Step Indicator
                  </h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden h-[400px]">
                    <ChatBox showStepIndicator />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  With File Upload
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden h-[500px] max-w-[380px]">
                  <ChatBox showFileUpload />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Color Reference */}
        <section className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            QFC Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="w-full h-20 bg-[#7D6378] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Purple</p>
              <p className="text-xs text-gray-600">#7D6378</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#EEE6EC] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Light Purple</p>
              <p className="text-xs text-gray-600">#EEE6EC</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#F6F6F6] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Light Gray</p>
              <p className="text-xs text-gray-600">#F6F6F6</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#01B544] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Success Green</p>
              <p className="text-xs text-gray-600">#01B544</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#F7FF00] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Highlight Yellow</p>
              <p className="text-xs text-gray-600">#F7FF00</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#C868B5] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Upload Border</p>
              <p className="text-xs text-gray-600">#C868B5</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#4E4E4E] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Text Gray</p>
              <p className="text-xs text-gray-600">#4E4E4E</p>
            </div>
            <div>
              <div className="w-full h-20 bg-[#F4F4F4] rounded-lg mb-2" />
              <p className="text-sm font-medium text-gray-900">Step Inactive</p>
              <p className="text-xs text-gray-600">#F4F4F4</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
