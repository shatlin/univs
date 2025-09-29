import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addCourseTimelineNotes() {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16)
  console.log(`📅 Adding individual timeline notes for each shortlisted course...\n`)

  const universityTimelineNotes = [
    {
      name: 'University of Edinburgh',
      notes: [
        `${timestamp} - Shortlisted course "Software Engineering" (BEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Electrical and Mechanical Engineering" (MEng Hon, 5 years)`,
        `${timestamp} - Shortlisted course "Mathematics" (MMath, 5 years) - Prestigious mathematics program`,
        `${timestamp} - Shortlisted course "Mathematics and Business" (BSc Hons, 4 years) - Perfect for Business(6) strength`,
        `${timestamp} - Shortlisted course "Applied Mathematics" (MMath Hons, 5 years)`
      ]
    },
    {
      name: 'University of Manchester',
      notes: [
        `${timestamp} - Shortlisted course "Electrical and Electronic Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Artificial Intelligence" (MS, 12 months) - Postgraduate option for future`,
        `${timestamp} - Shortlisted course "Mathematics" (MMath, 4 years) - Prestigious program`,
        `${timestamp} - Shortlisted course "Computer Science and Mathematics" (BSc Hons, 3 years) - Perfect CS(6) + Maths(5) combination`,
        `${timestamp} - Shortlisted course "Mathematics and Statistics" (MMath, 4 years)`
      ]
    },
    {
      name: 'University of Bristol',
      notes: [
        `${timestamp} - Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Design Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Engineering Mathematics" (MEng Hon, 4 years) - Combines engineering with strong maths`,
        `${timestamp} - Shortlisted course "Electrical and Electronic Engineering" (BEng Hon, 3 years)`
      ]
    },
    {
      name: 'University of Southampton',
      notes: [
        `${timestamp} - Shortlisted course "Mechanical Engineering/Aerospace Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Biomedical Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)`
      ]
    },
    {
      name: 'University of Birmingham',
      notes: [
        `${timestamp} - Shortlisted course "Engineering" (MEng Hon, 4 years) - General program with specialization options`,
        `${timestamp} - Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)`,
        `${timestamp} - Shortlisted course "Energy Engineering" (MEng Hon, 4 years) - Emerging field`
      ]
    }
  ]

  for (const uni of universityTimelineNotes) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: uni.name
          }
        }
      })

      if (university) {
        // Get existing notes and clean up old format
        let existingNotes = university.notes || ''

        // Remove old FAVORITED COURSES or timeline sections
        existingNotes = existingNotes
          .replace(/📅[\s\S]*?(?=\n\n|$)/, '')
          .replace(/FAVORITED COURSES[\s\S]*?(?=\n\n|$)/, '')
          .replace(/✅[\s\S]*?(?=📝|$)/, '')
          .replace(/📝 Next Steps:[\s\S]*?(?=\n\n|$)/, '')
          .trim()

        // Keep only the original best fit reason if it exists
        const originalReason = existingNotes.match(/BEST FIT.*?(?=\n|$)/)?.[0] || existingNotes

        // Build new notes with timeline format
        const timelineNotes = uni.notes.join('\n')
        const newNotes = originalReason ?
          `${originalReason}\n\n📅 TIMELINE:\n${timelineNotes}` :
          `📅 TIMELINE:\n${timelineNotes}`

        await prisma.university.update({
          where: { id: university.id },
          data: {
            notes: newNotes
          }
        })

        console.log(`✅ Added ${uni.notes.length} timeline entries for ${uni.name}`)
      } else {
        console.log(`❌ Could not find ${uni.name} in database`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }

  console.log(`\n✨ Successfully added timeline notes for 21 shortlisted courses`)
  console.log(`📅 Timestamp: ${timestamp}`)
}

addCourseTimelineNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })