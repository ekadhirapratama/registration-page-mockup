"use client"

import React from "react"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepLabels }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    {stepLabels.map((label, index) => {
      const stepNumber = index + 1
      const isCompleted = stepNumber < currentStep
      const isActive = stepNumber === currentStep

      return (
        <React.Fragment key={stepNumber}>
          {/* Step Badge */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
              isCompleted ? "bg-red-600 text-white" : isActive ? "bg-red-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
          </div>

          {/* Step Label */}
          <span className={`text-sm font-medium ${isActive ? "text-red-600" : "text-gray-600"}`}>{label}</span>

          {/* Divider */}
          {stepNumber < totalSteps && <div className="h-px w-8 bg-gray-300" />}
        </React.Fragment>
      )
    })}
  </div>
)

export default StepIndicator
