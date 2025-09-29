# University Research & Database Population Template

This template captures the comprehensive research methodology used for Trinity College Dublin and should be applied to all universities for consistent, thorough evaluation.

## Research Categories & Data Collection Checklist

### 1. UNIVERSITY OVERVIEW & PRESTIGE
- [ ] **Global Rankings**
  - QS World University Rankings
  - Times Higher Education Rankings
  - Academic Ranking of World Universities (ARWU)
  - Subject-specific rankings
- [ ] **National Standing**
  - Position within country
  - Reputation and prestige locally
- [ ] **International Recognition**
  - Membership in university leagues (e.g., LERU, Russell Group)
  - International partnerships
  - Exchange programs
- [ ] **History & Heritage**
  - Founded year
  - Notable achievements
  - Famous alumni
- [ ] **University Type**
  - Research university vs teaching focused
  - Public vs private
  - Specialized vs comprehensive

### 2. ACADEMIC PROGRAMS & REQUIREMENTS
- [ ] **Target Courses Research**
  - Computer Science programs
  - Engineering disciplines
  - Mathematics programs
  - Data Science/Analytics
  - Business/Economics programs
- [ ] **Entry Requirements by Program**
  - IB score requirements (minimum and typical)
  - Subject-specific requirements (HL Math, Physics, etc.)
  - Grade boundaries by course
- [ ] **English Language Requirements**
  - IELTS minimum scores
  - TOEFL alternatives
  - Cambridge English requirements
  - Exemption criteria
- [ ] **Additional Requirements**
  - Portfolio requirements
  - Interviews
  - Entrance exams
  - Work experience

### 3. APPLICATION PROCESS & TIMELINE
- [ ] **Application Deadlines**
  - Early/Priority deadlines
  - Regular deadlines
  - Late application possibilities
- [ ] **Application Platform**
  - UCAS (UK)
  - Common Application (US)
  - University-specific portals
- [ ] **Required Documents**
  - Transcripts
  - Predicted grades
  - Personal statements
  - References
  - Test scores
- [ ] **Application Fees**
  - Per application cost
  - Multiple course applications
- [ ] **Decision Timeline**
  - When decisions are released
  - Response deadlines

### 4. FINANCIAL INFORMATION
- [ ] **Tuition Fees (Detailed Annual Breakdown)**
  - Annual tuition for international students (exact amount)
  - Tuition for domestic students (comparison)
  - Course-specific fee variations (STEM vs Arts vs Medicine)
  - Multi-year program costs (3-year vs 4-year degrees)
  - Additional fees (lab fees, technology fees, graduation fees)
  - Tuition increase projections for future years
- [ ] **Living Costs (Comprehensive Annual Estimates)**
  - University official living cost estimates
  - Independent cost of living research
  - Accommodation costs breakdown:
    - On-campus housing (per year)
    - Off-campus housing (per year)
    - Homestay options (per year)
  - Food expenses:
    - Meal plans (if available)
    - Self-catering estimates
    - Dining out allowances
  - Transportation costs:
    - Local transport passes
    - Travel to/from home country
  - Personal expenses:
    - Books and supplies
    - Healthcare/insurance
    - Entertainment and social activities
    - Clothing and personal items
  - City-specific cost variations
- [ ] **Total Annual Cost Calculations**
  - Year 1 total (tuition + living + setup costs)
  - Years 2-4 total (ongoing costs)
  - 3-year degree total cost
  - 4-year degree total cost
  - Currency conversion considerations
- [ ] **Scholarships & Financial Aid**
  - Merit scholarships (amounts and criteria)
  - Need-based aid availability
  - International student specific aid programs
  - External scholarship opportunities
  - Work-study programs and part-time work allowances
  - Application deadlines for all financial aid
- [ ] **Payment Information**
  - Payment schedules (per semester/term)
  - Payment methods accepted
  - Currency requirements
  - Bank account requirements for students

### 5. CAMPUS & LOCATION
- [ ] **Campus Information**
  - Campus size and layout
  - Facilities (libraries, labs, sports)
  - Historic vs modern facilities
- [ ] **Location Details**
  - City characteristics
  - Climate
  - Cost of living
  - Safety considerations
  - Transportation links
