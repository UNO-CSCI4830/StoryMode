import React from 'react'

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="w-full h-full" style={{ backgroundImage: 'var(--scanline)' }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-widest drop-shadow md:mb-2">{title}</h2>
            {subtitle && <p className="text-zinc-700 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
