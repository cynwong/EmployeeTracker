const mysql = require("mysql");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname,"..","..", "config", "db_config.env")
});

const {
    host: DB_HOST,
    port: DB_PORT, 
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
} = process.env;

const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database
});

connection.connect((err)=>{
    if(err) throw err;
    console.log(`database connected on ${connection.threadId} `);
})