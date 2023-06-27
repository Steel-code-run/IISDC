-- CreateTable
CREATE TABLE `telegram_commands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(255) NOT NULL,
    `TTL` DATETIME(3) NOT NULL,

    UNIQUE INDEX `telegram_commands_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
