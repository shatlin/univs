import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (priority) {
      where.priority = priority
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        university: true,
        todos: {
          where: { completed: false }
        },
        documents: true
      },
      orderBy: [
        { priority: 'desc' },
        { deadline: 'asc' }
      ]
    })

    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const application = await prisma.application.create({
      data: body,
      include: {
        university: true
      }
    })
    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
  }
}