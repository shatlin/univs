import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const countryId = searchParams.get('countryId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const tier = searchParams.get('tier')
    const sortBy = searchParams.get('sortBy') || 'ranking' // ranking, name, country

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

    if (tier) {
      where.recommendationTier = tier
    }

    // Get total count for pagination
    const total = await prisma.university.count({ where })

    // Determine sort order
    let orderBy: any = []
    switch (sortBy) {
      case 'name':
        orderBy = [{ name: 'asc' }]
        break
      case 'country':
        orderBy = [
          { country: { name: 'asc' } },
          { rankingScore: 'desc' }
        ]
        break
      case 'ranking':
      default:
        orderBy = [
          { rankingScore: 'desc' },
          { ranking: 'asc' },
          { name: 'asc' }
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
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    })

    return NextResponse.json({
      universities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching universities:', error)
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