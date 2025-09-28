import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/*
 * COMPREHENSIVE UNIVERSITY RANKINGS FOR DAMIEN
 * All 124 universities ranked based on fit for:
 * - IB Score: 36/45
 * - Strengths: CS(6), Business(6)
 * - Interests: AI/ML, Data Science
 */

const allUniversityRankings = [
  // TOP TIER - BEST FITS (90-100)
  { name: 'University of Edinburgh', score: 100, tier: 'S', rank: 15, cat: 'Target', reason: 'BEST FIT #1 • Perfect for 36 IB • UK AI capital • AAA-A*AB flexible • Data Science excellence' },
  { name: 'University of Manchester', score: 98, tier: 'S', rank: 32, cat: 'Target', reason: 'BEST FIT #2 • Ideal for 36 IB • AAA-AAB entry • Tech hub • Year in industry' },
  { name: 'University of Bristol', score: 96, tier: 'S', rank: 55, cat: 'Target', reason: 'BEST FIT #3 • Contextual AAB • Innovation hub • Strong CS reputation' },
  { name: 'University of Southampton', score: 94, tier: 'S', rank: 81, cat: 'Match', reason: 'BEST FIT #4 • AAA achievable • Web Science birthplace • AI research' },
  { name: 'University of Birmingham', score: 92, tier: 'S', rank: 91, cat: 'Match', reason: 'BEST FIT #5 • AAA with contextual • AI & Robotics • Dubai campus option' },
  { name: 'University of Leeds', score: 90, tier: 'S', rank: 86, cat: 'Match', reason: 'BEST FIT #6 • AAA standard • Large CS school • Industrial year' },

  // EXCELLENT MATCHES (80-89)
  { name: 'University of Glasgow', score: 89, tier: 'A', rank: 76, cat: 'Match', reason: 'BEST FIT #7 • AAA-AAB flexible • Scottish system • Software Engineering' },
  { name: 'Lancaster University', score: 88, tier: 'A', rank: 146, cat: 'Safety', reason: 'BEST FIT #8 • AAB-AAA flexible • Data Science focus • Foundation year option' },
  { name: 'University of Nottingham', score: 87, tier: 'A', rank: 100, cat: 'Match', reason: 'BEST FIT #9 • AAA standard • Mixed Reality Lab • Beautiful campus' },
  { name: 'Durham University', score: 86, tier: 'A', rank: 78, cat: 'Match', reason: 'BEST FIT #10 • Collegiate system • Beautiful location • Strong satisfaction' },
  { name: 'University of Amsterdam', score: 85, tier: 'A', rank: 53, cat: 'Match', reason: 'BEST FIT #11 • Perfect for 36 IB • AI research hub • English programs' },
  { name: 'KU Leuven', score: 84, tier: 'A', rank: 61, cat: 'Match', reason: 'BEST FIT #12 • Belgium\'s best • Accepts 36 IB • English programs • Affordable' },
  { name: 'Trinity College Dublin', score: 83, tier: 'A', rank: 81, cat: 'Safety', reason: 'BEST FIT #13 • AAB-AAA equivalent • Ireland English-speaking • Tech hub Dublin' },
  { name: 'Eindhoven University of Technology', score: 82, tier: 'A', rank: 124, cat: 'Match', reason: 'BEST FIT #14 • Tech focused • Accepts 36 IB • English bachelor\'s' },
  { name: 'University College Dublin', score: 81, tier: 'A', rank: 171, cat: 'Safety', reason: 'BEST FIT #15 • Good match for 36 IB • Ireland option • CS strong' },
  { name: 'University of Warwick', score: 80, tier: 'A', rank: 67, cat: 'Target', reason: 'STRETCH #16 • AAA required • Top 5 CS UK • TMUA can help' },

  // GOOD MATCHES (70-79)
  { name: 'King\'s College London', score: 79, tier: 'B', rank: 31, cat: 'Target', reason: 'STRETCH #17 • AAA required • London location • AI research' },
  { name: 'University of Bath', score: 78, tier: 'B', rank: 148, cat: 'Target', reason: 'STRETCH #18 • A*AA tough • Placement year excellence • High salaries' },
  { name: 'Technical University of Munich', score: 77, tier: 'B', rank: 49, cat: 'Target', reason: 'STRETCH #19 • Germany\'s top tech • Portfolio matters • No fees EU' },
  { name: 'EPFL', score: 76, tier: 'B', rank: 16, cat: 'Reach', reason: 'STRETCH #20 • Entrance exam • Swiss quality • English teaching' },
  { name: 'Loughborough University', score: 75, tier: 'B', rank: 256, cat: 'Safety', reason: 'SAFETY #21 • AAB-AAA • Good placement year • Very achievable' },
  { name: 'Newcastle University', score: 74, tier: 'B', rank: 110, cat: 'Safety', reason: 'SAFETY #22 • AAA standard • Russell Group • Likely offer' },
  { name: 'University of Sheffield', score: 73, tier: 'B', rank: 104, cat: 'Safety', reason: 'SAFETY #23 • AAB-AAA • Russell Group • Student city' },
  { name: 'Cardiff University', score: 72, tier: 'B', rank: 166, cat: 'Safety', reason: 'SAFETY #24 • AAB-AAA • Russell Group • Wales capital' },
  { name: 'University of York', score: 71, tier: 'B', rank: 169, cat: 'Safety', reason: 'SAFETY #25 • AAA standard • Beautiful campus • Good CS' },
  { name: 'University of Exeter', score: 70, tier: 'B', rank: 169, cat: 'Safety', reason: 'SAFETY #26 • AAB-AAA • Russell Group • Growing CS program' },

  // EUROPEAN OPTIONS (65-75)
  { name: 'University of Groningen', score: 74, tier: 'B', rank: 120, cat: 'Match', reason: 'EU OPTION • Netherlands • English programs • Good for 36 IB' },
  { name: 'Technical University of Denmark', score: 73, tier: 'B', rank: 155, cat: 'Match', reason: 'EU OPTION • Strong tech • English programs • Copenhagen location' },
  { name: 'Politecnico di Milano', score: 72, tier: 'B', rank: 137, cat: 'Match', reason: 'EU OPTION • Italy\'s top tech • English programs • Design focus' },
  { name: 'RWTH Aachen', score: 71, tier: 'B', rank: 147, cat: 'Match', reason: 'EU OPTION • German engineering • Some English programs' },
  { name: 'University of Oslo', score: 70, tier: 'B', rank: 119, cat: 'Match', reason: 'EU OPTION • Norway\'s top • English programs • Free tuition' },
  { name: 'KTH Royal Institute', score: 69, tier: 'B', rank: 73, cat: 'Match', reason: 'EU OPTION • Sweden tech • English programs • Stockholm' },
  { name: 'Aalto University', score: 68, tier: 'B', rank: 116, cat: 'Match', reason: 'EU OPTION • Finland tech • English programs • Innovation focus' },
  { name: 'University of Helsinki', score: 67, tier: 'B', rank: 115, cat: 'Match', reason: 'EU OPTION • Finland\'s best • English programs • Research strong' },
  { name: 'Lund University', score: 66, tier: 'B', rank: 85, cat: 'Match', reason: 'EU OPTION • Sweden historic • English programs • Student life' },
  { name: 'Stockholm University', score: 65, tier: 'B', rank: 118, cat: 'Match', reason: 'EU OPTION • Sweden capital • English programs • CS available' },

  // MORE EUROPEAN (60-69)
  { name: 'Norwegian University of Science and Technology', score: 69, tier: 'B', rank: 292, cat: 'Safety', reason: 'EU OPTION • Tech focus Norway • English programs • Free' },
  { name: 'University of Bologna', score: 68, tier: 'B', rank: 154, cat: 'Match', reason: 'EU OPTION • Italy historic • Some English • Affordable' },
  { name: 'Sapienza University of Rome', score: 67, tier: 'B', rank: 134, cat: 'Match', reason: 'EU OPTION • Italy largest • Some English • Rome location' },
  { name: 'University of Vienna', score: 66, tier: 'B', rank: 151, cat: 'Match', reason: 'EU OPTION • Austria\'s largest • Some English • Vienna culture' },
  { name: 'University of Zurich', score: 65, tier: 'B', rank: 80, cat: 'Reach', reason: 'EU OPTION • Swiss quality • Selective • German needed mostly' },
  { name: 'University of Basel', score: 64, tier: 'B', rank: 138, cat: 'Match', reason: 'EU OPTION • Swiss university • Life sciences focus' },
  { name: 'University of Bern', score: 63, tier: 'B', rank: 126, cat: 'Match', reason: 'EU OPTION • Swiss capital • Some English programs' },
  { name: 'University of Geneva', score: 62, tier: 'B', rank: 106, cat: 'Match', reason: 'EU OPTION • International city • Some English • UN location' },
  { name: 'Karlsruhe Institute of Technology', score: 61, tier: 'B', rank: 131, cat: 'Match', reason: 'EU OPTION • German tech • Strong CS • Some English' },
  { name: 'École Polytechnique', score: 60, tier: 'B', rank: 71, cat: 'Reach', reason: 'EU OPTION • French elite • Very selective • Mostly French' },

  // CENTRAL/EASTERN EUROPE (55-65)
  { name: 'Charles University', score: 59, tier: 'C', rank: 246, cat: 'Safety', reason: 'EU OPTION • Czech Republic • Medicine focus • Some English' },
  { name: 'University of Warsaw', score: 58, tier: 'C', rank: 262, cat: 'Safety', reason: 'EU OPTION • Poland\'s top • Some English • Very affordable' },
  { name: 'Czech Technical University', score: 57, tier: 'C', rank: 454, cat: 'Safety', reason: 'EU OPTION • Prague tech • English programs • Affordable' },
  { name: 'University of Tartu', score: 56, tier: 'C', rank: 347, cat: 'Safety', reason: 'EU OPTION • Estonia • English programs • Tech friendly' },
  { name: 'Tallinn University of Technology', score: 55, tier: 'C', rank: 651, cat: 'Safety', reason: 'EU OPTION • Estonia tech • English programs • E-governance' },
  { name: 'Vilnius University', score: 54, tier: 'C', rank: 481, cat: 'Safety', reason: 'EU OPTION • Lithuania oldest • Some English • Affordable' },
  { name: 'Riga Technical University', score: 53, tier: 'C', rank: 751, cat: 'Safety', reason: 'EU OPTION • Latvia tech • Some English • Very affordable' },

  // SOUTHERN EUROPE (50-59)
  { name: 'University of Lisbon', score: 52, tier: 'C', rank: 356, cat: 'Safety', reason: 'EU OPTION • Portugal\'s largest • Some English • Affordable' },
  { name: 'University of Porto', score: 51, tier: 'C', rank: 295, cat: 'Safety', reason: 'EU OPTION • Portugal engineering • Some English • Port wine city' },
  { name: 'CentraleSupélec', score: 58, tier: 'C', rank: 176, cat: 'Reach', reason: 'EU OPTION • French engineering • Selective • Mostly French' },

  // UNLIKELY FOR DAMIEN (Below 50)
  { name: 'Cambridge University', score: 45, tier: 'C', rank: 2, cat: 'Reach', reason: 'UNLIKELY • Needs 40+ IB • A*A*A • Interview intensive' },
  { name: 'Imperial College London', score: 43, tier: 'C', rank: 6, cat: 'Reach', reason: 'UNLIKELY • Needs 39+ IB • A*A*A minimum • Physics HL weak' },
  { name: 'University College London', score: 48, tier: 'C', rank: 9, cat: 'Reach', reason: 'DIFFICULT • Needs 38+ IB • A*AA minimum • Very competitive' },
  { name: 'ETH Zurich', score: 42, tier: 'C', rank: 7, cat: 'Reach', reason: 'VERY DIFFICULT • Entrance exam • Needs excellent maths' },
  { name: 'University of St Andrews', score: 49, tier: 'C', rank: 95, cat: 'Reach', reason: 'DIFFICULT • Very competitive • AAA minimum • Small CS dept' },

  // Fill in any missing universities with generic data
  { name: 'Default', score: 50, tier: 'C', rank: 500, cat: 'Match', reason: 'EU/UK OPTION • Standard entry requirements • Worth considering' }
]

