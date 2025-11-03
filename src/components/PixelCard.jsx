import React from 'react'

export default function PixelCard({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border-4 border-black shadow-chunky bg-amber-100 p-5 ${className}`} style={{ imageRendering: 'pixelated' }}>
      {children}
    </div>
  )
}
