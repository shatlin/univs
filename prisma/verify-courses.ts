import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyCourses() {
  console.log('📚 Verifying Course table data...\n')

  const universities = await prisma.university.findMany({
    where: { isFavorite: true },
    include: {
      courses: {
        orderBy: { name: 'asc' }
      }
    },
    orderBy: { rankingScore: 'desc' }
  })

  let totalCourses = 0

  for (const uni of universities) {
    console.log(`\n🏫 ${uni.name}`)
    console.log(`📍 Location: ${uni.location || 'N/A'}`)
    console.log(`📊 Courses (${uni.courses.length}):`)

    uni.courses.forEach((course, index) => {
      console.log(`\n  ${index + 1}. ${course.name}`)
      console.log(`     🎓 Degree: ${course.degree}`)
      console.log(`     ⏱️  Duration: ${course.duration}`)
      if (course.description) {
        console.log(`     📝 Description: ${course.description.substring(0, 100)}...`)
      }
      if (course.careerPaths) {
        console.log(`     💼 Career Paths: ${course.careerPaths}`)
      }
    })

    totalCourses += uni.courses.length
  }

  console.log(`\n✅ Total courses in database: ${totalCourses}`)
  console.log('\n💡 These courses will now appear in the Courses tab when you:')
  console.log('   1. Navigate to any university page in the app')
  console.log('   2. Click on the "Courses" tab')
  console.log('   3. View the detailed course information including career paths')
}

verifyCourses()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })