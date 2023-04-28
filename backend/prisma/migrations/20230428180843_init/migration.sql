-- CreateTable
CREATE TABLE `Grant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(255) NOT NULL,
    `dateCreationPost` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'WORKER', 'USER') NOT NULL,
    `blocked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_telegram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `telegram_id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_ations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `action` ENUM('LOGIN', 'LOGOUT', 'REGISTER', 'CHANGE_PASSWORD', 'CHANGE_EMAIL', 'CHANGE_ROLE', 'BLOCK', 'UNBLOCK') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_telegram_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_telegram` INTEGER NOT NULL,
    `workTime` DATETIME(3) NOT NULL,
    `directions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_telegram` ADD CONSTRAINT `User_telegram_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_ations` ADD CONSTRAINT `User_ations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_telegram_settings` ADD CONSTRAINT `User_telegram_settings_User_telegram_fkey` FOREIGN KEY (`User_telegram`) REFERENCES `User_telegram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
