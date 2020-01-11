const mysql = require("mysql");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname,"..","..", "config", "db", "db_config.env")
});

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    if(err) throw err;
    console.log(`database connected on ${connection.threadId} `);
});

module.exports = connection;

