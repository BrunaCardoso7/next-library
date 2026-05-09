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

import * as userRoute from '@/app/api/user/route'

describe('user API route', () => {
  beforeEach(() => {
    repo = {
      find: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    }
  })

  it('GET returns 404 when user not found by cpf', async () => {
    repo.findOne.mockResolvedValue(null)
    const params = new URLSearchParams([['cpf', '000']])
    const req: any = { nextUrl: { searchParams: params } }

    const res: any = await userRoute.GET(req as any)

    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Usuário não encontrado')
  })

  it('GET returns users array when no cpf provided', async () => {
    repo.find.mockResolvedValue([{ id: 1 }])
    const req: any = { nextUrl: { searchParams: new URLSearchParams() } }

    const res: any = await userRoute.GET(req as any)

    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: 1 }])
  })

  it('POST returns 400 on invalid payload', async () => {
    const req: any = { json: async () => ({}) }

    const res: any = await userRoute.POST(req as any)

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('detail')
  })

  it('POST creates onboarding user on valid payload', async () => {
    const incoming = { nm_user: 'Test', nr_cpf: '123', ie_role: 'visitor' }
    repo.create.mockImplementation((p: any) => p)
    repo.save.mockResolvedValue({ id: 2, ...incoming })

    const req: any = { json: async () => incoming }

    const res: any = await userRoute.POST(req as any)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Usuário recebido com sucesso')
    expect(res.body.data).toEqual(incoming)
  })
})
