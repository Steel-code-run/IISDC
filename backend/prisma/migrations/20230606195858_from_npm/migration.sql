/*
  Warnings:

  - You are about to drop the `_competitions_directionTousers_telegram_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_grantsTogrants_direction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_grants_directionTousers_telegram_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `competitions_direction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grants_direction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_competitions_directionTousers_telegram_settings` DROP FOREIGN KEY `_competitions_directionTousers_telegram_settings_A_fkey`;

-- DropForeignKey
ALTER TABLE `_competitions_directionTousers_telegram_settings` DROP FOREIGN KEY `_competitions_directionTousers_telegram_settings_B_fkey`;

-- DropForeignKey
ALTER TABLE `_grantsTogrants_direction` DROP FOREIGN KEY `_grantsTogrants_direction_A_fkey`;

-- DropForeignKey
ALTER TABLE `_grantsTogrants_direction` DROP FOREIGN KEY `_grantsTogrants_direction_B_fkey`;

-- DropForeignKey
ALTER TABLE `_grants_directionTousers_telegram_settings` DROP FOREIGN KEY `_grants_directionTousers_telegram_settings_A_fkey`;

-- DropForeignKey
ALTER TABLE `_grants_directionTousers_telegram_settings` DROP FOREIGN KEY `_grants_directionTousers_telegram_settings_B_fkey`;

-- DropForeignKey
ALTER TABLE `competitions` DROP FOREIGN KEY `competitions_competitions_directionId_fkey`;

-- AlterTable
ALTER TABLE `competitions` ADD COLUMN `directions` JSON NULL;

-- AlterTable
ALTER TABLE `grants` ADD COLUMN `directions` JSON NULL;

-- DropTable
DROP TABLE `_competitions_directionTousers_telegram_settings`;

-- DropTable
DROP TABLE `_grantsTogrants_direction`;

-- DropTable
DROP TABLE `_grants_directionTousers_telegram_settings`;

-- DropTable
DROP TABLE `competitions_direction`;

-- DropTable
DROP TABLE `grants_direction`;
