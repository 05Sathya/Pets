'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/login'
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blush blob"></div>
      <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-amber/30 blob" style={{animationDelay: '-4s'}}></div>
      <div className="absolute top-1/3 right-8 w-24 h-24 bg-teal/15 blob float-slow"></div>

      <div className="relative z-10 text-center px-6">
        <div className="splash-logo bg-white rounded-[2rem] shadow-2xl shadow-cherry/15 px-8 py-7 inline-block">
          <img src="/logo.png" alt="Best For Pets" className="h-16 sm:h-20 w-auto mx-auto" />
        </div>
        <p className="mt-6 font-display text-xl sm:text-2xl font-bold text-ink fade-in-up" style={{animationDelay: '.4s'}}>
          Quality is our priority <span className="grad-text">🐾</span>
        </p>
        <p className="mt-2 text-sm text-ink/55 font-semibold fade-in-up" style={{animationDelay: '.55s'}}>
          Grooming · Food · Everything your pet needs
        </p>
        <div className="flex justify-center gap-3 mt-8 text-2xl fade-in-up" style={{animationDelay: '.7s'}}>
          <span className="paw-step">🐾</span>
          <span className="paw-step">🐾</span>
          <span className="paw-step">🐾</span>
          <span className="paw-step">🐾</span>
        </div>
      </div>
    </main>
  )
}
