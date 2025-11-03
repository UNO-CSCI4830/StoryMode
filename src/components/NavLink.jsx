import React from 'react'

export default function NavLink({ href, children }) {
  return (
    <a href={href} className="font-bold tracking-wide hover:opacity-80">
      {children}
    </a>
  )
}
