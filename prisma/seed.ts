import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Sample UK Universities
  const ukUniversities = [
    {
      name: 'University of Cambridge',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*A*A at A-Level including Mathematics and Further Mathematics',
      ieltsRequired: 7.5,
      tuitionFee: 33825,
      location: 'Cambridge',
      website: 'https://www.cam.ac.uk',
      ranking: 2,
      ucasCode: 'C05',
      notes: 'Highly competitive, strong emphasis on mathematics'
    },
    {
      name: 'University of Oxford',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA at A-Level including Mathematics, with the A* in Mathematics, Further Mathematics or Computer Science',
      ieltsRequired: 7.5,
      tuitionFee: 31230,
      location: 'Oxford',
      website: 'https://www.ox.ac.uk',
      ranking: 4,
      ucasCode: 'O33',
      notes: 'MAT test required, interview process'
    },
    {
      name: 'Imperial College London',
      country: 'UK',
      courseName: 'Computing',
      entryRequirements: 'A*A*A to A*AAA at A-Level including Mathematics and Further Mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 33000,
      location: 'London',
      website: 'https://www.imperial.ac.uk',
      ranking: 7,
      ucasCode: 'I50',
      notes: 'Strong focus on practical computing skills'
    },
    {
      name: 'University College London',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA at A-Level including Mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 31200,
      location: 'London',
      website: 'https://www.ucl.ac.uk',
      ranking: 9,
      ucasCode: 'U80',
      notes: 'Located in central London, diverse research areas'
    },
    {
      name: 'University of Edinburgh',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA - ABB at A-Level including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 28950,
      location: 'Edinburgh',
      website: 'https://www.ed.ac.uk',
      ranking: 22,
      ucasCode: 'E56',
      notes: 'Strong AI and machine learning research'
    },
    {
      name: 'University of Manchester',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA at A-Level including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 27500,
      location: 'Manchester',
      website: 'https://www.manchester.ac.uk',
      ranking: 32,
      ucasCode: 'M20',
      notes: 'Good industry connections, placement year available'
    },
    {
      name: 'University of Warwick',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA at A-Level including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 27060,
      location: 'Coventry',
      website: 'https://warwick.ac.uk',
      ranking: 67,
      ucasCode: 'W20',
      notes: 'Strong reputation for CS, beautiful campus'
    },
    {
      name: 'University of Bristol',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA at A-Level including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 27200,
      location: 'Bristol',
      website: 'https://www.bristol.ac.uk',
      ranking: 61,
      ucasCode: 'B78',
      notes: 'Excellent for robotics and human-computer interaction'
    }
  ]

  // Sample US Universities
  const usUniversities = [
    {
      name: 'Massachusetts Institute of Technology',
      country: 'USA',
      courseName: 'Computer Science and Engineering',
      entryRequirements: 'SAT 1520-1570, strong mathematics background',
      ieltsRequired: 7.5,
      tuitionFee: 57986,
      location: 'Cambridge, MA',
      website: 'https://www.mit.edu',
      ranking: 1,
      notes: 'World-leading CS program, highly competitive'
    },
    {
      name: 'Stanford University',
      country: 'USA',
      courseName: 'Computer Science',
      entryRequirements: 'SAT 1470-1570, exceptional academic record',
      ieltsRequired: 7.0,
      tuitionFee: 58416,
      location: 'Stanford, CA',
      website: 'https://www.stanford.edu',
      ranking: 3,
      notes: 'Silicon Valley location, entrepreneurial culture'
    },
    {
      name: 'Carnegie Mellon University',
      country: 'USA',
      courseName: 'Computer Science',
      entryRequirements: 'SAT 1500-1560, strong STEM background',
      ieltsRequired: 7.5,
      tuitionFee: 61344,
      location: 'Pittsburgh, PA',
      website: 'https://www.cmu.edu',
      ranking: 52,
      notes: 'Top-ranked CS program, especially for AI and robotics'
    }
  ]

  // Sample Canadian Universities
  const canadianUniversities = [
    {
      name: 'University of Toronto',
      country: 'Canada',
      courseName: 'Computer Science',
      entryRequirements: 'Overall average of 90%+, strong mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 60510,
      location: 'Toronto',
      website: 'https://www.utoronto.ca',
      ranking: 21,
      notes: 'Largest university in Canada, strong research programs'
    },
    {
      name: 'University of British Columbia',
      country: 'Canada',
      courseName: 'Computer Science',
      entryRequirements: 'Overall average of 88%+',
      ieltsRequired: 6.5,
      tuitionFee: 55046,
      location: 'Vancouver',
      website: 'https://www.ubc.ca',
      ranking: 41,
      notes: 'Beautiful campus, co-op program available'
    },
    {
      name: 'University of Waterloo',
      country: 'Canada',
      courseName: 'Computer Science',
      entryRequirements: 'Overall average of 90-95%, strong mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 63000,
      location: 'Waterloo',
      website: 'https://uwaterloo.ca',
      ranking: 112,
      notes: 'Excellent co-op program, strong industry connections'
    }
  ]

  // Clear existing data
  await prisma.todo.deleteMany()
  await prisma.document.deleteMany()
  await prisma.application.deleteMany()
  await prisma.deadline.deleteMany()
  await prisma.university.deleteMany()

  // Insert universities
  console.log('Seeding universities...')

  for (const uni of [...ukUniversities, ...usUniversities, ...canadianUniversities]) {
    await prisma.university.create({
      data: uni
    })
  }

  console.log('Seeding complete!')

  // Create some sample deadlines
  await prisma.deadline.createMany({
    data: [
      {
        title: 'UCAS Application Deadline',
        description: 'Main UCAS deadline for most courses',
        date: new Date('2025-01-29'),
        type: 'APPLICATION',
        critical: true
      },
      {
        title: 'Oxford & Cambridge Deadline',
        description: 'Early deadline for Oxbridge applications',
        date: new Date('2024-10-15'),
        type: 'APPLICATION',
        critical: true
      },
      {
        title: 'IELTS Test Date',
        description: 'Scheduled IELTS examination',
        date: new Date('2024-11-15'),
        type: 'DOCUMENT',
        critical: false
      },
      {
        title: 'Student Finance Application',
        description: 'Deadline to apply for student loans',
        date: new Date('2025-05-31'),
        type: 'FINANCIAL',
        critical: false
      }
    ]
  })

  console.log('Sample deadlines created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })