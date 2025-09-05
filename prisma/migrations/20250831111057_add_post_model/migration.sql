/*
  Warnings:

  - You are about to drop the column `yield` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `yieldNum` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Deal" DROP COLUMN "yield",
ADD COLUMN     "yieldNum" INTEGER NOT NULL;
