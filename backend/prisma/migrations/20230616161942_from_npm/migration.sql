/*
  Warnings:

  - You are about to drop the column `users_telegram_key` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `users_telegram_key`;

-- CreateTable
CREATE TABLE `telegram_commands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `command` VARCHAR(255) NOT NULL,
    `TTL` DATETIME(3) NOT NULL,

    UNIQUE INDEX `telegram_commands_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
