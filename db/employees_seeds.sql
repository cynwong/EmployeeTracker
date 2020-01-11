-- seeds for hr_db/employees table

-- insert employees --
INSERT INTO employees(first_name, last_name, title_id, department_id, salary)
VALUES ( "John", "Doe", 1, 1, 100000);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary, manager_id)
VALUES ( "Mike", "Chan", 2, 1, 80000, 1);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary )
VALUES ( "Ashley", "Rodriguez", 3, 2, 150000);

UPDATE employees 
SET manager_id = 3
WHERE id = 1;

INSERT INTO employees(first_name, last_name, title_id, department_id, salary, manager_id)
VALUES ( "Kevin", "Tupid", 4, 2, 120000, 3);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary)
VALUES ( "Malia", "Brown", 5, 3, 125000);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary)
VALUES ( "Sarah", "Lourd", 6, 4, 250000);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary, manager_id)
VALUES ( "Tom", "Allen", 7, 4, 190000,7);

INSERT INTO employees(first_name, last_name, title_id, department_id, salary, manager_id)
VALUES ( "Tammer", "Galal", 4, 2, 120000, 4);