/*
  Warnings:

  - You are about to drop the column `summary` on the `vacancies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `parsers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `vacancies` DROP COLUMN `summary`,
    ADD COLUMN `responsibilities` VARCHAR(191) NULL,
    ADD COLUMN `salary` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `parsers_name_key` ON `parsers`(`name`);
