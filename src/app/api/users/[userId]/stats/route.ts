import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

interface GetProps {
  params: {
    userId: string
  }
}

interface StatsResponse {
  totalPages: number
  totalRatingBooks: number
  authors: Set<string>
  categoryAmount: {
    [key: string]: number
  }
}

export async function GET(req: NextRequest, { params: { userId } }: GetProps) {
  const userWithBooks = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        select: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
          rate: true,
          id: true,
          created_at: true,
        },
      },
    },
  })

  if (!userWithBooks) {
    return NextResponse.json({
      user: undefined,
      stats: {
        totalPages: 0,
        totalRatingBooks: 0,
        authors: 0,
        categoryMostRead: '',
      },
    })
  }

  const { ratings, ...user } = userWithBooks

  const books = ratings.reduce(
    (acc, userWithBook) => {
      acc.authors.add(userWithBook.book.author)
      acc.totalPages = acc.totalPages + userWithBook.book.total_pages
      acc.totalRatingBooks = acc.totalRatingBooks + 1
      userWithBook.book.categories.forEach(({ category }) => {
        if (acc.categoryAmount[category.name]) {
          acc.categoryAmount[category.name] =
            acc.categoryAmount[category.name] + 1
        } else {
          acc.categoryAmount[category.name] = 1
        }
      })

      return acc
    },
    {
      authors: new Set(),
      categoryAmount: {},
      totalPages: 0,
      totalRatingBooks: 0,
    } as StatsResponse,
  )

  const categoryMostRead = Object.keys(books.categoryAmount).reduce(
    (acc, categoryKey) => {
      return books.categoryAmount[acc] > books.categoryAmount[categoryKey]
        ? acc
        : categoryKey
    },
    '',
  )

  return NextResponse.json({
    user,
    stats: {
      totalPages: books.totalPages,
      totalRatingBooks: books.totalRatingBooks,
      authors: books.authors.size,
      categoryMostRead,
    },
  })
}
