
$(document).ready(() => {

    const disabledButtons = function(){
        //disable add,edit and delete buttons
        $("#btn_add_employee").prop("disabled",true);
        $(".btn-edit-employee").prop("disabled",true);
        $(".btn-delete-employee").prop("disabled",true);

        // if there is a form, remove it. 
        $(".employee_form").remove();
    }

    const enabledButtons = function(){
        //disable add,edit and delete buttons
        $("#btn_add_employee").prop("disabled",false);
        $(".btn-edit-employee").prop("disabled",false);
        $(".btn-delete-employee").prop("disabled",false);

         // if there is a form, remove it. 
         $(".employee_form").remove();
    }

    const constructForm = function (managers, roles, values) {

        const $container = $("#employee_table_container");
        const $body = $container.find("tbody");

        // <tr id="employee_form">
        //     <td><input type="text" name="first_name" id="first_name"></td>
        //     <td><input type="text" name="last_name" id="last_name"></td>
        //     <td><select name="title" name="title"></select></td>
        //     <td><select name="department" name="department"></select></td>
        //     <td><input type="number" name="salary" id="salary"></td>
        //     <td><select name="manager" name="manager"></select></td>
        //     <td>
        //         <button class="btn-save-employee btn btn-primary">Save</button>
        //         <button class="btn-cancel-employee btn btn-primary">Cancel</button>
        //     </td>
        // </tr>

        //buttons 
        const $saveBtn = $("<button>")
            .addClass("btn-save-employee btn btn-primary")
            .text("Save");
        const $cancelBtn = $("<button>")
            .addClass("btn-cancel-employee btn btn-primary")
            .text("Cancel");

        //first name field
        const $firstNameField = $("<input>", {
            type: "text",
            name: "first_name",
            id: "first_name"
        });
        if (values && values.firstName) {
            $firstNameField.val(value.firstName);
        }

        // last name field
        const $lastNameField = $("<input>", {
            type: "text",
            name: "last_name",
            id: "last_name"
        });

        if (values && values.lastName) {
            $lastNameField.val(value.lastName);
        }

        //convert the title
        const roleOptions = roles.map(
            ({
                id,
                title,
                department,
                department_id,
                default_salary
            }) => {
                const $option = $("<option>", {
                    value: id,
                    text: title,
                    "data-department-id": department_id,
                    "data-department-name": department,
                    "data-salary": default_salary,
                });
                if (values && values.role_id === id) {
                    $option.addAttr("selected", true);
                }
                return $option;
            }
        );
        const $roleField = $("<select>", {
            name: "title",
            id: "title"
        });
        $roleField.append(roleOptions);

        // department field
        const $departmentField = $("<input>", {
            type: "text",
            name: "department",
            id: "department",
            value: roles[0].department,
            "data-id":roles[0].department_id,
            disabled: true
        });

        if (values && values.department_id) {
            $departmentField.val(values.department);
            $departmentField.data("id", values.department_id);
        }

        // salary field
        const $salaryField= $("<input>", {
            type: "number",
            name: "salary",
            value: roles[0].default_salary,
            id: "salary",
        });

        if (values && values.salary) {
            $salaryField.val(values.salary);
        }

        // Manager field
        const managerList = managers.map(
            ({
                id,
                first_name,
                last_name
            }) => {
                const $option = $("<option>", {
                    value: id,
                    text: `${first_name} ${last_name}`
                });
                if (values && values.manager_id) {
                    if (values.manager_id === id) {
                        $option.addAttr("selected", true);
                    }
                }
                return $option;
            }
        );
        const $managerField = $("<select>", {
            name: "manager",
            id: "manager"
        });
        $managerField.append(managerList);


        const $form = $("<tr>").addClass("employee_form");
        $form.append([
            $("<td>").append($firstNameField),
            $("<td>").append($lastNameField),
            $("<td>").append($roleField),
            $("<td>").append($departmentField),
            $("<td>").append($salaryField),
            $("<td>").append($managerField),
            $("<td>").append([$saveBtn,$cancelBtn]),
        ]);

        $body.prepend($form);
    }


    $("#btn_add_employee").on("click", function (event) {
        event.preventDefault();

        const managerList = $.ajax({
            url: "/employees",
            method: "GET"
        });
        const roleList = $.ajax({
            url: "/roles",
            method: "GET"
        });

        Promise.all([managerList, roleList])
            .then(([managers, roles]) => {
                disabledButtons();
                constructForm(managers.data, roles.data);
            })
            .catch(err=>{
                const $modal = $(".modal");
                $modal.find(".modal-body").text("Something went wrong while retriving data. Try again later");
                $modal.modal("show");
            });
    });

    $("#employee_table_container").on("click",function(event){
        event.preventDefault();
        const $target = $(event.target);
        if($target.hasClass("btn-cancel-employee")){
            //cancel the form
            enabledButtons();
        }

        if($target.hasClass("btn-save-employee")){
            //save the form.
            const $form = $target.closest(".employee-form");
            
        }
        
    });
    $("#employee_table_container").on("change",  function(event){
        const $target = $(event.target);
        //if not title field do nothing
        if($target.attr("id") !== "title") return;

        // if title, proceed with autofill
        const $title = $target.find("option:selected");
        const $form = $title.closest(".employee_form");
        const $departmentField =$form.find("#department");
        const $salary = $form.find("#salary");

        console.log()
        // modified department field
        $departmentField.val($title.data("department-name"));
        $departmentField.data("id", $title.data("department-id"));

        // modified salary field
        $salary.val($title.data("salary"));
    });
});