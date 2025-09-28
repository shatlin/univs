import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const university = await prisma.university.findUnique({
      where: { id },
      include: {
        country: true,
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
        },
        universityNotes: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    return NextResponse.json(university)
  } catch (error) {
    console.error('Error fetching university:', error)
    return NextResponse.json({ error: 'Failed to fetch university' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const university = await prisma.university.update({
      where: { id },
      data: body
    })
    return NextResponse.json(university)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update university' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.university.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 })
  }
}