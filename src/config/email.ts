export const emailConfig = {
  addresses: {
    contact: import.meta.env.VITE_CONTACT_EMAIL || 'advisors@valhallis.eu',
    support: import.meta.env.VITE_SUPPORT_EMAIL || 'advisors@valhallis.eu',
    admin: import.meta.env.VITE_ADMIN_EMAIL || 'advisors@valhallis.eu'
  },
  
  smtp: {
    host: import.meta.env.VITE_SMTP_HOST || 'smtp.valhallis.eu',
    port: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
    secure: import.meta.env.VITE_SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: import.meta.env.VITE_SMTP_USER || 'no-reply@valhallis.eu',
      pass: import.meta.env.VITE_SMTP_PASS || ''
    }
  },
  
  verification: {
    tokenExpiry: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 3
  },
  
  validation: {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxMessageLength: 1000,
    maxNameLength: 100,
    maxCompanyLength: 100
  },
  
  urls: {
    baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
  }
}; 