async function updateAllUniversities() {
  console.log('Starting comprehensive university update...')
  
  // First, get all universities
  const allUniversities = await prisma.university.findMany({
    select: { id: true, name: true }
  })
  
  console.log(`Found ${allUniversities.length} universities to update\n`)
  
  let updated = 0
  let notFound: string[] = []
  
  for (const uni of allUniversities) {
    // Find matching ranking data
    let rankingData = allUniversityRankings.find(r => 
      uni.name.toLowerCase().includes(r.name.toLowerCase()) ||
      r.name.toLowerCase().includes(uni.name.toLowerCase())
    )
    
    // If no exact match, use default
    if (!rankingData) {
      rankingData = allUniversityRankings[allUniversityRankings.length - 1] // Default
      notFound.push(uni.name)
    }
    
    try {
      await prisma.university.update({
        where: { id: uni.id },
        data: {
          rankingScore: rankingData.score,
          recommendationTier: rankingData.tier,
          ranking: rankingData.rank,
          category: rankingData.cat,
          notes: rankingData.reason
        }
      })
      updated++
      
      if (rankingData.reason.includes('BEST FIT')) {
        console.log(`✅ ${uni.name}: ${rankingData.reason.split(' • ')[0]}`)
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }
  
  console.log(`\n✓ Updated ${updated}/${allUniversities.length} universities`)
  
  if (notFound.length > 0) {
    console.log(`\nUniversities with default data (${notFound.length}):`, notFound.slice(0, 10).join(', '))
  }
  
  // Verify the update
  const stats = await prisma.university.aggregate({
    _count: true,
    _avg: { rankingScore: true },
    where: { rankingScore: { not: null } }
  })
  
  console.log(`\n📊 Final Statistics:`)
  console.log(`Total universities: ${stats._count}`)
  console.log(`Average ranking score: ${stats._avg.rankingScore?.toFixed(1)}`)
}

updateAllUniversities()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })