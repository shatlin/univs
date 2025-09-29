import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateTrinityInfo() {
  console.log('📚 Updating Trinity College Dublin Information...\n')

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

    // Update main university information
    const updatedUniversity = await prisma.university.update({
      where: { id: trinity.id },
      data: {
        website: 'https://www.tcd.ie',
        location: 'College Green, Dublin 2, Ireland',
        ranking: 75, // QS World Rankings 2026
        rankingScore: 95, // High score for Damien's consideration
        recommendationTier: 'A', // Strong recommendation
        tier: 'Tier 1',
        category: 'Reach',
        userNotes: `## Overview
Trinity College Dublin is Ireland's leading university, ranked #1 in Ireland and #75 globally (QS 2026). Founded over 400 years ago, Trinity has been inspiring generations of brilliant thinkers and is the only Irish member of the prestigious League of 23 European Research Universities (LERU).

## Key Strengths
- **World Rankings**: #75 globally, #1 in Ireland, Top 100 in 22 subjects
- **Graduate Employability**: #91 globally for Graduate Employability
- **International**: #35 most international university in the world
- **Location**: Central Dublin campus, Ireland (2nd safest country globally)
- **Research**: Strong research reputation, member of LERU
- **Alumni**: Notable alumni include Oscar Wilde, Samuel Beckett, Edmund Burke

## Campus Life
- 170+ clubs and societies including international groups
- 47-acre historic campus in Dublin city center
- 22,000+ students with 35% international
- Strong entrepreneurial culture and innovation support

## Student Support
- Dedicated Global Room for international students
- Trinity Hall accommodation for first-year students
- Comprehensive orientation programs
- Strong career services and industry connections`,

        // Entry Requirements for Non-EU students
        entryRequirements: `## General Requirements (Non-EU)
- High school qualification equivalent to Irish Leaving Certificate
- English proficiency: Band B (Standard Entry) - IELTS 6.5+ or equivalent
- Strong academic record

## IB Requirements
- Minimum IB score: 36-40 points (varies by course)
- Higher Level Mathematics: Grade 5+ for STEM courses
- English at Standard or Higher Level

## Computer Science Specific
- Mathematics: HL Grade 5 minimum
- Strong background in sciences preferred
- No prior programming experience required`,

        ieltsRequired: 6.5,
        ibRequirement: '36-40 points depending on course',
        mathsRequirement: 'HL Grade 5 for Computer Science and Engineering courses',

        // Application Information
        applicationDeadline: new Date('2025-06-30'),

        // Living and Costs
        tuitionFee: 28000, // Annual tuition for non-EU students
        livingCosts: 12000, // Estimated annual living costs
        accommodation: `## On-Campus Options
- Trinity Hall: First-year undergraduate accommodation (800 rooms)
- Campus accommodation: Postgraduate rooms in city center
- Partner accommodations: Kavanagh Court, Here! Cork Street

## Application Timeline
- Opens: March (for Trinity Hall)
- Closes: Early May
- Alternative options available year-round

## Private Accommodation
- Average rent: €600-1000/month for shared accommodation
- Digs/homestay options available
- Purpose-built student accommodation throughout Dublin`,

        campusInfo: `## Location
- 47-acre campus in Dublin city center
- Historic buildings dating from 1592
- Modern facilities including Sports Centre, Science Gallery
- Own Luas (tram) station on campus
- Walking distance to major Dublin attractions

## Facilities
- World-renowned Old Library and Book of Kells
- 24/7 library access during term
- State-of-the-art research facilities
- Student theater, sports facilities, health center
- Multiple dining options on campus`,

        // Career Information
        employmentRate: 94, // Graduate employment rate
        averageSalary: 45000, // Average starting salary in EUR
        majorRecruiters: 'Google, Microsoft, Facebook, Amazon, Intel, Accenture, Deloitte, PwC, EY, KPMG, Central Bank of Ireland, Allied Irish Banks',
        industryLinks: 'Strong connections with tech companies in Dublin (European tech hub), financial services, pharmaceuticals, and consulting firms. Regular campus recruitment fairs.',
        researchAreas: 'AI and Machine Learning, Data Science, Cybersecurity, Biomedical Engineering, Nanoscience, Immunology, Neuroscience, Climate Science, Digital Humanities'
      }
    })
    console.log('✅ Updated university information')

    // Add key dates
    const keyDates = [
      {
        title: 'Application Opens',
        date: new Date('2024-11-01'),
        type: 'Application',
        description: 'Non-EU undergraduate applications open',
        critical: false
      },
      {
        title: 'Priority Application Deadline',
        date: new Date('2025-02-01'),
        type: 'Application',
        description: 'Priority deadline for strongest consideration, decision by April 1st',
        critical: true
      },
      {
        title: 'Medicine/Dentistry Deadline',
        date: new Date('2025-02-01'),
        type: 'Application',
        description: 'Final deadline for Medicine, Dental Science, Music, and Drama',
        critical: true
      },
      {
        title: 'Priority Decision Date',
        date: new Date('2025-04-01'),
        type: 'Decision',
        description: 'Decisions released for priority applications',
        critical: false
      },
      {
        title: 'Acceptance Deadline',
        date: new Date('2025-05-01'),
        type: 'Decision',
        description: 'Recommended acceptance deadline for priority applicants',
        critical: true
      },
      {
        title: 'Final Application Deadline',
        date: new Date('2025-06-30'),
        type: 'Application',
        description: 'Final deadline for all Non-EU undergraduate applications',
        critical: true
      },
      {
        title: 'Orientation Week',
        date: new Date('2025-09-15'),
        type: 'Other',
        description: 'New student orientation begins',
        critical: false
      },
      {
        title: 'Academic Year Begins',
        date: new Date('2025-09-22'),
        type: 'Other',
        description: 'First semester classes begin',
        critical: false
      }
    ]

    // Clear existing key dates and add new ones
    await prisma.keyDate.deleteMany({
      where: { universityId: trinity.id }
    })

    for (const date of keyDates) {
      await prisma.keyDate.create({
        data: {
          ...date,
          universityId: trinity.id
        }
      })
    }
    console.log(`✅ Added ${keyDates.length} key dates`)

    // Add popular courses
    const courses = [
      {
        name: 'Computer Science',
        code: 'TR033',
        degree: 'B.A. (Moderatorship) / Optional M.C.S.',
        duration: '4 years (5 with Masters)',
        description: 'Comprehensive computer science program with option to continue to integrated Masters',
        modules: 'Programming, Algorithms, Data Structures, Software Engineering, AI, Machine Learning, Computer Graphics, Networks, Databases, Web Development',
        careerPaths: 'Software Developer, Data Scientist, AI/ML Engineer, Systems Architect, Cybersecurity Specialist, Tech Entrepreneur',
        prerequisites: 'Mathematics HL Grade 5, English proficiency'
      },
      {
        name: 'Engineering',
        code: 'TR025',
        degree: 'B.A.I.',
        duration: '4 years',
        description: 'Common entry engineering with specializations in later years',
        modules: 'Mathematics, Physics, Computer Programming, Engineering Design, with specializations in Civil, Mechanical, Electronic, Computer, or Biomedical Engineering',
        careerPaths: 'Various engineering roles depending on specialization',
        prerequisites: 'Mathematics HL Grade 5, Physics recommended'
      },
      {
        name: 'Engineering with Management',
        code: 'TR026',
        degree: 'B.A.I.',
        duration: '5 years',
        description: 'Engineering degree combined with business and management studies',
        modules: 'Engineering fundamentals plus Business Strategy, Financial Management, Operations Management, Entrepreneurship',
        careerPaths: 'Engineering Manager, Technical Consultant, Project Manager, Technology Entrepreneur',
        prerequisites: 'Mathematics HL Grade 5'
      },
      {
        name: 'Business, Economics and Social Studies (BESS)',
        code: 'TR080',
        degree: 'B.A.',
        duration: '4 years',
        description: 'Flexible program combining business, economics, political science, and sociology',
        modules: 'Microeconomics, Macroeconomics, Business Management, Statistics, Political Science, Sociology',
        careerPaths: 'Business Analyst, Economic Consultant, Policy Advisor, Management Consultant, Financial Analyst',
        prerequisites: 'Strong analytical and mathematical skills'
      },
      {
        name: 'Management Science and Information Systems Studies',
        code: 'TR032',
        degree: 'B.Sc.',
        duration: '4 years',
        description: 'Combines business management with information systems and technology',
        modules: 'Information Systems, Database Management, Business Analytics, Operations Research, Project Management',
        careerPaths: 'IT Consultant, Business Analyst, Systems Analyst, Project Manager, Data Analyst',
        prerequisites: 'Interest in business and technology'
      },
      {
        name: 'Mathematics',
        code: 'TR031',
        degree: 'B.A.',
        duration: '4 years',
        description: 'Pure and applied mathematics program',
        modules: 'Calculus, Linear Algebra, Abstract Algebra, Analysis, Probability, Statistics, Numerical Methods',
        careerPaths: 'Data Scientist, Quantitative Analyst, Actuary, Research Scientist, Software Developer',
        prerequisites: 'Mathematics HL Grade 6+'
      },
      {
        name: 'Theoretical Physics',
        code: 'TR035',
        degree: 'B.A.',
        duration: '4 years',
        description: 'Fundamental physics with strong mathematical foundation',
        modules: 'Quantum Mechanics, Relativity, Thermodynamics, Electromagnetism, Mathematical Methods',
        careerPaths: 'Research Scientist, Data Scientist, Quantitative Analyst, Technology R&D',
        prerequisites: 'Mathematics HL Grade 6, Physics HL recommended'
      }
    ]

    // Clear existing courses and add new ones
    await prisma.course.deleteMany({
      where: { universityId: trinity.id }
    })

    for (const course of courses) {
      await prisma.course.create({
        data: {
          ...course,
          universityId: trinity.id
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
        minScore: '6.5 overall (no band below 6.0)',
        typicalScore: '7.0+',
        notes: 'Required for non-native English speakers. Band B requirement.'
      },
      {
        testName: 'TOEFL iBT',
        required: true,
        recommended: false,
        minScore: '90 overall (writing 21+)',
        typicalScore: '100+',
        notes: 'Alternative to IELTS for English proficiency'
      },
      {
        testName: 'Cambridge English',
        required: true,
        recommended: false,
        minScore: 'C1 Advanced (176+)',
        typicalScore: '180+',
        notes: 'Alternative English proficiency test'
      }
    ]

    // Clear existing test requirements and add new ones
    await prisma.testRequirement.deleteMany({
      where: { universityId: trinity.id }
    })

    for (const test of testRequirements) {
      await prisma.testRequirement.create({
        data: {
          ...test,
          universityId: trinity.id
        }
      })
    }
    console.log(`✅ Added ${testRequirements.length} test requirements`)

    // Add a university note
    await prisma.universityNote.create({
      data: {
        universityId: trinity.id,
        content: `## Application Strategy Notes

**Priority Deadline (Feb 1)**: This is crucial - apply by this date for best chances and April 1 decision.

**Course Selection**: Can apply to multiple courses, each requires €55 fee. Computer Science (TR033) is highly competitive but excellent program.

**Accommodation**: Apply for Trinity Hall as soon as applications open in March - fills quickly.

**Registration Status**: Currently have registration form filled but NOT submitted on Trinity website. Need to complete slider verification and submit.

**Next Steps**:
1. Finalize course selection
2. Submit registration of interest
3. Prepare formal application for November opening
4. Book accommodation early (March 2025)
5. Ensure English test scores are ready`
      }
    })
    console.log('✅ Added application strategy note')

    console.log('\n🎉 Trinity College Dublin information successfully updated!')

  } catch (error) {
    console.error('Error updating Trinity information:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateTrinityInfo()