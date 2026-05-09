import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: any) => ({ body, status: init?.status ?? 200 }),
  },
}))

let repo: any
vi.mock('@/lib/db', () => ({
  connectDB: async () => ({
    getRepository: () => repo,
  }),
}))

import { GET, POST } from '@/app/api/book/route'

describe('book API route', () => {
  beforeEach(() => {
    repo = {
      findAndCount: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    }
  })

  it('GET returns empty payload when no books', async () => {
    repo.findAndCount.mockResolvedValue([[], 0])
    const req: any = { nextUrl: { searchParams: new URLSearchParams() } }

    const res: any = await GET(req)

    expect(res.status).toBe(200)
    expect(res.body.books).toEqual([])
    expect(res.body.message).toBe('Nenhum livro encontrado')
  })

  it('POST returns 400 on invalid payload', async () => {
    const req: any = { json: async () => ({}) }

    const res: any = await POST(req)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('detail')
  })

  it('POST creates a book when payload is valid', async () => {
    const incoming = {
      nm_title: 'Title',
      nm_author: 'Author',
      nm_user_cri: 'me',
      dt_published_year: 2020,
      nr_followup_count: 0,
      nr_followdown_count: 0,
      id_onboarding_user: 1,
    }

    const created = {
      id: 10,
      nm_title: 'Title',
      nm_author: 'Author',
      nm_user_cri: 'me',
      dt_published_year: 2020,
      nr_followup_count: 0,
      nr_followdown_count: 0,
      onboarding_user: { id: 1 },
    }

    repo.create.mockImplementation((payload: any) => ({ ...payload }))
    repo.save.mockResolvedValue(created)

    const req: any = { json: async () => incoming }

    const res: any = await POST(req)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Livro criado com sucesso')
    expect(res.body.data).toMatchObject({
      nm_title: 'Title',
      nm_author: 'Author',
      nm_user_cri: 'me',
      dt_published_year: 2020,
      nr_followup_count: 0,
      nr_followdown_count: 0,
      onboarding_user: { id: 1 },
    })
  })
})
