-- AlterTable
ALTER TABLE `parsers` ADD COLUMN `lastSuccessParse` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `accessing_logs_warnings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `isSolved` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `accessing_logs_warnings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accessing_logs_warnings` ADD CONSTRAINT `accessing_logs_warnings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
