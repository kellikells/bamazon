
-- Steps to create bamazonDB --
DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

-- All of the following code, will affect bamazonDB --
USE bamazonDB;

-- Creating products table in bamazonDB --
CREATE TABLE products(

--  item_id INT AUTO_INCREMENT PRIMARY KEY , --
-- not sure why the above line doesn't work

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(50) NOT NULL, 
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);