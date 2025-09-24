import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const country = searchParams.get('country')
    const search = searchParams.get('search')

    const where: any = {}

    if (country) {
      where.country = country
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { courseName: { contains: search } },
        { location: { contains: search } }
      ]
    }

    const universities = await prisma.university.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        applications: {
          select: {
            id: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json(universities)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const university = await prisma.university.create({
      data: body
    })
    return NextResponse.json(university)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create university' }, { status: 500 })
  }
}