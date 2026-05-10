import { describe, it, expect, vi, beforeEach } from 'vitest'

const fetchMock = vi.fn()
vi.stubGlobal('fetch', fetchMock)

import { toggleFollow } from '@/features/follow/services/toogleFollow'
import { removeFollow } from '@/features/follow/services/removeFollow'

beforeEach(() => {
  fetchMock.mockReset()
})

describe('follow services', () => {
  it('toggleFollow sends POST with correct body and parses json', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ message: 'ok' }) })

    const res = await toggleFollow({ id_book: 1, id_onboarding_user: 2, type: 'UP' })

    expect(fetchMock).toHaveBeenCalled()
    expect(res).toEqual({ message: 'ok' })
  })

  it('removeFollow sends DELETE with correct body and parses json', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ message: 'deleted' }) })

    const res = await removeFollow({ id_book: 1, id_onboarding_user: 2 })

    expect(fetchMock).toHaveBeenCalled()
    expect(res).toEqual({ message: 'deleted' })
  })
})
