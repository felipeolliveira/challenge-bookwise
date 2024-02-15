import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const orderBy = searchParams.get('orderBy')
  const limit = Number(searchParams.get('limit'))

  const orderByOptions = {
    recently: {
      created_at: 'desc',
    },
    popular: {
      rate: 'desc',
    },
  } as const

  const hasOrderByOption = Object.hasOwn(orderByOptions, String(orderBy || ''))

  if (!hasOrderByOption) {
    return NextResponse.json(
      {
        message: 'OrderBy shold be `recently` or `popular`',
      },
      { status: 400 },
    )
  }

  const selectedOrderBy = hasOrderByOption
    ? orderByOptions[orderBy as keyof typeof orderByOptions]
    : orderByOptions.recently

  const booksByRating = await prisma.rating.findMany({
    orderBy: [selectedOrderBy],
    take: limit > 0 ? limit : undefined,
    select: {
      rate: true,
      created_at: true,
      id: true,
      book: true,
      user: true,
    },
  })

  const ratingBooks = booksByRating.map((bookByRating) => ({
    book: bookByRating.book,
    user: bookByRating.user,
    rating: {
      id: bookByRating.id,
      rate: bookByRating.rate,
      created_at: bookByRating.created_at,
    },
  }))

  return NextResponse.json({
    orderBy,
    ratingBooks,
  })
}
