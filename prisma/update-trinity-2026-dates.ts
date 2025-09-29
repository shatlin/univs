import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateTrinity2026Dates() {
  console.log('📅 Updating Trinity College Dublin Dates for 2026 Entry...\n')

  try {
    // Find Trinity College Dublin
    const trinity = await prisma.university.findFirst({
      where: {
        name: {
          contains: 'Trinity College Dublin'
        }
      }
    })

    if (!trinity) {
      console.log('❌ Trinity College Dublin not found in database')
      return
    }

    console.log(`✅ Found Trinity College Dublin: ${trinity.id}`)

    // Update application deadline for 2026 entry
    await prisma.university.update({
      where: { id: trinity.id },
      data: {
        applicationDeadline: new Date('2026-06-30'),
        userNotes: trinity.userNotes?.replace(
          'Target Entry Year: 2025',
          'Target Entry Year: 2026 (September intake)'
        )
      }
    })
    console.log('✅ Updated main application deadline to June 30, 2026')

    // Clear existing key dates
    await prisma.keyDate.deleteMany({
      where: { universityId: trinity.id }
    })
    console.log('✅ Cleared old dates')

    // Add new key dates for 2026 entry
    const keyDates2026 = [
      {
        title: 'Application Opens',
        date: new Date('2025-11-01'),
        type: 'Application',
        description: 'Non-EU undergraduate applications open for 2026 entry',
        critical: false
      },
      {
        title: 'Priority Application Deadline',
        date: new Date('2026-02-01'),
        type: 'Application',
        description: 'Priority deadline for strongest consideration, decision by April 1st',
        critical: true
      },
      {
        title: 'Medicine/Dentistry Deadline',
        date: new Date('2026-02-01'),
        type: 'Application',
        description: 'Final deadline for Medicine, Dental Science, Music, and Drama',
        critical: true
      },
      {
        title: 'Priority Decision Date',
        date: new Date('2026-04-01'),
        type: 'Decision',
        description: 'Decisions released for priority applications',
        critical: false
      },
      {
        title: 'Acceptance Deadline',
        date: new Date('2026-05-01'),
        type: 'Decision',
        description: 'Recommended acceptance deadline for priority applicants',
        critical: true
      },
      {
        title: 'Final Application Deadline',
        date: new Date('2026-06-30'),
        type: 'Application',
        description: 'Final deadline for all Non-EU undergraduate applications',
        critical: true
      },
      {
        title: 'Orientation Week',
        date: new Date('2026-09-14'),
        type: 'Other',
        description: 'New student orientation begins',
        critical: false
      },
      {
        title: 'Academic Year Begins',
        date: new Date('2026-09-21'),
        type: 'Other',
        description: 'First semester classes begin',
        critical: false
      }
    ]

    // Add all new dates
    for (const date of keyDates2026) {
      await prisma.keyDate.create({
        data: {
          ...date,
          universityId: trinity.id
        }
      })
    }
    console.log(`✅ Added ${keyDates2026.length} key dates for 2026 entry`)

    // Update the university note with 2026 timeline
    await prisma.universityNote.deleteMany({
      where: { universityId: trinity.id }
    })

    await prisma.universityNote.create({
      data: {
        universityId: trinity.id,
        content: `## Application Strategy Notes for 2026 Entry

**Target Entry**: September 2026

**Priority Deadline (Feb 1, 2026)**: This is crucial - apply by this date for best chances and April 1 decision.

**Timeline for Damien (graduating Dec 2025)**:
- November 2025: Applications open - start preparing documents
- December 2025: Complete IB exams
- January 2026: Submit application (aim for mid-January)
- February 1, 2026: Priority deadline - MUST submit by this date
- April 1, 2026: Priority decision date
- May 1, 2026: Accept offer if received

**Course Selection**: Can apply to multiple courses, each requires €55 fee. Computer Science (TR033) is highly competitive but excellent program.

**Accommodation**: Apply for Trinity Hall as soon as applications open in March 2026 - fills quickly.

**Registration Status**: Currently have registration form filled but NOT submitted on Trinity website. Will need to update for 2026 cycle when it opens.

**Next Steps**:
1. Wait for November 2025 application opening
2. Prepare documents (transcripts, predicted grades, references)
3. Finalize course selection
4. Submit application by January 2026
5. Book accommodation early (March 2026)
6. Ensure English test scores are ready`
      }
    })
    console.log('✅ Updated application strategy note for 2026 entry')

    console.log('\n🎉 Trinity College Dublin dates successfully updated for 2026 entry!')
    console.log('\n📌 Key Takeaways:')
    console.log('   - Applications open: November 1, 2025')
    console.log('   - Priority deadline: February 1, 2026')
    console.log('   - Final deadline: June 30, 2026')
    console.log('   - Perfect timing for December 2025 graduation!')

  } catch (error) {
    console.error('Error updating Trinity dates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateTrinity2026Dates()