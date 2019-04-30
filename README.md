# Bamazon
  A Rutgers Coding Bootcamp Assignment
  -----

## Technologies Used
- Javascript
- node.js
- mySQL
- node modules
  - dotenv
  - inquirer 
  - mySQL

----

## Discription

Bamazon is a comand line shopping app for our very own Bamazon datebase. With in bamazon there are two apps, the first is BamazonCust, which is the customer side of our Bamazon app meant for purchasing items, and the second is BamazonManager, which is meant for managers to keep track of all products.

----
### Bamazon Customer

Upon running bammazonCust in the comand line you will be greated with the inital prompt asking if you want to purchase an item or exit the program. Seleting purchase will show a list of all avaible products in store and prompts the customer to input the id of the item they would like to buy and how much they would like to buy. If the customer's order amount is more than avaible quanity then it will let the customer know the order could not be placed, otherwise the order will be processed and the stock quantity will be deprecated.

#### Customer side Running


----
### Bamazon Manager

Upon running bamazonManager.js, you will be prompted with four comands, View Products for sale, View low inventory, Add to Inventroy, and Add New Product. Upon running each of the comands, it will return you to the initial comand prompt.

#### View Products for Sale

Selecting this comand will display all of the available products with their ids, deperatment name, the price, and the stock quanity.

#### View low inventory

Selecting this comand will show all the information products with stock quanity lower than 5. 

#### Add to Inventory

This command will show an additional prompt to select an item by it's id and setting an amount to add to the stock quantity.

#### Add New Product

This comand will show an additional prompt to fill out all the infromation for a brand new product to be added to the database.



