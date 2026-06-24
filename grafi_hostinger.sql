-- CreateTable
CREATE TABLE `companies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `logo` VARCHAR(191) NULL,
    `website` TEXT NULL,
    `redirectEnabled` BOOLEAN NOT NULL DEFAULT false,
    `theme` ENUM('LIGHT', 'DARK') NOT NULL DEFAULT 'LIGHT',
    `backgroundType` ENUM('THEME', 'SOLID', 'GRADIENT') NOT NULL DEFAULT 'THEME',
    `backgroundColor` VARCHAR(191) NULL,
    `backgroundTo` VARCHAR(191) NULL,
    `buttonColor` VARCHAR(191) NULL,
    `buttonTextColor` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `companies_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `priceMonthly` DECIMAL(10, 2) NOT NULL,
    `features` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `plans_name_key`(`name`),
    UNIQUE INDEX `plans_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'COMPANY_ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `status` ENUM('ACTIVE', 'SUSPENDED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `planId` VARCHAR(191) NULL,
    `companyId` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NULL,
    `companyName` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `photo` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `theme` ENUM('LIGHT', 'DARK') NOT NULL DEFAULT 'LIGHT',
    `photoStyle` ENUM('COLOR', 'BLACK_AND_WHITE') NOT NULL DEFAULT 'COLOR',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `backgroundType` ENUM('THEME', 'SOLID', 'GRADIENT') NOT NULL DEFAULT 'THEME',
    `backgroundColor` VARCHAR(191) NULL,
    `backgroundTo` VARCHAR(191) NULL,
    `buttonColor` VARCHAR(191) NULL,
    `buttonTextColor` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profiles_userId_key`(`userId`),
    UNIQUE INDEX `profiles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `type` ENUM('WHATSAPP', 'CALL', 'EMAIL', 'WEBSITE', 'PROJECTS', 'SCHEDULE_MEETING', 'SAVE_CONTACT', 'CUSTOM') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `icon` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `clickCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_links` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NULL,
    `programmed` BOOLEAN NOT NULL DEFAULT false,
    `url` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cards_profileId_key`(`profileId`),
    UNIQUE INDEX `cards_serial_key`(`serial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_codes` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,
    `imagePath` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `qr_codes_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analytics_events` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `eventType` ENUM('PROFILE_VIEW', 'NFC_SCAN', 'QR_SCAN', 'WHATSAPP_CLICK', 'PHONE_CLICK', 'EMAIL_CLICK', 'SOCIAL_CLICK', 'CUSTOM_LINK_CLICK', 'SAVE_CONTACT_CLICK') NOT NULL,
    `source` VARCHAR(191) NULL,
    `linkId` VARCHAR(191) NULL,
    `ipHash` VARCHAR(191) NULL,
    `device` VARCHAR(191) NULL,
    `browser` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `analytics_events_profileId_createdAt_idx`(`profileId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `source` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'CANCELLED', 'EXPIRED', 'TRIAL') NOT NULL DEFAULT 'ACTIVE',
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endsAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `subscriptionId` VARCHAR(191) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `method` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_links` ADD CONSTRAINT `social_links_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qr_codes` ADD CONSTRAINT `qr_codes_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_linkId_fkey` FOREIGN KEY (`linkId`) REFERENCES `links`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leads` ADD CONSTRAINT `leads_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
