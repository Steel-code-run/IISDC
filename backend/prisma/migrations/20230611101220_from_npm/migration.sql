/*
  Warnings:

  - You are about to drop the `users_telegram` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_user_telegramId_fkey`;

-- DropForeignKey
ALTER TABLE `users_telegram` DROP FOREIGN KEY `users_telegram_settingsId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `user_telegram_settingsId` INTEGER NULL;

-- DropTable
DROP TABLE `users_telegram`;

-- CreateTable
CREATE TABLE `users_telegrams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telegram_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_telegrams_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_telegramId_fkey` FOREIGN KEY (`user_telegramId`) REFERENCES `users_telegrams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_telegram_settingsId_fkey` FOREIGN KEY (`user_telegram_settingsId`) REFERENCES `users_telegram_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
