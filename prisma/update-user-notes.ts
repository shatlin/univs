import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateUserNotes() {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16)
  console.log(`📅 Adding timeline notes to userNotes column for each university...\n`)

  const universityTimelineNotes = [
    {
      name: 'University of Edinburgh',
      userNotes: `📅 TIMELINE:
${timestamp} - Shortlisted course "Software Engineering" (BEng Hon, 4 years)
${timestamp} - Shortlisted course "Electrical and Mechanical Engineering" (MEng Hon, 5 years)
${timestamp} - Shortlisted course "Mathematics" (MMath, 5 years) - Prestigious mathematics program
${timestamp} - Shortlisted course "Mathematics and Business" (BSc Hons, 4 years) - Perfect for Business(6) strength
${timestamp} - Shortlisted course "Applied Mathematics" (MMath Hons, 5 years)

📝 NEXT STEPS:
- Review entry requirements (A*A*A* - AAB)
- Check if TMUA required for Maths courses
- Personal statement focus: CS(6) and Maths(5) strengths
- Deadline: 14 January 2025`
    },
    {
      name: 'University of Manchester',
      userNotes: `📅 TIMELINE:
${timestamp} - Shortlisted course "Electrical and Electronic Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Artificial Intelligence" (MS, 12 months) - Postgraduate option for future
${timestamp} - Shortlisted course "Mathematics" (MMath, 4 years) - Prestigious program
${timestamp} - Shortlisted course "Computer Science and Mathematics" (BSc Hons, 3 years) - Perfect CS(6) + Maths(5) combination
${timestamp} - Shortlisted course "Mathematics and Statistics" (MMath, 4 years)

📝 NEXT STEPS:
- Strong CS+Maths combination selected
- Consider which course to prioritize in application
- Check if AI MS requires separate application
- Deadline: 14 January 2025`
    },
    {
      name: 'University of Bristol',
      userNotes: `📅 TIMELINE:
${timestamp} - Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Design Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Engineering Mathematics" (MEng Hon, 4 years) - Combines engineering with strong maths
${timestamp} - Shortlisted course "Electrical and Electronic Engineering" (BEng Hon, 3 years)

📝 NEXT STEPS:
- Innovation-focused programs selected
- Check contextual offer requirements (AAB possible)
- Engineering Mathematics combines strengths well
- Deadline: 14 January 2025`
    },
    {
      name: 'University of Southampton',
      userNotes: `📅 TIMELINE:
${timestamp} - Shortlisted course "Mechanical Engineering/Aerospace Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Biomedical Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)

📝 NEXT STEPS:
- Consider adding Software Engineering (Web Science birthplace)
- Strong industry placement opportunities
- Check placement year requirements
- Deadline: 14 January 2025`
    },
    {
      name: 'University of Birmingham',
      userNotes: `📅 TIMELINE:
${timestamp} - Shortlisted course "Engineering" (MEng Hon, 4 years) - General program with specialization options
${timestamp} - Shortlisted course "Aerospace Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Chemical Engineering" (MEng Hon, 4 years)
${timestamp} - Shortlisted course "Energy Engineering" (MEng Hon, 4 years) - Emerging field

📝 NEXT STEPS:
- Consider adding Electronic & Electrical Engineering
- Dubai campus option available for some programs
- General Engineering allows later specialization
- Deadline: 14 January 2025`
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
        await prisma.university.update({
          where: { id: university.id },
          data: {
            userNotes: uni.userNotes
          }
        })

        console.log(`✅ Updated userNotes for ${uni.name}`)
        const courseCount = (uni.userNotes.match(/Shortlisted course/g) || []).length
        console.log(`   - Added ${courseCount} timeline entries`)
      } else {
        console.log(`❌ Could not find ${uni.name} in database`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }

  console.log(`\n✨ Successfully updated userNotes column with timeline entries`)
  console.log(`📅 Timestamp: ${timestamp}`)
  console.log(`\n💡 These notes will appear in the Notes tab when viewing each university page in the app`)
}

updateUserNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })