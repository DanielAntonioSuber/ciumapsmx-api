drop database if exists ciumapsmx;

create database ciumapsmx;

use ciumapsmx;

CREATE TABLE roles(
    role_id INT PRIMARY KEY,
    role_name VARCHAR(30)
);

CREATE TABLE images(
    image_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image_path VARCHAR(255) UNIQUE NOT NULL,
    image_name VARCHAR(50)
); 

CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    role INT NOT NULL ,
    avatar_image INT NOT NULL,
    username NVARCHAR(40) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    email NVARCHAR(40) UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(role) REFERENCES roles(role_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(avatar_image) REFERENCES images(image_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE types_of_places(
    kind_of_place_id INT PRIMARY KEY NOT NULL,
    kind_name VARCHAR(50) NOT NULL
);

CREATE TABLE places(
    place_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    kind_of_place INT NOT NULL,
    place_name NVARCHAR(100) UNIQUE NOT NULL,
    place_description text,
    direction NVARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(kind_of_place) REFERENCES types_of_places(kind_of_place_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE place_rewies(
    star_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user INT NOT NULL,
    place INT NOT NULL,
    star_score INT NOT NULL,
    security_score INT NOT NULL,
    FOREIGN KEY(place) REFERENCES places(place_id),
    FOREIGN KEY(user) REFERENCES users(user_id)
);