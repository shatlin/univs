import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// University ranking based on multiple factors for Damien's preferences
// Factors: Academic reputation, CS program strength, entry requirements match, location, career prospects

const universityRankings = [
  // S-Tier (Top UK Universities - Best possible choices)
  { name: 'Cambridge University', score: 100, tier: 'S', reason: 'Top CS program, excellent reputation' },
  { name: 'Imperial College London', score: 98, tier: 'S', reason: 'Outstanding STEM focus, top CS program' },
  { name: 'University of Oxford', score: 97, tier: 'S', reason: 'World-class reputation, excellent CS' },
  { name: 'University College London', score: 95, tier: 'S', reason: 'Russell Group, excellent CS/Data Science' },
  { name: 'University of Edinburgh', score: 94, tier: 'S', reason: 'Top CS/AI programs, strong research' },
  
  // A-Tier (Excellent UK Universities)
  { name: 'King\'s College London', score: 92, tier: 'A', reason: 'Russell Group, strong CS program' },
  { name: 'University of Manchester', score: 91, tier: 'A', reason: 'Russell Group, excellent CS/Data Science' },
  { name: 'University of Warwick', score: 90, tier: 'A', reason: 'Top CS department, strong reputation' },
  { name: 'University of Bristol', score: 89, tier: 'A', reason: 'Russell Group, excellent CS program' },
  { name: 'Durham University', score: 88, tier: 'A', reason: 'Russell Group, good CS program' },
  { name: 'University of Southampton', score: 87, tier: 'A', reason: 'Russell Group, strong CS/AI focus' },
  { name: 'University of Glasgow', score: 86, tier: 'A', reason: 'Russell Group, good CS program' },
  { name: 'University of Leeds', score: 85, tier: 'A', reason: 'Russell Group, solid CS program' },
  { name: 'University of Birmingham', score: 84, tier: 'A', reason: 'Russell Group, good CS department' },
  { name: 'University of Nottingham', score: 83, tier: 'A', reason: 'Russell Group, decent CS program' },
  { name: 'Lancaster University', score: 82, tier: 'A', reason: 'Good CS department, rising reputation' },
  { name: 'University of Bath', score: 81, tier: 'A', reason: 'Strong CS program, good placement year' },
  { name: 'University of St Andrews', score: 80, tier: 'A', reason: 'Excellent reputation, good CS' },
  
  // B-Tier (Good UK Universities)
  { name: 'University of Sheffield', score: 78, tier: 'B', reason: 'Russell Group, solid CS options' },
  { name: 'Newcastle University', score: 77, tier: 'B', reason: 'Russell Group, decent CS program' },
  { name: 'University of York', score: 76, tier: 'B', reason: 'Russell Group, good CS department' },
  { name: 'University of Liverpool', score: 75, tier: 'B', reason: 'Russell Group, CS available' },
  { name: 'Queen Mary University London', score: 74, tier: 'B', reason: 'Russell Group, London location' },
  { name: 'University of Exeter', score: 73, tier: 'B', reason: 'Russell Group, growing CS program' },
  { name: 'Cardiff University', score: 72, tier: 'B', reason: 'Russell Group, CS options' },
  { name: 'Loughborough University', score: 71, tier: 'B', reason: 'Good CS, strong industry links' },
  { name: 'Royal Holloway University', score: 70, tier: 'B', reason: 'Good CS department, near London' },
  { name: 'University of Leicester', score: 69, tier: 'B', reason: 'Decent CS program' },
  { name: 'University of Surrey', score: 68, tier: 'B', reason: 'Good placement opportunities' },
  { name: 'University of Strathclyde', score: 67, tier: 'B', reason: 'Good CS, Scotland option' },
  { name: 'University of Sussex', score: 66, tier: 'B', reason: 'Decent CS, near Brighton' },
  { name: 'University of Aberdeen', score: 65, tier: 'B', reason: 'Scotland option, CS available' },
  { name: 'University of East Anglia', score: 64, tier: 'B', reason: 'Good campus, CS available' },
  { name: 'Queen\'s University Belfast', score: 63, tier: 'B', reason: 'Russell Group, Northern Ireland' },
  { name: 'Aston University', score: 62, tier: 'B', reason: 'Good employability, Birmingham' },
  { name: 'University of Reading', score: 61, tier: 'B', reason: 'CS available, near London' },
  { name: 'Heriot-Watt University', score: 60, tier: 'B', reason: 'Good CS, Edinburgh location' },
  
  // C-Tier (Safety Options - UK)
  { name: 'Swansea University', score: 58, tier: 'C', reason: 'CS available, Wales option' },
  { name: 'City University London', score: 57, tier: 'C', reason: 'London location, CS available' },
  { name: 'University of Essex', score: 56, tier: 'C', reason: 'CS department exists' },
  { name: 'University of Kent', score: 55, tier: 'C', reason: 'CS available, Canterbury' },
  { name: 'Brunel University London', score: 54, tier: 'C', reason: 'London location, CS offered' },
  { name: 'Oxford Brookes University', score: 53, tier: 'C', reason: 'Oxford location, CS available' },
  { name: 'Northumbria University', score: 52, tier: 'C', reason: 'Newcastle location, CS offered' },
  { name: 'University of Dundee', score: 51, tier: 'C', reason: 'Scotland option, CS available' },
  { name: 'Ulster University', score: 50, tier: 'C', reason: 'Northern Ireland option' },
  { name: 'Coventry University', score: 49, tier: 'C', reason: 'CS available, central location' },
  { name: 'University of Hull', score: 48, tier: 'C', reason: 'CS department exists' },
  { name: 'University of Plymouth', score: 47, tier: 'C', reason: 'CS available' },
  { name: 'University of Portsmouth', score: 46, tier: 'C', reason: 'CS offered, south coast' },
  { name: 'Edinburgh Napier University', score: 45, tier: 'C', reason: 'Edinburgh location, CS available' },
  { name: 'Liverpool John Moores University', score: 44, tier: 'C', reason: 'Liverpool location, CS offered' },
  { name: 'University of Huddersfield', score: 43, tier: 'C', reason: 'CS available' },
  { name: 'Nottingham Trent University', score: 42, tier: 'C', reason: 'Nottingham location, CS offered' },
  { name: 'University of Salford', score: 41, tier: 'C', reason: 'Manchester area, CS available' },
  { name: 'University of Stirling', score: 40, tier: 'C', reason: 'Scotland option, CS offered' },
  
  // European Universities (Strong alternatives)
  { name: 'ETH Zurich', score: 96, tier: 'S', reason: 'Top global tech university' },
  { name: 'EPFL', score: 93, tier: 'A', reason: 'Excellent STEM, English programs' },
  { name: 'Technical University of Munich', score: 85, tier: 'A', reason: 'Top German tech university' },
  { name: 'Delft University of Technology', score: 84, tier: 'A', reason: 'Excellent engineering, Netherlands' },
  { name: 'University of Amsterdam', score: 79, tier: 'B', reason: 'Good CS, English programs' },
  { name: 'KU Leuven', score: 77, tier: 'B', reason: 'Strong reputation, Belgium' },
  { name: 'Eindhoven University of Technology', score: 76, tier: 'B', reason: 'Tech focus, Netherlands' },
  { name: 'Trinity College Dublin', score: 75, tier: 'B', reason: 'Ireland\'s top university' },
  { name: 'University College Dublin', score: 70, tier: 'B', reason: 'Good option in Ireland' },
  { name: 'Vrije Universiteit Amsterdam', score: 68, tier: 'B', reason: 'CS available, Amsterdam' },
  { name: 'Utrecht University', score: 67, tier: 'B', reason: 'Netherlands option' },
  { name: 'Radboud University', score: 65, tier: 'B', reason: 'Netherlands, CS available' },
  { name: 'University of Groningen', score: 64, tier: 'B', reason: 'Netherlands, English programs' },
  { name: 'Copenhagen University', score: 72, tier: 'B', reason: 'Denmark\'s top university' },
  { name: 'Technical University of Denmark', score: 71, tier: 'B', reason: 'Strong tech focus' },
  { name: 'Politecnico di Milano', score: 73, tier: 'B', reason: 'Italy\'s top tech university' },
  { name: 'University of Bologna', score: 62, tier: 'B', reason: 'Historic university, Italy' },
  { name: 'Sapienza University of Rome', score: 61, tier: 'B', reason: 'Italy\'s largest university' },
  { name: 'Ludwig Maximilian University Munich', score: 74, tier: 'B', reason: 'Top German university' },
  { name: 'Heidelberg University', score: 70, tier: 'B', reason: 'Prestigious German university' },
  { name: 'RWTH Aachen', score: 76, tier: 'B', reason: 'Excellent engineering, Germany' },
  { name: 'Karlsruhe Institute of Technology', score: 75, tier: 'B', reason: 'Strong tech focus, Germany' },
  { name: 'Free University of Berlin', score: 68, tier: 'B', reason: 'Berlin location, Germany' },
  { name: 'Humboldt University Berlin', score: 67, tier: 'B', reason: 'Prestigious, Berlin' },
  { name: 'Technical University Berlin', score: 72, tier: 'B', reason: 'Tech focus, Berlin' },
  { name: 'University of Freiburg', score: 66, tier: 'B', reason: 'Good reputation, Germany' },
  { name: 'University of Göttingen', score: 65, tier: 'B', reason: 'Historic university, Germany' },
  { name: 'University of Tübingen', score: 64, tier: 'B', reason: 'Good reputation, Germany' },
  { name: 'Stockholm University', score: 69, tier: 'B', reason: 'Sweden\'s capital university' },
  { name: 'KTH Royal Institute', score: 78, tier: 'B', reason: 'Top tech university, Sweden' },
  { name: 'Lund University', score: 71, tier: 'B', reason: 'Historic Swedish university' },
  { name: 'Uppsala University', score: 70, tier: 'B', reason: 'Sweden\'s oldest university' },
  { name: 'University of Oslo', score: 68, tier: 'B', reason: 'Norway\'s top university' },
  { name: 'Norwegian University of Science and Technology', score: 72, tier: 'B', reason: 'Tech focus, Norway' },
  { name: 'University of Helsinki', score: 67, tier: 'B', reason: 'Finland\'s top university' },
  { name: 'Aalto University', score: 71, tier: 'B', reason: 'Tech and design, Finland' },
  { name: 'Sorbonne University', score: 69, tier: 'B', reason: 'Prestigious, Paris' },
  { name: 'École Polytechnique', score: 82, tier: 'A', reason: 'Elite French engineering' },
  { name: 'CentraleSupélec', score: 78, tier: 'B', reason: 'Top engineering, France' },
  { name: 'University of Warsaw', score: 60, tier: 'C', reason: 'Poland\'s top university' },
  { name: 'Jagiellonian University', score: 58, tier: 'C', reason: 'Historic Polish university' },
  { name: 'Charles University', score: 59, tier: 'C', reason: 'Czech Republic\'s top' },
  { name: 'Czech Technical University', score: 61, tier: 'B', reason: 'Tech focus, Prague' },
  { name: 'Vienna University of Technology', score: 73, tier: 'B', reason: 'Tech focus, Austria' },
  { name: 'University of Vienna', score: 66, tier: 'B', reason: 'Austria\'s largest university' },
  { name: 'Graz University of Technology', score: 68, tier: 'B', reason: 'Tech focus, Austria' },
  { name: 'University of Zurich', score: 80, tier: 'A', reason: 'Top Swiss university' },
  { name: 'University of Basel', score: 74, tier: 'B', reason: 'Good reputation, Switzerland' },
  { name: 'University of Bern', score: 72, tier: 'B', reason: 'Swiss capital university' },
  { name: 'University of Geneva', score: 73, tier: 'B', reason: 'International city, Switzerland' },
  { name: 'University of Lausanne', score: 71, tier: 'B', reason: 'Good reputation, Switzerland' },
  { name: 'Polytechnic University of Catalonia', score: 65, tier: 'B', reason: 'Tech focus, Barcelona' },
  { name: 'Complutense University Madrid', score: 60, tier: 'C', reason: 'Spain\'s largest university' },
  { name: 'Autonomous University of Barcelona', score: 64, tier: 'B', reason: 'Good reputation, Spain' },
  { name: 'Pompeu Fabra University', score: 66, tier: 'B', reason: 'Modern university, Barcelona' },
  { name: 'IE University', score: 68, tier: 'B', reason: 'International focus, Spain' },
  { name: 'University of Lisbon', score: 59, tier: 'C', reason: 'Portugal\'s largest' },
  { name: 'University of Porto', score: 60, tier: 'C', reason: 'Good engineering, Portugal' },
  { name: 'University of Athens', score: 55, tier: 'C', reason: 'Greece\'s largest university' },
  { name: 'Aristotle University', score: 54, tier: 'C', reason: 'Thessaloniki, Greece' },
  { name: 'University of Ljubljana', score: 58, tier: 'C', reason: 'Slovenia\'s main university' },
  { name: 'University of Zagreb', score: 57, tier: 'C', reason: 'Croatia\'s largest' },
  { name: 'University of Tartu', score: 62, tier: 'B', reason: 'Estonia, good CS program' },
  { name: 'Tallinn University of Technology', score: 64, tier: 'B', reason: 'Tech focus, Estonia' },
  { name: 'Riga Technical University', score: 56, tier: 'C', reason: 'Tech focus, Latvia' },
  { name: 'Vilnius University', score: 57, tier: 'C', reason: 'Lithuania\'s oldest' },
]

async function updateRankings() {
  console.log('Updating university rankings...')
  
  for (const ranking of universityRankings) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: ranking.name
          }
        }
      })
      
      if (university) {
        await prisma.university.update({
          where: { id: university.id },
          data: {
            rankingScore: ranking.score,
            recommendationTier: ranking.tier,
            notes: university.notes ? 
              `${university.notes}\n\nRanking: ${ranking.reason}` : 
              `Ranking: ${ranking.reason}`
          }
        })
        console.log(`✓ Updated ${ranking.name}: Score ${ranking.score}, Tier ${ranking.tier}`)
      } else {
        console.log(`⚠ Not found: ${ranking.name}`)
      }
    } catch (error) {
      console.error(`Error updating ${ranking.name}:`, error)
    }
  }
  
  console.log('Rankings update complete!')
}

updateRankings()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })