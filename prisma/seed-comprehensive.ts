import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting comprehensive seed...')

  // Clear existing data
  await prisma.keyDate.deleteMany()
  await prisma.testRequirement.deleteMany()
  await prisma.course.deleteMany()
  await prisma.document.deleteMany()
  await prisma.todo.deleteMany()
  await prisma.deadline.deleteMany()
  await prisma.application.deleteMany()
  await prisma.university.deleteMany()

  // UCAS 5 Universities with comprehensive data
  const ucl = await prisma.university.create({
    data: {
      name: 'University College London',
      country: 'UK',
      location: 'London',
      ranking: 9,
      ucasCode: 'U80',
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*A*A-A*AA at A Level, or 40-42 points in IB with 20 points at Higher Level',
      ibRequirement: '40-42 points (20 at HL)',
      aLevelRequirement: 'A*A*A-A*AA',
      mathsRequirement: 'A* in Mathematics or 7 in HL Mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 38000,
      livingCosts: 18000,
      website: 'https://www.ucl.ac.uk',
      notes: 'Top choice - Ambitious reach. World-class reputation in CS & AI.',
      tier: 'Elite',
      category: 'Reach',
      admissionTest: 'None required',
      applicationDeadline: new Date('2025-01-29'),
      decisionDate: new Date('2025-05-15'),
      employmentRate: 94,
      averageSalary: 55000,
      majorRecruiters: 'Google, Microsoft, Meta, Amazon, DeepMind, Bloomberg',
      industryLinks: 'Strong connections with London tech ecosystem, AI research centers',
      researchAreas: 'Artificial Intelligence, Machine Learning, Computer Vision, Cybersecurity',
      accommodation: 'Guaranteed for first-year students, £200-350 per week',
      campusInfo: 'Central London campus in Bloomsbury, excellent transport links',
      courses: {
        create: [
          {
            name: 'Computer Science BSc',
            code: 'G400',
            duration: '3 years',
            degree: 'BSc',
            description: 'Comprehensive computer science program with focus on theoretical foundations and practical applications',
            modules: 'Algorithms, AI, Machine Learning, Software Engineering, Databases, Computer Systems',
            careerPaths: 'Software Engineer, Data Scientist, AI Researcher, Systems Architect',
            prerequisites: 'Strong mathematics background required'
          },
          {
            name: 'Computer Science MEng',
            code: 'G401',
            duration: '4 years',
            degree: 'MEng',
            description: 'Integrated masters program with advanced topics and research project',
            modules: 'Advanced AI, Distributed Systems, Quantum Computing, Research Project',
            careerPaths: 'Research Scientist, Tech Lead, ML Engineer, Startup Founder'
          }
        ]
      },
      keyDates: {
        create: [
          {
            title: 'UCAS Application Deadline',
            date: new Date('2025-01-29'),
            type: 'Application',
            description: '18:00 UK time - Final deadline for all UCAS applications',
            critical: true
          },
          {
            title: 'Expected Decision',
            date: new Date('2025-05-15'),
            type: 'Decision',
            description: 'Universities must respond by this date'
          }
        ]
      }
    }
  })

  const bristol = await prisma.university.create({
    data: {
      name: 'University of Bristol',
      country: 'UK',
      location: 'Bristol',
      ranking: 55,
      ucasCode: 'B78',
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*AA including A* in Mathematics',
      ibRequirement: '38 points (18 at HL)',
      aLevelRequirement: 'A*AA',
      mathsRequirement: 'A* in Mathematics required',
      ieltsRequired: 6.5,
      tuitionFee: 28000,
      livingCosts: 12000,
      website: 'https://www.bristol.ac.uk',
      notes: 'Strong match - Excellent CS department with industry links',
      tier: 'Tier A',
      category: 'Match',
      admissionTest: 'None required',
      applicationDeadline: new Date('2025-01-29'),
      decisionDate: new Date('2025-05-15'),
      employmentRate: 92,
      averageSalary: 45000,
      majorRecruiters: 'Airbus, Rolls-Royce, HP, Oracle, local tech startups',
      industryLinks: 'Strong aerospace and engineering connections, growing tech hub',
      researchAreas: 'Robotics, Cybersecurity, Interactive AI, Cloud Computing',
      accommodation: 'Guaranteed for first years, £150-250 per week',
      campusInfo: 'City campus with mix of historic and modern buildings',
      courses: {
        create: [
          {
            name: 'Computer Science BSc',
            code: 'G400',
            duration: '3 years',
            degree: 'BSc',
            description: 'Strong theoretical foundation with practical projects',
            modules: 'Programming, Algorithms, AI, Computer Architecture, Team Project',
            careerPaths: 'Software Developer, Systems Analyst, Tech Consultant'
          },
          {
            name: 'Computer Science MEng',
            code: 'G403',
            duration: '4 years',
            degree: 'MEng',
            description: 'Extended program with industry placement option',
            modules: 'Advanced Topics, Industrial Project, Machine Learning, Cloud Systems'
          }
        ]
      }
    }
  })

  const southampton = await prisma.university.create({
    data: {
      name: 'University of Southampton',
      country: 'UK',
      location: 'Southampton',
      ranking: 78,
      ucasCode: 'S27',
      courseName: 'Computer Science BSc',
      entryRequirements: 'AAA including Mathematics',
      ibRequirement: '36 points (18 at HL)',
      aLevelRequirement: 'AAA',
      mathsRequirement: 'A in Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 28000,
      livingCosts: 11000,
      website: 'https://www.southampton.ac.uk',
      notes: 'Safe match - Strong in CS, Web Science, and AI',
      tier: 'Tier A',
      category: 'Safety',
      admissionTest: 'None required',
      applicationDeadline: new Date('2025-01-29'),
      decisionDate: new Date('2025-05-15'),
      employmentRate: 90,
      averageSalary: 42000,
      majorRecruiters: 'IBM, Microsoft, JP Morgan, ARM, local tech companies',
      industryLinks: 'Web Science Institute, strong research partnerships',
      researchAreas: 'Web Science, Cyber Security, AI, Computer Vision',
      accommodation: 'Guaranteed for first years, £130-200 per week',
      campusInfo: 'Modern campus with excellent facilities',
      courses: {
        create: [
          {
            name: 'Computer Science BSc',
            code: 'G400',
            duration: '3 years',
            degree: 'BSc',
            description: 'Flexible program with various specialization options',
            modules: 'Programming, Data Management, AI, Cyber Security, Web Technologies',
            careerPaths: 'Web Developer, Security Analyst, Data Engineer'
          },
          {
            name: 'Data Science BSc',
            code: 'G190',
            duration: '3 years',
            degree: 'BSc',
            description: 'Specialized program focusing on data analytics and ML',
            modules: 'Statistics, Machine Learning, Big Data, Data Visualization',
            careerPaths: 'Data Scientist, ML Engineer, Business Analyst'
          }
        ]
      }
    }
  })

  const manchester = await prisma.university.create({
    data: {
      name: 'University of Manchester',
      country: 'UK',
      location: 'Manchester',
      ranking: 33,
      ucasCode: 'M20',
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*AA-AAA including Mathematics',
      ibRequirement: '37 points (6,6,6 at HL)',
      aLevelRequirement: 'A*AA-AAA',
      mathsRequirement: 'A in Mathematics minimum',
      ieltsRequired: 6.5,
      tuitionFee: 28000,
      livingCosts: 10000,
      website: 'https://www.manchester.ac.uk',
      notes: 'Safe match - Historic CS department, birthplace of modern computing',
      tier: 'Tier A',
      category: 'Safety',
      admissionTest: 'None required',
      applicationDeadline: new Date('2025-01-29'),
      decisionDate: new Date('2025-05-15'),
      employmentRate: 89,
      averageSalary: 40000,
      majorRecruiters: 'BBC, Barclays, Booking.com, AutoTrader, local tech scene',
      industryLinks: 'Strong Manchester tech hub connections, BBC partnership',
      researchAreas: 'Advanced Computing, AI, Data Science, Software Engineering',
      accommodation: 'Guaranteed for first years, £120-180 per week',
      campusInfo: 'Large campus near city center, excellent student life',
      testRequirements: {
        create: [
          {
            testName: 'IELTS',
            required: true,
            recommended: false,
            minScore: '6.5 overall, 6.0 in each component',
            typicalScore: '7.0',
            notes: 'Alternative English tests accepted'
          }
        ]
      }
    }
  })

  const cardiff = await prisma.university.create({
    data: {
      name: 'Cardiff University',
      country: 'UK',
      location: 'Cardiff',
      ranking: 166,
      ucasCode: 'C15',
      courseName: 'Computer Science BSc',
      entryRequirements: 'AAB-ABB including B in Mathematics',
      ibRequirement: '34 points (17 at HL)',
      aLevelRequirement: 'AAB-ABB',
      mathsRequirement: 'B in Mathematics minimum',
      ieltsRequired: 6.5,
      tuitionFee: 25450,
      livingCosts: 9000,
      website: 'https://www.cardiff.ac.uk',
      notes: 'Strong safety - Good CS program, more forgiving entry requirements',
      tier: 'Tier B',
      category: 'Strong Safety',
      admissionTest: 'None required',
      applicationDeadline: new Date('2025-01-29'),
      decisionDate: new Date('2025-05-15'),
      employmentRate: 85,
      averageSalary: 35000,
      majorRecruiters: 'Admiral, GCHQ, Welsh Government, local businesses',
      industryLinks: 'Growing Welsh tech sector, government partnerships',
      researchAreas: 'AI, Visual Computing, Security, Data Analytics',
      accommodation: 'Guaranteed for first years, £110-160 per week',
      campusInfo: 'Central location in Welsh capital, friendly atmosphere'
    }
  })

  // Add some European universities with comprehensive data
  const polimi = await prisma.university.create({
    data: {
      name: 'Politecnico di Milano',
      country: 'Italy',
      location: 'Milan',
      ranking: 139,
      courseName: 'Computer Science and Engineering',
      entryRequirements: 'Strong academic record, SAT/TOLC test',
      ieltsRequired: 6.0,
      tuitionFee: 4000,
      livingCosts: 14000,
      website: 'https://www.polimi.it',
      notes: 'Top Italian technical university, taught in English',
      tier: 'Tier 1',
      category: 'Match',
      admissionTest: 'TOLC-I or SAT',
      applicationDeadline: new Date('2025-05-15'),
      employmentRate: 91,
      averageSalary: 35000,
      majorRecruiters: 'Ferrari, Pirelli, Luxottica, Accenture, Amazon',
      industryLinks: 'Strong Italian industry connections, Milan tech hub',
      researchAreas: 'Robotics, IoT, Big Data, Design & Technology',
      accommodation: 'Limited university housing, private €400-700/month',
      campusInfo: 'Multiple campuses in Milan, modern facilities',
      testRequirements: {
        create: [
          {
            testName: 'TOLC-I',
            required: true,
            recommended: false,
            testDate: new Date('2025-04-15'),
            registrationDeadline: new Date('2025-03-01'),
            minScore: '20/50',
            typicalScore: '30/50',
            notes: 'Italian standardized test, can be taken multiple times'
          },
          {
            testName: 'SAT',
            required: false,
            recommended: true,
            minScore: '1200',
            typicalScore: '1350',
            notes: 'Alternative to TOLC-I for international students'
          }
        ]
      }
    }
  })

  const tudelft = await prisma.university.create({
    data: {
      name: 'TU Delft',
      country: 'Netherlands',
      location: 'Delft',
      ranking: 47,
      courseName: 'Computer Science BSc',
      entryRequirements: 'IB 36+ with HL Mathematics',
      ibRequirement: '36+ points',
      mathsRequirement: 'HL Mathematics Analysis & Approaches',
      ieltsRequired: 6.5,
      tuitionFee: 15000,
      livingCosts: 13000,
      website: 'https://www.tudelft.nl',
      notes: 'Excellent technical university, competitive admissions',
      tier: 'Tier A',
      category: 'Reach',
      admissionTest: 'Numerus Fixus selection',
      applicationDeadline: new Date('2025-01-15'),
      employmentRate: 95,
      averageSalary: 48000,
      majorRecruiters: 'ASML, Shell, ING, Philips, Booking.com',
      industryLinks: 'Dutch tech sector, proximity to Amsterdam',
      researchAreas: 'Quantum Computing, AI, Software Engineering, Cybersecurity',
      accommodation: 'Limited university housing via lottery',
      campusInfo: 'Modern campus, cycling distance to everything'
    }
  })

  const tum = await prisma.university.create({
    data: {
      name: 'Technical University of Munich',
      country: 'Germany',
      location: 'Munich',
      ranking: 50,
      courseName: 'Informatics BSc',
      entryRequirements: 'Strong academic record, German language for BSc',
      ieltsRequired: 6.5,
      tuitionFee: 300,
      livingCosts: 12000,
      website: 'https://www.tum.de',
      notes: 'Top German technical university, BSc mostly in German',
      tier: 'Tier A',
      category: 'Match',
      admissionTest: 'TUM entrance examination',
      applicationDeadline: new Date('2025-05-31'),
      employmentRate: 94,
      averageSalary: 55000,
      majorRecruiters: 'BMW, Siemens, SAP, Google Munich, Amazon',
      industryLinks: 'Heart of German engineering and tech industry',
      researchAreas: 'AI, Robotics, Data Science, Quantum Computing',
      accommodation: 'Student dormitories €300-500/month',
      campusInfo: 'Multiple campuses, main in central Munich'
    }
  })

  // Add critical deadlines
  await prisma.deadline.create({
    data: {
      title: 'UCAS Main Deadline',
      description: 'Final deadline for all UCAS applications (18:00 UK time)',
      date: new Date('2025-01-29T18:00:00Z'),
      type: 'APPLICATION',
      critical: true
    }
  })

  await prisma.deadline.create({
    data: {
      title: 'TMUA Registration Opens',
      description: 'Registration opens for October TMUA test',
      date: new Date('2025-07-31'),
      type: 'DOCUMENT',
      critical: false
    }
  })

  await prisma.deadline.create({
    data: {
      title: 'TMUA Test Date',
      description: 'TMUA test sitting for Cambridge and other universities',
      date: new Date('2025-10-13'),
      type: 'DOCUMENT',
      critical: true
    }
  })

  console.log('Comprehensive seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })