CREATE TABLE `loginV2` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` TEXT NULL,
  `email` TEXT NULL PROTECTED,
  `username` TEXT NULL PROTECTED,
  `pass` TEXT NULL,
  `active` VARCHAR(1) NULL DEFAULT '1',
  `date` TEXT NULL,
  `datetime` TEXT NULL,
  PRIMARY KEY (`id`));
