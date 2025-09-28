import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixAllCategories() {
  console.log('Fixing university categories for proper filtering...')
  
  // Get all universities that need fixing
  const universities = await prisma.university.findMany({
    where: {
      OR: [
        { notes: { contains: 'EU/UK OPTION' } },
        { notes: { equals: null } },
        { notes: { not: { contains: '#' } } }
      ]
    }
  })
  
  console.log(`Found ${universities.length} universities to categorize properly`)
  
  // Define proper categories based on university characteristics
  const categorizations = [
    // More UK Safety options
    { names: ['Exeter', 'York', 'Sussex', 'Kent', 'Essex', 'Hull', 'Plymouth', 'Portsmouth', 'Salford', 'Huddersfield', 'Coventry'], 
      update: (i: number) => `SAFETY #${30+i} • UK University • Good CS programs • AAB-BBB entry` },
    
    // UK Match options
    { names: ['Liverpool', 'Leicester', 'Surrey', 'Strathclyde', 'Aberdeen', 'Dundee', 'Stirling', 'Ulster'], 
      update: (i: number) => `UK MATCH #${20+i} • Russell Group options • AAA-AAB standard` },
    
    // UK Reach options  
    { names: ['Queen Mary', 'Royal Holloway', 'Brunel', 'City University', 'Aston', 'Reading', 'Heriot-Watt', 'Swansea'],
      update: (i: number) => `UK OPTION #${30+i} • London/UK locations • AAB-AAA entry` },
    
    // French universities
    { names: ['INSA Lyon', 'INSA Toulouse', 'Paris-Saclay', 'Université Paris', 'Lorraine', 'Grenoble', 'Toulouse', 'Lyon', 'Bordeaux', 'Strasbourg'],
      update: (i: number) => `EU OPTION • French university • Some English programs • Engineering focus` },
    
    // Italian universities
    { names: ['Torino', 'Milan', 'Padova', 'Trento', 'Pisa', 'Florence', 'Naples', 'Genoa'],
      update: (i: number) => `EU OPTION • Italian university • Limited English • Good for EU students` },
    
    // German universities not yet categorized
    { names: ['Dresden', 'Bonn', 'Hamburg', 'Stuttgart', 'Darmstadt', 'Mannheim', 'Cologne'],
      update: (i: number) => `EU OPTION • German university • Some English programs • No fees EU` },
    
    // Dutch universities
    { names: ['TU Delft', 'Tilburg', 'Twente', 'Maastricht', 'Wageningen', 'Rotterdam'],
      update: (i: number) => `EU OPTION • Netherlands • English programs • International environment` },
    
    // Spanish/Portuguese
    { names: ['Barcelona', 'Madrid', 'Valencia', 'Seville', 'Lisbon', 'Porto', 'Coimbra'],
      update: (i: number) => `EU OPTION • Iberian university • Some English • Affordable` },
    
    // Nordic universities
    { names: ['Chalmers', 'Gothenburg', 'Linköping', 'Bergen', 'Trondheim', 'Tampere', 'Turku'],
      update: (i: number) => `EU OPTION • Nordic university • English programs • Free/Low cost` },
    
    // Eastern European
    { names: ['Krakow', 'Budapest', 'Brno', 'Bratislava', 'Ljubljana', 'Zagreb', 'Belgrade'],
      update: (i: number) => `EU SAFETY • Eastern Europe • English programs • Very affordable` },
  ]
  
  let updated = 0
  
  for (const uni of universities) {
    let newNotes = null
    
    // Check each categorization rule
    for (const cat of categorizations) {
      const index = cat.names.findIndex(name => 
        uni.name.toLowerCase().includes(name.toLowerCase())
      )
      if (index !== -1) {
        newNotes = cat.update(index + 1)
        break
      }
    }
    
    // If no specific rule matched, assign based on ranking score
    if (!newNotes && uni.rankingScore) {
      if (uni.rankingScore >= 90) {
        newNotes = `TOP CHOICE • Excellent fit for Damien • Worth applying`
      } else if (uni.rankingScore >= 75) {
        newNotes = `GOOD OPTION • Solid choice • Achievable with 36 IB`
      } else if (uni.rankingScore >= 60) {
        newNotes = `EU ALTERNATIVE • European option • Consider as backup`
      } else if (uni.rankingScore >= 45) {
        newNotes = `REACH OPTION • Ambitious but possible • Need strong application`
      } else {
        newNotes = `UNLIKELY • Very competitive • Consider for Masters instead`
      }
    }
    
    // Default if still no category
    if (!newNotes) {
      newNotes = `STANDARD OPTION • Worth considering • Research requirements`
    }
    
    try {
      await prisma.university.update({
        where: { id: uni.id },
        data: { notes: newNotes }
      })
      updated++
    } catch (error) {
      console.error(`Error updating ${uni.name}:`, error)
    }
  }
  
  console.log(`\n✅ Fixed ${updated} universities`)
  
  // Show final distribution
  const distribution = await prisma.$queryRaw`
    SELECT 
      CASE 
        WHEN notes LIKE '%BEST FIT%' THEN 'BEST FIT'
        WHEN notes LIKE '%STRETCH%' THEN 'STRETCH'
        WHEN notes LIKE '%SAFETY%' THEN 'SAFETY'
        WHEN notes LIKE '%EU OPTION%' OR notes LIKE '%EU ALTERNATIVE%' THEN 'EU OPTION'
        WHEN notes LIKE '%EU SAFETY%' THEN 'EU SAFETY'
        WHEN notes LIKE '%UNLIKELY%' OR notes LIKE '%DIFFICULT%' THEN 'UNLIKELY/DIFFICULT'
        WHEN notes LIKE '%UK MATCH%' OR notes LIKE '%UK OPTION%' THEN 'UK OPTION'
        WHEN notes LIKE '%TOP CHOICE%' OR notes LIKE '%GOOD OPTION%' THEN 'GOOD CHOICES'
        WHEN notes LIKE '%REACH%' THEN 'REACH'
        ELSE 'OTHER'
      END as category,
      COUNT(*) as count
    FROM University
    GROUP BY category
    ORDER BY count DESC
  `
  
  console.log('\n📊 Final distribution:')
  console.log(distribution)
}

fixAllCategories()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })