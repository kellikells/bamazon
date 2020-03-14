// --- requiring packages
const inquirer = require('inquirer');
const mysql = require('mysql');

// ========= Sets up the ability to connect to DB ==========
//     put into our client(node), how to connect to DB
// ----------------------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'groot',
    database: 'bamazonDB'
});

// =================== CONNECTING TO DB =====================
//         also tells what to do when connected
// ------------------------------------------------------------
connection.connect((err) => {
    if (err) throw err;

    // thread ID: can be used to kill the thread or if connection is lost, to reconnect
    console.log('Connected as thread ID: ' + connection.threadId);
    productDisplay();
});

// =============== QUERY: ALL DATA from table ================
//  Array to store ALL data in the table, from initial connection.query (saves time by not having to connect with DB until updating/deleting etc)
var productsTable = [];
// -----------------------------------------------------------
function productDisplay() {
    connection.query('SELECT * FROM products ORDER BY department_name', (err, res) => {
        if (err) throw err;

        // --- loop through response & logs desired 
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}  || Product Name: ${res[i].product_name}  || Price: $ ${res[i].price}`);
            productsTable.push(res[i]);
        }
        console.log(productsTable);
        console.log(typeof productsTable); // returns object 

        start();
    });
}

// ========================= Prompt ===========================
// ------------------------------------------------------------
function start() {
    inquirer
        .prompt([
            {
                name: 'itemId',
                type: 'number',
                message: 'Enter the product ID (number) you want to buy: '
            },
            {
                name: 'quantity',
                type: 'number',
                message: 'How many units (number): '
            }
        ])
        .then(function (answer) {

            // --- all the data for the item the user selects, stored as an object
            var userChoice;

            for (let i = 0; i < productsTable.length; i++) {
                if (answer.itemId === productsTable[i].item_id) {
                    userChoice = productsTable[i];          //  SAVES THE WHOLE ROW OBJECT 
                }
            }
            if (answer.quantity > userChoice.stock_quantity) {
                console.log(`Sorry, we don't have that many.  Let's start over`);
                productDisplay();
            }
            else {
                console.log(`CONGRATULATIONS ON YOUR PURCHASE!!! Amount Due: $${(answer.quantity * userChoice.price).toFixed(2)}`);

                // --- saves new stock_quantity for DB update
                // --- updates productsTable array 
                var stock_updated = userChoice.stock_quantity -= answer.quantity;

                console.log(`UPDATED ARRAY ${productsTable}`);

                connection.query('UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_quantity: stock_updated
                        },
                        {
                            item_id: userChoice.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                    });
                productDisplay();
            }
        })
}


