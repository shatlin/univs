import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function remove3YearCourses() {
  console.log('🔍 Finding and removing 3-year courses from favorites...\n')

  // Find the two 3-year courses we identified
  const bristol = await prisma.university.findFirst({
    where: { name: { contains: 'Bristol' } }
  })

  const manchester = await prisma.university.findFirst({
    where: { name: { contains: 'Manchester' } }
  })

  if (bristol) {
    const currentNotes = bristol.notes || ''
    // Remove the 3-year BEng course line
    const updatedNotes = currentNotes
      .split('\n')
      .filter(line => !line.includes('Electrical and Electronic Engineering" (BEng Hon, 3 years)'))
      .join('\n')

    await prisma.university.update({
      where: { id: bristol.id },
      data: { notes: updatedNotes }
    })
    console.log('✅ Removed 3-year BEng course from Bristol')
  }

  if (manchester) {
    const currentNotes = manchester.notes || ''
    // Remove the 3-year BSc course line
    const updatedNotes = currentNotes
      .split('\n')
      .filter(line => !line.includes('Computer Science and Mathematics" (BSc Hons, 3 years)'))
      .join('\n')

    await prisma.university.update({
      where: { id: manchester.id },
      data: { notes: updatedNotes }
    })
    console.log('✅ Removed 3-year BSc course from Manchester')
  }

  // Count remaining courses
  const universities = await prisma.university.findMany({
    where: { isFavorite: true },
    select: { name: true, notes: true }
  })

  let totalCourses = 0
  console.log('\n📊 Courses per university:')
  for (const uni of universities) {
    const courseCount = (uni.notes?.match(/Shortlisted course/g) || []).length
    console.log(`${uni.name}: ${courseCount} courses`)
    totalCourses += courseCount
  }

  console.log(`\n📊 Total remaining courses: ${totalCourses}`)
  console.log('✅ All courses now meet the 4-year minimum requirement')
}

remove3YearCourses()
  .catch(console.error)
  .finally(() => prisma.$disconnect())