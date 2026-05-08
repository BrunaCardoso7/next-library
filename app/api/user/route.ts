// app/api/users/route.ts
import { onboardingSchema } from '@/features/onboarding/schemas/onboarding.schema'
import { Onboarding } from '@/entities/Onboarding'
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cpf = req.nextUrl.searchParams.get('cpf')

  if (!cpf) {
    return NextResponse.json(
      { message: 'CPF não fornecido' },
      { status: 400 }
    )
  }

  const db = await connectDB()
  const repo = db.getRepository(Onboarding)

  const user = await repo.findOne({
    where: { nr_cpf: cpf },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário não encontrado', user: null },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = onboardingSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { detail: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const db = await connectDB()

  const repository = db.getRepository(Onboarding)

  const onboarding = repository.create({
    nm_user: parsed.data.nm_user,
    nr_cpf: parsed.data.nr_cpf,
    ie_role: parsed.data.ie_role,
  })

  await repository.save(onboarding)

  return NextResponse.json({
    message: 'Usuário recebido com sucesso',
    data: parsed.data,
  })
}