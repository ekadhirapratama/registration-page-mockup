import * as yup from "yup"

// Password validation schema - reusable for both forms
export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Kata sandi minimal 6 karakter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]/,
      "Kata sandi harus mengandung huruf besar, huruf kecil, angka, dan simbol",
    )
    .required("Kata sandi wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi kata sandi tidak cocok")
    .required("Konfirmasi kata sandi wajib diisi"),
})

// Step 1 validation - Account Information
export const accountInfoSchema = yup.object().shape({
  fullName: yup.string().min(3, "Nama minimal 3 karakter").required("Nama lengkap PIC wajib diisi"),
  nipNik: yup.string().min(5, "NIP/NIK minimal 5 karakter").required("NIP/NIK wajib diisi"),
  position: yup.string().min(3, "Jabatan minimal 3 karakter").required("Nama jabatan wajib diisi"),
})

// Complete registration schema (2-step)
export const fullRegistrationSchema = accountInfoSchema.concat(passwordSchema)

// Password-only registration schema
export const passwordOnlySchema = passwordSchema
