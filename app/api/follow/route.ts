import { Follow } from '@/entities/Follow'
import { Book } from '@/entities/Book'
import { followSchema } from '@/features/follow/schemas/follow.schema'
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(
  req: NextRequest
) {
  const db = await connectDB()
  const repo = db.getRepository(Follow)
  const searchParams = req.nextUrl.searchParams
  const id_book = searchParams.get('id_book')

  const where = id_book
    ? {
        book: {
          id: Number(id_book),
        },
      }
    : {}

  const follows = await repo.find({
    where,
    relations: {
      book: true,
      onboarding_user: true,
    },
  })

  return NextResponse.json(follows)
}
export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = followSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { detail: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const db = await connectDB()
  const followRepo = db.getRepository(Follow)
  const bookRepo = db.getRepository(Book)

  // Verifica se já existe follow e qual é o tipo
  const existingFollow = await followRepo.findOne({
    where: {
      book: { id: parsed.data.id_book },
      onboarding_user: { id: parsed.data.id_onboarding_user },
    }
  })

  // Se existe, precisa decrementar o contador antigo
  if (existingFollow) {
    const book = await bookRepo.findOne({
      where: { id: parsed.data.id_book }
    })

    if (book) {
      if (existingFollow.is_followup) {
        book.nr_followup_count = Math.max(0, book.nr_followup_count - 1)
      } else if (existingFollow.is_followdown) {
        book.nr_followdown_count = Math.max(0, book.nr_followdown_count - 1)
      }

      // Incrementa o contador novo
      if (parsed.data.is_followup) {
        book.nr_followup_count += 1
      } else if (parsed.data.is_followdown) {
        book.nr_followdown_count += 1
      }

      await bookRepo.save(book)
    }
  } else {
    // Se não existe, só incrementa
    const book = await bookRepo.findOne({
      where: { id: parsed.data.id_book }
    })

    if (book) {
      if (parsed.data.is_followup) {
        book.nr_followup_count += 1
      } else if (parsed.data.is_followdown) {
        book.nr_followdown_count += 1
      }

      await bookRepo.save(book)
    }
  }

  // Remove follow antigo se existir
  await followRepo.delete({
    book: { id: parsed.data.id_book },
    onboarding_user: { id: parsed.data.id_onboarding_user },
  })

  // Cria o novo follow
  const follow = followRepo.create({
    onboarding_user: { id: parsed.data.id_onboarding_user },
    book: { id: parsed.data.id_book },
    is_followup: parsed.data.is_followup,
    is_followdown: parsed.data.is_followdown,
  })

  await followRepo.save(follow)

  return NextResponse.json({
    message: 'Follow criado com sucesso',
    data: follow,
  })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()

  const { id_book, id_onboarding_user } = body

  if (!id_book || !id_onboarding_user) {
    return NextResponse.json(
      { detail: 'id_book e id_onboarding_user são obrigatórios' },
      { status: 400 }
    )
  }

  const db = await connectDB()
  const followRepo = db.getRepository(Follow)
  const bookRepo = db.getRepository(Book)

  // Encontra o follow antes de deletar
  const follow = await followRepo.findOne({
    where: {
      book: { id: id_book },
      onboarding_user: { id: id_onboarding_user },
    }
  })

  if (!follow) {
    return NextResponse.json(
      { detail: 'Follow não encontrado' },
      { status: 404 }
    )
  }

  // Decrementa o contador apropriado
  const book = await bookRepo.findOne({
    where: { id: id_book }
  })

  if (book) {
    if (follow.is_followup) {
      book.nr_followup_count = Math.max(0, book.nr_followup_count - 1)
    } else if (follow.is_followdown) {
      book.nr_followdown_count = Math.max(0, book.nr_followdown_count - 1)
    }

    await bookRepo.save(book)
  }

  // Deleta o follow
  const result = await followRepo.delete({
    book: { id: id_book },
    onboarding_user: { id: id_onboarding_user },
  })

  if (result.affected === 0) {
    return NextResponse.json(
      { detail: 'Follow não encontrado' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    message: 'Follow removido com sucesso',
  })
}