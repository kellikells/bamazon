// requiring packages
const inquirer = require('inquirer');
const mysql = require('mysql');


// ===== sets up the ability to connect to DB =======
//   put into our client(node), 
//   how to connect to DB
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'groot',
    database: 'bamazonDB'
});

// ======== CONNECTING TO DB ============
//    also tells what to do when connected
connection.connect((err) => {
    if (err) throw err;

    // thread ID: can be used to kill the thread or if connection is lost, to reconnect
    console.log("Connected as thread ID: " + connection.threadID);
    connection.end();

});