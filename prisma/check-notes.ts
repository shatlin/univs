import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkNotes() {
  const universities = await prisma.university.findMany({
    where: {
      isFavorite: true
    },
    select: {
      name: true,
      notes: true,
      isFavorite: true,
      rankingScore: true
    },
    orderBy: {
      rankingScore: 'desc'
    }
  })

  console.log('📚 FAVORITED UNIVERSITIES WITH COURSE NOTES:\n')

  for (const uni of universities) {
    console.log(`════════════════════════════════════════════`)
    console.log(`🎓 ${uni.name}`)
    console.log(`   Ranking Score: ${uni.rankingScore}`)
    console.log(`   Favorite: ${uni.isFavorite ? '⭐ Yes' : 'No'}`)

    if (uni.notes) {
      // Extract just the favorited courses section if it exists
      const favoritedSection = uni.notes.match(/FAVORITED COURSES[\s\S]*?(?=\n\n|$)/)?.[0]
      if (favoritedSection) {
        console.log(`\n${favoritedSection}`)
      } else {
        console.log(`\nNotes: ${uni.notes.substring(0, 200)}...`)
      }
    }
    console.log()
  }
}

checkNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })