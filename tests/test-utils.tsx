import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
}

export const TestQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const qc = createQueryClient()
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}
