// Model for roles table

const orm = require("../db/orm");

const tableName = "roles";
const foreignTable = "departments";
const columnNames = ["id", "title", "default_salary", "department_id"];
const foreignKey = "department_id";
module.exports = {
    /**
     * Get all data from roles table
     * @param {function} cb callback function
     */
    all: function(cb){
        orm.innerJoinSelect(tableName,foreignTable, columnNames,"name", foreignKey, null,null, res=> cb(res));
    },
    /**
     * Get data that meets the selection criteria from the roles table 
     * @param {any} columns list/string of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    select: function(columns, condition, cb){
        if(typeof columns === "string" && columns.localeCompare("*")===0){
            columns = columnNames;
        }
        orm.innerJoinSelect(tableName,foreignTable, columns,"name",foreignKey, condition,null, res=> cb(res));
    },
    /**
     * Get all roles in a department by department name
     * @param {any} columns list/string of column names
     * @param {string} departmentName department name to search
     * @param {function} cb callback function
     */
    getRoleByDepartmentName(columns, departmentName, cb){
        if(typeof columns === "string" && columns.localeCompare("*")===0){
            columns = columnNames;
        }
        orm.innerJoinSelect(tableName,foreignTable, columns,"name",foreignKey, null,`name="${departmentName}"`, res=> cb(res));
    },

    /**
     * Get all roles in a department by Department ID
     * @param {any} columns list/string of column names
     * @param {string} departmentId department id to search
     * @param {function} cb callback function
     */
    getRoleByDepartmentId(columns, departmentId, cb){
        if(typeof columns === "string" && columns.localeCompare("*")===0){
            columns = columnNames;
        }
        orm.innerJoinSelect(tableName,foreignTable, columns,"name",foreignKey, null,`id=${departmentId}`, res=> cb(res));
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