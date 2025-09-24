import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const critical = searchParams.get('critical')
    const upcoming = searchParams.get('upcoming')

    const where: any = {
      completed: false
    }

    if (critical === 'true') {
      where.critical = true
    }

    const deadlines = await prisma.deadline.findMany({
      where,
      orderBy: [
        { critical: 'desc' },
        { date: 'asc' }
      ],
      take: upcoming ? 10 : undefined
    })

    return NextResponse.json(deadlines)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deadlines' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const deadline = await prisma.deadline.create({
      data: body
    })
    return NextResponse.json(deadline)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create deadline' }, { status: 500 })
  }
}