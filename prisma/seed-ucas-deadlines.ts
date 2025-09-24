import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Adding UCAS-specific deadlines and tasks...')

  // Add UCAS-specific deadlines based on the plan
  const ucasDeadlines = [
    {
      title: 'UCAS Main Application Deadline',
      description: 'Main deadline for most undergraduate courses - 18:00 UK time',
      date: new Date('2025-01-29T18:00:00'),
      type: 'APPLICATION' as const,
      critical: true
    },
    {
      title: 'Aim to Submit Application',
      description: 'Strategic early submission target to avoid last-minute issues',
      date: new Date('2024-12-15'),
      type: 'APPLICATION' as const,
      critical: false
    },
    {
      title: 'Personal Statement - First Draft',
      description: 'Complete first draft of personal statement for review',
      date: new Date('2024-10-31'),
      type: 'DOCUMENT' as const,
      critical: false
    },
    {
      title: 'Personal Statement - Final Version',
      description: 'Final polished personal statement ready for submission',
      date: new Date('2024-11-30'),
      type: 'DOCUMENT' as const,
      critical: true
    },
    {
      title: 'Request Academic References',
      description: 'Contact teachers/mentors for UCAS reference',
      date: new Date('2024-10-07'),
      type: 'DOCUMENT' as const,
      critical: true
    },
    {
      title: 'Finalize 5 Course Choices',
      description: 'Research and confirm final 5 UCAS choices',
      date: new Date('2024-10-15'),
      type: 'APPLICATION' as const,
      critical: false
    },
    {
      title: 'UCAS Hub Registration Complete',
      description: 'Ensure all personal details sections are filled',
      date: new Date('2024-10-20'),
      type: 'APPLICATION' as const,
      critical: false
    }
  ]

  // Add general application todos based on the UCAS plan
  const generalTodos = [
    {
      title: 'Research course entry requirements',
      description: 'Check entry requirements for all 5 chosen courses',
      category: 'GENERAL' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2024-10-10'),
      completed: false
    },
    {
      title: 'Confirm predicted grades with school',
      description: 'Get official predicted grades from teachers',
      category: 'DOCUMENT' as const,
      priority: 'CRITICAL' as const,
      dueDate: new Date('2024-10-05'),
      completed: false
    },
    {
      title: 'Draft personal statement opening paragraph',
      description: 'Write compelling opening that captures attention',
      category: 'DOCUMENT' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2024-10-12'),
      completed: false
    },
    {
      title: 'List key experiences for personal statement',
      description: 'Compile relevant experiences, achievements, and skills',
      category: 'DOCUMENT' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2024-10-08'),
      completed: false
    },
    {
      title: 'Research university open days',
      description: 'Find and register for October-November open days',
      category: 'GENERAL' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2024-10-01'),
      completed: false
    },
    {
      title: 'Create course selection strategy',
      description: '2 aspirational, 2 realistic, 1 insurance choice',
      category: 'GENERAL' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2024-10-07'),
      completed: false
    },
    {
      title: 'Review UCAS personal statement guide',
      description: 'Study official UCAS resources for statement writing',
      category: 'DOCUMENT' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2024-10-03'),
      completed: false
    },
    {
      title: 'Check for additional course requirements',
      description: 'Verify if any courses need portfolios, interviews, or tests',
      category: 'GENERAL' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2024-10-14'),
      completed: false
    }
  ]

  // Clear existing deadlines and todos to avoid duplicates
  console.log('Clearing existing UCAS deadlines...')
  await prisma.deadline.deleteMany({
    where: {
      title: {
        contains: 'UCAS'
      }
    }
  })

  // Add new deadlines
  for (const deadline of ucasDeadlines) {
    await prisma.deadline.create({
      data: deadline
    })
  }
  console.log(`Added ${ucasDeadlines.length} UCAS-specific deadlines`)

  // Add general todos
  for (const todo of generalTodos) {
    await prisma.todo.create({
      data: todo
    })
  }
  console.log(`Added ${generalTodos.length} general UCAS todos`)

  // Update existing universities with more specific UCAS information
  const cambridgeUpdate = await prisma.university.updateMany({
    where: {
      name: 'University of Cambridge'
    },
    data: {
      notes: 'DEADLINE PASSED (Oct 15, 2024) - Highly competitive, strong emphasis on mathematics, requires additional assessment'
    }
  })

  const oxfordUpdate = await prisma.university.updateMany({
    where: {
      name: 'University of Oxford'
    },
    data: {
      notes: 'DEADLINE PASSED (Oct 15, 2024) - MAT test required, interview process, cannot apply to both Oxford and Cambridge'
    }
  })

  console.log('Updated Oxbridge notes with deadline information')
  console.log('UCAS data import complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })