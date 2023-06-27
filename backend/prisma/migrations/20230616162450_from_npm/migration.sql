/*
  Warnings:

  - You are about to drop the column `command` on the `telegram_commands` table. All the data in the column will be lost.
  - Added the required column `query` to the `telegram_commands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `telegram_commands` DROP COLUMN `command`,
    ADD COLUMN `query` VARCHAR(255) NOT NULL;
