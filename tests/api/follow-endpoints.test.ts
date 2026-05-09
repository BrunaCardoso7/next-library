import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: any) => ({ body, status: init?.status ?? 200 }),
  },
}))

let repo: any
let bookRepo: any
vi.mock('@/lib/db', () => ({
  connectDB: async () => ({
    getRepository: (entity: any) => (entity === 'book' ? bookRepo : repo),
  }),
}))

import * as followRoute from '@/app/api/follow/route'

describe('follow API route', () => {
  beforeEach(() => {
    repo = {
      find: vi.fn(),
      findOne: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    }
    bookRepo = {
      findOne: vi.fn(),
      save: vi.fn(),
    }
  })

  it('GET returns follows array', async () => {
    repo.find.mockResolvedValue([])
    const req: any = { nextUrl: { searchParams: new URLSearchParams() } }

    const res: any = await followRoute.GET(req as any)

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('POST validates payload and creates follow', async () => {
    const payload = { id_book: 1, id_onboarding_user: 2, is_followup: true, is_followdown: false }
    repo.findOne.mockResolvedValue(null)
    bookRepo.findOne.mockResolvedValue({ id: 1, nr_followup_count: 0, nr_followdown_count: 0 })
    repo.create.mockImplementation((p: any) => p)
    repo.save.mockResolvedValue({ id: 5, ...payload })

    const req: any = { json: async () => payload }

    const res: any = await followRoute.POST(req as any)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Follow criado com sucesso')
    expect(res.body.data).toMatchObject({
      onboarding_user: { id: 2 },
      book: { id: 1 },
      is_followup: true,
      is_followdown: false,
    })
  })

  it('DELETE returns 400 when missing params', async () => {
    const req: any = { json: async () => ({}) }

    const res: any = await followRoute.DELETE(req as any)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('detail')
  })

  it('DELETE removes follow and updates book', async () => {
    repo.findOne.mockResolvedValue({ id: 5, is_followup: true, is_followdown: false })
    bookRepo.findOne.mockResolvedValue({ id: 1, nr_followup_count: 1, nr_followdown_count: 0 })
    repo.delete.mockResolvedValue({ affected: 1 })

    const req: any = { json: async () => ({ id_book: 1, id_onboarding_user: 2 }) }

    const res: any = await followRoute.DELETE(req as any)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Follow removido com sucesso')
  })
})
