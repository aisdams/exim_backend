-- CreateTable
CREATE TABLE `customer` (
    `customer_code` VARCHAR(191) NOT NULL,
    `partner_name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`customer_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `port` (
    `port_code` VARCHAR(191) NOT NULL,
    `port_name` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

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
    `note` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`item_cost`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation` (
    `quo_no` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `attn` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `delivery` VARCHAR(191) NOT NULL,
    `kurs` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PROCESS',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customer_code` VARCHAR(255) NOT NULL,
    `item_cost` VARCHAR(255) NOT NULL,
    `port_code` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`quo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobOrder` (
    `jo_no` VARCHAR(191) NOT NULL,
    `jo_date` VARCHAR(191) NOT NULL,
    `hbl` VARCHAR(191) NOT NULL,
    `mbl` VARCHAR(191) NOT NULL,
    `etd` VARCHAR(191) NOT NULL,
    `eta` VARCHAR(191) NOT NULL,
    `vessel` VARCHAR(191) NOT NULL,
    `gross_weight` VARCHAR(191) NOT NULL,
    `volume` VARCHAR(191) NOT NULL,
    `name_of_goods` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quo_no` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`jo_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_customer_code_fkey` FOREIGN KEY (`customer_code`) REFERENCES `customer`(`customer_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_item_cost_fkey` FOREIGN KEY (`item_cost`) REFERENCES `Cost`(`item_cost`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_port_code_fkey` FOREIGN KEY (`port_code`) REFERENCES `port`(`port_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobOrder` ADD CONSTRAINT `JobOrder_quo_no_fkey` FOREIGN KEY (`quo_no`) REFERENCES `quotation`(`quo_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
