-- AlterTable
ALTER TABLE `competitions` MODIFY `parser_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `internships` ADD COLUMN `responsibilities` VARCHAR(191) NULL,
    MODIFY `parser_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users_telegram_settings` MODIFY `directions` VARCHAR(400) NULL;

-- AlterTable
ALTER TABLE `vacancies` MODIFY `parser_id` INTEGER NULL;
