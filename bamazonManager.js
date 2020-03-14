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

            var menuSelection = answer.menu.choices[i];

            switch (i) {
                case '0':

                    break;
                case '1':

                    break;
                case '2':

                    break;
                case '3':

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

function readProducts() {
    // --- connect to DB
    dbConnect();
    var query = connection.query('SELECT * FROM products', function (error, data) {
        if (error) throw error;
        
        for (i=0; i<data.length; i++){
            productsTable.push(data[i]);

            console.log(`Product ID: ${data[i].item_id}  ||  Product Name: ${data[i].product_name}  ||  Price: $${data[i].price}  ||  Quantity: ${data[i].stock_quantity}`);
        }
    });
    // the actual query that is run
    console.log(query.sql);
    connection.end();
}


function lowInventory (){
    dbConnect();
    var query = connection.query('')
}