- [ ] **Accommodation Options**
  - On-campus housing
  - Off-campus options
  - Application processes and deadlines
  - Costs and availability

### 6. CAREER PROSPECTS & OUTCOMES
- [ ] **Employment Statistics**
  - Graduate employment rates
  - Employment by 6 months after graduation
  - Average starting salaries
- [ ] **Major Employers**
  - Top recruiting companies
  - Industry connections
  - Campus recruitment events
- [ ] **Career Services**
  - Career counseling
  - Internship programs
  - Alumni networks
- [ ] **Graduate Destinations**
  - Geographic distribution of graduates
  - Sector breakdown
  - Further study rates

### 7. STUDENT EXPERIENCE
- [ ] **Student Demographics**
  - Total student population
  - International student percentage
  - Diversity statistics
- [ ] **Student Life**
  - Clubs and societies
  - Sports and recreation
  - Cultural activities
- [ ] **Support Services**
  - Academic support
  - Mental health services
  - International student support
  - Disability services

### 8. RESEARCH & ACADEMIC QUALITY
- [ ] **Research Excellence**
  - Research rankings
  - Major research centers
  - Research funding
- [ ] **Faculty Quality**
  - Student-to-faculty ratios
  - Faculty credentials
  - Teaching quality metrics
- [ ] **Academic Resources**
  - Library resources
  - Laboratory facilities
  - Technology infrastructure

