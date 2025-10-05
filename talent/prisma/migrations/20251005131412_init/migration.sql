/*
  Warnings:

  - You are about to drop the column `coverLetter` on the `job_applications` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `job_applications` table. All the data in the column will be lost.
  - Added the required column `email` to the `job_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `job_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `job_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `job_applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `job_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."ApplicationStatus" ADD VALUE 'ACCEPTED';

-- DropIndex
DROP INDEX "public"."job_applications_userId_jobPostingId_key";

-- AlterTable
ALTER TABLE "public"."job_applications" DROP COLUMN "coverLetter",
DROP COLUMN "resume",
ADD COLUMN     "coverLetterUrl" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "resumeUrl" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "job_applications_jobPostingId_idx" ON "public"."job_applications"("jobPostingId");

-- CreateIndex
CREATE INDEX "job_applications_userId_idx" ON "public"."job_applications"("userId");

-- CreateIndex
CREATE INDEX "job_applications_status_idx" ON "public"."job_applications"("status");

-- CreateIndex
CREATE INDEX "job_postings_isActive_publishedAt_expiresAt_idx" ON "public"."job_postings"("isActive", "publishedAt", "expiresAt");

-- CreateIndex
CREATE INDEX "job_postings_companyId_isActive_idx" ON "public"."job_postings"("companyId", "isActive");

-- CreateIndex
CREATE INDEX "job_postings_employmentType_idx" ON "public"."job_postings"("employmentType");

-- CreateIndex
CREATE INDEX "job_postings_remotePolicy_idx" ON "public"."job_postings"("remotePolicy");

-- CreateIndex
CREATE INDEX "job_postings_location_idx" ON "public"."job_postings"("location");
