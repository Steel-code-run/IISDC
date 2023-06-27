-- CreateTable
CREATE TABLE `grants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` LONGTEXT NOT NULL,
    `dateCreationPost` VARCHAR(191) NULL,
    `directions` VARCHAR(191) NULL,
    `organization` LONGTEXT NULL,
    `deadline` DATETIME(3) NULL,
    `summary` VARCHAR(191) NULL,
    `directionForSpent` LONGTEXT NULL,
    `fullText` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,
    `linkPDF` VARCHAR(191) NULL,
    `sourceLink` VARCHAR(191) NULL,
    `timeOfParse` DATETIME(3) NULL,
    `blackListed` BOOLEAN NOT NULL DEFAULT false,
    `parser_id` INTEGER NULL,

    UNIQUE INDEX `grants_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(255) NOT NULL,
    `dateCreationPost` VARCHAR(191) NULL,
    `directions` VARCHAR(191) NULL,
    `organization` LONGTEXT NULL,
    `deadline` DATETIME(3) NULL,
    `fullText` LONGTEXT NULL,
    `link` VARCHAR(191) NULL,
    `linkPDF` VARCHAR(191) NULL,
    `sourceLink` VARCHAR(191) NULL,
    `timeOfParse` DATETIME(3) NULL,
    `blackListed` BOOLEAN NOT NULL DEFAULT false,
    `parser_id` INTEGER NOT NULL,

    UNIQUE INDEX `competitions_id_key`(`id`),
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
    `user_telegram_settingsId` INTEGER NULL,
    `users_telegramsId` VARCHAR(191) NULL,
    `users_telegram_key` VARCHAR(191) NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_name_key`(`name`),
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
    `workTimeStart` DATETIME(3) NOT NULL,
    `workTimeEnd` DATETIME(3) NOT NULL,
    `directions` VARCHAR(191) NULL,

    UNIQUE INDEX `users_telegram_settings_id_key`(`id`),
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
    `method` VARCHAR(191) NOT NULL DEFAULT '*',
    `roleId` INTEGER NULL,

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
    `cronTime` VARCHAR(191) NULL,

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

    UNIQUE INDEX `appSettings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grants` ADD CONSTRAINT `grants_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitions` ADD CONSTRAINT `competitions_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `users_role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_telegram_settingsId_fkey` FOREIGN KEY (`user_telegram_settingsId`) REFERENCES `users_telegram_settings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `resources_access` ADD CONSTRAINT `resources_access_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `users_role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parsing_queue` ADD CONSTRAINT `parsing_queue_parser_id_fkey` FOREIGN KEY (`parser_id`) REFERENCES `parsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
