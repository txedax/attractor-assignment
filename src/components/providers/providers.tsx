'use client'

import { SessionProvider } from 'next-auth/react'
import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Toaster } from '../ui/toaster'

export const queryClient = new QueryClient()

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  )
}
