/*
  Warnings:

  - You are about to drop the `users_telegrams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_users_telegramsId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `users_telegramsId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `users_telegrams`;
