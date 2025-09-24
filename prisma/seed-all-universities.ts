import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting comprehensive university seed...')

  // Clear existing data
  await prisma.keyDate.deleteMany()
  await prisma.testRequirement.deleteMany()
  await prisma.course.deleteMany()
  await prisma.document.deleteMany()
  await prisma.todo.deleteMany()
  await prisma.deadline.deleteMany()
  await prisma.application.deleteMany()
  await prisma.university.deleteMany()
  await prisma.country.deleteMany()

  // Create all countries
  const countries = await Promise.all([
    // UK
    prisma.country.create({
      data: {
        name: 'United Kingdom',
        code: 'UK',
        flag: '🇬🇧',
        region: 'UK',
        euMember: false,
        language: 'English',
        currency: 'GBP'
      }
    }),
    // European Union Countries
    prisma.country.create({
      data: {
        name: 'France',
        code: 'FR',
        flag: '🇫🇷',
        region: 'Europe',
        euMember: true,
        language: 'French',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Germany',
        code: 'DE',
        flag: '🇩🇪',
        region: 'Europe',
        euMember: true,
        language: 'German',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Italy',
        code: 'IT',
        flag: '🇮🇹',
        region: 'Europe',
        euMember: true,
        language: 'Italian',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Netherlands',
        code: 'NL',
        flag: '🇳🇱',
        region: 'Europe',
        euMember: true,
        language: 'Dutch',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Belgium',
        code: 'BE',
        flag: '🇧🇪',
        region: 'Europe',
        euMember: true,
        language: 'Dutch/French',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Spain',
        code: 'ES',
        flag: '🇪🇸',
        region: 'Europe',
        euMember: true,
        language: 'Spanish',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Portugal',
        code: 'PT',
        flag: '🇵🇹',
        region: 'Europe',
        euMember: true,
        language: 'Portuguese',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Ireland',
        code: 'IE',
        flag: '🇮🇪',
        region: 'Europe',
        euMember: true,
        language: 'English',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Austria',
        code: 'AT',
        flag: '🇦🇹',
        region: 'Europe',
        euMember: true,
        language: 'German',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Finland',
        code: 'FI',
        flag: '🇫🇮',
        region: 'Europe',
        euMember: true,
        language: 'Finnish',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Estonia',
        code: 'EE',
        flag: '🇪🇪',
        region: 'Europe',
        euMember: true,
        language: 'Estonian',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Latvia',
        code: 'LV',
        flag: '🇱🇻',
        region: 'Europe',
        euMember: true,
        language: 'Latvian',
        currency: 'EUR'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Lithuania',
        code: 'LT',
        flag: '🇱🇹',
        region: 'Europe',
        euMember: true,
        language: 'Lithuanian',
        currency: 'EUR'
      }
    }),
    // Non-EU European Countries
    prisma.country.create({
      data: {
        name: 'Switzerland',
        code: 'CH',
        flag: '🇨🇭',
        region: 'Europe',
        euMember: false,
        language: 'German/French/Italian',
        currency: 'CHF'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Norway',
        code: 'NO',
        flag: '🇳🇴',
        region: 'Europe',
        euMember: false,
        language: 'Norwegian',
        currency: 'NOK'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Denmark',
        code: 'DK',
        flag: '🇩🇰',
        region: 'Europe',
        euMember: true,
        language: 'Danish',
        currency: 'DKK'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Sweden',
        code: 'SE',
        flag: '🇸🇪',
        region: 'Europe',
        euMember: true,
        language: 'Swedish',
        currency: 'SEK'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Czech Republic',
        code: 'CZ',
        flag: '🇨🇿',
        region: 'Europe',
        euMember: true,
        language: 'Czech',
        currency: 'CZK'
      }
    }),
    prisma.country.create({
      data: {
        name: 'Poland',
        code: 'PL',
        flag: '🇵🇱',
        region: 'Europe',
        euMember: true,
        language: 'Polish',
        currency: 'PLN'
      }
    })
  ])

  // Create mapping for easy lookup
  const countryMap: { [key: string]: string } = {}
  countries.forEach(c => {
    countryMap[c.name] = c.id
  })

  // Create UK Universities (Tier 1 & 2)
  const ukUniversities = [
    // UCAS 5 Main Choices
    {
      name: 'University College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      ranking: 9,
      ucasCode: 'U80',
      courseName: 'Computer Science BSc/MEng',
      entryRequirements: 'A*A*A-A*AA at A Level, or 40-42 points in IB with 20 at HL',
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
      campusInfo: 'Central London campus in Bloomsbury, excellent transport links'
    },
    {
      name: 'University of Bristol',
      countryId: countryMap['United Kingdom'],
      location: 'Bristol',
      ranking: 55,
      ucasCode: 'B78',
      courseName: 'Computer Science BSc/MEng',
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
      employmentRate: 92,
      averageSalary: 45000,
      majorRecruiters: 'Airbus, Rolls-Royce, HP, Oracle, local tech startups',
      industryLinks: 'Strong aerospace and engineering connections, growing tech hub',
      researchAreas: 'Robotics, Cybersecurity, Interactive AI, Cloud Computing'
    },
    {
      name: 'University of Southampton',
      countryId: countryMap['United Kingdom'],
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
      employmentRate: 90,
      averageSalary: 42000,
      majorRecruiters: 'IBM, Microsoft, JP Morgan, ARM',
      industryLinks: 'Web Science Institute, strong research partnerships',
      researchAreas: 'Web Science, Cyber Security, AI, Computer Vision'
    },
    {
      name: 'University of Manchester',
      countryId: countryMap['United Kingdom'],
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
      employmentRate: 89,
      averageSalary: 40000,
      majorRecruiters: 'BBC, Barclays, Booking.com, AutoTrader',
      industryLinks: 'Strong Manchester tech hub connections',
      researchAreas: 'Advanced Computing, AI, Data Science, Software Engineering'
    },
    {
      name: 'Cardiff University',
      countryId: countryMap['United Kingdom'],
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
      employmentRate: 85,
      averageSalary: 35000,
      majorRecruiters: 'Admiral, GCHQ, Welsh Government',
      industryLinks: 'Growing Welsh tech sector',
      researchAreas: 'AI, Visual Computing, Security, Data Analytics'
    },
    // Other Top UK Universities
    {
      name: 'University of Cambridge',
      countryId: countryMap['United Kingdom'],
      location: 'Cambridge',
      ranking: 2,
      courseName: 'Computer Science BA/MEng',
      entryRequirements: 'A*A*A with A* in Mathematics',
      ibRequirement: '42-45 points',
      aLevelRequirement: 'A*A*A',
      mathsRequirement: 'A* in Mathematics and Further Mathematics',
      ieltsRequired: 7.5,
      tuitionFee: 58038,
      tier: 'Elite',
      category: 'Reach',
      admissionTest: 'CSAT required',
      employmentRate: 97,
      averageSalary: 65000
    },
    {
      name: 'Imperial College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      ranking: 6,
      courseName: 'Computing MEng',
      entryRequirements: 'A*A*A-A*AAA',
      ibRequirement: '41-42 points',
      aLevelRequirement: 'A*A*A',
      mathsRequirement: 'A* in Mathematics',
      ieltsRequired: 7.0,
      tuitionFee: 37900,
      tier: 'Elite',
      category: 'Reach',
      employmentRate: 96,
      averageSalary: 60000
    },
    {
      name: 'University of Edinburgh',
      countryId: countryMap['United Kingdom'],
      location: 'Edinburgh',
      ranking: 15,
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*AA-AAA',
      ibRequirement: '39 points',
      aLevelRequirement: 'A*AA-AAA',
      ieltsRequired: 6.5,
      tuitionFee: 34800,
      tier: 'Tier A',
      category: 'Match',
      employmentRate: 91,
      averageSalary: 48000
    },
    {
      name: 'King\'s College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      ranking: 35,
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*AA',
      ibRequirement: '38 points',
      aLevelRequirement: 'A*AA',
      ieltsRequired: 7.0,
      tuitionFee: 35000,
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Warwick',
      countryId: countryMap['United Kingdom'],
      location: 'Coventry',
      ranking: 67,
      courseName: 'Computer Science BSc',
      entryRequirements: 'A*A*A-A*AA',
      ibRequirement: '39 points',
      aLevelRequirement: 'A*A*A-A*AA',
      mathsRequirement: 'A* in Mathematics',
      ieltsRequired: 6.5,
      tuitionFee: 29000,
      tier: 'Tier A',
      category: 'Match',
      admissionTest: 'TMUA recommended'
    }
  ]

  // Create Italian Universities (Tier 1 Perfect Fits)
  const italianUniversities = [
    {
      name: 'Politecnico di Milano',
      countryId: countryMap['Italy'],
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
      researchAreas: 'Robotics, IoT, Big Data, Design & Technology'
    },
    {
      name: 'Politecnico di Torino',
      countryId: countryMap['Italy'],
      location: 'Turin',
      ranking: 325,
      courseName: 'Computer Engineering',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 3500,
      livingCosts: 11000,
      website: 'https://www.polito.it',
      tier: 'Tier 1',
      category: 'Safety',
      admissionTest: 'TOLC-I',
      employmentRate: 88,
      averageSalary: 32000
    },
    {
      name: 'University of Bologna',
      countryId: countryMap['Italy'],
      location: 'Bologna',
      ranking: 167,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 5.5,
      tuitionFee: 3500,
      livingCosts: 10000,
      website: 'https://www.unibo.it',
      tier: 'Tier 1',
      category: 'Safety',
      employmentRate: 85,
      averageSalary: 30000
    },
    {
      name: 'University of Milan',
      countryId: countryMap['Italy'],
      location: 'Milan',
      ranking: 301,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 3800,
      livingCosts: 14000,
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Padova',
      countryId: countryMap['Italy'],
      location: 'Padua',
      ranking: 243,
      courseName: 'Computer Engineering',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 3200,
      livingCosts: 10000,
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Trento',
      countryId: countryMap['Italy'],
      location: 'Trento',
      ranking: 426,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 3000,
      livingCosts: 9000,
      tier: 'Tier 1',
      category: 'Safety'
    }
  ]

  // Create French Universities
  const frenchUniversities = [
    {
      name: 'École Polytechnique',
      countryId: countryMap['France'],
      location: 'Palaiseau',
      ranking: 61,
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB equivalent, very competitive',
      ieltsRequired: 6.5,
      tuitionFee: 12000,
      website: 'https://www.polytechnique.edu',
      tier: 'Elite',
      category: 'Reach',
      employmentRate: 95,
      averageSalary: 65000,
      majorRecruiters: 'Google, McKinsey, Total, Airbus',
      notes: 'MIT of Europe - globally respected'
    },
    {
      name: 'INSA Lyon',
      countryId: countryMap['France'],
      location: 'Lyon',
      ranking: 511,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 3770,
      tier: 'Tier 1',
      category: 'Match',
      employmentRate: 90,
      averageSalary: 45000
    },
    {
      name: 'Université Paris-Saclay',
      countryId: countryMap['France'],
      location: 'Paris',
      ranking: 60,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 2770,
      tier: 'Tier 1',
      category: 'Match',
      employmentRate: 88,
      averageSalary: 48000
    },
    {
      name: 'CentraleSupélec',
      countryId: countryMap['France'],
      location: 'Paris',
      ranking: 138,
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 3770,
      tier: 'Tier 1',
      category: 'Match'
    },
    {
      name: 'INSA Toulouse',
      countryId: countryMap['France'],
      location: 'Toulouse',
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 3770,
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'Université de Lorraine',
      countryId: countryMap['France'],
      location: 'Nancy',
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 2770,
      tier: 'Tier 1',
      category: 'Safety'
    }
  ]

  // Create German Universities
  const germanUniversities = [
    {
      name: 'Technical University of Munich',
      countryId: countryMap['Germany'],
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
      researchAreas: 'AI, Robotics, Data Science, Quantum Computing'
    },
    {
      name: 'RWTH Aachen University',
      countryId: countryMap['Germany'],
      location: 'Aachen',
      ranking: 147,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 10000,
      tier: 'Tier A',
      category: 'Match',
      employmentRate: 92,
      averageSalary: 52000
    },
    {
      name: 'University of Stuttgart',
      countryId: countryMap['Germany'],
      location: 'Stuttgart',
      ranking: 330,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 11000,
      tier: 'Tier A',
      category: 'Safety'
    },
    {
      name: 'Karlsruhe Institute of Technology',
      countryId: countryMap['Germany'],
      location: 'Karlsruhe',
      ranking: 131,
      courseName: 'Computer Science',
      entryRequirements: 'ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 10000,
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Mannheim',
      countryId: countryMap['Germany'],
      location: 'Mannheim',
      ranking: 454,
      courseName: 'Business Informatics',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 10000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'TU Dresden',
      countryId: countryMap['Germany'],
      location: 'Dresden',
      ranking: 173,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 9000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'TU Berlin',
      countryId: countryMap['Germany'],
      location: 'Berlin',
      ranking: 158,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 300,
      livingCosts: 11000,
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Freiburg',
      countryId: countryMap['Germany'],
      location: 'Freiburg',
      ranking: 172,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 300,
      livingCosts: 10000,
      tier: 'Tier B',
      category: 'Safety'
    }
  ]

  // Create Dutch Universities
  const dutchUniversities = [
    {
      name: 'TU Delft',
      countryId: countryMap['Netherlands'],
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
      researchAreas: 'Quantum Computing, AI, Software Engineering, Cybersecurity'
    },
    {
      name: 'TU Eindhoven',
      countryId: countryMap['Netherlands'],
      location: 'Eindhoven',
      ranking: 124,
      courseName: 'Computer Science',
      entryRequirements: 'ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 18000,
      livingCosts: 12000,
      tier: 'Tier A',
      category: 'Match',
      employmentRate: 93,
      averageSalary: 45000
    },
    {
      name: 'University of Twente',
      countryId: countryMap['Netherlands'],
      location: 'Enschede',
      ranking: 197,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 17000,
      livingCosts: 11000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Amsterdam',
      countryId: countryMap['Netherlands'],
      location: 'Amsterdam',
      ranking: 55,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 19000,
      livingCosts: 15000,
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Groningen',
      countryId: countryMap['Netherlands'],
      location: 'Groningen',
      ranking: 120,
      courseName: 'Computer Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 16000,
      livingCosts: 11000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'Tilburg University',
      countryId: countryMap['Netherlands'],
      location: 'Tilburg',
      ranking: 378,
      courseName: 'Data Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 15000,
      livingCosts: 11000,
      tier: 'Tier C',
      category: 'Safety'
    },
    {
      name: 'Maastricht University',
      countryId: countryMap['Netherlands'],
      location: 'Maastricht',
      ranking: 278,
      courseName: 'Data Science',
      entryRequirements: 'ABB-BBC equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 17000,
      livingCosts: 12000,
      tier: 'Tier B',
      category: 'Safety'
    }
  ]

  // Create Swiss Universities
  const swissUniversities = [
    {
      name: 'ETH Zurich',
      countryId: countryMap['Switzerland'],
      location: 'Zurich',
      ranking: 7,
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB very competitive',
      ieltsRequired: 7.0,
      tuitionFee: 1700,
      livingCosts: 25000,
      website: 'https://ethz.ch',
      tier: 'Elite',
      category: 'Reach',
      employmentRate: 98,
      averageSalary: 120000,
      majorRecruiters: 'Google, Microsoft, Apple, Meta, McKinsey',
      notes: 'Considered equal to MIT/Stanford by tech companies'
    },
    {
      name: 'EPFL',
      countryId: countryMap['Switzerland'],
      location: 'Lausanne',
      ranking: 14,
      courseName: 'Computer Science',
      entryRequirements: 'AAA-AAB competitive',
      ieltsRequired: 7.0,
      tuitionFee: 1700,
      livingCosts: 24000,
      website: 'https://epfl.ch',
      tier: 'Elite',
      category: 'Reach',
      employmentRate: 96,
      averageSalary: 110000
    },
    {
      name: 'University of Zurich',
      countryId: countryMap['Switzerland'],
      location: 'Zurich',
      ranking: 91,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 1700,
      livingCosts: 25000,
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Basel',
      countryId: countryMap['Switzerland'],
      location: 'Basel',
      ranking: 138,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 1500,
      livingCosts: 23000,
      tier: 'Tier B',
      category: 'Safety'
    }
  ]

  // Create Belgian Universities
  const belgianUniversities = [
    {
      name: 'KU Leuven',
      countryId: countryMap['Belgium'],
      location: 'Leuven',
      ranking: 60,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.5,
      tuitionFee: 10000,
      livingCosts: 11000,
      tier: 'Tier B',
      category: 'Match',
      employmentRate: 90,
      averageSalary: 42000,
      notes: 'Europe\'s most innovative university'
    },
    {
      name: 'Ghent University',
      countryId: countryMap['Belgium'],
      location: 'Ghent',
      ranking: 130,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 9000,
      livingCosts: 10000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'UCLouvain',
      countryId: countryMap['Belgium'],
      location: 'Louvain-la-Neuve',
      ranking: 188,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 9500,
      livingCosts: 10000,
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'VUB Brussels',
      countryId: countryMap['Belgium'],
      location: 'Brussels',
      ranking: 239,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 8500,
      livingCosts: 11000,
      tier: 'Tier C',
      category: 'Safety'
    },
    {
      name: 'ULB Brussels',
      countryId: countryMap['Belgium'],
      location: 'Brussels',
      ranking: 248,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 9000,
      livingCosts: 11000,
      tier: 'Tier C',
      category: 'Safety'
    },
    {
      name: 'University of Antwerp',
      countryId: countryMap['Belgium'],
      location: 'Antwerp',
      ranking: 273,
      courseName: 'Computer Science',
      entryRequirements: 'AAB-ABB equivalent',
      ieltsRequired: 6.0,
      tuitionFee: 8000,
      livingCosts: 10500,
      tier: 'Tier C',
      category: 'Safety'
    }
  ]

  // Create remaining universities for other countries
  // Spain, Portugal, Ireland, Nordic countries, Eastern Europe etc.

  // Combine all university arrays
  const allUniversities = [
    ...ukUniversities,
    ...italianUniversities,
    ...frenchUniversities,
    ...germanUniversities,
    ...dutchUniversities,
    ...swissUniversities,
    ...belgianUniversities
  ]

  // Create universities in database
  console.log(`Creating ${allUniversities.length} universities...`)

  for (const uni of allUniversities) {
    await prisma.university.create({
      data: uni
    })
  }

  // Add remaining countries' universities (simplified for brevity)
  // Add Spanish Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'Universitat Politècnica de Catalunya',
        countryId: countryMap['Spain'],
        location: 'Barcelona',
        ranking: 319,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 10000,
        livingCosts: 13000,
        tier: 'Tier C',
        category: 'Safety'
      },
      {
        name: 'Universidad Carlos III de Madrid',
        countryId: countryMap['Spain'],
        location: 'Madrid',
        ranking: 351,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 11000,
        livingCosts: 14000,
        tier: 'Tier C',
        category: 'Safety'
      }
    ]
  })

  // Add Irish Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'Trinity College Dublin',
        countryId: countryMap['Ireland'],
        location: 'Dublin',
        ranking: 81,
        courseName: 'Computer Science',
        entryRequirements: 'AAA-AAB very competitive',
        ieltsRequired: 6.5,
        tuitionFee: 26000,
        livingCosts: 15000,
        tier: 'Tier B',
        category: 'Match',
        employmentRate: 92,
        averageSalary: 50000
      },
      {
        name: 'University College Dublin',
        countryId: countryMap['Ireland'],
        location: 'Dublin',
        ranking: 173,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 24000,
        livingCosts: 15000,
        tier: 'Tier C',
        category: 'Safety'
      }
    ]
  })

  // Add Nordic Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'University of Copenhagen',
        countryId: countryMap['Denmark'],
        location: 'Copenhagen',
        ranking: 72,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 2000,
        livingCosts: 14000,
        tier: 'Tier B',
        category: 'Match'
      },
      {
        name: 'Technical University of Denmark',
        countryId: countryMap['Denmark'],
        location: 'Lyngby',
        ranking: 155,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 2000,
        livingCosts: 14000,
        tier: 'Tier B',
        category: 'Safety'
      },
      {
        name: 'KTH Royal Institute of Technology',
        countryId: countryMap['Sweden'],
        location: 'Stockholm',
        ranking: 73,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 15500,
        livingCosts: 13000,
        tier: 'Tier B',
        category: 'Match'
      },
      {
        name: 'Chalmers University of Technology',
        countryId: countryMap['Sweden'],
        location: 'Gothenburg',
        ranking: 125,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 14500,
        livingCosts: 12000,
        tier: 'Tier B',
        category: 'Safety'
      }
    ]
  })

  // Add Norwegian Universities (FREE tuition!)
  await prisma.university.createMany({
    data: [
      {
        name: 'Norwegian University of Science and Technology',
        countryId: countryMap['Norway'],
        location: 'Trondheim',
        ranking: 267,
        courseName: 'Computer Science',
        entryRequirements: 'AAB-ABB equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 0, // FREE!
        livingCosts: 15000,
        tier: 'Tier B',
        category: 'Match',
        notes: 'FREE tuition for all students!'
      },
      {
        name: 'University of Oslo',
        countryId: countryMap['Norway'],
        location: 'Oslo',
        ranking: 119,
        courseName: 'Computer Science',
        entryRequirements: 'AAB-ABB equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 0, // FREE!
        livingCosts: 16000,
        tier: 'Tier B',
        category: 'Match',
        notes: 'FREE tuition for all students!'
      }
    ]
  })

  // Add Finnish Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'Aalto University',
        countryId: countryMap['Finland'],
        location: 'Espoo',
        ranking: 112,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBB equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 15000,
        livingCosts: 11000,
        tier: 'Tier B',
        category: 'Match'
      },
      {
        name: 'University of Helsinki',
        countryId: countryMap['Finland'],
        location: 'Helsinki',
        ranking: 104,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.5,
        tuitionFee: 13000,
        livingCosts: 11000,
        tier: 'Tier B',
        category: 'Safety'
      }
    ]
  })

  // Add Austrian Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'TU Wien',
        countryId: countryMap['Austria'],
        location: 'Vienna',
        ranking: 191,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 1450,
        livingCosts: 12000,
        tier: 'Tier C',
        category: 'Safety'
      },
      {
        name: 'TU Graz',
        countryId: countryMap['Austria'],
        location: 'Graz',
        ranking: 275,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 1450,
        livingCosts: 10000,
        tier: 'Tier C',
        category: 'Safety'
      }
    ]
  })

  // Add Portuguese Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'University of Porto',
        countryId: countryMap['Portugal'],
        location: 'Porto',
        ranking: 295,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 6000,
        livingCosts: 8000,
        tier: 'Tier C',
        category: 'Safety'
      },
      {
        name: 'University of Lisbon',
        countryId: countryMap['Portugal'],
        location: 'Lisbon',
        ranking: 335,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 5000,
        livingCosts: 9000,
        tier: 'Tier C',
        category: 'Safety'
      }
    ]
  })

  // Add Czech Universities (Tier 4 Safety Schools)
  await prisma.university.createMany({
    data: [
      {
        name: 'Czech Technical University in Prague',
        countryId: countryMap['Czech Republic'],
        location: 'Prague',
        ranking: 498,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 5000,
        livingCosts: 8000,
        tier: 'Tier 4',
        category: 'Safety'
      },
      {
        name: 'Charles University',
        countryId: countryMap['Czech Republic'],
        location: 'Prague',
        ranking: 248,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 9000,
        livingCosts: 8000,
        tier: 'Tier 4',
        category: 'Safety'
      }
    ]
  })

  // Add Polish Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'University of Warsaw',
        countryId: countryMap['Poland'],
        location: 'Warsaw',
        ranking: 284,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 4000,
        livingCosts: 7000,
        tier: 'Tier 4',
        category: 'Safety'
      },
      {
        name: 'Warsaw University of Technology',
        countryId: countryMap['Poland'],
        location: 'Warsaw',
        ranking: 511,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 4500,
        livingCosts: 7000,
        tier: 'Tier 4',
        category: 'Safety'
      }
    ]
  })

  // Add Baltic Universities
  await prisma.university.createMany({
    data: [
      {
        name: 'University of Tartu',
        countryId: countryMap['Estonia'],
        location: 'Tartu',
        ranking: 326,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 4500,
        livingCosts: 7000,
        tier: 'Tier 4',
        category: 'Safety',
        notes: 'Strong tech ecosystem in Estonia'
      },
      {
        name: 'Tallinn University of Technology',
        countryId: countryMap['Estonia'],
        location: 'Tallinn',
        ranking: 651,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 5000,
        livingCosts: 8000,
        tier: 'Tier 4',
        category: 'Safety'
      },
      {
        name: 'Vilnius University',
        countryId: countryMap['Lithuania'],
        location: 'Vilnius',
        ranking: 423,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 5.5,
        tuitionFee: 4000,
        livingCosts: 6000,
        tier: 'Tier 4',
        category: 'Safety'
      },
      {
        name: 'University of Latvia',
        countryId: countryMap['Latvia'],
        location: 'Riga',
        ranking: 951,
        courseName: 'Computer Science',
        entryRequirements: 'ABB-BBC equivalent',
        ieltsRequired: 6.0,
        tuitionFee: 4500,
        livingCosts: 6500,
        tier: 'Tier 4',
        category: 'Safety'
      }
    ]
  })

  // Add critical deadlines
  await prisma.deadline.createMany({
    data: [
      {
        title: 'UCAS Main Deadline',
        description: 'Final deadline for all UCAS applications (18:00 UK time)',
        date: new Date('2025-01-29T18:00:00Z'),
        type: 'APPLICATION',
        critical: true
      },
      {
        title: 'Oxford & Cambridge Deadline',
        description: 'Early deadline for Oxbridge applications',
        date: new Date('2024-10-15T18:00:00Z'),
        type: 'APPLICATION',
        critical: true,
        completed: true
      },
      {
        title: 'TMUA Registration Opens',
        description: 'Registration opens for October TMUA test',
        date: new Date('2025-07-31'),
        type: 'DOCUMENT',
        critical: false
      },
      {
        title: 'TMUA Test Date',
        description: 'TMUA test sitting for Cambridge and other universities',
        date: new Date('2025-10-13'),
        type: 'DOCUMENT',
        critical: true
      },
      {
        title: 'Netherlands Application Deadline',
        description: 'Deadline for Dutch universities via Studielink',
        date: new Date('2025-01-15'),
        type: 'APPLICATION',
        critical: true
      },
      {
        title: 'Italian TOLC-I Test',
        description: 'Test date for Italian university admissions',
        date: new Date('2025-04-15'),
        type: 'DOCUMENT',
        critical: true
      }
    ]
  })

  const totalUniversities = await prisma.university.count()
  const totalCountries = await prisma.country.count()

  console.log(`✅ Seed completed successfully!`)
  console.log(`   - ${totalCountries} countries created`)
  console.log(`   - ${totalUniversities} universities created`)
  console.log(`   - 6 critical deadlines added`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })