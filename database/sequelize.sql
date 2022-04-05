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
     `roleid`      INTEGER UNSIGNED NOT NULL,
     `username`    VARCHAR(40) NOT NULL UNIQUE,
     `password`    VARCHAR(100) NOT NULL,
     `email`       VARCHAR(40) NOT NULL UNIQUE,
     `avatarimage` INTEGER UNSIGNED NOT NULL,
     `createdat`   DATETIME,
     `updatedat`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`roleid`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`avatarimage`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
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
     `createdat`   DATETIME,
     `updatedat`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`kind`) REFERENCES `types_of_places` (`id`) ON DELETE CASCADE
     ON UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `place_reviews`
  (
     `id`            INTEGER UNSIGNED NOT NULL auto_increment,
     `userid`        INTEGER UNSIGNED NOT NULL,
     `placeid`       INTEGER UNSIGNED NOT NULL,
     `starscore`     INTEGER UNSIGNED NOT NULL DEFAULT 0,
     `securityscore` INTEGER UNSIGNED NOT NULL DEFAULT 0,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`placeid`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `images_of_places`
  (
     `id`          INTEGER UNSIGNED NOT NULL auto_increment,
     `placeid`     INTEGER UNSIGNED NOT NULL,
     `place_image` INTEGER NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`placeid`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`place_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb; 