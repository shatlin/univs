import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateAaltoInfo() {
  console.log('🏫 Updating Aalto University Information...\n')

  try {
    // Find Aalto University
    const aalto = await prisma.university.findFirst({
      where: {
        OR: [
          { name: { contains: 'Aalto' } },
          { id: 'cmfy6bq770041htdrv15zza0k' }
        ]
      }
    })

    if (!aalto) {
      console.log('❌ Aalto University not found in database')
      return
    }

    console.log(`✅ Found Aalto University: ${aalto.id}`)

    // Update main university information
    const updatedUniversity = await prisma.university.update({
      where: { id: aalto.id },
      data: {
        website: 'https://www.aalto.fi',
        location: 'Otaniemi Campus, Espoo, Finland',
        ranking: 114, // QS World Rankings 2026
        rankingScore: 92, // High score for excellent STEM programs
        recommendationTier: 'A', // Strong recommendation
        tier: 'Tier 1',
        category: 'Target',
        userNotes: `## Overview
Aalto University is Finland's leading innovation university, consistently ranked #1 in Finland and #114 globally (QS 2026). Formed in 2010 through the merger of three prestigious institutions, Aalto has quickly established itself as a world-class research university with exceptional strengths in technology, business, and design.

## Key Strengths
- **World Rankings**: #114 globally, #1 in Finland, #6 globally in Art & Design
- **International Environment**: Most international university in Europe (25% international students)
- **Industry Excellence**: Half of Finnish university-based startups originate from Aalto
- **Location**: Otaniemi campus with own metro station, 15 minutes to Helsinki center
- **Innovation Focus**: Strong entrepreneurial ecosystem and startup culture
- **Language**: 100+ programs taught in English

## Campus Life
- Modern Otaniemi campus with 24/7 access to facilities
- 3,250+ international students from 100+ countries
- Active Student Union (AYY) with 100+ clubs and societies
- Excellent sports facilities and cultural activities
- Safe, high-quality living environment

## Student Support
- Comprehensive orientation programs for international students
- Academic advising and career services
- Mental health and wellness support
- Multicultural community with extensive support networks`,

        // Entry Requirements for Non-EU students
        entryRequirements: `## General Requirements (Non-EU)
- IB Diploma with minimum recommended score of 30 points
- Strong academic record in mathematics and sciences
- English proficiency requirement (see test requirements)

## IB Requirements
- Minimum IB score: 30 points (recommended)
- Your IB 36 score is highly competitive and well above threshold
- Admission through Group III (IB diploma grades)
- Final results deadline: July 9, 2026

## Programme Specific (Science & Technology)
- Strong background in mathematics and sciences
- Computer Engineering, Data Science, Digital Systems available
- 3+2 year structure (Bachelor's + Master's)
- All programs taught in English

## Application Process
- Conditional admission possible with predicted grades
- Final IB results required by July deadline
- Academic transcripts and certificates required`,

        ieltsRequired: 6.5,
        ibRequirement: '30 points minimum (IB 36 highly competitive)',
        mathsRequirement: 'Strong mathematics background required for Science & Technology programmes',

        // Application Information
        applicationDeadline: new Date('2026-01-22'),

        // Living and Costs
        tuitionFee: 12000, // Annual tuition for non-EU students
        livingCosts: 10350, // Average annual living costs (€862.5/month)

        accommodation: `## Student Housing Options
- HOAS student housing: €400/month (furnished, utilities included)
- AYY student apartments: From €300/month
- Private accommodation: €400-500/month
- Otaniemi campus housing popular and convenient

## Application Process
- Apply through HOAS (Helsinki Region Student Housing)
- Early application recommended for best options
- Most international students secure housing through HOAS

## Living in Helsinki/Espoo
- Safe and high-quality environment
- Excellent public transportation (HSL travel card)
- English widely spoken
- Rich cultural scene and nature access
- Winter considerations (heating costs included in housing)`,

        campusInfo: `## Otaniemi Campus
- Modern, integrated campus in Espoo
- Own metro station (Aalto-yliopisto) with direct connection to Helsinki
- 24/7 access to labs, workshops, and study spaces
- Sustainable and environmentally conscious design

## Facilities
- State-of-the-art engineering and computer labs
- Design Factory for innovation and entrepreneurship
- Learning Centre with extensive library resources
- Multiple restaurants, cafés, and social spaces
- Unisport gym and Otaniemi Sports Park

## Transportation
- Metro to Helsinki center: 15 minutes
- Campus bikes and walking paths
- HSL public transport integration
- International accessibility and student-friendly design`,

        // Career Information
        employmentRate: 94, // Graduate employment satisfaction
        averageSalary: 50750, // Average starting salary in EUR (€3,900-4,540/month average)
        majorRecruiters: 'Nokia, Microsoft, Google, Supercell, Rovio, Wärtsilä, KONE, Fortum, Neste, ABB, Accenture, IBM, numerous Finnish startups',
        industryLinks: 'Exceptional industry connections in Helsinki tech hub. Strong startup ecosystem with half of Finnish university startups originating from Aalto. Active recruitment by multinational companies and Finnish innovation leaders.',
        researchAreas: 'Artificial Intelligence, Machine Learning, Data Science, Quantum Technology, Digital Systems, Computational Engineering, Sustainable Technology, Design Thinking, Innovation Management'
      }
    })
    console.log('✅ Updated university information')

    // Add key dates for 2026 entry
    const keyDates = [
      {
        title: 'Application Period Opens',
        date: new Date('2026-01-07'),
        type: 'Application',
        description: 'Application portal opens for international students',
        critical: false
      },
      {
        title: 'Application Deadline',
        date: new Date('2026-01-22'),
        type: 'Application',
        description: 'Final deadline for all bachelor programme applications',
        critical: true
      },
      {
        title: 'Admission Results',
        date: new Date('2026-03-31'),
        type: 'Decision',
        description: 'Admission results announced (tentative)',
        critical: false
      },
      {
        title: 'Study Place Confirmation',
        date: new Date('2026-07-08'),
        type: 'Decision',
        description: 'Deadline to confirm study place',
        critical: true
      },
      {
        title: 'IB Results Deadline',
        date: new Date('2026-07-09'),
        type: 'Application',
        description: 'Final IB diploma results must be submitted by 3:00 PM (UTC+3)',
        critical: true
      },
      {
        title: 'Orientation Week',
        date: new Date('2026-08-18'),
        type: 'Other',
        description: 'International student orientation begins',
        critical: false
      },
      {
        title: 'Academic Year Begins',
        date: new Date('2026-09-01'),
        type: 'Other',
        description: 'First semester classes begin',
        critical: false
      }
    ]

    // Clear existing key dates and add new ones
    await prisma.keyDate.deleteMany({
      where: { universityId: aalto.id }
    })

    for (const date of keyDates) {
      await prisma.keyDate.create({
        data: {
          ...date,
          universityId: aalto.id
        }
      })
    }
    console.log(`✅ Added ${keyDates.length} key dates`)

    // Add popular courses
    const courses = [
      {
        name: 'Computer Engineering',
        code: 'SCI-CE',
        degree: 'Bachelor of Science (Technology)',
        duration: '3 years',
        description: 'Comprehensive computer engineering program combining hardware and software',
        modules: 'Programming, Computer Architecture, Embedded Systems, Machine Learning, Software Engineering, Digital Systems, Data Structures and Algorithms',
        careerPaths: 'Software Engineer, Systems Engineer, Embedded Systems Developer, ML Engineer, Technology Consultant',
        prerequisites: 'Strong mathematics background, IB 30+ points'
      },
      {
        name: 'Data Science',
        code: 'SCI-DS',
        degree: 'Bachelor of Science (Technology)',
        duration: '3 years',
        description: 'Interdisciplinary program combining statistics, computer science, and domain expertise',
        modules: 'Statistics, Machine Learning, Data Mining, Big Data Technologies, Data Visualization, Programming, Database Systems',
        careerPaths: 'Data Scientist, Data Analyst, ML Engineer, Business Intelligence Analyst, Research Scientist',
        prerequisites: 'Strong mathematics and statistics background'
      },
      {
        name: 'Digital Systems and Design',
        code: 'SCI-DSD',
        degree: 'Bachelor of Science (Technology)',
        duration: '3 years',
        description: 'Focus on digital systems, electronics, and user-centered design',
        modules: 'Digital Electronics, System Design, Human-Computer Interaction, Signal Processing, Embedded Systems, Design Thinking',
        careerPaths: 'Systems Designer, UX Engineer, Electronics Engineer, Product Developer, Design Engineer',
        prerequisites: 'Interest in technology and design, mathematics background'
      },
      {
        name: 'Computational Engineering',
        code: 'SCI-COMP',
        degree: 'Bachelor of Science (Technology)',
        duration: '3 years',
        description: 'Mathematical modeling and computational methods for engineering problems',
        modules: 'Numerical Methods, Scientific Computing, Mathematical Modeling, Programming, Engineering Mathematics, Simulation',
        careerPaths: 'Computational Engineer, Simulation Specialist, Research Engineer, Technical Consultant',
        prerequisites: 'Excellent mathematics background, physics knowledge helpful'
      },
      {
        name: 'Quantum Technology',
        code: 'SCI-QT',
        degree: 'Bachelor of Science (Technology)',
        duration: '3 years',
        description: 'Cutting-edge program in quantum computing and quantum technologies',
        modules: 'Quantum Mechanics, Quantum Computing, Linear Algebra, Programming, Physics, Advanced Mathematics',
        careerPaths: 'Quantum Research Scientist, Quantum Software Developer, Research Engineer, Technology Consultant',
        prerequisites: 'Excellent mathematics and physics background'
      }
    ]

    // Clear existing courses and add new ones
    await prisma.course.deleteMany({
      where: { universityId: aalto.id }
    })

    for (const course of courses) {
      await prisma.course.create({
        data: {
          ...course,
          universityId: aalto.id
        }
      })
    }
    console.log(`✅ Added ${courses.length} courses`)

    // Add test requirements
    const testRequirements = [
      {
        testName: 'IELTS Academic',
        required: true,
        recommended: false,
        minScore: '6.5 overall, Writing 6.0',
        typicalScore: '7.0+',
        notes: 'Required for non-native English speakers. Test must be taken after December 1, 2023.'
      },
      {
        testName: 'TOEFL iBT',
        required: true,
        recommended: false,
        minScore: '92 overall, Writing 22',
        typicalScore: '100+',
        notes: 'Alternative to IELTS. Must be taken after December 1, 2023.'
      },
      {
        testName: 'IB Diploma',
        required: true,
        recommended: false,
        minScore: '30 points minimum',
        typicalScore: '36+ points (highly competitive)',
        notes: 'Final results deadline: July 9, 2026. Conditional admission possible with predicted grades.'
      }
    ]

    // Clear existing test requirements and add new ones
    await prisma.testRequirement.deleteMany({
      where: { universityId: aalto.id }
    })

    for (const test of testRequirements) {
      await prisma.testRequirement.create({
        data: {
          ...test,
          universityId: aalto.id
        }
      })
    }
    console.log(`✅ Added ${testRequirements.length} test requirements`)

    // Add a university note
    await prisma.universityNote.deleteMany({
      where: { universityId: aalto.id }
    })

    await prisma.universityNote.create({
      data: {
        universityId: aalto.id,
        content: `## Application Strategy Notes for 2026 Entry

**Excellent Fit for Damien's Profile**:
- IB 36 score is highly competitive (well above 30 minimum)
- Strong STEM programs aligned with interests
- Most international university in Europe (25% international students)
- English-taught programs with excellent career prospects

**Key Deadlines**:
- Application window: January 7-22, 2026 (very short window!)
- IB results deadline: July 9, 2026
- Studies begin: September 2026

**Financial Considerations**:
- €12,000/year tuition (much lower than UK universities)
- €10,350/year living costs
- Total 3-year degree: €67,050
- **APPLY FOR AALTO EXCELLENCE SCHOLARSHIP**: Full tuition waiver available

**Strategic Advantages**:
- Cost-effective compared to UK/US options
- Exceptional post-graduation work opportunities in Finland
- Strong tech industry connections in Nordic region
- Gateway to European tech markets

**Next Steps**:
1. Prepare application materials by December 2025
2. Take IELTS if needed (6.5 requirement)
3. Apply for scholarship during admission process
4. Secure housing through HOAS early
5. Plan for living expense funding (€30,000+ for 3 years)`
      }
    })
    console.log('✅ Added application strategy note')

    console.log('\n🎉 Aalto University information successfully updated!')
    console.log('\n📊 Summary:')
    console.log('   - Ranking: #114 globally, #1 in Finland')
    console.log('   - Tuition: €12,000/year (with scholarship opportunity)')
    console.log('   - Total 3-year cost: €67,050')
    console.log('   - Application deadline: January 22, 2026')
    console.log('   - IB 36 score: Highly competitive')

  } catch (error) {
    console.error('Error updating Aalto information:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAaltoInfo()