// Model for roles table

const orm = require("../db/orm");

const tableName = "roles";
module.exports = {
    /**
     * Get all data from roles table
     * @param {function} cb callback function
     */
    all: function(cb){
        orm.select(tableName,"*", null, res => cb(res));
    },
    /**
     * Get data that meets the selection criteria from the roles table 
     * @param {any} columns list/string of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    select: function(columns, condition, cb){
        orm.select(tableName, columns, condition, res=> cb(res));
    },

    /**
     * add a new role to the table
     * @param {any} columns list/string of column names
     * @param {any} values list/ string of column values
     * @param {function} cb callback function
     */
    add: function(columns, values, cb){
        orm.add(tableName, columns, values, cb);
    },

    /**
     * Update role data in the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    update: function(dataToUpdate, condition, cb){
        orm.update(tableName, dataToUpdate, condition, res=> cb(res));
    },

    /**
     * delete role data from the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    delete: function( condition, cb){
        orm.delete(tableName, condition, res=> cb(res));
    }
};