
-- Steps to create bamazonDB --
DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

-- All of the following code, will come from bamazonDB --
USE bamazonDB;

-- Creating products table in bamazonDB --
CREATE TABLE products(
--  item_id INT AUTO_INCREMENT PRIMARY KEY , --
-- not sure why the above line doesn't work
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL, 
    department_name VARCHAR(50) NOT NULL, 
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

-- inserting data into products table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Betrayal At House On The Hill", "cooperative games", 39.49, 3), 
("Pandemic", "cooperative games", 40.00, 5),
("UNO: Classic", "card games", 9.50, 20),
("Monopoly Deal", "card games", 8.99, 10),
("Sequence", "board games", 29.99, 10),
("Battleship", "board games", 19.49, 40),
("Taboo", "party games", 15.00, 7),
("Jenga", "party games", 15.95, 10),
("5 Second Rule", "party games", 19.99, 15),
("Sudoku", "puzzles", 4.99, 30); 


-- statements dependent on customer/user input
SELECT * FROM products;

SELECT * FROM products ORDER BY department_name;

SELECT FORMAT(price, 2) FROM products;

SELECT price FROM products WHERE item_id=? AND stock_quantity> ?;

UPDATE products SET stock_quantity=? WHERE item_id=?;

