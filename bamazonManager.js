const inquirer = require('inquirer');
const mysql = require('mysql');

// ============= CONNECTION TO MYSQL DB ===================
// ---------------------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'groot',
    database: 'bamazonDB'
});

const dbConnect = function () {
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected as thread ID: ' + connection.threadId);
    });
}

// ============= FUNCTION: prompt menu options ============
// ---------------------------------------------------------
var productsTable = [];
var query;

function menu() {
    dbConnect();
    query = connection.query('SELECT * FROM products', function (error, data) {
        if (error) throw e
        for (i = 0; i < data.length; i++) {
            productsTable.push(data[i]);
        }
    });
    // the actual query that is run
    console.log(query.sql);
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
                // case 'Add to Inventory':
                //     addStock();
                //     connection.end();
                //     break;
                // case 'Add New Product':

                //     connection.end();
                //     break;
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
function readProducts() {
    menu();
    for (i = 0; i < productsTable.length; i++) {

        console.log(`Product ID: ${productsTable[i].item_id}  ||  Product Name: ${productsTable[i].product_name}  ||  Price: $${productsTable[i].price}  ||  Quantity: ${productsTable[i].stock_quantity}`);
    }
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
    readProducts();
    var choicesArray = [];
    var chosenItem;

    // dbConnect;
    // query = connection.query('SELECT * FROM products', function (error, data) {
    if (error) throw error;

    // CLI needs user input in order to proceed
    inquirer.prompt([{
        name: 'itemId',
        type: 'rawlist',
        message: 'Add stock quantity to: ',
        choices: function () {
            for (let i = 0; i < data.length; i++) {
                choicesArray.push(data[i].product_name)
            }
            return choicesArray;
        }
    },
    {
        name: 'addQuantity',
        type: 'number',
        message: 'Quantity: '
    }])
        .then(function (answer) {
            for (var i = 0; i < choicesArray.length; i++) {
                if (answer.itemId === choicesArray[i]) {
                    chosenItem = choicesArray[i];

                    // this saves the index of the chosen item!
                    var index = i;
                }
            }

            // var initialQuantity;
            getQuantity();

            // connection.query('UPDATE products SET ? WHERE ?',
            //     [
            //         {
            //             stock_quantity: initialQuantity += answer.addQuantity
            //         },
            //         {
            //             product_name: chosenItem

            //         }], function (err) {
            //             if (err) throw err;
            //         }
            // )
        })

    console.log(query.sql)
}

function getQuantity() {
    ('SELECT stock_quantity FROM products WHERE product_name ?', chosenItem, function (errors, results) {
        if (errors) throw errors;
        initialQuantity = results.stock_quantity
    });
};

menu();
// function newItem() {
//     inquirer
//     .prompt([
//         []
//     ])
// }