-- CreateTable
CREATE TABLE `log` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `fila` VARCHAR(191) NOT NULL,
    `pattern` VARCHAR(191) NOT NULL,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `messageLog_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
