/*
  Warnings:

  - You are about to drop the column `workTime` on the `users_telegram_settings` table. All the data in the column will be lost.
  - Added the required column `workTimeEnd` to the `users_telegram_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workTimeStart` to the `users_telegram_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_users_telegramsId_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users_telegram_settings` DROP COLUMN `workTime`,
    ADD COLUMN `directions` VARCHAR(191) NULL,
    ADD COLUMN `workTimeEnd` DATETIME(3) NOT NULL,
    ADD COLUMN `workTimeStart` DATETIME(3) NOT NULL;
