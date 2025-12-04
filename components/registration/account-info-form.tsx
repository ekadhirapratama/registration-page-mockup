"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { accountInfoSchema } from "@/lib/validation/registration"

interface AccountInfoFormProps {
  onNext: (data: AccountInfoData) => void
  onBack: () => void
  initialData?: AccountInfoData
}

export interface AccountInfoData {
  fullName: string
  nipNik: string
  position: string
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({ onNext, onBack, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountInfoData>({
    resolver: yupResolver(accountInfoSchema),
    defaultValues: initialData || {
      fullName: "",
      nipNik: "",
      position: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Nama Lengkap PIC</label>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Tulis Nama Lengkap Anda"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      {/* NIP/NIK */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">NIP/NIK</label>
        <input
          {...register("nipNik")}
          type="text"
          placeholder="Tulis NIP/NIK Anda"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.nipNik ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nipNik && <p className="mt-1 text-sm text-red-600">{errors.nipNik.message}</p>}
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Nama Jabatan</label>
        <input
          {...register("position")}
          type="text"
          placeholder="Tulis Jabatan Anda"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
            errors.position ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Selanjutnya
        </button>
      </div>
    </form>
  )
}

export default AccountInfoForm
