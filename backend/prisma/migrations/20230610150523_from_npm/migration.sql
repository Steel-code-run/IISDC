-- AlterTable
ALTER TABLE `competitions` MODIFY `dateCreationPost` VARCHAR(191) NULL,
    MODIFY `organization` LONGTEXT NULL,
    MODIFY `deadline` DATETIME(3) NULL,
    MODIFY `summary` VARCHAR(191) NULL,
    MODIFY `directionForSpent` LONGTEXT NULL,
    MODIFY `fullText` LONGTEXT NULL,
    MODIFY `link` VARCHAR(191) NULL,
    MODIFY `linkPDF` VARCHAR(191) NULL,
    MODIFY `sourceLink` VARCHAR(191) NULL,
    MODIFY `timeOfParse` DATETIME(3) NULL,
    MODIFY `competitions_directionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `grants` MODIFY `organization` LONGTEXT NULL,
    MODIFY `directionForSpent` LONGTEXT NULL;
