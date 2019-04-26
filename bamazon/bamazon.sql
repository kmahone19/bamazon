DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ice cream", "frozen food", 15.00, 20),
("backpack", "outdoors", 30.00, 45),
("watskin", "outdoors", 20.00, 100),
("phone charger", "electronics", 5.00, 75),
("The Office DVDS", "entertainment", 25.00, 80),
("bed roll", "camping", 45.00, 10),
("10 tourches", "party suplies", 10.00, 100),
("50ft rope", "outdoors", 30.00, 15),
("Mess kit", "survival gear", 35.00, 50),
("Rations", "survival gear", 50.00, 6)

