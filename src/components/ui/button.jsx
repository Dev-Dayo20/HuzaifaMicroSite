import React from 'react'

export function Button({ className = '', asChild, children, ...props }) {
  const Comp = asChild ? 'span' : 'button'
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/40 bg-white text-gray-900 hover:bg-white/90 ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
