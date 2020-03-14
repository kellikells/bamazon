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

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected as thread ID: ' + connection.threadId);
    productDisplay();
});



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


// ---------------------------------------------(------------
var productsTable = [];

var query = connection.query('SELECT * FROM products');
console.log(query.sql);