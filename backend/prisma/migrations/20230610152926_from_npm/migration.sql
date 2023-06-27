/*
  Warnings:

  - You are about to drop the column `competitions_directionId` on the `competitions` table. All the data in the column will be lost.
  - You are about to drop the column `directionForSpent` on the `competitions` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `competitions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `competitions_namePost_fullText_idx` ON `competitions`;

-- DropIndex
DROP INDEX `grants_namePost_fullText_idx` ON `grants`;

-- AlterTable
ALTER TABLE `competitions` DROP COLUMN `competitions_directionId`,
    DROP COLUMN `directionForSpent`,
    DROP COLUMN `summary`,
    MODIFY `directions` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `grants` MODIFY `directions` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `parsers` ADD COLUMN `cronTime` VARCHAR(191) NULL;
