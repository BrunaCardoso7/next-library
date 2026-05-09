import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Book } from '@/entities/Book'
import { Onboarding } from '@/entities/Onboarding'
import { Follow } from '@/entities/Follow'

const globalForTypeorm = globalThis as unknown as {
  dataSource?: DataSource
}

export const AppDataSource =
  globalForTypeorm.dataSource ??
  new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'juridiq',
    synchronize: true,
    logging: false,
    entities: [Book, Onboarding, Follow],
  })

if (!globalForTypeorm.dataSource) {
  globalForTypeorm.dataSource = AppDataSource
}

export async function connectDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }

  return AppDataSource
}