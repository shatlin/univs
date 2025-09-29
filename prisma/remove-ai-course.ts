import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function removeShortCourse() {
  const manchester = await prisma.university.findFirst({
    where: { name: { contains: 'Manchester' } }
  })

  if (manchester) {
    const currentNotes = manchester.notes || ''
    const updatedNotes = currentNotes
      .split('\n')
      .filter(line => !line.includes('Artificial Intelligence" (MS, 12 months)'))
      .join('\n')

    await prisma.university.update({
      where: { id: manchester.id },
      data: { notes: updatedNotes }
    })
    console.log('✅ Removed 12-month AI MS course from Manchester')

    // Count final courses
    const courseCount = (updatedNotes.match(/Shortlisted course/g) || []).length
    console.log(`Manchester now has ${courseCount} courses`)
  }

  // Show final totals
  const universities = await prisma.university.findMany({
    where: { isFavorite: true },
    select: { name: true, notes: true }
  })

  let totalCourses = 0
  console.log('\n📊 Final course count:')
  for (const uni of universities) {
    const courseCount = (uni.notes?.match(/Shortlisted course/g) || []).length
    console.log(`${uni.name}: ${courseCount} courses`)
    totalCourses += courseCount
  }
  console.log(`\n✅ Total: ${totalCourses} courses (all 4+ years)`)
}

removeShortCourse()
  .catch(console.error)
  .finally(() => prisma.$disconnect())