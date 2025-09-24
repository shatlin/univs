import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedProfile() {
  console.log('Seeding student profile...')
  
  // Delete existing profiles
  await prisma.studentProfile.deleteMany()
  
  // Create Damien's profile based on the reports
  const profile = await prisma.studentProfile.create({
    data: {
      name: 'Damien Noah Shatlin',
      dateOfBirth: new Date('2007-12-31'),
      currentGrade: 'DP2 (Grade 12 IB)',
      school: 'Redhill Senior School',
      
      // IB Subjects and Current Grades (Term 1 2025)
      englishGrade: 5,
      englishLevel: 'SL',
      frenchGrade: 4,
      frenchLevel: 'SL (Ab Initio)',
      mathGrade: 5,  // Was 6 in Grade 11, now 5 in Grade 12 Term 1
      mathLevel: 'HL (Analysis & Approaches)',
      businessGrade: 6,  // Was 5 in Grade 11, now 6 in Grade 12
      businessLevel: 'SL',
      physicsGrade: 4,  // Was 5 in Grade 11, now 4 in Grade 12
      physicsLevel: 'HL',
      computerScienceGrade: 6,  // Was 5 in Grade 11, now 6 in Grade 12
      computerScienceLevel: 'HL',
      
      // IB Core Components
      casStatus: 'Below expectations (needs to increase experiences)',
      extendedEssayStatus: 'Meeting expectations (first draft submitted)',
      tokStatus: 'Meeting expectations',
      
      // Predicted Total Score (sum of subjects + potential 3 from core)
      predictedTotal: 36, // 5+4+5+6+4+6 = 30 + potential 6 from core = 36/45
      
      // Academic Interests (from memory/main.md)
      primaryInterests: JSON.stringify([
        'Computer Science',
        'Data Science',
        'Data Analytics',
        'Machine Learning',
        'Artificial Intelligence'
      ]),
      additionalInterests: JSON.stringify([
        'Quantum Computing',
        'Aerospace Engineering'
      ]),
      
      // University Preferences
      preferredCountries: JSON.stringify([
        'United Kingdom',
        'European Union'
      ]),
      careerGoals: 'Technology sector focusing on AI/ML, Data Science, or Software Engineering',
      
      // Additional Notes from reports
      strengths: 'Strong critical thinking skills, keen intellect, good grasp of Computer Science and Business concepts, clear analytical ability in English, competence in data analysis',
      
      areasForImprovement: 'Physics conceptual understanding needs work, French listening and speaking skills need improvement, needs to improve exam techniques and focus on command terms, CAS experiences need attention, needs to maintain focus and engagement in Mathematics',
      
      teacherComments: JSON.stringify({
        english: 'Commendable student and a pleasure to teach. Has produced good work and demonstrated clear analytical ability.',
        french: 'Has shown improvement in reading and understanding written tasks. Efforts in oral assessments are commendable.',
        business: 'Worked well showing a secure grasp of topics covered leading to consistent results.',
        computerScience: 'Possesses a keen intellect, though assessment results have yet to fully reflect potential. Demonstrates strong critical thinking skills.',
        physics: 'Demonstrates competence in multiple choice and data analysis sections. Overall performance is concerning and requires immediate attention.',
        math: 'Has the capability to achieve strong results. Progress depends greatly on ability to remain focused and engaged.'
      })
    }
  })
  
  console.log('✓ Created student profile for:', profile.name)
  console.log('  Current Grade:', profile.currentGrade)
  console.log('  Predicted IB Score:', profile.predictedTotal, '/ 45')
  console.log('  Strongest Subjects: Computer Science (6), Business (6)')
  console.log('  Areas needing work: Physics (4), French (4)')
}

seedProfile()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })