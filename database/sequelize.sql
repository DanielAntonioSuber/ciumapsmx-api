drop database if exists ciumapsmx;

create database ciumapsmx;

use ciumapsmx;

CREATE TABLE IF NOT EXISTS `roles`
  (
     `id`   INTEGER,
     `name` VARCHAR(30),
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `images`
  (
     `id`   INTEGER NOT NULL auto_increment,
     `name` VARCHAR(50) NOT NULL,
     `path` VARCHAR(255) NOT NULL UNIQUE,
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `users`
  (
     `id`          INTEGER NOT NULL auto_increment,
     `role`        INTEGER NOT NULL,
     `username`    VARCHAR(40) NOT NULL UNIQUE,
     `password`    VARCHAR(100) NOT NULL,
     `email`       VARCHAR(40) NOT NULL UNIQUE,
     `avatarimage` INTEGER NOT NULL,
     `createdat`   DATETIME,
     `updatedat`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE
     CASCADE,
     FOREIGN KEY (`avatarimage`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `types_of_places`
  (
     `id`   INTEGER NOT NULL auto_increment,
     `name` VARCHAR(100) NOT NULL UNIQUE,
     PRIMARY KEY (`id`)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `places`
  (
     `id`          INTEGER NOT NULL auto_increment,
     `name`        VARCHAR(100) NOT NULL UNIQUE,
     `description` TEXT,
     `direction`   VARCHAR(100) NOT NULL,
     `kind`        INTEGER,
     `createdat`   DATETIME,
     `updatedat`   DATETIME,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`kind`) REFERENCES `types_of_places` (`id`) ON DELETE CASCADE
     ON UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `place_reviews`
  (
     `id`            INTEGER NOT NULL auto_increment,
     `user`          INTEGER NOT NULL,
     `place`         INTEGER NOT NULL,
     `starscore`     INTEGER NOT NULL DEFAULT 0,
     `securityscore` INTEGER NOT NULL DEFAULT 0,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE
     CASCADE,
     FOREIGN KEY (`place`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS `images_of_places`
  (
     `id`          INTEGER NOT NULL auto_increment,
     `place`       INTEGER NOT NULL,
     `place_image` INTEGER NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`place`) REFERENCES `places` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE,
     FOREIGN KEY (`place_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON
     UPDATE CASCADE
  )
engine=innodb; 