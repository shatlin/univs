import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const countries = await prisma.country.findMany({
      orderBy: [
        { region: 'asc' },
        { name: 'asc' }
      ],
      include: {
        _count: {
          select: {
            universities: true
          }
        }
      }
    })

    return NextResponse.json(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const country = await prisma.country.create({
      data: body
    })
    return NextResponse.json(country)
  } catch (error) {
    console.error('Error creating country:', error)
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 })
  }
}