import { Book } from '@/entities/Book'
import { Follow } from '@/entities/Follow'
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id_onboarding_user = req.nextUrl.searchParams.get('id_onboarding_user')
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10)
  const skip = (page - 1) * limit

  const db = await connectDB()
  const bookRepo = db.getRepository(Book)
  const followRepo = db.getRepository(Follow)

  const [books, total] = await bookRepo.findAndCount({
    skip,
    take: limit,
    order: {
      dt_criado: 'DESC'
    }
  })

  if (!id_onboarding_user) {
    return NextResponse.json({
      books: books.map(book => ({
        ...book,
        user_reaction: null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    })
  }

  const userFollows = await followRepo.find({
    where: {
      onboarding_user: { id: parseInt(id_onboarding_user) }
    },
    relations: ['book']
  })

  // Map de follows por book_id
  const followMap = new Map(
    userFollows.map(f => [
      f.book.id,
      f.is_followup ? 'UP' : 'DOWN'
    ])
  )

  // Enriquece os livros com a reação do usuário
  const booksWithReactions = books.map(book => ({
    ...book,
    user_reaction: followMap.get(book.id) || null,
  }))

  return NextResponse.json({
    books: booksWithReactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  })
}
