import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { renderHook } from '@testing-library/react'

let getQueryDataImpl: (key: any) => any

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    getQueryData: (key: any) => getQueryDataImpl(key),
  }),
}))

// Import after mocking
import { useSearchBooks } from '@/features/library/hooks/useSearchBooks'
import { TestQueryProvider, createQueryClient } from './test-utils'

describe('useSearchBooks', () => {
  beforeEach(() => {
    getQueryDataImpl = () => ({
      pages: [
        { books: [ { id: 1, nm_title: 'A Guerra dos Tronos' }, { id: 2, nm_title: 'O Senhor dos Anéis' } ] },
        { books: [ { id: 3, nm_title: 'Tron: O Retorno' } ] }
      ]
    })
  })

  it('returns all books when searchTerm is empty', () => {
    const wrapper = ({ children }: any) => React.createElement(TestQueryProvider, null, children)
    const { result } = renderHook(() => useSearchBooks('   ', 1, 'visitor'), { wrapper })
    const { books } = result.current
    expect(books.length).toBe(3)
  })

  it('filters books by title case-insensitively', () => {
    const wrapper = ({ children }: any) => React.createElement(TestQueryProvider, null, children)
    const { result } = renderHook(() => useSearchBooks('tron', 1, 'visitor'), { wrapper })
    const { books } = result.current
    expect(books.map(b => b.id)).toEqual([1,3])
  })
})
