CREATE DATABASE IF NOT EXISTS hr_db;

USE hr_db;

CREATE TABLE IF NOT EXISTS departments(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    is_removed boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles(
	id int AUTO_INCREMENT,
	title varchar(255) NOT NULL,
    default_salary FLOAT NOT NULL, 
    department_id int NOT NULL,
    is_removed boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id),
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS employees (
	id int AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    role_id int NOT NULL,
    salary float NOT NULL,
    manager_id int,
    is_removed boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE NO ACTION ON UPDATE NO ACTION 
);
