/*
  Warnings:

  - You are about to drop the column `lastSuccessUpdate` on the `parsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `parsers` DROP COLUMN `lastSuccessUpdate`,
    ADD COLUMN `lastSuccessParse` DATETIME(3) NULL;
