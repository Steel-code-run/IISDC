/*
  Warnings:

  - You are about to drop the column `user_telegramId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_user_telegramId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_telegramId`,
    ADD COLUMN `users_telegram_key` VARCHAR(191) NULL,
    ADD COLUMN `users_telegramsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_users_telegramsId_fkey` FOREIGN KEY (`users_telegramsId`) REFERENCES `users_telegrams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
