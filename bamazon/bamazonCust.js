// import packages
const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

// creaete connection to the database
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.secret_password,
  database: "bamazon_db"
});


function start() {
  // Pulls all the products, their ids, and price 
  database.query("SELECT * FROM products", function (err, itemData) {
    if (err) throw err;
    for (var i = 0; i < itemData.length; i++) {
      console.log(`-----------------------------------------------
ID: ${itemData[i].id} | Product: ${itemData[i].product_name} | Price: $${itemData[i].price}
-----------------------------------------------
`)
    }
    // Asks the user what they want to buy and how much
    inquirer.prompt([{
        name: "itemId",
        message: "Which item would you like to buy?",
        default: "3",
        type: "input",
        validate: function (idInput) {
          if (!isNaN(idInput) && idInput >= 0 && idInput <= 10) {
            return true;
          } else {
            return "Please enter a valid ID."
          }
        }

      },
      {
        message: "How many would you like to purchase",
        name: "purchaseAmount",
        default: "15",
        type: "input",
        validate: function (idInput) {
          if (!isNaN(idInput) && idInput >= 0 && idInput <= 10) {
            return true;
          } else {
            return "Please enter a valid number to purchase."
          }
        }
      }
    ]).then(function (purchaseInfo) {
      // ties the response to variables
      var amount = purchaseInfo.purchaseAmount;
      var purchaseId = parseInt(purchaseInfo.itemId);

      // finds the item by the responses 
      const selectedItem = itemData.find(item => item.id == purchaseId)
     
      // lets the customer know if there isn't enough to place the order
      if (selectedItem.stock_quantity < amount) {
        console.log("Looks like we don't have enough in stock for you.")
        return start();
      } 
      
      // Lets the customer know their order has been placed and updates the new stock amount in the database
      else {
        var newStock = selectedItem.stock_quantity - amount;
        database.query("UPDATE products SET stock_quantity = ? WHERE id =?", [newStock, purchaseId], function (err, res) {
          if (err) throw err;
          console.log("Your order has been placed!");
          return start();
        })

      }
    });
  })

}

// runs the function on load
start();