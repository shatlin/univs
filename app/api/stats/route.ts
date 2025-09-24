import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalUniversities, totalApplications, activeTodos, urgentDeadlines, countries] = await Promise.all([
      prisma.university.count(),
      prisma.application.count({
        where: {
          status: 'IN_PROGRESS'
        }
      }),
      prisma.todo.count({
        where: {
          status: { not: 'COMPLETED' }
        }
      }),
      prisma.deadline.count({
        where: {
          date: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
          }
        }
      }),
      prisma.country.findMany({
        select: {
          name: true,
          flag: true,
          _count: {
            select: {
              universities: true
            }
          }
        },
        orderBy: {
          universities: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ])

    return NextResponse.json({
      totalUniversities,
      totalApplications,
      activeTodos,
      urgentDeadlines,
      topCountries: countries.map(c => ({
        name: c.name,
        flag: c.flag,
        count: c._count.universities
      }))
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}