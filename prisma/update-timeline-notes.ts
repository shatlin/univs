import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateTimelineNotes() {
  const today = new Date().toISOString().split('T')[0]
  console.log(`📅 Adding timeline notes for favorited courses (${today})...\n`)

  const universityTimelines = [
    {
      name: 'University of Edinburgh',
      timelineNote: `📅 ${today} - UCAS Courses Favorited (5 total)
✅ Software Engineering - BEng (Hon) - 4 Years
✅ Electrical and Mechanical Engineering - MEng (Hon) - 5 Years
✅ Mathematics - MMath - 5 Years (Prestigious)
✅ Mathematics and Business - BSc (Hons) - 4 Years
✅ Applied Mathematics - MMath (Hons) - 5 Years

📝 Next Steps:
- Review entry requirements for each course
- Prepare personal statement focusing on CS(6) and Maths(5) strengths
- Check for any additional entrance tests (TMUA for Maths courses)
- Application deadline: 14 Jan 2025`
    },
    {
      name: 'University of Manchester',
      timelineNote: `📅 ${today} - UCAS Courses Favorited (5 total)
✅ Electrical and Electronic Engineering - MEng (Hon) - 4 Years
✅ Artificial Intelligence - MS - 12 Months (Note: Postgraduate)
✅ Mathematics - MMath - 4 Years (Prestigious)
✅ Computer Science and Mathematics - BSc (Hons) - 3 Years
✅ Mathematics and Statistics - MMath - 4 Years

📝 Next Steps:
- Strong CS+Maths combination courses selected
- Consider which course to prioritize for personal statement
- Check if AI MS course requires separate application
- Application deadline: 14 Jan 2025`
    },
    {
      name: 'University of Bristol',
      timelineNote: `📅 ${today} - UCAS Courses Favorited (4 total)
✅ Aerospace Engineering - MEng (Hon) - 4 Years
✅ Design Engineering - MEng (Hon) - 4 Years
✅ Engineering Mathematics - MEng (Hon) - 4 Years
✅ Electrical and Electronic Engineering - BEng (Hon) - 3 Years

📝 Next Steps:
- Innovation-focused programs selected
- Consider contextual offer possibilities (AAB)
- Engineering Mathematics combines strengths well
- Application deadline: 14 Jan 2025`
    },
    {
      name: 'University of Southampton',
      timelineNote: `📅 ${today} - UCAS Courses Favorited (3 total)
✅ Mechanical Engineering/Aerospace Engineering - MEng (Hon) - 4 Years
✅ Biomedical Engineering - MEng (Hon) - 4 Years
✅ Chemical Engineering - MEng (Hon) - 4 Years

📝 Next Steps:
- Consider adding 1-2 more courses for balance
- Strong industry placement opportunities available
- Web Science birthplace - consider Software Engineering
- Application deadline: 14 Jan 2025`
    },
    {
      name: 'University of Birmingham',
      timelineNote: `📅 ${today} - UCAS Courses Favorited (4 total)
✅ Engineering - MEng (Hon) - 4 Years (General program)
✅ Aerospace Engineering - MEng (Hon) - 4 Years
✅ Chemical Engineering - MEng (Hon) - 4 Years
✅ Energy Engineering - MEng (Hon) - 4 Years

📝 Next Steps:
- Consider adding Electronic/Electrical Engineering
- Dubai campus option for some programs
- General Engineering allows specialization later
- Application deadline: 14 Jan 2025`
    }
  ]

  for (const uni of universityTimelines) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: uni.name
          }
        }
      })

      if (university) {
        // Replace the favorited courses section with timeline format
        let updatedNotes = university.notes || ''

        // Remove old FAVORITED COURSES section if it exists
        updatedNotes = updatedNotes.replace(/FAVORITED COURSES[\s\S]*?(?=\n\n|$)/, '').trim()

        // Add timeline note
        if (updatedNotes) {
          updatedNotes = `${updatedNotes}\n\n${uni.timelineNote}`
        } else {
          updatedNotes = uni.timelineNote
        }

        await prisma.university.update({
          where: { id: university.id },
          data: {
            notes: updatedNotes
          }
        })

        console.log(`✅ Updated timeline notes for ${uni.name}`)
      } else {
        console.log(`❌ Could not find ${uni.name} in database`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }

  console.log('\n📊 Timeline Summary:')
  console.log(`📅 ${today}: Favorited 21 courses across 5 universities`)
  console.log('🎯 All courses align with preferred subjects')
  console.log('⏰ UCAS Deadline: 14 January 2025')
  console.log('\n📋 Application Checklist:')
  console.log('□ Personal statement draft')
  console.log('□ Reference letter secured')
  console.log('□ Predicted grades confirmed (36/45 IB)')
  console.log('□ UCAS application fee ready')
  console.log('□ Choose 5 final courses for UCAS application')
}

updateTimelineNotes()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })