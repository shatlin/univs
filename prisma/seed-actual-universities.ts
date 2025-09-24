import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing universities and applications...')

  // Clear all existing data
  await prisma.todo.deleteMany()
  await prisma.document.deleteMany()
  await prisma.application.deleteMany()
  await prisma.university.deleteMany()

  console.log('Adding UK Universities based on Damien\'s UCAS 5 choices and comprehensive list...')

  // Damien's UCAS 5 Recommended Choices (from UCAS 5.md)
  const ucas5Universities = [
    {
      name: 'University College London (UCL)',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA (IB 38-40 points, with 7 in HL Maths ideally)',
      ieltsRequired: 7.0,
      tuitionFee: 31200,
      location: 'London',
      website: 'https://www.ucl.ac.uk',
      ranking: 9,
      notes: 'AMBITIOUS REACH - World-class reputation in CS & AI, London tech ecosystem. Strong personal statement needed.',
      ucasCode: 'U80'
    },
    {
      name: 'University of Bristol',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA (IB 36-38 points)',
      ieltsRequired: 6.5,
      tuitionFee: 27200,
      location: 'Bristol',
      website: 'https://www.bristol.ac.uk',
      ranking: 61,
      notes: 'STRONG MATCH - Excellent CS and Engineering, strong industry links. Good chance with 6s in HL subjects.',
      ucasCode: 'B78'
    },
    {
      name: 'University of Southampton',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB (IB 34-36 points)',
      ieltsRequired: 6.5,
      tuitionFee: 27000,
      location: 'Southampton',
      website: 'https://www.southampton.ac.uk',
      ranking: 78,
      notes: 'SAFE MATCH - Strong in CS, Web Science, and AI. Good safety option with excellent employability.',
      ucasCode: 'S27'
    },
    {
      name: 'University of Manchester',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB (IB 34-36 points)',
      ieltsRequired: 6.5,
      tuitionFee: 27500,
      location: 'Manchester',
      website: 'https://www.manchester.ac.uk',
      ranking: 32,
      notes: 'SAFE MATCH - Historic CS dept (first stored-program computer!), large diverse university, strong industry ties.',
      ucasCode: 'M20'
    },
    {
      name: 'University of Cardiff',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAB (IB 32-34 points)',
      ieltsRequired: 6.5,
      tuitionFee: 25450,
      location: 'Cardiff',
      website: 'https://www.cardiff.ac.uk',
      ranking: 154,
      notes: 'STRONG SAFETY - Solid CS/AI programs, more forgiving entry requirements. Still Russell Group.',
      ucasCode: 'C15'
    }
  ]

  // Additional Top UK Universities from comprehensive list
  const additionalUKUniversities = [
    {
      name: 'University of Cambridge',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*A*A including Mathematics and Further Mathematics',
      ieltsRequired: 7.5,
      tuitionFee: 33825,
      location: 'Cambridge',
      website: 'https://www.cam.ac.uk',
      ranking: 2,
      notes: 'DEADLINE PASSED (Oct 15, 2024) - World-leading in AI and quantum computing. Requires exceptional academics.',
      ucasCode: 'C05'
    },
    {
      name: 'Imperial College London',
      country: 'UK',
      courseName: 'Computing',
      entryRequirements: 'A*A*A-A*AA including Mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 33000,
      location: 'London',
      website: 'https://www.imperial.ac.uk',
      ranking: 7,
      notes: 'Elite university - Excellent industry connections, strong in Data Science and AI.',
      ucasCode: 'I50'
    },
    {
      name: 'University of Edinburgh',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA-AAB including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 28950,
      location: 'Edinburgh',
      website: 'https://www.ed.ac.uk',
      ranking: 22,
      notes: 'Pioneer in AI research, excellent reputation in informatics.',
      ucasCode: 'E56'
    },
    {
      name: 'University of Warwick',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*A*A-A*AA including Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 27060,
      location: 'Coventry',
      website: 'https://warwick.ac.uk',
      ranking: 67,
      notes: 'Excellent graduate employment rates, strong in Data Science.',
      ucasCode: 'W20'
    },
    {
      name: 'King\'s College London',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA-AAA',
      ieltsRequired: 7.0,
      tuitionFee: 31260,
      location: 'London',
      website: 'https://www.kcl.ac.uk',
      ranking: 40,
      notes: 'Strong industry partnerships, excellent London location.',
      ucasCode: 'K60'
    },
    {
      name: 'University of Glasgow',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 25290,
      location: 'Glasgow',
      website: 'https://www.gla.ac.uk',
      ranking: 87,
      notes: 'Strong research culture, good value for money.',
      ucasCode: 'G28'
    },
    {
      name: 'Durham University',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'A*AA-AAA',
      ieltsRequired: 6.5,
      tuitionFee: 28500,
      location: 'Durham',
      website: 'https://www.dur.ac.uk',
      ranking: 78,
      notes: 'Collegiate system, strong academic reputation.',
      ucasCode: 'D86'
    },
    {
      name: 'University of Birmingham',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 25860,
      location: 'Birmingham',
      website: 'https://www.birmingham.ac.uk',
      ranking: 91,
      notes: 'Good research facilities, diverse CS programs including AI.',
      ucasCode: 'B32'
    },
    {
      name: 'University of Nottingham',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 26500,
      location: 'Nottingham',
      website: 'https://www.nottingham.ac.uk',
      ranking: 103,
      notes: 'Strong international reputation, modern facilities.',
      ucasCode: 'N84'
    },
    {
      name: 'University of York',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 24000,
      location: 'York',
      website: 'https://www.york.ac.uk',
      ranking: 147,
      notes: 'Strong teaching quality, growing research reputation.',
      ucasCode: 'Y50'
    },
    {
      name: 'Lancaster University',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 24070,
      location: 'Lancaster',
      website: 'https://www.lancaster.ac.uk',
      ranking: 146,
      notes: 'Good student experience, modern campus, strong in Data Science.',
      ucasCode: 'L14'
    },
    {
      name: 'University of Sheffield',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 25670,
      location: 'Sheffield',
      website: 'https://www.sheffield.ac.uk',
      ranking: 104,
      notes: 'Strong engineering programs, good industry connections.',
      ucasCode: 'S18'
    },
    {
      name: 'University of Leeds',
      country: 'UK',
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB',
      ieltsRequired: 6.5,
      tuitionFee: 25250,
      location: 'Leeds',
      website: 'https://www.leeds.ac.uk',
      ranking: 86,
      notes: 'Growing CS department, good graduate prospects.',
      ucasCode: 'L23'
    }
  ]

  // European Universities (Tier 1 - Perfect Fits)
  const europeUniversities = [
    // Italy
    {
      name: 'Politecnico di Milano',
      country: 'Italy',
      courseName: 'Computer Science and Engineering',
      entryRequirements: 'ABB-BBC equivalent, Mathematics and Physics required',
      ieltsRequired: 6.0,
      tuitionFee: 3900,
      location: 'Milan',
      website: 'https://www.polimi.it',
      ranking: 139,
      notes: 'Top 150 for Engineering worldwide. English programs available. ~45% acceptance rate for internationals.'
    },
    {
      name: 'Politecnico di Torino',
      country: 'Italy',
      courseName: 'Computer Engineering',
      entryRequirements: 'ABB-BBC equivalent, strong technical background',
      ieltsRequired: 6.0,
      tuitionFee: 3500,
      location: 'Turin',
      website: 'https://www.polito.it',
      ranking: 325,
      notes: 'Specialty in Engineering and Technology. ~55% acceptance rate for internationals.'
    },
    {
      name: 'University of Bologna',
      country: 'Italy',
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent, good academic record',
      ieltsRequired: 6.0,
      tuitionFee: 3500,
      location: 'Bologna',
      website: 'https://www.unibo.it',
      ranking: 167,
      notes: 'Oldest university in Europe. English programs available. ~60% acceptance rate.'
    },
    // France (to be added based on france.md)
    {
      name: 'Université Paris-Saclay',
      country: 'France',
      courseName: 'Computer Science',
      entryRequirements: 'Baccalauréat or equivalent, strong mathematics',
      ieltsRequired: 6.0,
      tuitionFee: 2770,
      location: 'Paris',
      website: 'https://www.universite-paris-saclay.fr',
      ranking: 69,
      notes: 'Top French university for STEM. English programs available in some courses.'
    },
    // Netherlands
    {
      name: 'TU Delft',
      country: 'Netherlands',
      courseName: 'Computer Science',
      entryRequirements: 'A-levels with Mathematics, entrance exam required',
      ieltsRequired: 6.5,
      tuitionFee: 2530,
      location: 'Delft',
      website: 'https://www.tudelft.nl',
      ranking: 47,
      notes: 'Top technical university. Competitive but excellent programs.'
    },
    {
      name: 'University of Amsterdam',
      country: 'Netherlands',
      courseName: 'Computer Science',
      entryRequirements: 'A-levels with Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 2530,
      location: 'Amsterdam',
      website: 'https://www.uva.nl',
      ranking: 53,
      notes: 'Strong in AI and Data Science. Beautiful city location.'
    },
    // Germany
    {
      name: 'Technical University of Munich',
      country: 'Germany',
      courseName: 'Informatics',
      entryRequirements: 'A-levels with strong Mathematics, TestAS may be required',
      ieltsRequired: 6.5,
      tuitionFee: 0,
      location: 'Munich',
      website: 'https://www.tum.de',
      ranking: 37,
      notes: 'No tuition fees! Top German technical university. Some programs in English.'
    },
    {
      name: 'RWTH Aachen University',
      country: 'Germany',
      courseName: 'Computer Science',
      entryRequirements: 'A-levels with Mathematics and Physics',
      ieltsRequired: 6.0,
      tuitionFee: 0,
      location: 'Aachen',
      website: 'https://www.rwth-aachen.de',
      ranking: 90,
      notes: 'No tuition fees! Excellent engineering programs. Near Dutch and Belgian borders.'
    }
  ]

  // Insert all universities
  for (const uni of ucas5Universities) {
    await prisma.university.create({ data: uni })
  }
  console.log(`Added ${ucas5Universities.length} UCAS 5 recommended universities`)

  for (const uni of additionalUKUniversities) {
    await prisma.university.create({ data: uni })
  }
  console.log(`Added ${additionalUKUniversities.length} additional UK universities`)

  for (const uni of europeUniversities) {
    await prisma.university.create({ data: uni })
  }
  console.log(`Added ${europeUniversities.length} European universities`)

  console.log('\n✅ Database seeded with actual universities from memory documents!')
  console.log('Total universities added:', ucas5Universities.length + additionalUKUniversities.length + europeUniversities.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })