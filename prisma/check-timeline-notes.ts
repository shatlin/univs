import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkTimelineNotes() {
  console.log('📅 Checking UniversityNote Timeline Entries\n')

  // Get Edinburgh as an example
  const edinburgh = await prisma.university.findFirst({
    where: {
      name: {
        contains: 'Edinburgh'
      }
    },
    include: {
      universityNotes: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (edinburgh) {
    console.log(`🎓 ${edinburgh.name}`)
    console.log(`📋 University ID: ${edinburgh.id}`)
    console.log(`\n📝 Timeline Notes (${edinburgh.universityNotes.length} entries):\n`)

    edinburgh.universityNotes.forEach((note, index) => {
      const timestamp = note.createdAt.toISOString().replace('T', ' ').substring(0, 19)
      console.log(`${index + 1}. [${timestamp}] ${note.content}`)
    })

    console.log('\n✅ How the data is stored:')
    console.log('- University table: Contains basic university info')
    console.log('- userNotes column: Single text field for general notes (what we updated earlier)')
    console.log('- UniversityNote table: Separate table for timeline entries (what we just added)')
    console.log('  - Each entry has its own ID and timestamp')
    console.log('  - Related to university via universityId foreign key')
    console.log('  - Perfect for timeline/activity log display')
  }

  // Get count for all universities
  console.log('\n📊 Timeline entries per university:')
  const universities = await prisma.university.findMany({
    where: { isFavorite: true },
    include: {
      _count: {
        select: { universityNotes: true }
      }
    },
    orderBy: { rankingScore: 'desc' }
  })

  universities.forEach(uni => {
    console.log(`- ${uni.name}: ${uni._count.universityNotes} notes`)
  })
}

checkTimelineNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })