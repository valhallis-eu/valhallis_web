/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_SUPPORT_EMAIL: string
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_SMTP_HOST: string
  readonly VITE_SMTP_PORT: string
  readonly VITE_SMTP_SECURE: string
  readonly VITE_SMTP_USER: string
  readonly VITE_SMTP_PASS: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 