'use client'

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { BackgroundBeams } from '@/components/BackgroundBeams';
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className='bg-neutral-950'>
        <SessionProvider>{children}</SessionProvider>
        <BackgroundBeams />
        </body>
    </html>
  )
}
