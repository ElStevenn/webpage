// src/app/layout.tsx
import type { ReactNode } from 'react'
import '../app/globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Pau Mateu',
  description: 'Portfolio – DevOps & Backend',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0D1117] text-[#C9D1D9] antialiased">
        <Header />
        {children}
      </body>
    </html>
  )
}
