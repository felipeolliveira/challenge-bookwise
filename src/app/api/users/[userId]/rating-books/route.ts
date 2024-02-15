import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

interface GetProps {
  params: {
    userId: string
  }
}

export async function GET(req: NextRequest, { params: { userId } }: GetProps) {
  const limit = Number(req.nextUrl.searchParams.get('limit'))

  const userWithBooks = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        take: limit > 0 ? limit : undefined,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          book: true,
          rate: true,
          id: true,
          created_at: true,
        },
      },
    },
  })

  const books = userWithBooks?.ratings.map((rating) => ({
    book: rating.book,
    rating: {
      id: rating.id,
      rate: rating.rate,
      created_at: rating.created_at,
    },
  }))

  if (!books?.length) {
    return NextResponse.json({ messge: 'Não há livro' }, { status: 400 })
  }

  return NextResponse.json(books)
}
