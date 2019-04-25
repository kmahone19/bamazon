DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE produccts(
  item_id INT NOT NULL AUTO_INCREMEMT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40) NOT NULL,
  price INT(10) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO produccts (product_name, department_name, price, stock_quantity)
VALUES ("ice cream", "frozen food", 15.00, 20),
("unicycle", "outdoors", 30.00, 45),
("pens", "office supplies", 0.75, 200),
("phone charger", "electronics", 5.00, 75),
("The Office DVDS", "entertainment", 25.00, 80),
("Tazer", "self defense", 45.00, 10),
("ballons", "party suplies", 10.00, 100),
("10ft rope", "outdoors", )