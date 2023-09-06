/*
  Warnings:

  - The primary key for the `AuthToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expiration` on the `AuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AuthToken` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "AuthTokenType" ADD VALUE 'emailValidation';

-- AlterTable
ALTER TABLE "AuthToken" DROP CONSTRAINT "AuthToken_pkey",
DROP COLUMN "expiration",
DROP COLUMN "id",
ADD CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("token");
