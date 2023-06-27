/*
  Warnings:

  - You are about to alter the column `dateCreationPost` on the `competitions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dateCreationPost` on the `grants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dateCreationPost` on the `internships` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dateCreationPost` on the `vacancies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `competitions` ADD COLUMN `summary` VARCHAR(191) NULL,
    MODIFY `dateCreationPost` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `grants` MODIFY `dateCreationPost` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `internships` MODIFY `dateCreationPost` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `vacancies` MODIFY `dateCreationPost` DATETIME(3) NULL;
