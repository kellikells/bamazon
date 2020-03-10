// requiring packages
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

// ===== Query data: id, names, prices (for display) =======
// -----------------------------------------------------------
function productDisplay() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;

        // --- loop through response & logs desired 
        for (let i = 0; i < res.length; i++) {
            console.log(`id: ${res[i].item_id} | product name: ${res[i].product_name} | price: $ ${res[i].price}`);     //FORMAT(price, 2)
        }
        connection.end();  
    });
}




