import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get the current favorite status
    const university = await prisma.university.findUnique({
      where: { id },
      select: { isFavorite: true }
    })

    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 })
    }

    // Toggle the favorite status
    const updatedUniversity = await prisma.university.update({
      where: { id },
      data: { isFavorite: !university.isFavorite },
      include: {
        country: true,
        applications: {
          select: {
            id: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json(updatedUniversity)
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 })
  }
}