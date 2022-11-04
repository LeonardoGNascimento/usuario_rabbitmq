/*
  Warnings:

  - Added the required column `message` to the `messageLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messagelog` ADD COLUMN `message` VARCHAR(191) NOT NULL;
