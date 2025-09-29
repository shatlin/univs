-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_University" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "ranking" INTEGER,
    "rankingScore" REAL,
    "recommendationTier" TEXT,
    "ucasCode" TEXT,
    "courseName" TEXT,
    "entryRequirements" TEXT,
    "ieltsRequired" REAL,
    "tuitionFee" REAL,
    "location" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "userNotes" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
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
INSERT INTO "new_University" ("aLevelRequirement", "accommodation", "admissionTest", "applicationDeadline", "averageSalary", "campusInfo", "category", "countryId", "courseName", "createdAt", "decisionDate", "employmentRate", "entryRequirements", "ibRequirement", "id", "ieltsRequired", "industryLinks", "livingCosts", "location", "majorRecruiters", "mathsRequirement", "name", "notes", "ranking", "rankingScore", "recommendationTier", "researchAreas", "testDeadline", "tier", "tuitionFee", "ucasCode", "updatedAt", "userNotes", "website") SELECT "aLevelRequirement", "accommodation", "admissionTest", "applicationDeadline", "averageSalary", "campusInfo", "category", "countryId", "courseName", "createdAt", "decisionDate", "employmentRate", "entryRequirements", "ibRequirement", "id", "ieltsRequired", "industryLinks", "livingCosts", "location", "majorRecruiters", "mathsRequirement", "name", "notes", "ranking", "rankingScore", "recommendationTier", "researchAreas", "testDeadline", "tier", "tuitionFee", "ucasCode", "updatedAt", "userNotes", "website" FROM "University";
DROP TABLE "University";
ALTER TABLE "new_University" RENAME TO "University";
CREATE UNIQUE INDEX "University_ucasCode_key" ON "University"("ucasCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
