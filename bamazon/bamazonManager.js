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

// pulls up a list of comands to run
function start() {
  inquirer
    .prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View Products for sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }

    ])
    .then(function (answers) {
      if (answers.menu === "View Products for sale") {
        return viewProducts();
      } else if (answers.menu === "View Low Inventory") {
        return lowInventory();
      } else if (answers.menu === "Add to Inventory") {
        return addInventory();
      } else if (answers.menu === "Add New Product") {
        return addProduct();
      }
    });
}

// pulls up all the products with there informations
function viewProducts() {
  database.query("SELECT * FROM products", function (err, itemData) {
    if (err) throw err;
    for (var i = 0; i < itemData.length; i++) {
      console.log(`
----------------------------------------------------
ID: ${itemData[i].id} | Product: ${itemData[i].product_name} | Price: $${itemData[i].price} | Stock: ${itemData[i].stock_quantity}
----------------------------------------------------
`)
    }
  })
  return start();
};

// pulls only the products with low inventory (<5)
function lowInventory() {
  database.query("SELECT * FROM products HAVING stock_quanity <= 5", function (err, itemData) {
    if (err) throw err;
    for (var i = 0; i < itemData.length; i++) {
      console.log(`
----------------------------------------------------
ID: ${itemData[i].id} | Product: ${itemData[i].product_name} | Price: $${itemData[i].price} | Stock: ${itemData[i].stock_quantity}
----------------------------------------------------
`)
    }
  })
  return start();
};

// runs a prompt and uses the answers to add stock to the selected item
function addInventory() {
  inquirer
    .prompt([{
        name: "itemId",
        message: "Which item would you like to restock?",
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
        name: "amount",
        message: "how much stock would you like to add?",
        default: "10",
        type: "input",
        validate: function (idInput) {
          if (!isNaN(idInput) && idInput >= 0 && idInput <= 10) {
            return true;
          } else {
            return "Please enter a valid amount."
          }
        }
      }
    ])
    .then(function (answers) {
      var amount = answers.amount;
      var purchaseId = parseInt(answers.itemId);
      const selectedItem = itemData.find(item => item.id == purchaseId);
      var newStock = selectedItem.stock_quantity + amount;
      database.query("UPDATE products SET stock_quantity = ? WHERE id =?", [newStock, purchaseId], function (err, res) {
        if (err) throw err;
        console.log("The stock has been updated!");
        return start();
      })
    })
};

// runs a prompt and uses the answers to create a new product
function addProduct() {
  inquirer
    .prompt([{
        name: "product_name",
        type: "input",
        messgae: "Name of the product:",
        validate: function (inputValue) {
          if (inputValue !== "") {
            return true;
          } else {
            return "Please provide an item name"
          }
        }
      },
      {
        name: "department_name",
        type: "input",
        message: "Name of the Department:",
        validate: function (inputValue) {
          if (inputValue !== "") {
            return true;
          } else {
            return "Please provide a department"
          }
        }
      },
      {
        name: "price",
        type: "input",
        message: " Enter price of product:",
        validate: function (idInput) {
          if (!isNaN(idInput) && idInput >= 0 && idInput <= 10) {
            return true;
          } else {
            return "Please enter a valid price."
          }
        }
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "Enter stock quantity:",
        validate: function (idInput) {
          if (!isNaN(idInput) && idInput >= 0 && idInput <= 10) {
            return true;
          } else {
            return "Please enter a valid stock quanity."
          }
        }
      }
    ])
    .then(function(itemInfo){
      const queryString = "INSERT INTO products SET ?";

      const query = database.query(queryString, itemInfo, function(err, res){
        if(err) throw err;
        
        console.log("The new product has been added!");

        return start();
      })
    })
}

// runs the openning prompt on start
start();