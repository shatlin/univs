import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function populateCourses() {
  console.log('📚 Populating Course table with 18 favorited courses...\n')

  const courseData = [
    // Edinburgh courses
    {
      uniName: 'Edinburgh',
      courses: [
        { name: 'Software Engineering', degree: 'BEng Hon', duration: '4 years',
          description: 'Comprehensive software engineering program covering full-stack development, software architecture, and project management',
          careerPaths: 'Software Developer, Systems Architect, Tech Lead, Product Manager' },
        { name: 'Electrical and Mechanical Engineering', degree: 'MEng Hon', duration: '5 years',
          description: 'Integrated program combining electrical and mechanical engineering principles',
          careerPaths: 'Robotics Engineer, Automation Specialist, Systems Engineer' },
        { name: 'Mathematics', degree: 'MMath', duration: '5 years',
          description: 'Prestigious mathematics program with advanced theoretical and applied mathematics',
          careerPaths: 'Data Scientist, Quantitative Analyst, Research Mathematician, Actuary' },
        { name: 'Mathematics and Business', degree: 'BSc Hons', duration: '4 years',
          description: 'Perfect combination for Business(6) strength - integrates mathematical methods with business applications',
          careerPaths: 'Business Analyst, Financial Analyst, Management Consultant, Risk Analyst' },
        { name: 'Applied Mathematics', degree: 'MMath Hons', duration: '5 years',
          description: 'Focus on practical applications of mathematics in engineering and sciences',
          careerPaths: 'Mathematical Modeler, Operations Research Analyst, Quantitative Developer' }
      ]
    },
    // Manchester courses
    {
      uniName: 'Manchester',
      courses: [
        { name: 'Electrical and Electronic Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Comprehensive EEE program with strong industry links',
          careerPaths: 'Electronics Engineer, Power Systems Engineer, Telecommunications Engineer' },
        { name: 'Mathematics', degree: 'MMath', duration: '4 years',
          description: 'Prestigious mathematics program with research opportunities',
          careerPaths: 'Research Mathematician, Data Scientist, Quantitative Analyst' },
        { name: 'Mathematics and Statistics', degree: 'MMath', duration: '4 years',
          description: 'Combined program focusing on mathematical theory and statistical applications',
          careerPaths: 'Statistician, Data Analyst, Risk Analyst, Biostatistician' }
      ]
    },
    // Bristol courses
    {
      uniName: 'Bristol',
      courses: [
        { name: 'Aerospace Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Leading aerospace program with strong industry partnerships',
          careerPaths: 'Aerospace Engineer, Aircraft Designer, Space Systems Engineer' },
        { name: 'Design Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Innovation-focused program combining engineering with creative design',
          careerPaths: 'Product Designer, Innovation Engineer, Design Consultant' },
        { name: 'Engineering Mathematics', degree: 'MEng Hon', duration: '4 years',
          description: 'Combines engineering principles with strong mathematical foundations',
          careerPaths: 'Systems Engineer, Mathematical Modeler, Technical Consultant' }
      ]
    },
    // Southampton courses
    {
      uniName: 'Southampton',
      courses: [
        { name: 'Mechanical Engineering/Aerospace Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Flexible program allowing specialization in mechanical or aerospace engineering',
          careerPaths: 'Mechanical Engineer, Aerospace Engineer, Design Engineer' },
        { name: 'Biomedical Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Engineering applications in healthcare and medical technology',
          careerPaths: 'Biomedical Engineer, Medical Device Designer, Clinical Engineer' },
        { name: 'Chemical Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Process engineering with applications in chemicals, pharmaceuticals, and energy',
          careerPaths: 'Process Engineer, Chemical Engineer, Production Manager' }
      ]
    },
    // Birmingham courses
    {
      uniName: 'Birmingham',
      courses: [
        { name: 'Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'General engineering program with specialization options in later years',
          careerPaths: 'Engineering Consultant, Project Manager, Systems Engineer' },
        { name: 'Aerospace Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Comprehensive aerospace program with flight systems focus',
          careerPaths: 'Aerospace Engineer, Flight Systems Designer, Propulsion Engineer' },
        { name: 'Chemical Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Process and chemical engineering with strong industrial applications',
          careerPaths: 'Chemical Engineer, Process Engineer, Energy Engineer' },
        { name: 'Energy Engineering', degree: 'MEng Hon', duration: '4 years',
          description: 'Emerging field focusing on sustainable energy solutions and technologies',
          careerPaths: 'Energy Engineer, Renewable Energy Specialist, Sustainability Consultant' }
      ]
    }
  ]

  // Clear existing courses for favorite universities
  const favoriteUnis = await prisma.university.findMany({
    where: { isFavorite: true }
  })

  for (const uni of favoriteUnis) {
    await prisma.course.deleteMany({
      where: { universityId: uni.id }
    })
  }

  // Add new courses
  let totalAdded = 0
  for (const uniData of courseData) {
    const university = await prisma.university.findFirst({
      where: {
        name: {
          contains: uniData.uniName
        }
      }
    })

    if (university) {
      console.log(`\n🏫 ${university.name}:`)

      for (const course of uniData.courses) {
        await prisma.course.create({
          data: {
            universityId: university.id,
            name: course.name,
            degree: course.degree,
            duration: course.duration,
            description: course.description,
            careerPaths: course.careerPaths,
            prerequisites: 'A-Levels or IB Diploma with strong grades in Mathematics and Sciences'
          }
        })
        console.log(`  ✅ Added: ${course.name} (${course.degree}, ${course.duration})`)
        totalAdded++
      }
    } else {
      console.log(`❌ Could not find university: ${uniData.uniName}`)
    }
  }

  console.log(`\n✨ Successfully added ${totalAdded} courses to the database`)
  console.log('📱 These will now appear in the Courses tab when viewing each university in the app')
}

populateCourses()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })