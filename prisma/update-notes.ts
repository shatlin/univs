import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateUniversityNotes() {
  console.log('Adding notes about favorited courses for each university...\n')

  const universityNotes = [
    {
      name: 'University of Edinburgh',
      favoritedCourses: `FAVORITED COURSES (5 total):
• Software Engineering - BEng (Hon) - 4 Years
• Electrical and Mechanical Engineering - MEng (Hon) - 5 Years
• Mathematics - MMath - 5 Years (Prestigious)
• Mathematics and Business - BSc (Hons) - 4 Years (Perfect for Business strength)
• Applied Mathematics - MMath (Hons) - 5 Years

Strong mix of engineering and mathematics programs. Excellent for CS(6) and Maths(5) strengths.`
    },
    {
      name: 'University of Manchester',
      favoritedCourses: `FAVORITED COURSES (5 total):
• Electrical and Electronic Engineering - MEng (Hon) - 4 Years
• Artificial Intelligence - MS - 12 Months (Postgraduate option)
• Mathematics - MMath - 4 Years (Prestigious)
• Computer Science and Mathematics - BSc (Hons) - 3 Years (Perfect CS+Maths combo)
• Mathematics and Statistics - MMath - 4 Years

Excellent balance of engineering, AI, and mathematics. Strong for CS(6) and data science interests.`
    },
    {
      name: 'University of Bristol',
      favoritedCourses: `FAVORITED COURSES (4 total):
• Aerospace Engineering - MEng (Hon) - 4 Years
• Design Engineering - MEng (Hon) - 4 Years
• Engineering Mathematics - MEng (Hon) - 4 Years (Combines engineering with strong maths)
• Electrical and Electronic Engineering - BEng (Hon) - 3 Years

Innovation-focused programs with strong engineering mathematics. Good for practical engineering.`
    },
    {
      name: 'University of Southampton',
      favoritedCourses: `FAVORITED COURSES (3 total):
• Mechanical Engineering/Aerospace Engineering - MEng (Hon) - 4 Years
• Biomedical Engineering - MEng (Hon) - 4 Years
• Chemical Engineering - MEng (Hon) - 4 Years

Diverse engineering options. Strong industry connections and placement opportunities.`
    },
    {
      name: 'University of Birmingham',
      favoritedCourses: `FAVORITED COURSES (4 total):
• Engineering - MEng (Hon) - 4 Years (General program with specialization options)
• Aerospace Engineering - MEng (Hon) - 4 Years
• Chemical Engineering - MEng (Hon) - 4 Years
• Energy Engineering - MEng (Hon) - 4 Years

Broad engineering programs with emerging fields like Energy Engineering. Dubai campus option available.`
    }
  ]

  for (const uni of universityNotes) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: uni.name
          }
        }
      })

      if (university) {
        // Append favorited courses info to existing notes
        const updatedNotes = university.notes
          ? `${university.notes}\n\n${uni.favoritedCourses}`
          : uni.favoritedCourses

        await prisma.university.update({
          where: { id: university.id },
          data: {
            notes: updatedNotes,
            isFavorite: true // Ensure these universities are marked as favorites
          }
        })

        console.log(`✅ Updated notes for ${uni.name}`)
        console.log(`   Total favorited courses: ${uni.favoritedCourses.match(/•/g)?.length || 0}`)
      } else {
        console.log(`❌ Could not find ${uni.name} in database`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }

  // Summary
  console.log('\n📊 Summary of Favorited Courses:')
  console.log('Total courses favorited: 21')
  console.log('Edinburgh: 5 courses (3 MEng/MMath, 2 BSc/BEng)')
  console.log('Manchester: 5 courses (3 MMath/MEng, 1 BSc, 1 MS)')
  console.log('Bristol: 4 courses (3 MEng, 1 BEng)')
  console.log('Southampton: 3 courses (all MEng)')
  console.log('Birmingham: 4 courses (all MEng)')
  console.log('\nAll courses align with preferred subjects:')
  console.log('✓ Software engineering')
  console.log('✓ Mathematics and statistics')
  console.log('✓ Aeronautical and aerospace engineering')
  console.log('✓ Electrical and electronic engineering')
}

updateUniversityNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })