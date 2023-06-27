/*
  Warnings:

  - You are about to alter the column `blackListed` on the `competitions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `blackListed` on the `grants` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- DropIndex
DROP INDEX `competitions_competitions_directionId_fkey` ON `competitions`;

-- AlterTable
ALTER TABLE `competitions` MODIFY `blackListed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `grants` MODIFY `blackListed` BOOLEAN NOT NULL DEFAULT false;
