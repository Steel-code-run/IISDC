/*
  Warnings:

  - You are about to drop the `users_actions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_actionForUserId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_competitionId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_grantId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_user_id_fkey`;

-- AlterTable
ALTER TABLE `parsers` ADD COLUMN `lastSuccessAdd` DATETIME(3) NULL;

-- DropTable
DROP TABLE `users_actions`;

-- CreateTable
CREATE TABLE `internships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(255) NOT NULL,
    `dateCreationPost` VARCHAR(191) NULL,
    `directions` VARCHAR(191) NULL,
    `organization` LONGTEXT NULL,
    `fullText` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,
    `linkPDF` VARCHAR(191) NULL,
    `sourceLink` VARCHAR(191) NULL,
    `timeOfParse` DATETIME(3) NULL,
    `blackListed` BOOLEAN NOT NULL DEFAULT false,
    `parser_id` INTEGER NOT NULL,

    UNIQUE INDEX `internships_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacancies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(255) NOT NULL,
    `dateCreationPost` VARCHAR(191) NULL,
    `directions` VARCHAR(191) NULL,
    `organization` LONGTEXT NULL,
    `summary` VARCHAR(191) NULL,
    `fullText` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,
    `linkPDF` VARCHAR(191) NULL,
    `sourceLink` VARCHAR(191) NULL,
    `timeOfParse` DATETIME(3) NULL,
    `blackListed` BOOLEAN NOT NULL DEFAULT false,
    `parser_id` INTEGER NOT NULL,

    UNIQUE INDEX `vacancies_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `internships` ADD CONSTRAINT `internships_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacancies` ADD CONSTRAINT `vacancies_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
