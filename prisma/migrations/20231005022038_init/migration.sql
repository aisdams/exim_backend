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
    `mata_uang` ENUM('IDR', 'USD') NOT NULL DEFAULT 'IDR',
    `amount` VARCHAR(191) NOT NULL,
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
    `attn` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `delivery` VARCHAR(191) NULL,
    `kurs` VARCHAR(191) NULL,
    `loading` VARCHAR(191) NULL,
    `discharge` VARCHAR(191) NULL,
    `no_count` VARCHAR(191) NULL,
    `status` ENUM('Executed', 'InProgress', 'Cancel') NULL DEFAULT 'InProgress',
    `customer_code` VARCHAR(255) NOT NULL,
    `item_cost` VARCHAR(255) NOT NULL,
    `port_code` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`quo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobOrder` (
    `jo_no` VARCHAR(191) NOT NULL,
    `jo_date` VARCHAR(191) NOT NULL,
    `shipper` VARCHAR(191) NULL,
    `consignee` VARCHAR(191) NULL,
    `qty` VARCHAR(191) NOT NULL,
    `hbl` VARCHAR(191) NOT NULL,
    `mbl` VARCHAR(191) NOT NULL,
    `etd` VARCHAR(191) NOT NULL,
    `eta` VARCHAR(191) NOT NULL,
    `vessel` VARCHAR(191) NOT NULL,
    `gross_weight` VARCHAR(191) NOT NULL,
    `volume` VARCHAR(191) NOT NULL,
    `name_of_goods` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `quo_no` VARCHAR(255) NOT NULL,
    `customer_code` VARCHAR(255) NOT NULL,
    `port_code` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`jo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JOC` (
    `joc_no` VARCHAR(191) NOT NULL,
    `no_mbl` VARCHAR(191) NOT NULL,
    `status` ENUM('Executed', 'InProgress', 'Cancel') NULL DEFAULT 'InProgress',
    `vessel` VARCHAR(191) NOT NULL,
    `no_container` VARCHAR(191) NOT NULL,
    `general_purpose` VARCHAR(191) NOT NULL,
    `loading` VARCHAR(191) NOT NULL,
    `discharge` VARCHAR(191) NOT NULL,
    `etd` VARCHAR(191) NOT NULL,
    `eta` VARCHAR(191) NOT NULL,
    `quo_no` VARCHAR(255) NOT NULL,
    `jo_no` VARCHAR(255) NOT NULL,
    `customer_code` VARCHAR(255) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`joc_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_item_cost_fkey` FOREIGN KEY (`item_cost`) REFERENCES `Cost`(`item_cost`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_port_code_fkey` FOREIGN KEY (`port_code`) REFERENCES `port`(`port_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobOrder` ADD CONSTRAINT `JobOrder_quo_no_fkey` FOREIGN KEY (`quo_no`) REFERENCES `quotation`(`quo_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobOrder` ADD CONSTRAINT `JobOrder_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobOrder` ADD CONSTRAINT `JobOrder_port_code_fkey` FOREIGN KEY (`port_code`) REFERENCES `port`(`port_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JOC` ADD CONSTRAINT `JOC_quo_no_fkey` FOREIGN KEY (`quo_no`) REFERENCES `quotation`(`quo_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JOC` ADD CONSTRAINT `JOC_jo_no_fkey` FOREIGN KEY (`jo_no`) REFERENCES `JobOrder`(`jo_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JOC` ADD CONSTRAINT `JOC_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
