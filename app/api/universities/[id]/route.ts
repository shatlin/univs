import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const university = await prisma.university.findUnique({
      where: { id: params.id },
      include: {
        applications: {
          include: {
            todos: true,
            documents: true
          }
        },
        courses: {
          orderBy: {
            name: 'asc'
          }
        },
        testRequirements: {
          orderBy: {
            testDate: 'asc'
          }
        },
        keyDates: {
          orderBy: {
            date: 'asc'
          }
        }
      }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    return NextResponse.json(university)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch university' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const university = await prisma.university.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json(university)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update university' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.university.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 })
  }
}