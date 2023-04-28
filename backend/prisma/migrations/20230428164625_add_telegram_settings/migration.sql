/*
  Warnings:

  - You are about to drop the column `username` on the `User_telegram` table. All the data in the column will be lost.
  - Added the required column `telegram_id` to the `User_telegram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_telegram` DROP COLUMN `username`,
    ADD COLUMN `telegram_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `User_telegram_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_telegram` INTEGER NOT NULL,
    `workTime` DATETIME(3) NOT NULL,
    `directions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_telegram_settings` ADD CONSTRAINT `User_telegram_settings_User_telegram_fkey` FOREIGN KEY (`User_telegram`) REFERENCES `User_telegram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
