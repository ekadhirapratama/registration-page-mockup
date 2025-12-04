"use client"

import type React from "react"
import { CheckCircle2 } from "lucide-react"

interface SuccessCardProps {
  userName?: string
}

const SuccessCard: React.FC<SuccessCardProps> = ({ userName = "anda" }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src="/poe-ibu-logo.jpg" alt="POE IBU Logo" className="h-16 w-16" />
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 bg-red-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-red-600" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Akun Anda Berhasil dibuat!
      </h2>

      {/* Message */}
      <p className="text-center text-gray-600 text-sm leading-relaxed mb-8">
        Selamat akun {userName} berhasil dibuat, silahkan menggunakan email dan kata  sandi yang telah dibuat untuk akun tersebut agar dapat mengakses Content Management System POE IBU.
      </p>

      {/* Button */}
      <button
        disabled
        className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 cursor-not-allowed"
      >
        Masuk ke Akun
      </button>
    </div>

    {/* Footer */}
    <div className="mt-8 text-center text-sm text-gray-600">
      <p>© 2025 POE IBU • Privacy Policy • Terms</p>
    </div>
  </div>
)

export default SuccessCard
