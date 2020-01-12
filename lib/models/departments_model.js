// Model for department table 

const orm = require("../db/orm");

const tableName = "departments";

module.exports = {
    /**
     * Get all data from department table
     * @param {function} cb 
     */
    all: function(cb){
        orm.select(tableName, "*", null, cb);
    },

    /**
     * Get data that meets the selection criteria from the roles table 
     * @param {any} columns list/string of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    select: function(columns, condition, cb){
        orm.select(tableName, columns, condition, cb);
    },

    /**
     * add a new department to the table
     * @param {any} columns list/string of column names
     * @param {any} values list/ string of column values
     * @param {function} cb callback function
     */
    add: function(columns, values, cb){
        orm.add(tableName, columns, values, cb);
    },

    /**
     * Update department data in the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    update: function(dataToUpdate, condition, cb){
        orm.update(tableName, dataToUpdate, condition, cb);
    },

    /**
     * delete department data from the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    delete: function( condition, cb){
        orm.delete(tableName, condition, cb);
    }
};