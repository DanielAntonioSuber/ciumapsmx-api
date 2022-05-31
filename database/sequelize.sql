CREATE TABLE IF NOT EXISTS `roles` (
  `id` INTEGER UNSIGNED,
  `name` VARCHAR(30),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `images` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `name` VARCHAR(50) NOT NULL,
  `path` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `roleId` INTEGER UNSIGNED NOT NULL,
  `username` VARCHAR(40) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(40) NOT NULL UNIQUE,
  `avatarImage` INTEGER UNSIGNED NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`avatarImage`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `types_of_places` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `places` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `userId` INTEGER UNSIGNED,
  `validated` TINYINT(1) NOT NULL DEFAULT false,
  `description` TEXT,
  `direction` VARCHAR(100) NOT NULL,
  `kind` INTEGER UNSIGNED,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  `placeId` INTEGER UNSIGNED,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`kind`) REFERENCES `types_of_places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`placeId`) REFERENCES `users` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `place_scores` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `userId` INTEGER UNSIGNED NOT NULL,
  `placeId` INTEGER UNSIGNED NOT NULL,
  `starScore` INTEGER UNSIGNED NOT NULL DEFAULT 0,
  `securityScore` INTEGER UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `images_of_places` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `placeId` INTEGER UNSIGNED NOT NULL,
  `imageId` INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INTEGER UNSIGNED NOT NULL auto_increment,
  `userId` INTEGER UNSIGNED NOT NULL,
  `placeId` INTEGER UNSIGNED NOT NULL,
  `text` TEXT,
  `createdAt` DATETIME,
  `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;