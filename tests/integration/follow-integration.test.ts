import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { DataSource } from 'typeorm'

import { Onboarding } from '@/entities/Onboarding'
import { Follow } from '@/entities/Follow'

// Prepare an in-memory sqlite DataSource for tests
const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [Book, Onboarding, Follow],
})

// Mock connectDB to return our in-memory datasource before importing handlers
import { vi } from 'vitest'
vi.mock('@/lib/db', () => ({
  connectDB: async () => {
    if (!testDataSource.isInitialized) {
      await testDataSource.initialize()
      await testDataSource.synchronize(true)
    }
    return testDataSource
  },
}))

// Import handlers after mocking connectDB
import { POST as followPOST, DELETE as followDELETE } from '@/app/api/follow/route'

function makeReq(body: any) {
  return {
    json: async () => body,
  } as any
}

function makeDeleteReq(body: any) {
  return {
    json: async () => body,
  } as any
}

describe('integration /api/follow with sqlite in-memory', () => {
  beforeEach(async () => {
    if (!testDataSource.isInitialized) {
      await testDataSource.initialize()
    }
    await testDataSource.synchronize(true)

    const onboardingRepo = testDataSource.getRepository(Onboarding)
    const bookRepo = testDataSource.getRepository(Book)

    const onboard = onboardingRepo.create({ nm_user: 'Autor', ie_role: 'writer', nr_cpf: '000' })
    await onboardingRepo.save(onboard)

    const book = bookRepo.create({ nm_title: 'Livro Teste', nm_author: 'Autor', dt_published_year: 2020, onboarding_user: onboard })
    await bookRepo.save(book)
  })

  afterEach(async () => {
    await testDataSource.dropDatabase()
    if (testDataSource.isInitialized) await testDataSource.destroy()
  })

  it('POST creates follow and adjusts counters when switching reactions', async () => {
    const onboardingRepo = testDataSource.getRepository(Onboarding)
    const bookRepo = testDataSource.getRepository(Book)
    const followRepo = testDataSource.getRepository(Follow)

    const onboard = await onboardingRepo.findOne({ where: { nm_user: 'Autor' } })
    const book = await bookRepo.findOne({ where: { nm_title: 'Livro Teste' } })

    if (!onboard || !book) throw new Error('setup failed: onboard or book missing')

    // First: add UP
    const reqUp = makeReq({ id_book: book.id, id_onboarding_user: onboard.id, is_followup: true, is_followdown: false })
    const resUp = await followPOST(reqUp)
    const payloadUp = await resUp.json()
    expect(payloadUp.message).toBe('Follow criado com sucesso')

    const refreshedBook1 = await bookRepo.findOne({ where: { id: book.id } })
    if (!refreshedBook1) throw new Error('book missing after up')
    expect(refreshedBook1.nr_followup_count).toBe(1)

    // Now switch to DOWN
    const reqDown = makeReq({ id_book: book.id, id_onboarding_user: onboard.id, is_followup: false, is_followdown: true })
    const resDown = await followPOST(reqDown)
    const payloadDown = await resDown.json()
    expect(payloadDown.message).toBe('Follow criado com sucesso')

    const refreshedBook2 = await bookRepo.findOne({ where: { id: book.id } })
    if (!refreshedBook2) throw new Error('book missing after down')
    expect(refreshedBook2.nr_followup_count).toBe(0)
    expect(refreshedBook2.nr_followdown_count).toBe(1)

    // Delete follow
    const reqDel = makeDeleteReq({ id_book: book.id, id_onboarding_user: onboard.id })
    const resDel = await followDELETE(reqDel)
    const payloadDel = await resDel.json()
    expect(payloadDel.message).toBe('Follow removido com sucesso')

    const refreshedBook3 = await bookRepo.findOne({ where: { id: book.id } })
    if (!refreshedBook3) throw new Error('book missing after delete')
    expect(refreshedBook3.nr_followdown_count).toBe(0)
  })
})
