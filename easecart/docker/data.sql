-- -----------------------------------------------------
-- Schema full-stack-sports-center
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `ease-cart`;

USE `ease-cart` ;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Type;
DROP TABLE IF EXISTS Product;

-- Create the Brand table
CREATE TABLE `Brand` (
                         `Id` INT AUTO_INCREMENT PRIMARY KEY,
                         `Name` VARCHAR(255) NOT NULL
);

-- Insert data into the Brand table
INSERT INTO Brand (Name) VALUES
                             ('Apple'),
                             ('Samsung');

-- Create the Type table
CREATE TABLE `Type` (
                        `Id` INT AUTO_INCREMENT PRIMARY KEY,
                        `Name` VARCHAR(255) NOT NULL
);

-- Insert data into the Type table
INSERT INTO Type (Name) VALUES
                            ('Phone'),
                            ('Laptop');

-- Create the Product table
CREATE TABLE `Product` (
                           `Id` INT AUTO_INCREMENT PRIMARY KEY,
                           `Name` VARCHAR(255) NOT NULL,
                           `Description` TEXT,
                           `Price` DECIMAL(10, 2) NOT NULL,
                           `PictureUrl` VARCHAR(255),
                           `ProductTypeId` INT NOT NULL,
                           `ProductBrandId` INT NOT NULL,
                           FOREIGN KEY (`ProductTypeId`) REFERENCES `Type`(`Id`),
                           FOREIGN KEY (`ProductBrandId`) REFERENCES `Brand`(`Id`)
);

-- Insert data into the Product table
INSERT INTO Product (Name, Description, Price, PictureUrl, ProductTypeId, ProductBrandId) VALUES
                                                                                              ('Samsung Galaxy S21', 'The Samsung Galaxy S21 features a 6.2-inch AMOLED display, Exynos 2100 processor, 8GB RAM, and 128GB storage. It comes with a triple-camera setup, including a 64MP main camera, and supports 5G connectivity.', 799, 'images/Product/samsung_s21.png', 1, 1),
                                                                                              ('Apple iPhone 13', 'The iPhone 13 has a 6.1-inch Super Retina XDR display, A15 Bionic chip, 4GB RAM, and 128GB storage. It boasts a dual-camera system with 12MP ultra-wide and wide cameras, and offers improved battery life and 5G support.', 999, 'images/Product/iphone_13.png', 1, 2),
                                                                                              ('Apple MacBook Air', 'The MacBook Air features a 13.3-inch Retina display, Apple M1 chip, 8GB RAM, and 256GB SSD. It offers up to 18 hours of battery life, a fanless design for silent operation, and a backlit Magic Keyboard.', 999, 'images/Product/macbook_air.png', 2, 3);