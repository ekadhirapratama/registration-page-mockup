"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { passwordSchema } from "@/lib/validation/registration"
import { Eye, EyeOff, Info } from "lucide-react"

interface PasswordFormProps {
  onNext: (data: PasswordData) => void
  onBack: () => void
  showBackButton?: boolean
  submitButtonText?: string
}

export interface PasswordData {
  password: string
  confirmPassword: string
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  onNext,
  onBack,
  showBackButton = true,
  submitButtonText = "Submit",
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Password Requirements Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          Kata Sandi terdiri dari min. 6 karakter dengan kombinasi huruf besar atau kecil, angka, dan simbol.
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Kata Sandi</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all pr-10 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Konfirmasi Kata Sandi</label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all pr-10 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Buttons */}
      <div className={`flex gap-4 pt-4 ${showBackButton ? "" : ""}`}>
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
        )}
        <button
          type="submit"
          className={`${showBackButton ? "flex-1" : "w-full"} px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors`}
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  )
}

export default PasswordForm
