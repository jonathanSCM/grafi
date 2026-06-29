-- AlterTable
ALTER TABLE `companies` ADD COLUMN `collaboratorLimitOverride` INTEGER NULL,
    ADD COLUMN `planId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `plans` ADD COLUMN `maxButtons` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `maxCollaborators` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `buttonLimitOverride` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
