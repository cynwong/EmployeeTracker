const connection = require("connection");

const queryDB = function(queryString, cb){
    connection.query(queryString, (err,result)=>{
        if(err) return console.error(err);
        cb(result);
    })
}

module.exports = {
    /**
     * Function for data retrival for single table
     * @param {string} table the name of the table
     * @param {array} columns array of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    select : function(table, columns, condition, cb){
        queryDB(`SELECT ${columns} FROM ${table} ${condition ? `WHERE ${condition}`: ""};`, cb);
    }, 
    
    /**
     * Add data to a table
     * @param {string} table the name of the table
     * @param {array} columns array of column names
     * @param {array} values array of the values
     * @param {function} cb callback function
     */
    add: function(table, columns, values, cb){
        queryDB(`INSERT INTO ${table} (${columns.toString()}) VALUES (${values.toString()});`, cb);
    },

    /**
     * Update related data in a table where the condition is met
     * @param {string} table the name of the table.
     * @param {object} dataToUpdate object with columns and their new values as keys, values pairs
     * @param {string} condition  conditional string
     * @param {function} cb callback function
     */
    update: function(table, dataToUpdate, condition, cb){
        let queryString = `UPDATE ${table} SET`;
        for(let [key,value] of Object.entries(dataToUpdate)){
            queryString += queryString.search(/\bSET\b$/g) === -1 ? ",": "";
            queryString += ` ${key} = ${value}`;
        }
        queryString += condition ? ` WHERE ${condition};`: ";";
        queryDB(queryString, cb);
    },

    /**
     * Delete data from a table
     * @param {string} table the name of the table.
     * @param {string} condition  conditional string
     * @param {function} cb callback function
     */
    delete: function (table, condition, cb){
        queryDB(`DELETE FROM ${table} WHERE ${condition};`, cb);
    }
}