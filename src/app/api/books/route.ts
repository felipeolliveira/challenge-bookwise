import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  const categoryId = req.nextUrl.searchParams.get('categoryId')

  const books = await prisma.book.findMany({
    where: {
      categories: {
        some: {
          category: {
            id: categoryId || undefined,
          },
        },
      },
    },
    include: {
      categories: {
        select: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      ratings: {
        select: {
          id: true,
          rate: true,
          created_at: true,
          user_id: true,
        },
      },
    },
  })

  console.log('books', books)
  const booksParsed = books.map((book) => {
    const total = book.ratings.reduce(
      (acc, rating) => {
        acc.average = acc.average + rating.rate
        acc.isReadByUser = rating.user_id === userId
        return acc
      },
      { average: 0, isReadByUser: false },
    )

    return {
      ...book,
      categories: book.categories.map(({ category }) => category),
      rating_average: Math.ceil(total.average / book.ratings.length),
      is_read_by_user: total.isReadByUser,
    }
  })

  return NextResponse.json(booksParsed)
}
