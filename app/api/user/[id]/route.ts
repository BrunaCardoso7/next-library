import 'reflect-metadata'
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Onboarding } from '@/entities/Onboarding'

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params
  const db = await connectDB()
  const repo = db.getRepository(Onboarding)

  const user = await repo.findOne({
    where: { id: Number(id) },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário não encontrado' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { id } = await params
  const db = await connectDB()
  const repo = db.getRepository(Onboarding)

  await repo.delete(id)

  return NextResponse.json({
    message: 'Usuário deletado com sucesso',
  })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  const db = await connectDB()
  const repo = db.getRepository(Onboarding)

  const user = await repo.findOne({
    where: { id: Number(id) },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário não encontrado' },
      { status: 404 }
    )
  }

  const updated = repo.merge(user, body)

  await repo.save(updated)

  return NextResponse.json({
    message: 'Usuário atualizado com sucesso',
    data: updated,
  })
}