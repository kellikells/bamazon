const inquirer = require('inquirer');
const mysql = require('mysql');

var productsTable = [];
var query;

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
        console.log('\n');
        console.log('Connected as thread ID: ' + connection.threadId);
    });

    getData();
    // the actual query that is run
    // console.log(query.sql);
    // connection.end();
    menu();
}
dbConnect();

function getData() {
    // empty out array 
    productsTable.splice(0, productsTable.length);

    query = connection.query('SELECT * FROM products', function (error, data) {
        if (error) throw e
        for (i = 0; i < data.length; i++) {
            productsTable.push(data[i]);
        }
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

            // ======= SWITCH STATEMENT: MENU OPTIONS =======
            switch (menuSelection) {
                case 'View Products for Sale':
                    readProducts();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    addStock();
                    break;
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

    console.log('\n');
    for (i = 0; i < productsTable.length; i++) {
        console.log(`Product ID: ${productsTable[i].item_id}  ||  Product Name: ${productsTable[i].product_name}  ||  Price: $${productsTable[i].price}  ||  Quantity: ${productsTable[i].stock_quantity}`);
    }
    menu();
}

function lowInventory() {

    console.log('\n');
    console.log(`PRODUCTS WITH LOW INVENTORY:`);
    console.log(`---------------------------`);
    console.log('\n');
    for (i = 0; i < productsTable.length; i++) {

        if (productsTable[i].stock_quantity < 5) {
            console.log(`Product ID: ${productsTable[i].item_id}  ||  Product Name: ${productsTable[i].product_name}  ||  Price: $${productsTable[i].price}  ||  Quantity: ${productsTable[i].stock_quantity}  ||  Department: ${productsTable[i].department_name}`);
        }
    }
    console.log('\n');
    menu();
}

function addStock() {
    readProducts();
    var choicesArray = [];
    var chosenItem;

    console.log('\n');
    // CLI needs user input in order to proceed
    inquirer.prompt([{
        name: 'itemId',
        type: 'rawlist',
        message: 'Add stock quantity to: ',
        choices: function () {
            for (let i = 0; i < productsTable.length; i++) {
                choicesArray.push(productsTable[i].product_name)
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
            console.log(`ADDED STOCK TO: ${chosenItem}`);
            console.log(`NEW QUANTITY: ${productsTable[index].stock_quantity += answer.addQuantity}`);

            connection.query('UPDATE products SET ? WHERE ?',
                [{
                    stock_quantity: productsTable[index].stock_quantity += answer.addQuantity
                },
                {
                    product_name: chosenItem

                }], function (err) {
                    if (err) throw err;
                }
            )
            getData();
        });
        menu();
}


// function newItem() {
//     inquirer
//     .prompt([
//         []
//     ])
// }