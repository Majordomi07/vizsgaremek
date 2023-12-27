CREATE DATABASE ujmelo;

USE ujmelo;

CREATE TABLE users (
  userID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255),
  password VARCHAR(128),
  firstName VARCHAR(50),
  lastName VARCHAR(50)
);

CREATE TABLE companies (
  companiesID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  logo VARCHAR(255),
  description TEXT(100),
  userID INT,
  FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE category (
  categoryID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  category VARCHAR(20)
);

CREATE TABLE advertisement (
  advertisementID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  companiesID INT,
  title VARCHAR(20),
  general TEXT,
  requirement TEXT,
  benefit TEXT,
  location VARCHAR(30),
  categoryID INT,
  wage VARCHAR(10),
  createdAt TIMESTAMP,
  FOREIGN KEY (companiesID) REFERENCES companies(companiesID),
  FOREIGN KEY (categoryID) REFERENCES category(categoryID)
);

CREATE TABLE applications (
  userID INT,
  advertisementID INT,
  cv VARCHAR(255),
  motivation_letter VARCHAR(255),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (advertisementID) REFERENCES advertisement(advertisementID)
);