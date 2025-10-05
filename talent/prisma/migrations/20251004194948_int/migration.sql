-- AlterTable
ALTER TABLE "public"."companies" ADD COLUMN     "lookingFor" TEXT[] DEFAULT ARRAY[]::TEXT[];
