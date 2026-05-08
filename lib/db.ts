import { AppDataSource } from './database'

export async function connectDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }

  return AppDataSource
}