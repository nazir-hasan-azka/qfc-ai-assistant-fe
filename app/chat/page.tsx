'use client'

import React from 'react'
import { ChatInterface } from '@/components/chat'
import { MessageCircle, X } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#F5F5F5]">
      {/* Main Content Area - Adjusted for sidebar */}
      <div className="mr-[80px] transition-all duration-300">
        {/* ==================== QFC Application Header ==================== */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8B7B9E] flex items-center justify-center">
              <span className="text-sm font-medium text-white">CP</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Client Portal</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">partone.user</span>
            <span className="text-xs text-gray-400">email.3101463@email.com</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300" />
            <div className="w-8 h-8 rounded-full bg-[#FF9F40] flex items-center justify-center relative">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
        </header>

        {/* ==================== Main Content ==================== */}
        <main className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Purple Header Bar */}
          <div className="bg-[#7D6378] text-white px-6 py-4 rounded-t-lg flex items-center justify-between shadow-sm">
            <h1 className="text-lg font-semibold font-['Inter']">
              Part One: Pre-Qualification
            </h1>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 cursor-pointer hover:opacity-80" />
              <X className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-white border-x border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold">i</span>
              </div>
              <span className="text-sm text-gray-600 font-['Inter']">
                All changes are saved automatically.
              </span>
            </div>
            <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          {/* Step Indicator Header */}
          <div className="bg-white border-x border-gray-200 px-6 py-6">
            <div className="grid grid-cols-6 gap-4 mb-6">
              {[
                { num: '1/6', label: 'WELCOME TO PART ONE', active: true },
                { num: '2/6', label: 'LEGAL STRUCTURE AND\nPERMITTED ACTIVITIES', active: false },
                { num: '3/6', label: 'NAME OF PROPOSED FIRM', active: false },
                { num: '4/6', label: 'SHARE CAPITAL AND\nSHAREHOLDERS', active: false },
                { num: '5/6', label: 'FINANCIAL INFORMATION AND\nPROJECTIONS', active: false },
                { num: '6/6', label: 'REVIEW', active: false },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className={`text-xs font-semibold mb-2 font-['Inter'] ${
                      step.active ? 'text-[#5B8CC4]' : 'text-gray-400'
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase leading-tight whitespace-pre-line font-['Inter'] font-medium">
                    {step.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-24 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#5B8CC4]" />
                <span className="text-xs text-[#5B8CC4] font-['Inter'] font-medium">
                  Introduction To Part One
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-400 font-['Inter']">
                  Undertaking
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-400 font-['Inter']">
                  Before You Start Part One
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white border-x border-b border-gray-200 rounded-b-lg px-8 py-8 shadow-sm">
            <div className="max-w-3xl">
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-['Inter']">
                Thank you for your interest in the Qatar Financial Centre ("
                <strong>QFC</strong>").
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-['Inter']">
                You are about to begin Part One of the Application for
                Incorporation and Licensing ("<strong>Part One</strong>"). If
                qualified, you will be invited to complete Part Two of the
                Application for Incorporation and Licensing ("
                <strong>Part Two</strong>").
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-['Inter']">
                In Part One, you are required to provide the following information
                on your proposed firm:
              </p>

              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed mb-4 ml-4 space-y-2 font-['Inter']">
                <li>Connection and legal structure;</li>
                <li>Permitted activities and restrictions;</li>
                <li>Proposed firm name;</li>
                <li>Projected number of employees;</li>
                <li>Share capital and shareholder details; and</li>
                <li>Financial information and projections.</li>
              </ul>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-['Inter']">
                <strong>
                  Please complete Part One carefully as the information provided
                  in this part cannot be edited in Part Two.
                </strong>
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-['Inter']">
                If you have any queries on Part One, please do not hesitate to
                contact the QFCA at:
              </p>

              <a
                href="mailto:professionalservices@qfc.qa"
                className="text-sm text-[#5B8CC4] leading-relaxed hover:underline font-['Inter']"
              >
                professionalservices@qfc.qa
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* ==================== Chat Sidebar ==================== */}
      <ChatInterface />
    </div>
  )
}
