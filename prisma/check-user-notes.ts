import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUserNotes() {
  const universities = await prisma.university.findMany({
    where: {
      isFavorite: true
    },
    select: {
      id: true,
      name: true,
      userNotes: true
    },
    orderBy: {
      rankingScore: 'desc'
    },
    take: 1
  })

  const edinburgh = universities[0]

  if (edinburgh) {
    console.log('🎓 University:', edinburgh.name)
    console.log('📋 ID:', edinburgh.id)
    console.log('\n📝 User Notes (Timeline):\n')
    console.log(edinburgh.userNotes)
    console.log('\n✅ These notes will appear in the Notes tab at:')
    console.log(`   http://localhost:3847/universities/${edinburgh.id}`)
  }
}

checkUserNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })