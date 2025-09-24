# University Application Tracker

A comprehensive web application for managing university applications, built with Next.js, TypeScript, Prisma, and SQLite.

## Features

### 📊 Dashboard
- Overview of all applications with real-time statistics
- Quick access to recent applications, upcoming deadlines, and pending todos
- Visual indicators for application status and priority levels

### 🎓 Universities Management
- Add and manage universities with detailed information
- Search and filter by country, name, course, or location
- Track entry requirements, IELTS scores, tuition fees, and rankings
- Direct links to university websites
- One-click application creation

### 📝 Application Tracking
- Track multiple applications with different status levels
- Monitor document submission status (transcripts, IELTS, references)
- Set priority levels (Critical, High, Medium, Low)
- Group applications by status (Active, Submitted, Offers, Closed)
- Update application status in real-time

### ✅ Todo Management
- Create and manage tasks with categories and priorities
- Link todos to specific applications
- Set due dates and track completion
- Filter by category and completion status
- Organize tasks by priority level

### ⏰ Deadlines & Reminders
- Track critical deadlines (UCAS, Oxbridge, etc.)
- Set reminders for important dates
- Mark deadlines as critical for better visibility

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Seed the database with sample universities:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Database Schema

The application uses SQLite with the following main entities:

- **Universities**: Store university information including courses, requirements, and fees
- **Applications**: Track individual applications with status and document tracking
- **Todos**: Manage tasks and action items
- **Documents**: Track document submission status
- **Deadlines**: Monitor important dates and deadlines

## Application Status Workflow

1. **NOT_STARTED**: Application created but not yet begun
2. **IN_PROGRESS**: Working on the application
3. **SUBMITTED**: Application submitted to university
4. **UNDER_REVIEW**: University reviewing application
5. **INTERVIEW_SCHEDULED**: Interview invitation received
6. **OFFER_RECEIVED**: Offer from university
7. **OFFER_ACCEPTED/DECLINED**: Decision made on offer
8. **REJECTED**: Application unsuccessful
9. **WITHDRAWN**: Application withdrawn by applicant

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run seed`: Populate database with sample data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **State Management**: React hooks and local state

## Sample Universities

The seed script includes universities from:
- **UK**: Cambridge, Oxford, Imperial, UCL, Edinburgh, Manchester, Warwick, Bristol
- **USA**: MIT, Stanford, Carnegie Mellon
- **Canada**: Toronto, UBC, Waterloo

Each university includes:
- Course information
- Entry requirements
- IELTS requirements
- Tuition fees
- World rankings
- Website links

## Using the Application

### Adding a University
1. Navigate to Universities page
2. Click "Add University"
3. Fill in university details
4. Save the university

### Creating an Application
1. Find the university in the Universities page
2. Click "Start Application"
3. The application will be created with NOT_STARTED status
4. Navigate to Applications page to manage it

### Managing Todos
1. Go to Todo Management page
2. Click "Add Todo"
3. Set priority, category, and due date
4. Link to specific application if needed
5. Mark as complete when done

### Tracking Progress
- Use the dashboard for a quick overview
- Update application status as you progress
- Check off todos as you complete them
- Monitor upcoming deadlines

## Notes

- All data is stored locally in SQLite database
- The application is optimized for tracking UK university applications via UCAS
- Supports tracking for international universities as well
- Designed to help manage the complex university application process