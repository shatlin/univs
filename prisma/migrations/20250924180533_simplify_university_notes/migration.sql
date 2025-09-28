/*
  Warnings:

  - You are about to drop the column `date` on the `UniversityNote` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `UniversityNote` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `UniversityNote` table. All the data in the column will be lost.
  - You are about to drop the column `urls` on the `UniversityNote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UniversityNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UniversityNote_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UniversityNote" ("content", "createdAt", "id", "universityId", "updatedAt") SELECT "content", "createdAt", "id", "universityId", "updatedAt" FROM "UniversityNote";
DROP TABLE "UniversityNote";
ALTER TABLE "new_UniversityNote" RENAME TO "UniversityNote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
