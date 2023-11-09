-- CreateTable
CREATE TABLE `users` (
    `user_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL DEFAULT 'https://i.postimg.cc/wB8wQtrs/avatar.png',
    `verified` BOOLEAN NULL DEFAULT true,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'admin') NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`user_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customer_code` VARCHAR(191) NOT NULL,
    `partner_name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`customer_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `port` (
    `port_code` VARCHAR(191) NOT NULL,
    `port_name` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`port_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cost` (
    `item_cost` VARCHAR(191) NOT NULL,
    `item_name` VARCHAR(191) NOT NULL,
    `qty` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `mata_uang` ENUM('IDR', 'USD') NULL DEFAULT 'IDR',
    `price` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`item_cost`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation` (
    `quo_no` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `customer` VARCHAR(191) NULL,
    `attn` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `delivery` VARCHAR(191) NULL,
    `kurs` VARCHAR(191) NULL,
    `loading` VARCHAR(191) NULL,
    `discharge` VARCHAR(191) NULL,
    `valheader` VARCHAR(191) NULL,
    `valfooter` VARCHAR(191) NULL,
    `status` ENUM('Executed', 'InProgress', 'Cancel') NULL DEFAULT 'InProgress',
    `customer_code` VARCHAR(255) NULL,
    `port_code` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`quo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jo` (
    `jo_no` VARCHAR(191) NOT NULL,
    `jo_date` VARCHAR(191) NULL,
    `shipper` VARCHAR(191) NULL,
    `consignee` VARCHAR(191) NULL,
    `qty` VARCHAR(191) NULL,
    `hbl` VARCHAR(191) NULL,
    `mbl` VARCHAR(191) NULL,
    `etd` VARCHAR(191) NULL,
    `eta` VARCHAR(191) NULL,
    `loading` VARCHAR(191) NULL,
    `discharge` VARCHAR(191) NULL,
    `vessel` VARCHAR(191) NULL,
    `gross_weight` VARCHAR(191) NULL,
    `volume` VARCHAR(191) NULL,
    `name_of_goods` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    `quo_no` VARCHAR(255) NULL,
    `customer_code` VARCHAR(255) NULL,
    `port_code` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`jo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JOC` (
    `joc_no` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `no_mbl` VARCHAR(191) NOT NULL,
    `agent` VARCHAR(191) NULL,
    `status` ENUM('Executed', 'InProgress', 'Cancel') NULL DEFAULT 'InProgress',
    `vessel` VARCHAR(191) NOT NULL,
    `no_container` VARCHAR(191) NOT NULL,
    `loading` VARCHAR(191) NOT NULL,
    `discharge` VARCHAR(191) NOT NULL,
    `etd` VARCHAR(191) NOT NULL,
    `eta` VARCHAR(191) NOT NULL,
    `quo_no` VARCHAR(255) NULL,
    `customer_code` VARCHAR(255) NULL,
    `createdBy` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`joc_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CostToQuotation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CostToQuotation_AB_unique`(`A`, `B`),
    INDEX `_CostToQuotation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_JOCToJo` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JOCToJo_AB_unique`(`A`, `B`),
    INDEX `_JOCToJo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_port_code_fkey` FOREIGN KEY (`port_code`) REFERENCES `port`(`port_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jo` ADD CONSTRAINT `Jo_quo_no_fkey` FOREIGN KEY (`quo_no`) REFERENCES `quotation`(`quo_no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jo` ADD CONSTRAINT `Jo_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jo` ADD CONSTRAINT `Jo_port_code_fkey` FOREIGN KEY (`port_code`) REFERENCES `port`(`port_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JOC` ADD CONSTRAINT `JOC_quo_no_fkey` FOREIGN KEY (`quo_no`) REFERENCES `quotation`(`quo_no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JOC` ADD CONSTRAINT `JOC_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CostToQuotation` ADD CONSTRAINT `_CostToQuotation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cost`(`item_cost`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CostToQuotation` ADD CONSTRAINT `_CostToQuotation_B_fkey` FOREIGN KEY (`B`) REFERENCES `quotation`(`quo_no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JOCToJo` ADD CONSTRAINT `_JOCToJo_A_fkey` FOREIGN KEY (`A`) REFERENCES `JOC`(`joc_no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JOCToJo` ADD CONSTRAINT `_JOCToJo_B_fkey` FOREIGN KEY (`B`) REFERENCES `Jo`(`jo_no`) ON DELETE CASCADE ON UPDATE CASCADE;
