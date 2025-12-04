"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import AccessDenied from "@/components/registration/access-denied"
import SuccessCard from "@/components/registration/success-card"
import StepIndicator from "@/components/registration/step-indicator"
import AccountInfoForm, { type AccountInfoData } from "@/components/registration/account-info-form"
import PasswordForm, { type PasswordData } from "@/components/registration/password-form"

type RegistrationType = "full" | "password-only"
type RegistrationStep = "info" | "password" | "success"

interface RegistrationState {
  accountInfo: AccountInfoData | null
  passwordData: PasswordData | null
}

const RegisterPageContent: React.FC = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const type = (searchParams.get("type") || "full") as RegistrationType

  const [currentStep, setCurrentStep] = useState<RegistrationStep>("info")
  const [formData, setFormData] = useState<RegistrationState>({
    accountInfo: null,
    passwordData: null,
  })

  useEffect(() => {
    if (!token) {
      setCurrentStep("info") // Will render access denied below
    }
  }, [token])

  // No token - show 403
  if (!token) {
    return <AccessDenied />
  }

  // Handle account info form submission (Step 1 - Full registration)
  const handleAccountInfoSubmit = (data: AccountInfoData) => {
    setFormData((prev) => ({ ...prev, accountInfo: data }))
    setCurrentStep("password")
  }

  // Handle password form submission
  const handlePasswordSubmit = (data: PasswordData) => {
    setFormData((prev) => ({ ...prev, passwordData: data }))
    // In a real app, you would submit to an API here
    console.log("[v0] Registration complete:", { formData, ...data })
    setCurrentStep("success")
  }

  // Handle going back from password to account info
  const handleBackToInfo = () => {
    setCurrentStep("info")
  }

  // Handle going back from password-only form
  const handleBackButton = () => {
    if (currentStep === "password" && type === "full") {
      handleBackToInfo()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Success State */}
      {currentStep === "success" && <SuccessCard />}

      {/* Registration Forms */}
      {currentStep !== "success" && (
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img src="/poe-ibu-logo.jpg" alt="POE IBU Logo" className="h-16 w-16" />
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {type === "full" ? "Buat Akun" : "Buat Kata Sandi"}
            </h1>
            <p className="text-gray-600 text-sm mb-8">
              {type === "full"
                ? "Lengkapi beberapa informasi di bawah ini untuk membuat dan mengaktifkan akun Anda."
                : "Buat kata sandi baru untuk melindungi akun Anda."}
            </p>

            {/* Step Indicator - Only for Full Registration */}
            {type === "full" && (
              <StepIndicator
                currentStep={currentStep === "info" ? 1 : 2}
                totalSteps={2}
                stepLabels={["Informasi Detail", "Kata Sandi"]}
              />
            )}

            {/* Forms */}
            {type === "full" ? (
              <>
                {currentStep === "info" && (
                  <AccountInfoForm
                    onNext={handleAccountInfoSubmit}
                    onBack={() => {}}
                    initialData={formData.accountInfo || undefined}
                  />
                )}
                {currentStep === "password" && (
                  <PasswordForm
                    onNext={handlePasswordSubmit}
                    onBack={handleBackToInfo}
                    showBackButton={true}
                    submitButtonText="Submit"
                  />
                )}
              </>
            ) : type === "password-only" ? (
              <PasswordForm
                onNext={handlePasswordSubmit}
                onBack={handleBackButton}
                showBackButton={false}
                submitButtonText="Buat Kata Sandi"
              />
            ) : (
              <AccessDenied />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {currentStep !== "success" && (
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 POE IBU • Privacy Policy • Terms</p>
        </div>
      )}
    </div>
  )
}

const RegisterPage: React.FC = () => (
  <Suspense>
    <RegisterPageContent />
  </Suspense>
)

export default RegisterPage
