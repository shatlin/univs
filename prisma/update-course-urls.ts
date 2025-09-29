import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateCourseUrls() {
  console.log('🔗 Updating Course URLs from UCAS...\n')

  // Map course names to their UCAS URLs (extracted from the favorites page)
  const courseUrls = [
    // Edinburgh courses
    {
      uni: 'Edinburgh',
      course: 'Software Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/481e1636-e213-6367-91de-e0277d91ef22'
    },
    {
      uni: 'Edinburgh',
      course: 'Electrical and Mechanical Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/b335c361-24e3-9f7c-c02a-bead657a42ed'
    },
    {
      uni: 'Edinburgh',
      course: 'Mathematics',
      url: 'https://digital.ucas.com/coursedisplay/courses/f89ba39a-4ea7-2a58-c2fa-fe8213a6c1dd'
    },
    {
      uni: 'Edinburgh',
      course: 'Mathematics and Business',
      url: 'https://digital.ucas.com/coursedisplay/courses/2589890e-86ed-cf68-fa5c-5efc799bd085'
    },
    {
      uni: 'Edinburgh',
      course: 'Applied Mathematics',
      url: 'https://digital.ucas.com/coursedisplay/courses/49cbc149-a478-4e85-9b9e-60c9e19a444f'
    },

    // Manchester courses
    {
      uni: 'Manchester',
      course: 'Electrical and Electronic Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/76d5f5ff-983c-9ef9-d22c-8aea68453e7b'
    },
    {
      uni: 'Manchester',
      course: 'Mathematics',
      url: 'https://digital.ucas.com/coursedisplay/courses/5e8ed979-2dfb-f35d-41a8-f9a12d025224'
    },
    {
      uni: 'Manchester',
      course: 'Mathematics and Statistics',
      url: 'https://digital.ucas.com/coursedisplay/courses/416a5af8-3a0f-a39b-427d-b3fa06f72b81'
    },

    // Bristol courses
    {
      uni: 'Bristol',
      course: 'Aerospace Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/0ad853a8-8ae3-e9b4-d082-146736f0a2df'
    },
    {
      uni: 'Bristol',
      course: 'Design Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/5846eb84-4a9d-4f40-8add-fb0471661cda'
    },
    {
      uni: 'Bristol',
      course: 'Engineering Mathematics',
      url: 'https://digital.ucas.com/coursedisplay/courses/ba04eeba-2ea8-1fdd-9a69-b5c5720b8d59'
    },

    // Southampton courses
    {
      uni: 'Southampton',
      course: 'Mechanical Engineering/Aerospace Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/3ad8e877-af25-d962-37df-2819066d899c'
    },
    {
      uni: 'Southampton',
      course: 'Biomedical Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/6e5928f5-3407-49f6-b380-e1b8765c3274'
    },
    {
      uni: 'Southampton',
      course: 'Chemical Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/f7f6ddf8-1ca6-47a7-9c9b-3a8b0f9bbf59'
    },

    // Birmingham courses
    {
      uni: 'Birmingham',
      course: 'Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/3e80b912-b939-602d-ae3e-b9941423c2c0'
    },
    {
      uni: 'Birmingham',
      course: 'Aerospace Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/0de2b986-6dcb-4f01-ba5b-400c75478d31'
    },
    {
      uni: 'Birmingham',
      course: 'Chemical Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/6c9d9994-c513-1d3f-e1e9-ef10e58ce381'
    },
    {
      uni: 'Birmingham',
      course: 'Energy Engineering',
      url: 'https://digital.ucas.com/coursedisplay/courses/d3870a25-df5d-4b79-8b0a-358ddcefc4ba'
    }
  ]

  // Update each course with its UCAS URL
  for (const courseData of courseUrls) {
    try {
      // Find the university
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: courseData.uni
          }
        }
      })

      if (university) {
        // Find and update the course
        const course = await prisma.course.findFirst({
          where: {
            universityId: university.id,
            name: courseData.course
          }
        })

        if (course) {
          await prisma.course.update({
            where: { id: course.id },
            data: { ucasUrl: courseData.url }
          })
          console.log(`✅ Updated URL for ${courseData.course} at ${courseData.uni}`)
        } else {
          console.log(`❌ Course not found: ${courseData.course} at ${courseData.uni}`)
        }
      } else {
        console.log(`❌ University not found: ${courseData.uni}`)
      }
    } catch (error) {
      console.error(`Error updating ${courseData.course}:`, error)
    }
  }

  // Verify all courses have URLs
  console.log('\n📊 Verification:')
  const universities = await prisma.university.findMany({
    where: { isFavorite: true },
    include: {
      courses: {
        orderBy: { name: 'asc' }
      }
    },
    orderBy: { rankingScore: 'desc' }
  })

  let totalWithUrls = 0
  let totalWithoutUrls = 0

  for (const uni of universities) {
    const withUrls = uni.courses.filter(c => c.ucasUrl).length
    const withoutUrls = uni.courses.filter(c => !c.ucasUrl).length

    totalWithUrls += withUrls
    totalWithoutUrls += withoutUrls

    console.log(`${uni.name}: ${withUrls} courses with URLs, ${withoutUrls} without`)
  }

  console.log(`\n✅ Total courses with URLs: ${totalWithUrls}`)
  if (totalWithoutUrls > 0) {
    console.log(`⚠️  Total courses without URLs: ${totalWithoutUrls}`)
  }

  console.log('\n💡 Course URLs are now available in the app!')
  console.log('   Users can click on course names in the Courses tab to open UCAS pages')
}

updateCourseUrls()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })