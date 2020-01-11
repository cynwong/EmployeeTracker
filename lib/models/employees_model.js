// Model for employees table

const orm = require("../db/orm");

const tableName = "employees";
module.exports = {
    /**
     * Get all data from employees table
     * @param {string} sortBy the key to sort the data
     * @param {function} cb callback function
     */
    all: function(sortBy,cb){
        orm.joinAllTables(null, sortBy, res => cb(res));
    },
    /**
     * Get employee data by Id
     * @param {string} searchId employee id to search
     * @param {function} cb callback function
     */
    getEmployeeById: function(searchId, cb){
        orm.joinAllTables(`t1.id=${searchId}`,null, res=> cb(res));
    },

    /**
     * Get employees by department
     * @param {string} searchId department id to search
     * @param {function} cb callback function
     */
    getEmployeeByDepartmentId: function(searchId, cb){
        orm.joinAllTables(`t3.id=${searchId}`,null, res=> cb(res));
    },

    /**
     * Get employees by role
     * @param {string} searchId role id to search
     * @param {function} cb callback function
     */
    getEmployeeByRoleId: function(searchId, cb){
        orm.joinAllTables(`t1.role_id=${searchId}`,null, res=> cb(res));
    },

    /**
     * Get employees by manager id
     * @param {string} searchId manager id to search
     * @param {function} cb callback function
     */
    getEmployeeByRoleId: function(searchId, cb){
        orm.joinAllTables(`t1.manager_id=${searchId}`,null, res=> cb(res));
    },

    /**
     * add a new employee to the table
     * @param {any} columns list/string of column names
     * @param {any} values list/ string of column values
     * @param {function} cb callback function
     */
    add: function(columns, values, cb){
        orm.add(tableName, columns, values, cb);
    },

    /**
     * Update employee data in the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    update: function(dataToUpdate, condition, cb){
        orm.update(tableName, dataToUpdate, condition, res=> cb(res));
    },

    /**
     * delete employee data from the table
     * @param {object} dataToUpdate an Object with columns and their new values as key value pairs
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    delete: function( condition, cb){
        orm.delete(tableName, condition, res=> cb(res));
    }
};