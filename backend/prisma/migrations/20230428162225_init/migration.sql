-- CreateTable
CREATE TABLE `grant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namePost` VARCHAR(191) NOT NULL,
    `dateCreationPost` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `deadline` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `directionForSpent` VARCHAR(191) NOT NULL,
    `fullText` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `linkPDF` VARCHAR(191) NOT NULL,
    `sourceLink` VARCHAR(191) NOT NULL,
    `timeOfParse` INTEGER NOT NULL,
    `blackListed` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
