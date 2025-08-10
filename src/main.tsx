import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 

// Handle verify redirect (?verified_email=...)
try {
  const params = new URLSearchParams(window.location.search)
  const verified = params.get('verified_email')
  if (verified) {
    localStorage.setItem('emailVerified', JSON.stringify({ email: verified }))
    // Clean URL
    const url = new URL(window.location.href)
    url.searchParams.delete('verified_email')
    window.history.replaceState({}, '', url.toString())
  }
} catch {}