import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

type GETProps = {
  params: {
    bookId: string
  }
}

export async function GET(req: NextRequest, { params }: GETProps) {
  const { bookId } = params

  const bookInfo = await prisma.book.findUnique({
    where: {
      id: bookId || undefined,
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
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          rate: true,
          created_at: true,
          description: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar_url: true,
            },
          },
        },
      },
    },
  })

  const totalRate = bookInfo?.ratings.reduce((acc, rating) => {
    return acc + rating.rate
  }, 0)

  const ratingAverage =
    totalRate && bookInfo ? Math.ceil(totalRate / bookInfo.ratings.length) : 0

  return NextResponse.json({ ...bookInfo, rating_average: ratingAverage })
}
