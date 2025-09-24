-- AlterTable
ALTER TABLE "University" ADD COLUMN "aLevelRequirement" TEXT;
ALTER TABLE "University" ADD COLUMN "accommodation" TEXT;
ALTER TABLE "University" ADD COLUMN "admissionTest" TEXT;
ALTER TABLE "University" ADD COLUMN "applicationDeadline" DATETIME;
ALTER TABLE "University" ADD COLUMN "averageSalary" REAL;
ALTER TABLE "University" ADD COLUMN "campusInfo" TEXT;
ALTER TABLE "University" ADD COLUMN "category" TEXT;
ALTER TABLE "University" ADD COLUMN "decisionDate" DATETIME;
ALTER TABLE "University" ADD COLUMN "employmentRate" REAL;
ALTER TABLE "University" ADD COLUMN "ibRequirement" TEXT;
ALTER TABLE "University" ADD COLUMN "industryLinks" TEXT;
ALTER TABLE "University" ADD COLUMN "livingCosts" REAL;
ALTER TABLE "University" ADD COLUMN "majorRecruiters" TEXT;
ALTER TABLE "University" ADD COLUMN "mathsRequirement" TEXT;
ALTER TABLE "University" ADD COLUMN "researchAreas" TEXT;
ALTER TABLE "University" ADD COLUMN "testDeadline" DATETIME;
ALTER TABLE "University" ADD COLUMN "tier" TEXT;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "duration" TEXT,
    "degree" TEXT,
    "description" TEXT,
    "modules" TEXT,
    "careerPaths" TEXT,
    "prerequisites" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Course_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestRequirement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "testDate" DATETIME,
    "registrationDeadline" DATETIME,
    "minScore" TEXT,
    "typicalScore" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TestRequirement_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeyDate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "critical" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "KeyDate_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
