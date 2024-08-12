'use client'

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
<<<<<<< HEAD
import { BackgroundBeams } from '@/components/BackgroundBeams';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})
=======

>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad


export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en" className={roboto.className}>
      <body className='bg-neutral-950'>
        <SessionProvider>{children}</SessionProvider>
        <BackgroundBeams />
=======
    <html lang="en">
      <body className="h-screen bg-gradient-to-b from-red-100 to-blue-300">
        <SessionProvider>{children}</SessionProvider>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
        </body>
    </html>
  )
}
