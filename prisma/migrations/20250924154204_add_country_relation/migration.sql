/*
  Warnings:

  - You are about to drop the column `country` on the `University` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "flag" TEXT,
    "region" TEXT,
    "euMember" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT,
    "currency" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_University" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "ranking" INTEGER,
    "ucasCode" TEXT,
    "courseName" TEXT,
    "entryRequirements" TEXT,
    "ieltsRequired" REAL,
    "tuitionFee" REAL,
    "location" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "tier" TEXT,
    "category" TEXT,
    "ibRequirement" TEXT,
    "aLevelRequirement" TEXT,
    "mathsRequirement" TEXT,
    "admissionTest" TEXT,
    "testDeadline" DATETIME,
    "applicationDeadline" DATETIME,
    "decisionDate" DATETIME,
    "employmentRate" REAL,
    "averageSalary" REAL,
    "majorRecruiters" TEXT,
    "industryLinks" TEXT,
    "researchAreas" TEXT,
    "livingCosts" REAL,
    "accommodation" TEXT,
    "campusInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "University_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_University" ("aLevelRequirement", "accommodation", "admissionTest", "applicationDeadline", "averageSalary", "campusInfo", "category", "courseName", "createdAt", "decisionDate", "employmentRate", "entryRequirements", "ibRequirement", "id", "ieltsRequired", "industryLinks", "livingCosts", "location", "majorRecruiters", "mathsRequirement", "name", "notes", "ranking", "researchAreas", "testDeadline", "tier", "tuitionFee", "ucasCode", "updatedAt", "website") SELECT "aLevelRequirement", "accommodation", "admissionTest", "applicationDeadline", "averageSalary", "campusInfo", "category", "courseName", "createdAt", "decisionDate", "employmentRate", "entryRequirements", "ibRequirement", "id", "ieltsRequired", "industryLinks", "livingCosts", "location", "majorRecruiters", "mathsRequirement", "name", "notes", "ranking", "researchAreas", "testDeadline", "tier", "tuitionFee", "ucasCode", "updatedAt", "website" FROM "University";
DROP TABLE "University";
ALTER TABLE "new_University" RENAME TO "University";
CREATE UNIQUE INDEX "University_ucasCode_key" ON "University"("ucasCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");
