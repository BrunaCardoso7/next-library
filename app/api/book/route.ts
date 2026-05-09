import { Book } from '@/entities/Book'
import { booksSchema } from '@/features/library/schemas/book.schema'
import { connectDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const nm_title = req.nextUrl.searchParams.get('nm_title')
  const ie_role = req.nextUrl.searchParams.get('ie_role')
  const nm_user_cri = req.nextUrl.searchParams.get('nm_user_cri')
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10)
  const skip = (page - 1) * limit

  const db = await connectDB()
  const repo = db.getRepository(Book)
  
  let books
  let total
  
  if (nm_title) {
    const result = await repo.findAndCount({
        where: { nm_title: nm_title },
        skip,
        take: limit,
    })
    books = result[0]
    total = result[1]
  } else if (ie_role === 'visitor') {
    const result = await repo.findAndCount({
      skip,
      take: limit,
    })
    books = result[0]
    total = result[1]
  } else if (ie_role === 'writer') {
    if (!nm_user_cri) {
      return NextResponse.json(
        { message: 'nm_user_cri é obrigatório para escritores', book: null },
        { status: 400 }
      )
    }
    const result = await repo.findAndCount({
        where: { nm_user_cri: nm_user_cri },
        skip,
        take: limit,
    })
    books = result[0]
    total = result[1]
  } else {
    const result = await repo.findAndCount({
      skip,
      take: limit,
    })
    books = result[0]
    total = result[1]
  }

  if (!books || books.length === 0) {
    return NextResponse.json(
      { 
        message: 'Nenhum livro encontrado', 
        books: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        }
      },
      { status: 200 }
    )
  }

  const totalPages = Math.ceil(total / limit)

  return NextResponse.json({ 
    books,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    }
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const parsed = booksSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { detail: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const db = await connectDB()

  const repository = db.getRepository(Book)

  const book = repository.create({
    nm_title: parsed.data.nm_title,
    nm_author: parsed.data.nm_author,
    nm_user_cri: parsed.data.nm_user_cri,
    dt_published_year: parsed.data.dt_published_year,
    nr_followup_count: parsed.data.nr_followup_count,
    nr_followdown_count: parsed.data.nr_followdown_count,
  })

  await repository.save(book)

  return NextResponse.json({
    message: 'Livro criado com sucesso',
    data: book,
  })
}