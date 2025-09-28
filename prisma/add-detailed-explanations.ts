import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/*
 * DETAILED EXPLANATIONS FOR EACH UNIVERSITY
 * Based on Damien's Profile:
 * - IB Score: 36/45 (Predicted)
 * - Strong: CS (6), Business (6)
 * - Average: English (5), Maths (5)
 * - Weak: Physics (4), French (4)
 */

const detailedExplanations = [
  // TOP BEST FIT UNIVERSITIES
  {
    name: 'University of Edinburgh',
    details: `BEST FIT #1 - Perfect Match for Damien

📊 Why It's #1 Best Fit:
• Predicted Score Match: Your 36 IB points meets their typical AAA-A*AB requirement
• UK's AI Capital: Edinburgh leads in AI research with world-class Informatics department
• Strong CS Grade Valued: Your CS HL grade 6 is highly regarded here
• Contextual Offers: May reduce requirements based on circumstances
• Data Science Excellence: Pioneer in Data Science education, perfect for your interests

✅ Strengths for Your Profile:
• Accepts 36 IB points (equivalent to AAA)
• Values high Computer Science grades over Physics
• Business knowledge (grade 6) useful for tech entrepreneurship focus
• Beautiful historic city with lower living costs than London
• Strong industry connections with tech companies

⚠️ Considerations:
• Competitive (20% acceptance rate for CS)
• Cold weather might be an adjustment
• Far from home if you're not from Scotland

💡 Application Tips:
• Emphasize your CS projects and achievements
• Mention interest in AI/ML in personal statement
• Apply early (October 15 deadline for equal consideration)`
  },
  
  {
    name: 'University of Manchester',
    details: `BEST FIT #2 - Excellent Match

📊 Why It's #2 Best Fit:
• Entry Requirements: AAA-AAB perfectly achievable with your 36 IB
• Tech Hub Location: Manchester is UK's second tech city
• Year in Industry: Integrated placement year for experience
• CS/Business Combo: Your dual strength perfectly suited

✅ Strengths for Your Profile:
• Graphene research hub (cutting-edge tech)
• Large CS department with diverse specializations
• Strong graduate employment rates (94%)
• More affordable than London
• Vibrant student city culture

⚠️ Considerations:
• Large university (40,000+ students)
• Rainy weather reputation
• Competitive for international students

💡 Application Strategy:
• Highlight interest in practical applications
• Mention Business grade for entrepreneurship modules
• Consider applying for CS with Business pathway`
  },

  {
    name: 'University of Bristol',
    details: `BEST FIT #3 - Strategic Choice

📊 Why It's #3 Best Fit:
• Contextual Offers: Could get AAB offer instead of A*AA
• Innovation Hub: Strong startup ecosystem
• CS Reputation: Top 5 UK for Computer Science

✅ Strengths for Your Profile:
• Values subject-specific excellence (your CS 6)
• Less emphasis on Physics grades
• Beautiful city with good quality of life
• Strong industry partnerships
• Year abroad opportunities

⚠️ Considerations:
• Expensive city to live in
• Highly competitive (15% acceptance rate)
• Standard offer is A*AA (higher than predicted)

💡 Application Strategy:
• Apply for contextual consideration if eligible
• Emphasize practical CS experience
• Show genuine interest in their specific programs`
  },

  // STRETCH UNIVERSITIES
  {
    name: 'University of Warwick',
    details: `STRETCH #15 - Ambitious but Possible

📊 Why It's a Stretch:
• Requirements: AAA minimum, often higher in practice
• Your 36 IB is borderline for their standards
• Highly mathematical CS program (Maths at 5 might be challenging)

✅ Why Consider It:
• Top 5 UK for Computer Science
• Discrete Mathematics focus aligns with CS theory
• TMUA test can lower offer to AAB
• Strong reputation with employers
• Beautiful campus environment

⚠️ Challenges:
• Very competitive (10% acceptance for CS)
• Heavy mathematical content
• Less practical, more theoretical focus
• Campus isolated from city

💡 Application Strategy:
• MUST take TMUA test to improve chances
• Emphasize mathematical problem-solving skills
• Show interest in theoretical CS
• Apply early and prepare thoroughly for TMUA`
  },

  {
    name: "King's College London",
    details: `STRETCH #16 - London Advantage

📊 Why It's a Stretch:
• Requires solid AAA minimum
• London universities are highly competitive
• Your 36 IB is at the lower end of typical admits

✅ Why Consider It:
• London location for internships
• Strong AI research department
• May value your CS grade 6 highly
• Excellent industry connections
• Diverse, international environment

⚠️ Challenges:
• Very expensive living costs
• Intense competition from international students
• Less campus feel, more urban university

💡 Application Strategy:
• Emphasize London-specific opportunities in statement
• Show how you'll use city resources
• Apply to less competitive joint programs`
  },

  // UNLIKELY UNIVERSITIES
  {
    name: 'Cambridge University',
    details: `UNLIKELY - Dream School Category

📊 Why It's Unlikely:
• Requires 40-42 IB typically (you have 36 predicted)
• Needs A*A*A equivalent (7,7,6 in HLs minimum)
• Your Physics HL at 4 is significantly below requirements
• Your Maths HL at 5 is below their usual standard
• Interview process extremely challenging
• Computer Lab admits only 100 students/year

❌ Major Barriers:
• 4-6 point IB gap from typical admits
• Physics and Maths grades too low for their standards
• TMUA/CTMUA test required with high scores
• Interview success rate <20% even for qualified candidates

✅ Only Consider If:
• You can retake and improve to 38+ IB
• You're exceptional in other ways (olympiads, research)
• You're willing to face likely rejection
• You have strong backup options

💡 Reality Check:
• Success rate with 36 IB: <5%
• Consider for postgraduate instead
• Trinity College slightly easier than others
• Natural Sciences might be even harder given Physics grade`
  },

  {
    name: 'Imperial College London',
    details: `UNLIKELY - STEM Powerhouse

📊 Why It's Unlikely:
• Requires 39+ IB minimum (you have 36)
• Needs A*A*A to A*AAA equivalent
• Physics HL at grade 4 is deal-breaker (they need 6-7)
• Heavily STEM-focused assessment
• Computing admits ~150 from 3000+ applicants

❌ Major Barriers:
• 3+ point IB gap from minimum
• Physics grade critically low for their standards
• Maths at 5 is below their preference
• No contextual admissions policy
• International competition fierce

✅ Only Consider If:
• You can improve grades significantly
• You have exceptional achievements
• You're applying to joint programs with lower requirements

💡 Reality Check:
• Success rate with 36 IB: <3%
• MEng Computing even more competitive
• Consider their Business School instead
• Better chance at postgraduate level`
  },

  {
    name: 'ETH Zurich',
    details: `VERY DIFFICULT - Swiss Excellence

📊 Why It's Very Difficult:
• Entrance exam (not IB-based admission)
• Requires exceptional mathematical ability
• Physics weakness (4) problematic for exam
• German helpful though not required
• Admits primarily Swiss/EU students

❌ Major Barriers:
• Entrance exam covers advanced maths/physics
• Your Physics 4 indicates knowledge gaps
• Maths 5 suggests exam would be challenging
• Different education system alignment
• Living costs extremely high

✅ Only Consider If:
• You're willing to prepare intensively for entrance exam
• You can afford Swiss living costs (CHF 30,000/year)
• You're genuinely interested in theoretical CS

💡 Reality Check:
• Pass rate for entrance exam: ~30%
• Better suited for Masters after UK bachelor's
• Consider EPFL as slightly easier alternative
• Exchange programs might be better option`
  },

  // SAFETY OPTIONS
  {
    name: 'Lancaster University',
    details: `SAFETY #8 / BEST FIT #8 - Excellent Safety Choice

📊 Why It's a Safety/Best Fit:
• Entry Requirements: AAB-AAA flexible approach
• Your 36 IB exceeds their typical requirements
• Strong CS department despite overall ranking
• Foundation year available as ultimate backup

✅ Perfect for Your Profile:
• Data Science specialization available
• Accepts 35+ IB readily
• Values CS subject grade over overall score
• Beautiful campus environment
• Collegiate system like Oxbridge
• 96% student satisfaction for CS

✅ Additional Benefits:
• Guaranteed accommodation
• Strong student support
• Good graduate prospects (85% employment)
• More affordable location
• Close to Lake District

💡 Why Apply:
• Very likely to receive offer
• Often give offers below published grades
• Excellent backup with quality education
• Consider as insurance choice
• Early application might yield unconditional offer`
  },

  {
    name: 'Newcastle University',
    details: `SAFETY #22 - Solid Backup

📊 Why It's a Safety:
• AAA standard requirement achievable
• Russell Group status
• Your profile exceeds typical admits
• High offer rate for qualified candidates

✅ Good Match Because:
• Urban campus in city center
• Growing tech sector in Newcastle
• Good nightlife and student culture
• More affordable than southern cities
• Strong student support services

💡 Application Strategy:
• Apply as insurance choice
• Likely to receive offer quickly
• Consider for adjustment if needed
• Good option if other plans fall through`
  },

  // MORE BEST FIT & MATCH OPTIONS
  {
    name: 'University of Glasgow',
    details: `BEST FIT #4 - Strong Scottish Option

📊 Why It's #4 Best Fit:
• Entry Requirements: AAA-AAB achievable with 36 IB
• Scotland's tech hub with growing scene
• Strong CS department with AI focus
• Beautiful campus and city culture

✅ Strengths for Your Profile:
• Accepts 36 IB points readily
• Values CS achievement over Physics
• Year abroad opportunities
• Lower living costs than English cities
• 4-year Scottish degree gives more depth

⚠️ Considerations:
• 4-year degree (vs 3 in England)
• Weather can be challenging
• Competition increasing yearly

💡 Application Tips:
• Apply early for best consideration
• Mention interest in 4-year program benefits
• Highlight CS project work`
  },

  {
    name: 'University of Birmingham',
    details: `BEST FIT #5 - Excellent Match

📊 Why It's #5 Best Fit:
• Entry: AAA achievable with your 36 IB
• Strong industry connections in Birmingham
• Excellent CS department with practical focus
• Year in industry option available

✅ Strengths for Your Profile:
• Values high CS grades (your 6)
• Business combination programs available
• Beautiful campus close to city
• Strong graduate employment
• Diverse student body

⚠️ Considerations:
• Birmingham less tech-focused than Manchester/London
• Campus bit far from city center
• Large university environment

💡 Application Tips:
• Emphasize practical interests
• Mention industry placement interest
• Show knowledge of their specific programs`
  },

  {
    name: 'University of Leeds',
    details: `BEST FIT #6 - Solid Choice

📊 Why It's #6 Best Fit:
• Requirements: AAA standard, achievable
• Growing tech scene in Leeds
• Strong CS program with flexibility
• Good student satisfaction scores

✅ Strengths for Your Profile:
• 36 IB meets requirements comfortably
• Values subject-specific excellence
• Year in industry widely available
• Affordable city for students
• Close to beautiful Yorkshire countryside

⚠️ Considerations:
• Not as prestigious as top 5
• Northern location if you prefer South
• Competition from local students high

💡 Application Strategy:
• Apply as solid backup to top choices
• Emphasize fit with their programs
• Consider joint honors options`
  },

  {
    name: 'University of Nottingham',
    details: `BEST FIT #7 - Strong Contender

📊 Why It's #7 Best Fit:
• Entry: AAA-AAB perfect for 36 IB
• Beautiful campus environment
• Strong CS department with good facilities
• International outlook with campuses abroad

✅ Strengths for Your Profile:
• Flexible entry requirements
• Values CS achievement highly
• Malaysia/China campus exchange options
• Strong student support
• Good graduate prospects

⚠️ Considerations:
• Campus quite far from city
• Less tech industry nearby
• Can feel isolated

💡 Application Tips:
• Mention international opportunities interest
• Show appreciation for campus environment
• Apply early for best accommodation`
  },

  // EU OPTIONS
  {
    name: 'University of Amsterdam',
    details: `EU BEST FIT #11 - Top European Choice

📊 Why It's Best Fit for EU:
• Your 36 IB points perfect for their requirements
• English-taught programs
• AI research hub of Europe
• International environment
• No UK tuition fees

✅ Advantages:
• Lower costs than UK (EU fees if applicable)
• Amsterdam tech scene thriving
• Liberal city culture
• Easy travel to rest of Europe
• Strong international reputation

⚠️ Considerations:
• Housing shortage in Amsterdam
• Different education style (more independent)
• Need to arrange visa/residence

💡 Application Tips:
• Apply early (January deadline)
• Emphasize international outlook
• Show interest in Dutch tech scene
• Consider as alternative to UK`
  },

  {
    name: 'TU Delft',
    details: `EU BEST FIT #12 - Dutch Engineering Excellence

📊 Why It's Great EU Option:
• Top technical university in Netherlands
• English-taught BSc Computer Science
• 36 IB points meets requirements
• Incredible facilities and resources

✅ Strengths for Your Profile:
• Strong practical focus suits your interests
• International environment
• Close to Amsterdam tech scene
• EU fees if applicable
• Beautiful historic campus

⚠️ Considerations:
• Competitive admission
• Housing crisis in Delft/Netherlands
• Different education style
• Need to arrange visa

💡 Application Tips:
• Apply by January 15 deadline
• Show strong motivation for Netherlands
• Prepare for potential selection day
• Arrange housing early`
  },

  {
    name: 'KU Leuven',
    details: `EU BEST FIT #13 - Belgian Excellence

📊 Why Consider Leuven:
• Top Belgian university
• English programs available
• 36 IB sufficient for admission
• Beautiful medieval city
• Heart of Europe location

✅ Strengths for Your Profile:
• Lower costs than UK
• Strong CS program
• International environment
• Easy travel to rest of Europe
• Good industry connections

⚠️ Considerations:
• Less known internationally
• Smaller tech scene than Amsterdam
• Weather similar to UK

💡 Application Strategy:
• Apply as EU backup
• Emphasize European interest
• Show language learning willingness`
  },

  {
    name: 'Technical University of Munich',
    details: `EU STRETCH #14 - German Excellence

📊 Why Consider TUM:
• Germany's #1 technical university
• No tuition fees (only semester fees ~€150)
• English bachelor's programs available
• Your CS grade 6 valued highly

✅ Advantages:
• Free education (huge financial benefit)
• Strong industry connections (BMW, Siemens)
• Munich tech hub growing
• International environment
• Option to learn German

⚠️ Challenges:
• Competitive admission
• Need to prove English proficiency
• German helpful for daily life
• Different academic culture
• Bureaucratic processes

💡 Application Strategy:
• Prepare strong portfolio
• Emphasize practical CS projects
• Show interest in German tech industry
• Apply through uni-assist portal early`
  }
]

async function addDetailedExplanations() {
  console.log('Adding detailed explanations to universities...')
  
  let updated = 0
  
  for (const item of detailedExplanations) {
    try {
      const university = await prisma.university.findFirst({
        where: {
          name: {
            contains: item.name
          }
        }
      })
      
      if (university) {
        // Add detailed explanation to the notes field
        await prisma.university.update({
          where: { id: university.id },
          data: {
            notes: item.details
          }
        })
        updated++
        console.log(`✅ Updated ${item.name} with detailed explanation`)
      } else {
        console.log(`⚠️ Not found: ${item.name}`)
      }
    } catch (error) {
      console.error(`Error updating ${item.name}:`, error)
    }
  }
  
  console.log(`\n✅ Added detailed explanations to ${updated} universities`)
  console.log('\n💡 These detailed explanations will appear on each university\'s individual page')
}

addDetailedExplanations()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })