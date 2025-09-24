import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed from memory documents...')

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

  // Create countries mentioned in memory documents
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
    // Tier 1 Perfect Fits
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
        name: 'France',
        code: 'FR',
        flag: '🇫🇷',
        region: 'Europe',
        euMember: true,
        language: 'French',
        currency: 'EUR'
      }
    }),
    // Tier 2 Excellent with Weather Issues
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
        name: 'Germany',
        code: 'DE',
        flag: '🇩🇪',
        region: 'Europe',
        euMember: true,
        language: 'German',
        currency: 'EUR'
      }
    }),
    // Tier 3 Good Options
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
    // Tier 4 Safety Schools
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
        name: 'Lithuania',
        code: 'LT',
        flag: '🇱🇹',
        region: 'Europe',
        euMember: true,
        language: 'Lithuanian',
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
    })
  ])

  // Create mapping for easy lookup
  const countryMap: { [key: string]: string } = {}
  countries.forEach(c => {
    countryMap[c.name] = c.id
  })

  // UK Universities from memory documents
  const ukUniversities = [
    // Primary targets from main.md
    {
      name: 'Cambridge University',
      countryId: countryMap['United Kingdom'],
      location: 'Cambridge',
      tier: 'Elite',
      category: 'Reach',
      notes: 'Primary target university from main.md'
    },
    {
      name: 'University of Bristol',
      countryId: countryMap['United Kingdom'],
      location: 'Bristol',
      tier: 'Tier A',
      category: 'Match',
      notes: 'Primary target university from main.md'
    },
    {
      name: 'University of Southampton',
      countryId: countryMap['United Kingdom'],
      location: 'Southampton',
      tier: 'Tier A',
      category: 'Safety',
      notes: 'Primary target university from main.md'
    },
    {
      name: 'Imperial College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      tier: 'Elite',
      category: 'Reach',
      notes: 'Primary target university from main.md'
    },
    {
      name: 'University College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      ucasCode: 'U80',
      tier: 'Elite',
      category: 'Reach',
      notes: 'UCL - Primary target from main.md and UCAS 5'
    },
    // Additional UK universities from comprehensive guides
    {
      name: 'University of Edinburgh',
      countryId: countryMap['United Kingdom'],
      location: 'Edinburgh',
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'King\'s College London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Warwick',
      countryId: countryMap['United Kingdom'],
      location: 'Coventry',
      tier: 'Tier A',
      category: 'Match'
    },
    {
      name: 'University of Manchester',
      countryId: countryMap['United Kingdom'],
      location: 'Manchester',
      ucasCode: 'M20',
      tier: 'Tier A',
      category: 'Safety',
      notes: 'UCAS 5 choice - Safe Match'
    },
    {
      name: 'University of Glasgow',
      countryId: countryMap['United Kingdom'],
      location: 'Glasgow',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of St Andrews',
      countryId: countryMap['United Kingdom'],
      location: 'St Andrews',
      tier: 'Tier B',
      category: 'Match'
    },
    {
      name: 'Durham University',
      countryId: countryMap['United Kingdom'],
      location: 'Durham',
      tier: 'Tier B',
      category: 'Match'
    },
    {
      name: 'University of Birmingham',
      countryId: countryMap['United Kingdom'],
      location: 'Birmingham',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Nottingham',
      countryId: countryMap['United Kingdom'],
      location: 'Nottingham',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of York',
      countryId: countryMap['United Kingdom'],
      location: 'York',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'Lancaster University',
      countryId: countryMap['United Kingdom'],
      location: 'Lancaster',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Sheffield',
      countryId: countryMap['United Kingdom'],
      location: 'Sheffield',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Leeds',
      countryId: countryMap['United Kingdom'],
      location: 'Leeds',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Bath',
      countryId: countryMap['United Kingdom'],
      location: 'Bath',
      tier: 'Tier B',
      category: 'Match'
    },
    {
      name: 'Loughborough University',
      countryId: countryMap['United Kingdom'],
      location: 'Loughborough',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'University of Exeter',
      countryId: countryMap['United Kingdom'],
      location: 'Exeter',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'Queen Mary University of London',
      countryId: countryMap['United Kingdom'],
      location: 'London',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'Newcastle University',
      countryId: countryMap['United Kingdom'],
      location: 'Newcastle',
      tier: 'Tier B',
      category: 'Safety'
    },
    {
      name: 'Cardiff University',
      countryId: countryMap['United Kingdom'],
      location: 'Cardiff',
      ucasCode: 'C15',
      tier: 'Tier B',
      category: 'Strong Safety',
      notes: 'UCAS 5 choice - Strong Safety'
    }
  ]

  // Italian Universities (Tier 1 Perfect Fits)
  const italianUniversities = [
    {
      name: 'Politecnico di Milano',
      countryId: countryMap['Italy'],
      location: 'Milan',
      tier: 'Tier 1',
      category: 'Match',
      notes: 'Top Italian technical university'
    },
    {
      name: 'Politecnico di Torino',
      countryId: countryMap['Italy'],
      location: 'Turin',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Bologna',
      countryId: countryMap['Italy'],
      location: 'Bologna',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Milan',
      countryId: countryMap['Italy'],
      location: 'Milan',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Padova',
      countryId: countryMap['Italy'],
      location: 'Padua',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'University of Trento',
      countryId: countryMap['Italy'],
      location: 'Trento',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'Sapienza University of Rome',
      countryId: countryMap['Italy'],
      location: 'Rome',
      tier: 'Tier 1',
      category: 'Safety'
    }
  ]

  // French Universities (Tier 1 Perfect Fits)
  const frenchUniversities = [
    {
      name: 'École Polytechnique',
      countryId: countryMap['France'],
      location: 'Palaiseau',
      tier: 'Elite',
      category: 'Reach',
      notes: 'France\'s most prestigious engineering school'
    },
    {
      name: 'INSA Lyon',
      countryId: countryMap['France'],
      location: 'Lyon',
      tier: 'Tier 1',
      category: 'Match'
    },
    {
      name: 'Université Paris-Saclay',
      countryId: countryMap['France'],
      location: 'Paris',
      tier: 'Tier 1',
      category: 'Match'
    },
    {
      name: 'CentraleSupélec',
      countryId: countryMap['France'],
      location: 'Paris',
      tier: 'Tier 1',
      category: 'Match'
    },
    {
      name: 'INSA Toulouse',
      countryId: countryMap['France'],
      location: 'Toulouse',
      tier: 'Tier 1',
      category: 'Safety'
    },
    {
      name: 'Université de Lorraine',
      countryId: countryMap['France'],
      location: 'Nancy',
      tier: 'Tier 1',
      category: 'Safety'
    }
  ]

  // Swiss Universities (Tier 2)
  const swissUniversities = [
    {
      name: 'ETH Zurich',
      countryId: countryMap['Switzerland'],
      location: 'Zurich',
      tier: 'Elite',
      category: 'Reach',
      notes: 'Global elite - considered equal to MIT/Stanford'
    },
    {
      name: 'EPFL',
      countryId: countryMap['Switzerland'],
      location: 'Lausanne',
      tier: 'Elite',
      category: 'Reach'
    },
    {
      name: 'University of Zurich',
      countryId: countryMap['Switzerland'],
      location: 'Zurich',
      tier: 'Tier 2',
      category: 'Match'
    },
    {
      name: 'University of Basel',
      countryId: countryMap['Switzerland'],
      location: 'Basel',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'University of Geneva',
      countryId: countryMap['Switzerland'],
      location: 'Geneva',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'University of Bern',
      countryId: countryMap['Switzerland'],
      location: 'Bern',
      tier: 'Tier 2',
      category: 'Safety'
    }
  ]

  // Dutch Universities (Tier 2)
  const dutchUniversities = [
    {
      name: 'TU Delft',
      countryId: countryMap['Netherlands'],
      location: 'Delft',
      tier: 'Tier 2',
      category: 'Reach'
    },
    {
      name: 'University of Twente',
      countryId: countryMap['Netherlands'],
      location: 'Enschede',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'Eindhoven University of Technology',
      countryId: countryMap['Netherlands'],
      location: 'Eindhoven',
      tier: 'Tier 2',
      category: 'Match'
    },
    {
      name: 'University of Groningen',
      countryId: countryMap['Netherlands'],
      location: 'Groningen',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'Tilburg University',
      countryId: countryMap['Netherlands'],
      location: 'Tilburg',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'Maastricht University',
      countryId: countryMap['Netherlands'],
      location: 'Maastricht',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Amsterdam',
      countryId: countryMap['Netherlands'],
      location: 'Amsterdam',
      tier: 'Tier 2',
      category: 'Match'
    }
  ]

  // German Universities (Tier 2)
  const germanUniversities = [
    {
      name: 'Technical University of Munich',
      countryId: countryMap['Germany'],
      location: 'Munich',
      tier: 'Tier 2',
      category: 'Match',
      notes: 'TUM - Top German technical university'
    },
    {
      name: 'RWTH Aachen University',
      countryId: countryMap['Germany'],
      location: 'Aachen',
      tier: 'Tier 2',
      category: 'Match'
    },
    {
      name: 'University of Stuttgart',
      countryId: countryMap['Germany'],
      location: 'Stuttgart',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'Karlsruhe Institute of Technology',
      countryId: countryMap['Germany'],
      location: 'Karlsruhe',
      tier: 'Tier 2',
      category: 'Match',
      notes: 'KIT'
    },
    {
      name: 'University of Mannheim',
      countryId: countryMap['Germany'],
      location: 'Mannheim',
      tier: 'Tier 2',
      category: 'Safety'
    },
    {
      name: 'TU Dresden',
      countryId: countryMap['Germany'],
      location: 'Dresden',
      tier: 'Tier 2',
      category: 'Safety'
    }
  ]

  // Belgian Universities (Tier 3)
  const belgianUniversities = [
    {
      name: 'KU Leuven',
      countryId: countryMap['Belgium'],
      location: 'Leuven',
      tier: 'Tier 3',
      category: 'Match',
      notes: 'Europe\'s most innovative university'
    },
    {
      name: 'Ghent University',
      countryId: countryMap['Belgium'],
      location: 'Ghent',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'Université Catholique de Louvain',
      countryId: countryMap['Belgium'],
      location: 'Louvain-la-Neuve',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UCL'
    },
    {
      name: 'Vrije Universiteit Brussel',
      countryId: countryMap['Belgium'],
      location: 'Brussels',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'VUB'
    },
    {
      name: 'Université Libre de Bruxelles',
      countryId: countryMap['Belgium'],
      location: 'Brussels',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'ULB'
    },
    {
      name: 'University of Antwerp',
      countryId: countryMap['Belgium'],
      location: 'Antwerp',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Finnish Universities (Tier 3)
  const finnishUniversities = [
    {
      name: 'Aalto University',
      countryId: countryMap['Finland'],
      location: 'Espoo',
      tier: 'Tier 3',
      category: 'Match'
    },
    {
      name: 'University of Helsinki',
      countryId: countryMap['Finland'],
      location: 'Helsinki',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Tampere',
      countryId: countryMap['Finland'],
      location: 'Tampere',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Turku',
      countryId: countryMap['Finland'],
      location: 'Turku',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Oulu',
      countryId: countryMap['Finland'],
      location: 'Oulu',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'LUT University',
      countryId: countryMap['Finland'],
      location: 'Lappeenranta',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Portuguese Universities (Tier 3)
  const portugueseUniversities = [
    {
      name: 'University of Porto',
      countryId: countryMap['Portugal'],
      location: 'Porto',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Lisbon',
      countryId: countryMap['Portugal'],
      location: 'Lisbon',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Aveiro',
      countryId: countryMap['Portugal'],
      location: 'Aveiro',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Minho',
      countryId: countryMap['Portugal'],
      location: 'Braga',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'NOVA University Lisbon',
      countryId: countryMap['Portugal'],
      location: 'Lisbon',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Coimbra',
      countryId: countryMap['Portugal'],
      location: 'Coimbra',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Irish Universities (Tier 3)
  const irishUniversities = [
    {
      name: 'Trinity College Dublin',
      countryId: countryMap['Ireland'],
      location: 'Dublin',
      tier: 'Tier 3',
      category: 'Match'
    },
    {
      name: 'University College Dublin',
      countryId: countryMap['Ireland'],
      location: 'Dublin',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UCD'
    },
    {
      name: 'Dublin City University',
      countryId: countryMap['Ireland'],
      location: 'Dublin',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'DCU'
    },
    {
      name: 'University College Cork',
      countryId: countryMap['Ireland'],
      location: 'Cork',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UCC'
    },
    {
      name: 'University of Limerick',
      countryId: countryMap['Ireland'],
      location: 'Limerick',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UL'
    },
    {
      name: 'National University of Ireland Galway',
      countryId: countryMap['Ireland'],
      location: 'Galway',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'NUIG'
    }
  ]

  // Austrian Universities (Tier 3)
  const austrianUniversities = [
    {
      name: 'TU Wien',
      countryId: countryMap['Austria'],
      location: 'Vienna',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'Vienna University of Technology'
    },
    {
      name: 'TU Graz',
      countryId: countryMap['Austria'],
      location: 'Graz',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'Graz University of Technology'
    },
    {
      name: 'University of Vienna',
      countryId: countryMap['Austria'],
      location: 'Vienna',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Innsbruck',
      countryId: countryMap['Austria'],
      location: 'Innsbruck',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'University of Salzburg',
      countryId: countryMap['Austria'],
      location: 'Salzburg',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'Johannes Kepler University Linz',
      countryId: countryMap['Austria'],
      location: 'Linz',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Norwegian Universities (Tier 3)
  const norwegianUniversities = [
    {
      name: 'Norwegian University of Science and Technology',
      countryId: countryMap['Norway'],
      location: 'Trondheim',
      tier: 'Tier 3',
      category: 'Match',
      notes: 'NTNU - FREE tuition'
    },
    {
      name: 'University of Oslo',
      countryId: countryMap['Norway'],
      location: 'Oslo',
      tier: 'Tier 3',
      category: 'Match',
      notes: 'FREE tuition'
    },
    {
      name: 'University of Bergen',
      countryId: countryMap['Norway'],
      location: 'Bergen',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'FREE tuition'
    },
    {
      name: 'University of Tromsø',
      countryId: countryMap['Norway'],
      location: 'Tromsø',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UiT Arctic University - FREE tuition'
    },
    {
      name: 'University of Stavanger',
      countryId: countryMap['Norway'],
      location: 'Stavanger',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'FREE tuition'
    },
    {
      name: 'University of Agder',
      countryId: countryMap['Norway'],
      location: 'Kristiansand',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'FREE tuition'
    }
  ]

  // Spanish Universities (Tier 3)
  const spanishUniversities = [
    {
      name: 'Universitat Politècnica de Catalunya',
      countryId: countryMap['Spain'],
      location: 'Barcelona',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UPC Barcelona'
    },
    {
      name: 'Universitat Politècnica de València',
      countryId: countryMap['Spain'],
      location: 'Valencia',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UPV'
    },
    {
      name: 'Universidad Carlos III de Madrid',
      countryId: countryMap['Spain'],
      location: 'Madrid',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UC3M'
    },
    {
      name: 'Universidad Autónoma de Barcelona',
      countryId: countryMap['Spain'],
      location: 'Barcelona',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UAB'
    },
    {
      name: 'Universidad de Granada',
      countryId: countryMap['Spain'],
      location: 'Granada',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'Universidad Complutense Madrid',
      countryId: countryMap['Spain'],
      location: 'Madrid',
      tier: 'Tier 3',
      category: 'Safety',
      notes: 'UCM'
    }
  ]

  // Danish Universities (Tier 3)
  const danishUniversities = [
    {
      name: 'Technical University of Denmark',
      countryId: countryMap['Denmark'],
      location: 'Lyngby',
      tier: 'Tier 3',
      category: 'Match',
      notes: 'DTU'
    },
    {
      name: 'University of Copenhagen',
      countryId: countryMap['Denmark'],
      location: 'Copenhagen',
      tier: 'Tier 3',
      category: 'Match'
    },
    {
      name: 'Aarhus University',
      countryId: countryMap['Denmark'],
      location: 'Aarhus',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Swedish Universities (Tier 3)
  const swedishUniversities = [
    {
      name: 'KTH Royal Institute of Technology',
      countryId: countryMap['Sweden'],
      location: 'Stockholm',
      tier: 'Tier 3',
      category: 'Match'
    },
    {
      name: 'Chalmers University of Technology',
      countryId: countryMap['Sweden'],
      location: 'Gothenburg',
      tier: 'Tier 3',
      category: 'Match'
    },
    {
      name: 'Lund University',
      countryId: countryMap['Sweden'],
      location: 'Lund',
      tier: 'Tier 3',
      category: 'Safety'
    },
    {
      name: 'Stockholm University',
      countryId: countryMap['Sweden'],
      location: 'Stockholm',
      tier: 'Tier 3',
      category: 'Safety'
    }
  ]

  // Czech Universities (Tier 4 Safety Schools)
  const czechUniversities = [
    {
      name: 'Czech Technical University in Prague',
      countryId: countryMap['Czech Republic'],
      location: 'Prague',
      tier: 'Tier 4',
      category: 'Safety',
      notes: 'CTU'
    },
    {
      name: 'Charles University Prague',
      countryId: countryMap['Czech Republic'],
      location: 'Prague',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Brno University of Technology',
      countryId: countryMap['Czech Republic'],
      location: 'Brno',
      tier: 'Tier 4',
      category: 'Safety',
      notes: 'BUT'
    },
    {
      name: 'University of Economics Prague',
      countryId: countryMap['Czech Republic'],
      location: 'Prague',
      tier: 'Tier 4',
      category: 'Safety',
      notes: 'VŠE'
    },
    {
      name: 'Masaryk University Brno',
      countryId: countryMap['Czech Republic'],
      location: 'Brno',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'University of West Bohemia',
      countryId: countryMap['Czech Republic'],
      location: 'Pilsen',
      tier: 'Tier 4',
      category: 'Safety'
    }
  ]

  // Polish Universities (Tier 4 Safety Schools)
  const polishUniversities = [
    {
      name: 'University of Warsaw',
      countryId: countryMap['Poland'],
      location: 'Warsaw',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Poznań University of Technology',
      countryId: countryMap['Poland'],
      location: 'Poznań',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'AGH University of Science and Technology',
      countryId: countryMap['Poland'],
      location: 'Krakow',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Warsaw University of Technology',
      countryId: countryMap['Poland'],
      location: 'Warsaw',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Wrocław University of Science and Technology',
      countryId: countryMap['Poland'],
      location: 'Wrocław',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Gdańsk University of Technology',
      countryId: countryMap['Poland'],
      location: 'Gdańsk',
      tier: 'Tier 4',
      category: 'Safety'
    }
  ]

  // Estonian Universities (Tier 4 Safety Schools)
  const estonianUniversities = [
    {
      name: 'University of Tartu',
      countryId: countryMap['Estonia'],
      location: 'Tartu',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Tallinn University of Technology',
      countryId: countryMap['Estonia'],
      location: 'Tallinn',
      tier: 'Tier 4',
      category: 'Safety',
      notes: 'TalTech'
    },
    {
      name: 'Estonian Business School',
      countryId: countryMap['Estonia'],
      location: 'Tallinn',
      tier: 'Tier 4',
      category: 'Safety'
    }
  ]

  // Lithuanian Universities (Tier 4)
  const lithuanianUniversities = [
    {
      name: 'Vilnius University',
      countryId: countryMap['Lithuania'],
      location: 'Vilnius',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Kaunas University of Technology',
      countryId: countryMap['Lithuania'],
      location: 'Kaunas',
      tier: 'Tier 4',
      category: 'Safety'
    }
  ]

  // Latvian Universities (Tier 4)
  const latvianUniversities = [
    {
      name: 'University of Latvia',
      countryId: countryMap['Latvia'],
      location: 'Riga',
      tier: 'Tier 4',
      category: 'Safety'
    },
    {
      name: 'Riga Technical University',
      countryId: countryMap['Latvia'],
      location: 'Riga',
      tier: 'Tier 4',
      category: 'Safety'
    }
  ]

  // Combine all university arrays
  const allUniversities = [
    ...ukUniversities,
    ...italianUniversities,
    ...frenchUniversities,
    ...swissUniversities,
    ...dutchUniversities,
    ...germanUniversities,
    ...belgianUniversities,
    ...finnishUniversities,
    ...portugueseUniversities,
    ...irishUniversities,
    ...austrianUniversities,
    ...norwegianUniversities,
    ...spanishUniversities,
    ...danishUniversities,
    ...swedishUniversities,
    ...czechUniversities,
    ...polishUniversities,
    ...estonianUniversities,
    ...lithuanianUniversities,
    ...latvianUniversities
  ]

  // Create universities in database
  console.log(`Creating ${allUniversities.length} universities from memory documents...`)

  for (const uni of allUniversities) {
    await prisma.university.create({
      data: uni
    })
  }

  const totalUniversities = await prisma.university.count()
  const totalCountries = await prisma.country.count()

  console.log(`✅ Seed completed successfully!`)
  console.log(`   - ${totalCountries} countries created`)
  console.log(`   - ${totalUniversities} universities created (all from memory documents)`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })