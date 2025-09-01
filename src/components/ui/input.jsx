import React from 'react'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 ${className}`}
      {...props}
    />
  )
}
