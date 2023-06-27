-- DropForeignKey
ALTER TABLE `acessing_logs` DROP FOREIGN KEY `acessing_logs_userId_fkey`;

-- DropForeignKey
ALTER TABLE `competitions` DROP FOREIGN KEY `competitions_parser_id_fkey`;

-- DropForeignKey
ALTER TABLE `grants` DROP FOREIGN KEY `grants_parser_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_user_telegramId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_actionForUserId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_competitionId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_grantId_fkey`;

-- DropForeignKey
ALTER TABLE `users_actions` DROP FOREIGN KEY `users_actions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_telegram` DROP FOREIGN KEY `users_telegram_settingsId_fkey`;

-- AddForeignKey
ALTER TABLE `grants` ADD CONSTRAINT `grants_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitions` ADD CONSTRAINT `competitions_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_telegramId_fkey` FOREIGN KEY (`user_telegramId`) REFERENCES `users_telegram`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_telegram` ADD CONSTRAINT `users_telegram_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `users_telegram_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_actionForUserId_fkey` FOREIGN KEY (`actionForUserId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_grantId_fkey` FOREIGN KEY (`grantId`) REFERENCES `grants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `competitions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acessing_logs` ADD CONSTRAINT `acessing_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
