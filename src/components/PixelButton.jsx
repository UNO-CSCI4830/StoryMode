import React from 'react'

export default function PixelButton({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-3 border-4 border-black rounded-xl shadow-chunky active:translate-x-[2px] active:translate-y-[2px] bg-green-400 text-green-900 font-bold tracking-wide ${className}`}
      style={{ imageRendering: 'pixelated' }}
      {...props}
    >
      {children}
    </button>
  )
}
