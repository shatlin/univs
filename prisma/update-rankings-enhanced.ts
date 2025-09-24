import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Enhanced university rankings with detailed information
const enhancedRankings = [
  // S-Tier UK Universities
  { 
    name: 'Cambridge University', 
    score: 100, 
    tier: 'S', 
    globalRanking: 2,
    category: 'Reach',
    strengths: 'World #2 • Computer Lab excellence • Mathematical foundations • Alan Turing legacy • Strong AI/ML research • Silicon Fen location',
    requirements: 'A*A*A with A* in Maths • TMUA recommended • Strong interview performance'
  },
  { 
    name: 'Imperial College London', 
    score: 98, 
    tier: 'S',
    globalRanking: 6,
    category: 'Reach', 
    strengths: 'World #6 • STEM powerhouse • Computing ranked #1 UK • MEng options • Industry partnerships • London tech scene',
    requirements: 'A*A*A-A*AAA • Strong maths essential • Computing experience preferred'
  },
  { 
    name: 'University College London', 
    score: 95, 
    tier: 'S',
    globalRanking: 9,
    category: 'Reach',
    strengths: 'World #9 • Russell Group leader • AI & ML excellence • DeepMind links • Central London • Diverse CS specializations',
    requirements: 'A*AA with A* in Maths • Strong academic profile needed'
  },
  { 
    name: 'University of Edinburgh', 
    score: 94, 
    tier: 'S',
    globalRanking: 15,
    category: 'Target',
    strengths: 'World #15 • UK AI capital • Top Informatics school • Data Science pioneer • Robotics excellence • Beautiful city',
    requirements: 'AAA-A*AB • Contextual offers available • Strong CS interest'
  },
  
  // A-Tier UK Universities
  { 
    name: 'King\'s College London', 
    score: 92, 
    tier: 'A',
    globalRanking: 31,
    category: 'Target',
    strengths: 'World #31 • Russell Group • Central London • AI research • Cybersecurity focus • NHS partnerships',
    requirements: 'AAA with A in Maths • Computing helpful but not required'
  },
  { 
    name: 'University of Manchester', 
    score: 91, 
    tier: 'A',
    globalRanking: 32,
    category: 'Target',
    strengths: 'World #32 • Russell Group • Graphene research • Strong CS school • Tech hub city • Year in industry',
    requirements: 'AAA-AAB • Maths required • Industrial experience valued'
  },
  { 
    name: 'University of Warwick', 
    score: 90, 
    tier: 'A',
    globalRanking: 67,
    category: 'Target',
    strengths: 'World #67 • Top 5 CS UK • Discrete Maths focus • Strong research • Campus university • Good employability',
    requirements: 'AAA with A in Maths • TMUA can reduce offer'
  },
  { 
    name: 'University of Bristol', 
    score: 89, 
    tier: 'A',
    globalRanking: 55,
    category: 'Target',
    strengths: 'World #55 • Russell Group • Innovation hub • Strong CS reputation • Year abroad options • Tech city',
    requirements: 'A*AA including Maths • Contextual offers AAB'
  },
  { 
    name: 'Durham University', 
    score: 88, 
    tier: 'A',
    globalRanking: 78,
    category: 'Match',
    strengths: 'World #78 • Russell Group • Collegiate system • Beautiful campus • Strong student satisfaction • Good CS program',
    requirements: 'A*AA with A in Maths • Strong overall profile'
  },
  { 
    name: 'University of Southampton', 
    score: 87, 
    tier: 'A',
    globalRanking: 81,
    category: 'Match',
    strengths: 'World #81 • Russell Group • Web Science birthplace • AI research • Cyber Security centre • Strong industry links',
    requirements: 'AAA with Maths • Electronics/CS background helpful'
  },
  { 
    name: 'University of Glasgow', 
    score: 86, 
    tier: 'A',
    globalRanking: 76,
    category: 'Match',
    strengths: 'World #76 • Russell Group Scotland • Computing Science school • Software Engineering focus • Beautiful campus',
    requirements: 'AAA-AAB • Scottish system flexible • Strong STEM subjects'
  },
  { 
    name: 'University of Leeds', 
    score: 85, 
    tier: 'A',
    globalRanking: 86,
    category: 'Match',
    strengths: 'World #86 • Russell Group • Large CS school • Year in industry • High-Performance Computing • Student city',
    requirements: 'AAA including Maths • Industrial year popular'
  },
  { 
    name: 'University of Birmingham', 
    score: 84, 
    tier: 'A',
    globalRanking: 91,
    category: 'Match',
    strengths: 'World #91 • Russell Group • AI & Robotics • Dubai campus option • Strong research • Good facilities',
    requirements: 'AAA with Maths • Contextual offers available'
  },
  { 
    name: 'University of Nottingham', 
    score: 83, 
    tier: 'A',
    globalRanking: 100,
    category: 'Match',
    strengths: 'World #100 • Russell Group • Beautiful campus • Mixed Reality Lab • China campus • Year abroad options',
    requirements: 'AAA with Maths • Computing helpful'
  },
  { 
    name: 'Lancaster University', 
    score: 82, 
    tier: 'A',
    globalRanking: 146,
    category: 'Safety',
    strengths: 'World #146 • Collegiate system • Strong CS ranking • Data Science focus • Campus university • Good teaching',
    requirements: 'AAB-AAA • Flexible entry • Foundation year available'
  },
  { 
    name: 'University of Bath', 
    score: 81, 
    tier: 'A',
    globalRanking: 148,
    category: 'Match',
    strengths: 'World #148 • Placement year excellence • High graduate salaries • Strong industry links • Beautiful city',
    requirements: 'A*AA-AAA with Maths • Placement year integrated'
  },
  
  // Top European Universities
  { 
    name: 'ETH Zurich', 
    score: 96, 
    tier: 'S',
    globalRanking: 7,
    category: 'Reach',
    strengths: 'World #7 • Europe\'s MIT • CS excellence • Research powerhouse • English programs • Swiss quality',
    requirements: 'Excellent grades • Entrance exam • German helpful but not required'
  },
  { 
    name: 'EPFL', 
    score: 93, 
    tier: 'A',
    globalRanking: 16,
    category: 'Reach',
    strengths: 'World #16 • Swiss Federal Tech • Innovation hub • English teaching • Beautiful campus • Strong CS/Engineering',
    requirements: 'Strong maths/science • Entrance exam • English programs available'
  },
  { 
    name: 'Technical University of Munich', 
    score: 85, 
    tier: 'A',
    globalRanking: 49,
    category: 'Target',
    strengths: 'World #49 • Germany\'s top tech • No fees (EU) • English programs • Industry connections • Munich location',
    requirements: 'Strong STEM grades • German helpful • Application portfolio'
  },
  { 
    name: 'University of Amsterdam', 
    score: 79, 
    tier: 'B',
    globalRanking: 53,
    category: 'Match',
    strengths: 'World #53 • AI research hub • English programs • International environment • Great city • Liberal curriculum',
    requirements: 'Good grades • English proficiency • Motivation letter'
  },
  { 
    name: 'KU Leuven', 
    score: 77, 
    tier: 'B',
    globalRanking: 61,
    category: 'Match',
    strengths: 'World #61 • Belgium\'s best • Strong engineering • English programs • European hub • Affordable',
    requirements: 'Good academic record • English programs • EU-friendly'
  },
  { 
    name: 'Trinity College Dublin', 
    score: 75, 
    tier: 'B',
    globalRanking: 81,
    category: 'Safety',
    strengths: 'World #81 • Ireland\'s ancient university • CS & Stats combo • English-speaking • EU membership • Tech hub',
    requirements: 'AAB-AAA equivalent • Direct entry • CAO system'
  }
]

async function updateEnhancedRankings() {
  console.log('Updating universities with enhanced information...')
  
  for (const uni of enhancedRankings) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: uni.name
          }
        }
      })
      
      if (university) {
        await prisma.university.update({
          where: { id: university.id },
          data: {
            rankingScore: uni.score,
            recommendationTier: uni.tier,
            ranking: uni.globalRanking,
            category: uni.category,
            entryRequirements: uni.requirements,
            notes: uni.strengths
          }
        })
        console.log(`✓ Updated ${uni.name}: Rank #${uni.globalRanking}, Score ${uni.score}, ${uni.category}`)
      } else {
        console.log(`⚠ Not found: ${uni.name}`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }
  
  console.log('Enhanced rankings update complete!')
}

updateEnhancedRankings()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })