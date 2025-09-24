import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const applicationId = searchParams.get('applicationId')
    const completed = searchParams.get('completed')
    const category = searchParams.get('category')

    const where: any = {}

    if (applicationId) {
      where.applicationId = applicationId
    }

    if (completed !== null) {
      where.completed = completed === 'true'
    }

    if (category) {
      where.category = category
    }

    const todos = await prisma.todo.findMany({
      where,
      include: {
        application: {
          include: {
            university: true
          }
        }
      },
      orderBy: [
        { completed: 'asc' },
        { priority: 'desc' },
        { dueDate: 'asc' }
      ]
    })

    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const todo = await prisma.todo.create({
      data: body,
      include: {
        application: {
          include: {
            university: true
          }
        }
      }
    })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}