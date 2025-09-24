import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const countryId = searchParams.get('countryId')
    const search = searchParams.get('search')

    const where: any = {}

    if (countryId) {
      where.countryId = countryId
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
      include: {
        applications: {
          select: {
            id: true,
            status: true
          }
        },
        country: true
      },
      orderBy: [
        { country: { name: 'asc' } },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(universities)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // If country name is provided instead of countryId, look it up
    if (body.country && !body.countryId) {
      const country = await prisma.country.findFirst({
        where: { name: body.country }
      })
      if (country) {
        body.countryId = country.id
        delete body.country
      }
    }

    const university = await prisma.university.create({
      data: body,
      include: {
        country: true
      }
    })
    return NextResponse.json(university)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create university' }, { status: 500 })
  }
}