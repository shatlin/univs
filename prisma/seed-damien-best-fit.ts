import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/*
 * BEST FIT UNIVERSITIES FOR DAMIEN
 * Based on:
 * - Predicted IB Score: 36/45
 * - Strong subjects: Computer Science (6), Business (6)
 * - Moderate: English (5), Maths (5)
 * - Weak: Physics (4), French (4)
 * - Interests: CS, Data Science, AI/ML
 * - Preferred: UK and EU universities
 */

const damienBestFit = [
  // TIER 1: PERFECT MATCHES (Realistic top choices with 36 IB points)
  {
    name: 'University of Edinburgh',
    score: 100,
    tier: 'S',
    reason: 'BEST FIT #1 • Perfect for 36 IB • UK\'s AI capital • Accepts AAA-A*AB • Strong CS(6) valued • Data Science excellence • Beautiful city • Contextual offers available'
  },
  {
    name: 'University of Manchester',
    score: 98,
    tier: 'S',
    reason: 'BEST FIT #2 • Ideal for 36 IB • AAA-AAB entry • Tech hub city • Year in industry • Strong CS program • Good with Business(6) combo'
  },
  {
    name: 'University of Bristol',
    score: 96,
    tier: 'S',
    reason: 'BEST FIT #3 • Contextual offers AAB • Innovation hub • Strong CS reputation • Values high CS grades • Good student life'
  },
  {
    name: 'University of Southampton',
    score: 94,
    tier: 'S',
    reason: 'BEST FIT #4 • AAA achievable • Web Science birthplace • AI research strong • Cyber Security • Industry connections'
  },
  {
    name: 'University of Birmingham',
    score: 92,
    tier: 'S',
    reason: 'BEST FIT #5 • AAA with contextual • AI & Robotics focus • Dubai campus option • Russell Group • Good for 36 IB'
  },

  // TIER 2: EXCELLENT MATCHES (Very achievable with 36 points)
  {
    name: 'University of Leeds',
    score: 90,
    tier: 'A',
    reason: 'BEST FIT #6 • AAA standard offer • Large CS school • Industrial year • High-Performance Computing • Student-friendly city'
  },
  {
    name: 'University of Glasgow',
    score: 89,
    tier: 'A',
    reason: 'BEST FIT #7 • AAA-AAB flexible • Scottish system • Software Engineering focus • Beautiful campus • CS(6) appreciated'
  },
  {
    name: 'Lancaster University',
    score: 88,
    tier: 'A',
    reason: 'BEST FIT #8 • AAB-AAA flexible • Strong CS ranking • Data Science focus • Foundation year backup • Very achievable'
  },
  {
    name: 'University of Nottingham',
    score: 87,
    tier: 'A',
    reason: 'BEST FIT #9 • AAA standard • Mixed Reality Lab • Beautiful campus • China campus option • Good for 36 IB'
  },
  {
    name: 'Durham University',
    score: 86,
    tier: 'A',
    reason: 'BEST FIT #10 • Collegiate system • Beautiful location • Strong overall profile matters • Good student satisfaction'
  },

  // TIER 3: STRONG EUROPEAN OPTIONS (Great alternatives)
  {
    name: 'University of Amsterdam',
    score: 85,
    tier: 'A',
    reason: 'BEST FIT #11 • Perfect for 36 IB • AI research hub • English programs • International environment • No UK fees'
  },
  {
    name: 'KU Leuven',
    score: 84,
    tier: 'A',
    reason: 'BEST FIT #12 • Belgium\'s best • Accepts 36 IB • English programs • EU location • Very affordable • Strong engineering'
  },
  {
    name: 'Trinity College Dublin',
    score: 83,
    tier: 'A',
    reason: 'BEST FIT #13 • AAB-AAA equivalent • Ireland (English-speaking) • CS & Stats combo • Direct entry • Tech hub Dublin'
  },
  {
    name: 'Eindhoven University of Technology',
    score: 82,
    tier: 'A',
    reason: 'BEST FIT #14 • Tech focused • Accepts 36 IB • English bachelor\'s • Netherlands • Data Science strong'
  },
  {
    name: 'University College Dublin',
    score: 81,
    tier: 'A',
    reason: 'BEST FIT #15 • Good match for 36 IB • Ireland option • Computer Science strong • English-speaking • EU benefits'
  },

  // TIER 4: AMBITIOUS BUT POSSIBLE (Stretch goals with strong application)
  {
    name: 'University of Warwick',
    score: 80,
    tier: 'B',
    reason: 'STRETCH #16 • AAA required • TMUA can help • Top 5 CS UK • Discrete Maths focus • Worth trying with CS(6)'
  },
  {
    name: 'King\'s College London',
    score: 79,
    tier: 'B',
    reason: 'STRETCH #17 • AAA required • London location • AI research • May consider high CS grade • Central location advantage'
  },
  {
    name: 'University of Bath',
    score: 78,
    tier: 'B',
    reason: 'STRETCH #18 • A*AA tough but possible • Placement year excellence • High graduate salaries • Beautiful city'
  },
  {
    name: 'Technical University of Munich',
    score: 77,
    tier: 'B',
    reason: 'STRETCH #19 • Germany\'s top tech • Portfolio matters • CS(6) helps • No fees (EU) • English programs available'
  },
  {
    name: 'EPFL',
    score: 76,
    tier: 'B',
    reason: 'STRETCH #20 • Entrance exam required • Swiss quality • English teaching • Worth attempting • Innovation hub'
  },

  // TIER 5: SAFETY OPTIONS (Very likely to get offers)
  {
    name: 'Loughborough University',
    score: 75,
    tier: 'B',
    reason: 'SAFETY #21 • AAB-AAA • Good placement year • Strong industry links • Sports campus • Very achievable'
  },
  {
    name: 'Newcastle University',
    score: 74,
    tier: 'B',
    reason: 'SAFETY #22 • AAA standard • Russell Group • Good city • CS program solid • Likely offer with 36 IB'
  },
  {
    name: 'University of Sheffield',
    score: 73,
    tier: 'B',
    reason: 'SAFETY #23 • AAB-AAA • Russell Group • Good CS options • Student city • Strong safety choice'
  },
  {
    name: 'Cardiff University',
    score: 72,
    tier: 'B',
    reason: 'SAFETY #24 • AAB-AAA • Russell Group • Wales capital • CS available • Good backup option'
  },
  {
    name: 'University of York',
    score: 71,
    tier: 'B',
    reason: 'SAFETY #25 • AAA standard • Russell Group • Beautiful campus • Safety systems research • Good CS department'
  },

  // Update less realistic options to lower scores
  {
    name: 'Cambridge University',
    score: 50,
    tier: 'C',
    reason: 'UNLIKELY • Needs 40+ IB typically • A*A*A required • Interview intensive • Physics(4) problematic • Keep as dream'
  },
  {
    name: 'Imperial College London',
    score: 48,
    tier: 'C',
    reason: 'UNLIKELY • Needs 39+ IB minimum • A*A*A-A*AAA • Physics HL weak point • Maths(5) not strong enough'
  },
  {
    name: 'University College London',
    score: 55,
    tier: 'C',
    reason: 'DIFFICULT • Needs 38+ typically • A*AA minimum • Very competitive • Worth one application if passionate'
  },
  {
    name: 'ETH Zurich',
    score: 45,
    tier: 'C',
    reason: 'VERY DIFFICULT • Entrance exam challenging • Needs excellent maths • Physics(4) problematic • Consider for masters instead'
  }
]

