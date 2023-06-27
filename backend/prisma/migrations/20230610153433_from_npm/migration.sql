/*
  Warnings:

  - You are about to drop the column `intervalAddingEnabled` on the `appSettings` table. All the data in the column will be lost.
  - You are about to drop the column `parsingEnabled` on the `appSettings` table. All the data in the column will be lost.
  - You are about to drop the column `parsingInterval` on the `appSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `appSettings` DROP COLUMN `intervalAddingEnabled`,
    DROP COLUMN `parsingEnabled`,
    DROP COLUMN `parsingInterval`;
