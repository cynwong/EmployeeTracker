//import MySQL connection from connection.js
const connection = require("./connection");


const employeesTable = "employees";
const rolesTable = "roles";
const departmentsTable = "departments";


/**
 * Run MySQL query command
 * @param {string} queryString MySQL query string
 * @param {function} cb callback function
 */
const queryDB = function(queryString, cb){
    connection.query(queryString, (err,result)=>{
        console.log(queryString);
        cb(err,result);
    })
};

/**
 * Convert to string if data passed is an Array.
 * @param {any} data 
 */
const parseData = function (data){
    let newData = data;
    if(data instanceof Array){
        newData = newData.map(d => typeof d === "string" ? `"${d}"`: d).join();
    } else if(typeof newData === "string"){
        newData = `"${newData}"`;
    }
    return newData;
};


/**
 * Parse the column names for MySQL query.
 * @param {any} columns 
 * @param {string} tablename 
 */
const parseColumns = function (data,tablename = ""){
    if(data instanceof Array){
        if(tablename){
            return `${tablename}.` + data.join(`,${tablename}.`);
        }
        return data.join();
    }
    return tablename ? `${tablename}.${data}` : data;
};


module.exports = {
    /**
     * Function for data retrival for single table
     * @param {string} table the name of the table
     * @param {array} columns array of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     */
    select : function(table, columns, condition, cb){
        queryDB(`SELECT ${parseColumns(columns)} FROM ${table} ${condition ? `WHERE ${condition}`: ""};`, cb);
    }, 

    /**
     * Function to retrieve data from two tables with inner join 
     * @param {string} table the name of the table
     * @param {array} columns array of column names
     * @param {string} condition conditional string
     * @param {function} cb callback function
     * e.g 
     * SELECT roles.id, roles.title, roles.default_salary, departments.name
        FROM roles
            INNER JOIN departments
            ON roles.department_id = departments.id;
     */
    innerJoinSelect: function (manyTable, oneTable, manyTableColumns, oneTableColumns, manyTableForeignKey, manyTableCondition, oneTableCondition, cb){
        let queryString = `SELECT ${parseColumns(manyTableColumns, manyTable)}, ${parseColumns(oneTableColumns, oneTable)}`;
        queryString += ` FROM ${manyTable}`;
        queryString += ` INNER JOIN ${oneTable}`;
        queryString += ` ON ${manyTable}.${manyTableForeignKey} = ${oneTable}.id`;
        if(manyTableCondition || oneTableCondition){
            queryString += ` WHERE`;
            if(manyTableCondition){
                queryString += ` ${manyTable}.${manyTableCondition}`;
                if(oneTableCondition){
                    queryString += " AND";
                }
            }
            if(oneTableCondition){
                queryString += ` ${oneTable}.${oneTableCondition}`;
            }
        }
        
        queryString += ";"
        queryDB(queryString, cb);
    }, 

    /**
     * Get Data from all 3 tables
     * @param {string} condition conditional statement
     * @param {string} sortBy value: null, "manager", "department"
     * @param {function} cb callback function
     * 
     * Sample query String 
        SELECT t1.id, t1.first_name, t1.last_name, t2.title, t1.salary, t3.name as department_name, CONCAT(t4.first_name, " ", t4.last_name) as manager
        FROM employees as t1
            INNER JOIN roles AS t2 ON t1.role_id = t2.id
            INNER JOIN departments AS t3 ON t2.department_id = t3.id
            LEFT JOIN employees AS t4 on t1.manager_id = t4.id
        ORDER BY t3.name, t1.id;
     */
    joinAllTables: function(condition, sortBy,cb){
        let queryString = "SELECT t1.id as id, t1.first_name as first_name, t1.last_name as last_name, t2.title as title, t1.salary as salary, t3.name as department_name, CONCAT(t4.first_name, \" \", t4.last_name) as manager ";
        let orderBy= null;

        queryString += `FROM ${employeesTable} AS t1 `;
        queryString += `INNER JOIN ${rolesTable} AS t2 ON t1.role_id = t2.id `;
        queryString += `INNER JOIN ${departmentsTable} AS t3 on t2.department_id = t3.id `;
        queryString += `LEFT JOIN ${employeesTable} AS t4 on t1.manager_id = t4.id `;
        if(condition){
            queryString += `WHERE ${condition} `;
        }
        switch(sortBy && sortBy.toLowerCase()){
            case "manager": 
                orderBy = "manager";
                break;
            case "department":
                orderBy = "department_name";
                break;
            default: 
        }
        queryString += `ORDER BY ${orderBy?`${orderBy},`: ""} id;`;
        queryDB(queryString,cb);
    },
    

    /**
     * Generic query function
     * @param {string} queryString 
     * @param {function} cb callback function
     */
    query : function(queryString, cb){
        queryDB(queryString, cb);
    }, 
    
    /**
     * Add data to a table
     * @param {string} table the name of the table
     * @param {array} columns array of column names
     * @param {array} values array of the values
     * @param {function} cb callback function
     */
    add: function(table, columns, values, cb){
        queryDB(`INSERT INTO ${table} (${parseColumns(columns)}) VALUES (${parseData(values)});`, cb);
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
            queryString += ` ${key} = ${parseData(value)}`;
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