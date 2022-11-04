-- RedefineIndex
CREATE UNIQUE INDEX `log_id_key` ON `log`(`id`);
DROP INDEX `messageLog_id_key` ON `log`;
