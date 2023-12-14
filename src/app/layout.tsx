import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'

import { Providers } from '~/components/providers/providers'
import { Navbar } from '~/components/widgets/navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Github Clone',
  description: 'Attractor Assignment',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Navbar />
          <main className='container px-2 py-5'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
