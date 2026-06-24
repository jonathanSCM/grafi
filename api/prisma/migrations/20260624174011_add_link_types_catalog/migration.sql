-- AlterTable
ALTER TABLE `links` MODIFY `type` ENUM('WHATSAPP', 'CALL', 'EMAIL', 'WEBSITE', 'PROJECTS', 'SCHEDULE_MEETING', 'SAVE_CONTACT', 'LINKEDIN', 'INSTAGRAM', 'TIKTOK', 'FACEBOOK', 'YOUTUBE', 'PDF', 'CUSTOM') NOT NULL;

-- CreateTable
CREATE TABLE `catalog_items` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `link` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CatalogItemAssignments` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CatalogItemAssignments_AB_unique`(`A`, `B`),
    INDEX `_CatalogItemAssignments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `catalog_items` ADD CONSTRAINT `catalog_items_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CatalogItemAssignments` ADD CONSTRAINT `_CatalogItemAssignments_A_fkey` FOREIGN KEY (`A`) REFERENCES `catalog_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CatalogItemAssignments` ADD CONSTRAINT `_CatalogItemAssignments_B_fkey` FOREIGN KEY (`B`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
