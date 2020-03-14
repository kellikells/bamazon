var inquirer = require('inquirer');
var mysql = require('mysql');


// ============= CONNECTION TO MYSQL DB ===================
// ---------------------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'groot',
    database: 'bamazonDB'
});

var dbConnect = function () {
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected as thread ID: ' + connection.threadId);
    });
}

// ============= FUNCTION: prompt menu options ============
// ---------------------------------------------------------
function menu() {
    inquirer
        .prompt([
            {
                name: 'menu',
                type: 'list',
                message: 'Menu: Options',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
            }
        ])
        .then(function (answer) {

            var menuSelection = answer.menu

            switch (menuSelection) {
                case 'View Products for Sale':
                    readProducts();
                    connection.end();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    connection.end();
                    break;
                case 'Add to Inventory':

                    connection.end();
                    break;
                case 'Add New Product':

                    connection.end();
                    break;
            }
        })
        .catch(function (error) {
            if (error) {
                console.log(`prompt wasn't rendered`);
            } else {
                console.log(`something else went wrong`);
            }
        });
}

// ---------------------------------------------------------
// stores ALL data from products table
var productsTable = [];
var query;

function readProducts() {
    // --- connect to DB
    dbConnect();
    query = connection.query('SELECT * FROM products', function (error, data) {
        if (error) throw error;

        for (i = 0; i < data.length; i++) {
            productsTable.push(data[i]);

            console.log(`Product ID: ${data[i].item_id}  ||  Product Name: ${data[i].product_name}  ||  Price: $${data[i].price}  ||  Quantity: ${data[i].stock_quantity}`);
        }
    });
    // the actual query that is run
    console.log(query.sql);
}

function lowInventory() {
    dbConnect();
    query = connection.query('SELECT * FROM products WHERE stock_quantity<5', function (error, data) {
        if (error) throw error;

        for (i = 0; i < data.length; i++) {

            console.log(`Product ID: ${data[i].item_id}  ||  Product Name: ${data[i].product_name}  ||  Price: $${data[i].price}  ||  Quantity: ${data[i].stock_quantity}  ||  Department: ${data[i].department_name}`);
        }
    });
}

function addStock() {
    dbConnect;
    query = connection.query('SELECT * FROM products', function (error, data) {
        if (error) throw error;


        inquirer
            .prompt([
                {
                    name: 'itemId',
                    type: 'list',
                    message: 'Add stock quantity to: ',
                    choices: function () {
                        var choicesArray = [];

                        for (let i = 0; i < data.length; i++) {
                            choicesArray.push(data[i].product_name)
                        }
                        return choicesArray;
                        console.log(`we got this far yay`);
                    }
                }
            ])
    })
}
addStock();