"use client"

import type React from "react"

const AccessDenied: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img src="/poe-ibu-logo.jpg" alt="POE IBU Logo" className="h-16 w-16" />
      </div>

      {/* 403 Message */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
      <p className="text-xl font-semibold text-gray-700 mb-2">Akses Ditolak</p>
      <p className="text-gray-600 mb-6">
        Token akses tidak valid atau tidak ditemukan. Silakan gunakan link yang benar untuk melanjutkan pendaftaran.
      </p>

      {/* Button */}
      <button disabled className="w-full bg-gray-300 text-gray-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed">
        Kembali
      </button>
    </div>

    {/* Footer */}
    <div className="mt-8 text-center text-sm text-gray-600">
      <p>© 2025 POE IBU • Privacy Policy • Terms</p>
    </div>
  </div>
)

export default AccessDenied