async function updateDamienBestFit() {
  console.log('Updating universities with Damien\'s personalized best-fit rankings...')
  console.log('Based on: IB 36/45, CS(6), Business(6), Maths(5), English(5), Physics(4), French(4)')
  console.log('')
  
  for (const uni of damienBestFit) {
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
            notes: uni.reason
          }
        })
        
        if (uni.score >= 90) {
          console.log(`✅ ${uni.reason.split(' • ')[0]} - ${uni.name}`)
        } else if (uni.score >= 75) {
          console.log(`✓ ${uni.reason.split(' • ')[0]} - ${uni.name}`)
        } else {
          console.log(`⚠️ ${uni.reason.split(' • ')[0]} - ${uni.name}`)
        }
      }
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }
  
  console.log('\n📊 Summary for Damien:')
  console.log('Top 5 Best Fits: Edinburgh, Manchester, Bristol, Southampton, Birmingham')
  console.log('Strong Matches (6-10): Leeds, Glasgow, Lancaster, Nottingham, Durham')
  console.log('EU Alternatives (11-15): Amsterdam, Leuven, Trinity Dublin, Eindhoven, UCD')
  console.log('Stretch Goals (16-20): Warwick, KCL, Bath, TU Munich, EPFL')
  console.log('Safety Options (21-25): Loughborough, Newcastle, Sheffield, Cardiff, York')
  console.log('\nRecommended application strategy: Apply to 5 best fits + 2 stretches + 2 safeties')
}

updateDamienBestFit()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })