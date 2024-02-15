import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

type BookRatingParams = {
  params: {
    bookId: string
  }
}

export async function POST(req: NextRequest, { params }: BookRatingParams) {
  const { bookId } = params
  const { rate, comment, userId } = await req.json()

  if (!rate || !comment || !userId) {
    return NextResponse.json(
      {
        error: 'rating and comment are required',
      },
      {
        status: 400,
      },
    )
  }

  await prisma.rating.create({
    data: {
      rate,
      description: comment,
      book_id: bookId,
      user_id: userId,
    },
  })

  return NextResponse.json(
    {},
    {
      status: 201,
    },
  )
}