## Database Population Script Template

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateUniversityInfo(universityName: string) {
  console.log(`📚 Updating ${universityName} Information...\\n`)

  try {
    // Find university
    const university = await prisma.university.findFirst({
      where: { name: { contains: universityName } }
    })

    if (!university) {
      console.log(`❌ ${universityName} not found in database`)
      return
    }

    // Update main university information
    const updatedUniversity = await prisma.university.update({
      where: { id: university.id },
      data: {
        website: '', // Official website
        location: '', // Full address
        ranking: 0, // Global ranking
        rankingScore: 0, // Internal scoring for comparison
        recommendationTier: '', // A/B/C tier
        tier: '', // Tier 1/2/3
        category: '', // Reach/Match/Safety
        userNotes: ``, // Comprehensive overview
        entryRequirements: ``, // Detailed requirements
        ieltsRequired: 0, // IELTS score
        ibRequirement: '', // IB requirements
        mathsRequirement: '', // Math requirements
        applicationDeadline: new Date(''), // Main deadline
        tuitionFee: 0, // Annual tuition for international students
        livingCosts: 0, // Annual living costs estimate
        totalAnnualCost: 0, // Total Year 1 cost (tuition + living + setup)
        totalDegreeCost: 0, // Total cost for full degree program
        accommodation: ``, // Accommodation details
        campusInfo: ``, // Campus information
        employmentRate: 0, // Graduate employment %
        averageSalary: 0, // Starting salary
        majorRecruiters: '', // Top employers
        industryLinks: '', // Industry connections
        researchAreas: '' // Research strengths
      }
    })

    // Add key dates
    const keyDates = [
      // Application dates, decision dates, etc.
    ]

    await prisma.keyDate.deleteMany({ where: { universityId: university.id } })
    for (const date of keyDates) {
      await prisma.keyDate.create({
        data: { ...date, universityId: university.id }
      })
    }

    // Add courses
    const courses = [
      // Detailed course information
    ]

    await prisma.course.deleteMany({ where: { universityId: university.id } })
    for (const course of courses) {
      await prisma.course.create({
        data: { ...course, universityId: university.id }
      })
    }

    // Add test requirements
    const testRequirements = [
      // English language and other test requirements
    ]

    await prisma.testRequirement.deleteMany({ where: { universityId: university.id } })
    for (const test of testRequirements) {
      await prisma.testRequirement.create({
        data: { ...test, universityId: university.id }
      })
    }

    // Add university notes
    await prisma.universityNote.create({
      data: {
        universityId: university.id,
        content: `## Application Strategy Notes

        **Key Points**:
        - [Strategy specific to this university]

        **Next Steps**:
        1. [Specific actions needed]`
      }
    })

    console.log(`🎉 ${universityName} information successfully updated!`)

  } catch (error) {
    console.error(`Error updating ${universityName}:`, error)
  } finally {
    await prisma.$disconnect()
  }
}
```

## Research Sources Checklist

### Primary Sources
- [ ] **Official University Website**
  - Admissions pages
  - Course catalogs
  - Student life sections
  - Career services data
- [ ] **Official Rankings**
  - QS World University Rankings
  - Times Higher Education
  - Subject-specific rankings
- [ ] **Government Data**
  - National education statistics
  - Employment outcome data

### Secondary Sources
- [ ] **University Review Sites**
  - Student review platforms
  - University comparison sites
- [ ] **News and Media**
  - Recent news about the university
  - Reputation articles
- [ ] **Professional Networks**
  - LinkedIn university pages
  - Alumni networks
- [ ] **Social Media**
  - Student experiences
  - Campus life insights

## Quality Assurance Checklist

- [ ] **Data Accuracy**
  - Cross-reference multiple sources
  - Verify current year information
  - Check for recent policy changes
- [ ] **Completeness**
  - All template sections filled
  - No placeholder data remaining
  - Consistent formatting
- [ ] **Relevance**
  - Information specific to target student profile
  - Relevant course information included
  - Appropriate for application timeline

## Financial Information Template

### Annual Cost Breakdown Template (to be filled for each university)

```
YEAR 1 COSTS:
┌─────────────────────────────────────────────────────────────┐
│ TUITION & FEES                                              │
├─────────────────────────────────────────────────────────────┤
│ Annual Tuition (International):        £/€/$ ____________   │
│ Lab/Technology Fees:                   £/€/$ ____________   │
│ Registration/Admin Fees:               £/€/$ ____________   │
│ Student Union/Services Fee:            £/€/$ ____________   │
│ TOTAL TUITION & FEES:                  £/€/$ ____________   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ LIVING EXPENSES                                             │
├─────────────────────────────────────────────────────────────┤
│ Accommodation (On-campus):             £/€/$ ____________   │
│ Accommodation (Off-campus):            £/€/$ ____________   │
│ Food & Meals:                          £/€/$ ____________   │
│ Transportation (Local):                £/€/$ ____________   │
│ Books & Supplies:                      £/€/$ ____________   │
│ Personal Expenses:                     £/€/$ ____________   │
│ Healthcare/Insurance:                  £/€/$ ____________   │
│ TOTAL LIVING EXPENSES:                 £/€/$ ____________   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ONE-TIME SETUP COSTS (Year 1 only)                         │
├─────────────────────────────────────────────────────────────┤
│ Visa Application:                      £/€/$ ____________   │
│ Travel to University:                  £/€/$ ____________   │
│ Initial Setup (furniture, etc.):       £/€/$ ____________   │
│ Deposits (accommodation, etc.):        £/€/$ ____________   │
│ TOTAL SETUP COSTS:                     £/€/$ ____________   │
└─────────────────────────────────────────────────────────────┘

TOTAL YEAR 1 COST:                       £/€/$ ____________
TOTAL ONGOING ANNUAL COST (Years 2+):    £/€/$ ____________
TOTAL 3-YEAR DEGREE COST:                £/€/$ ____________
TOTAL 4-YEAR DEGREE COST:                £/€/$ ____________
```

### Currency Conversion Notes
- Always specify the original currency
- Include conversion to USD/EUR for comparison
- Note the exchange rate date used
- Consider currency fluctuation over degree duration

## Notes for Future Universities

**High Priority Universities to Research Next:**
1. University of Edinburgh
2. University of Manchester
3. University of Bristol
4. University of Southampton
5. University of Birmingham

**Special Considerations:**
- Update all dates for 2026 entry cycle
- Focus on STEM programs (CS, Engineering, Math)
- Emphasize international student perspective
- Include visa/immigration considerations where relevant
- Research scholarship opportunities specifically

**Research Methodology:**
1. Start with official university websites
2. Cross-reference with ranking data
3. Gather career outcome statistics
4. Research student experience data
5. Compile into comprehensive database update script
6. Verify all information before database population

This template ensures consistent, thorough research for all universities in Damien's application portfolio.