create database ojlinks_v2;

use ojlinks_v2;

drop table if exists  books;
drop table if exists subcategories;
drop table if exists categories;

create table categories(
  categoryId INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  category VARCHAR(30) NOT NULL
);

create table subcategories(
  subcategoryId INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  subcategory VARCHAR(40) NOT NULL,
  categoryId INT(10) NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES Categories(categoryId)
);

create table books(
  bookId INT(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(60) NOT NULL,
  author VARCHAR(60) NOT NULL,
  edition VARCHAR(10),
  price INT(7) NOT NULL,
  img VARCHAR(10) NOT NULL,
  availability INT(5) NOT NULL,
  details LONGTEXT NOT NULL,
  pages INT(4),
  language VARCHAR(15),
  categoryId INT(10) NOT NULL,
  subcategoryId INT(10) NOT NULL,
  createdAt DATE,
  updatedAt DATE,
  deletedAt DATE,
  FOREIGN KEY (categoryId) REFERENCES Categories(categoryId),
  FOREIGN KEY (subcategoryId) REFERENCES Subcategories(subcategoryId)
);