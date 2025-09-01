import React from 'react'

export function Card({ className = '', children }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur ${className}`}>{children}</div>
}
export function CardHeader({ className = '', children }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>
}
export function CardTitle({ className = '', children }) {
  return <h3 className={`text-lg font-bold text-white ${className}`}>{children}</h3>
}
export function CardContent({ className = '', children }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}
