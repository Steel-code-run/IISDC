-- CreateTable
CREATE TABLE `grants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` LONGTEXT NOT NULL,
    `dateCreationPost` VARCHAR(191) NULL,
    `organization` VARCHAR(191) NULL,
    `deadline` DATETIME(3) NULL,
    `summary` VARCHAR(191) NULL,
    `directionForSpent` VARCHAR(191) NULL,
    `fullText` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,
    `linkPDF` VARCHAR(191) NULL,
    `sourceLink` VARCHAR(191) NULL,
    `timeOfParse` DATETIME(3) NOT NULL,
    `blackListed` INTEGER NOT NULL DEFAULT 0,
    `parser_id` INTEGER NULL,

    UNIQUE INDEX `grants_id_key`(`id`),
    FULLTEXT INDEX `grants_namePost_fullText_idx`(`namePost`, `fullText`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(255) NOT NULL,
    `dateCreationPost` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `directionForSpent` VARCHAR(191) NOT NULL,
    `fullText` LONGTEXT NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `linkPDF` VARCHAR(191) NOT NULL,
    `sourceLink` VARCHAR(191) NOT NULL,
    `timeOfParse` DATETIME(3) NOT NULL,
    `blackListed` INTEGER NOT NULL DEFAULT 0,
    `competitions_directionId` INTEGER NOT NULL,
    `parser_id` INTEGER NOT NULL,

    UNIQUE INDEX `competitions_id_key`(`id`),
    FULLTEXT INDEX `competitions_namePost_fullText_idx`(`namePost`, `fullText`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `user_telegramId` INTEGER NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_telegram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telegram_id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `settingsId` INTEGER NULL,

    UNIQUE INDEX `users_telegram_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_actions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `actionType` ENUM('LOGIN', 'LOGOUT', 'VISITPAGE', 'SENDREQUEST', 'CHANGE_PASSWORD', 'CHANGE_ROLE', 'CHANGE_WORKTIME', 'CHANGE_GRANTS_DIRECTIONS', 'CHANGE_COMPETITIONS_DIRECTIONS', 'CHANGE', 'BLOCK', 'UNBLOCK', 'EDIT') NOT NULL,
    `actionDescription` VARCHAR(191) NULL,
    `actionForUserId` INTEGER NULL,
    `grantId` INTEGER NULL,
    `competitionId` INTEGER NULL,

    UNIQUE INDEX `users_actions_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_telegram_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_telegram_settings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grants_direction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `grants_direction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acessing_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `acessing_logs_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitions_direction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `competitions_direction_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_role_id_key`(`id`),
    UNIQUE INDEX `users_role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whitelist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `origin` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `whitelist_id_key`(`id`),
    UNIQUE INDEX `whitelist_origin_key`(`origin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resources_access` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `resources_access_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL,
    `pagesToParse` INTEGER NOT NULL,

    UNIQUE INDEX `parsers_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parsing_queue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parser_id` INTEGER NOT NULL,
    `page` INTEGER NOT NULL,

    UNIQUE INDEX `parsing_queue_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parsersWorkTimeStart` DATETIME(3) NOT NULL,
    `parsersWorkTimeEnd` DATETIME(3) NOT NULL,
    `parsingEnabled` BOOLEAN NOT NULL,
    `parsingInterval` DATETIME(3) NOT NULL,
    `intervalAddingEnabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `appSettings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_grantsTogrants_direction` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_grantsTogrants_direction_AB_unique`(`A`, `B`),
    INDEX `_grantsTogrants_direction_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_grants_directionTousers_telegram_settings` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_grants_directionTousers_telegram_settings_AB_unique`(`A`, `B`),
    INDEX `_grants_directionTousers_telegram_settings_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_competitions_directionTousers_telegram_settings` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_competitions_directionTousers_telegram_settings_AB_unique`(`A`, `B`),
    INDEX `_competitions_directionTousers_telegram_settings_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grants` ADD CONSTRAINT `grants_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitions` ADD CONSTRAINT `competitions_competitions_directionId_fkey` FOREIGN KEY (`competitions_directionId`) REFERENCES `competitions_direction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitions` ADD CONSTRAINT `competitions_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `users_role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_telegramId_fkey` FOREIGN KEY (`user_telegramId`) REFERENCES `users_telegram`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_telegram` ADD CONSTRAINT `users_telegram_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `users_telegram_settings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_actionForUserId_fkey` FOREIGN KEY (`actionForUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_grantId_fkey` FOREIGN KEY (`grantId`) REFERENCES `grants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_actions` ADD CONSTRAINT `users_actions_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `competitions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acessing_logs` ADD CONSTRAINT `acessing_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resources_access` ADD CONSTRAINT `resources_access_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `users_role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parsing_queue` ADD CONSTRAINT `parsing_queue_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grantsTogrants_direction` ADD CONSTRAINT `_grantsTogrants_direction_A_fkey` FOREIGN KEY (`A`) REFERENCES `grants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grantsTogrants_direction` ADD CONSTRAINT `_grantsTogrants_direction_B_fkey` FOREIGN KEY (`B`) REFERENCES `grants_direction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grants_directionTousers_telegram_settings` ADD CONSTRAINT `_grants_directionTousers_telegram_settings_A_fkey` FOREIGN KEY (`A`) REFERENCES `grants_direction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_grants_directionTousers_telegram_settings` ADD CONSTRAINT `_grants_directionTousers_telegram_settings_B_fkey` FOREIGN KEY (`B`) REFERENCES `users_telegram_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_competitions_directionTousers_telegram_settings` ADD CONSTRAINT `_competitions_directionTousers_telegram_settings_A_fkey` FOREIGN KEY (`A`) REFERENCES `competitions_direction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_competitions_directionTousers_telegram_settings` ADD CONSTRAINT `_competitions_directionTousers_telegram_settings_B_fkey` FOREIGN KEY (`B`) REFERENCES `users_telegram_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
