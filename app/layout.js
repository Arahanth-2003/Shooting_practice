'use client'

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gradient-to-b from-red-100 to-blue-300">
        <SessionProvider>{children}</SessionProvider>
        </body>
    </html>
  )
}
