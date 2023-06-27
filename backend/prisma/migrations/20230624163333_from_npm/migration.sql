/*
  Warnings:

  - You are about to drop the column `dateFrom` on the `accessing_logs_warnings` table. All the data in the column will be lost.
  - You are about to drop the column `dateTo` on the `accessing_logs_warnings` table. All the data in the column will be lost.
  - Added the required column `date` to the `accessing_logs_warnings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `accessing_logs_warnings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accessing_logs_warnings` DROP COLUMN `dateFrom`,
    DROP COLUMN `dateTo`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `isSolved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
