import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addTimelineNotes() {
  console.log('📅 Adding timeline notes to UniversityNote table...\n')

  // Define timeline entries for each university
  const timelineEntries = [
    // Edinburgh entries
    { university: 'University of Edinburgh', note: 'Shortlisted course "Software Engineering" (BEng Hon, 4 years)' },
    { university: 'University of Edinburgh', note: 'Shortlisted course "Electrical and Mechanical Engineering" (MEng Hon, 5 years)' },
    { university: 'University of Edinburgh', note: 'Shortlisted course "Mathematics" (MMath, 5 years) - Prestigious mathematics program' },
    { university: 'University of Edinburgh', note: 'Shortlisted course "Mathematics and Business" (BSc Hons, 4 years) - Perfect for Business(6) strength' },
    { university: 'University of Edinburgh', note: 'Shortlisted course "Applied Mathematics" (MMath Hons, 5 years)' },

    // Manchester entries
    { university: 'University of Manchester', note: 'Shortlisted course "Electrical and Electronic Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Manchester', note: 'Shortlisted course "Artificial Intelligence" (MS, 12 months) - Postgraduate option' },
    { university: 'University of Manchester', note: 'Shortlisted course "Mathematics" (MMath, 4 years) - Prestigious program' },
    { university: 'University of Manchester', note: 'Shortlisted course "Computer Science and Mathematics" (BSc Hons, 3 years) - Perfect CS(6) + Maths(5)' },
    { university: 'University of Manchester', note: 'Shortlisted course "Mathematics and Statistics" (MMath, 4 years)' },

    // Bristol entries
    { university: 'University of Bristol', note: 'Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Bristol', note: 'Shortlisted course "Design Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Bristol', note: 'Shortlisted course "Engineering Mathematics" (MEng Hon, 4 years) - Combines engineering with maths' },
    { university: 'University of Bristol', note: 'Shortlisted course "Electrical and Electronic Engineering" (BEng Hon, 3 years)' },

    // Southampton entries
    { university: 'University of Southampton', note: 'Shortlisted course "Mechanical Engineering/Aerospace Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Southampton', note: 'Shortlisted course "Biomedical Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Southampton', note: 'Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)' },

    // Birmingham entries
    { university: 'University of Birmingham', note: 'Shortlisted course "Engineering" (MEng Hon, 4 years) - General program with specialization' },
    { university: 'University of Birmingham', note: 'Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Birmingham', note: 'Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)' },
    { university: 'University of Birmingham', note: 'Shortlisted course "Energy Engineering" (MEng Hon, 4 years) - Emerging field' },
  ]

  // Group entries by university
  const groupedEntries = timelineEntries.reduce((acc, entry) => {
    if (!acc[entry.university]) {
      acc[entry.university] = []
    }
    acc[entry.university].push(entry.note)
    return acc
  }, {} as Record<string, string[]>)

  // Add timeline notes for each university
  for (const [uniName, notes] of Object.entries(groupedEntries)) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: uniName
          }
        }
      })

      if (university) {
        // Delete existing timeline notes for this university (if any)
        await prisma.universityNote.deleteMany({
          where: {
            universityId: university.id
          }
        })

        // Create new timeline notes
        const createPromises = notes.map(content =>
          prisma.universityNote.create({
            data: {
              universityId: university.id,
              content
            }
          })
        )

        await Promise.all(createPromises)

        console.log(`✅ Added ${notes.length} timeline notes for ${uniName}`)
      } else {
        console.log(`❌ Could not find ${uniName} in database`)
      }
    } catch (error) {
      console.error(`Error updating ${uniName}:`, error)
    }
  }

  // Show summary
  const totalNotes = await prisma.universityNote.count()
  console.log(`\n📊 Summary:`)
  console.log(`Total timeline notes in database: ${totalNotes}`)
  console.log('\nThese notes will appear as individual timeline entries in your app.')
  console.log('Each entry has its own timestamp (createdAt) for proper timeline display.')
}

addTimelineNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })