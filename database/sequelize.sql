drop database if exists ciumapsmx;

create database ciumapsmx;

use ciumapsmx;

CREATE TABLE IF NOT EXISTS `roles`
  (
     `id`   INTEGER UNSIGNED,
     `name` VARCHAR(30),
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `images`
  (
     `id`   INTEGER UNSIGNED NOT NULL auto_increment,
     `name` VARCHAR(50) NOT NULL,
     `path` VARCHAR(255) NOT NULL UNIQUE,
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `users`
  (
     `id`          INTEGER UNSIGNED NOT NULL auto_increment,
     `roleId`      INTEGER UNSIGNED NOT NULL,
     `username`    VARCHAR(40) NOT NULL UNIQUE,
     `password`    VARCHAR(100) NOT NULL,
     `email`       VARCHAR(40) NOT NULL UNIQUE,
     `avatarImage` INTEGER UNSIGNED NOT NULL,
     `createdAt`   DATETIME,
     `updatedAt`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`avatarImage`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `types_of_places`
  (
     `id`   INTEGER UNSIGNED NOT NULL auto_increment,
     `name` VARCHAR(100) NOT NULL UNIQUE,
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `places`
  (
     `id`          INTEGER UNSIGNED NOT NULL auto_increment,
     `name`        VARCHAR(100) NOT NULL UNIQUE,
     `description` TEXT,
     `direction`   VARCHAR(100) NOT NULL,
     `kind`        INTEGER UNSIGNED,
     `createdAt`   DATETIME,
     `updatedAt`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`kind`) REFERENCES `types_of_places` (`id`) ON DELETE CASCADE
     ON UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `place_reviews`
  (
     `id`            INTEGER UNSIGNED NOT NULL auto_increment,
     `userId`        INTEGER UNSIGNED NOT NULL,
     `placeId`       INTEGER UNSIGNED NOT NULL,
     `starScore`     INTEGER UNSIGNED NOT NULL DEFAULT 0,
     `securityScore` INTEGER UNSIGNED NOT NULL DEFAULT 0,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `images_of_places`
  (
     `id`          INTEGER UNSIGNED NOT NULL auto_increment,
     `placeId`     INTEGER UNSIGNED NOT NULL,
     `imageId` INTEGER UNSIGNED NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb; 