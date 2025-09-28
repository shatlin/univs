import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUniversities() {
  const universities = await prisma.university.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      countryId: true
    }
  })

  console.log('Sample universities in database:')
  universities.forEach(uni => {
    console.log(`- ${uni.name} (ID: ${uni.id})`)
  })

  console.log(`\nTotal universities: ${await prisma.university.count()}`)

  if (universities.length > 0) {
    console.log(`\nTry visiting: http://localhost:3001/universities/${universities[0].id}`)
  }
}

checkUniversities()
  .catch(console.error)
  .finally(() => prisma.$disconnect())