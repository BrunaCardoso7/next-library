'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { OnboardingProvider } from '../features/onboarding/providers/onboarding-provider'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider attribute="class" defaultTheme="clean" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <OnboardingProvider>
          {children}
          <Toaster />
        </OnboardingProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}