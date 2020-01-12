$(document).ready(() => {
    const getData = function (url, successCallback, failCallback) {
        $.ajax({
            url,
            method: "GET"
        }).then(result => {
            successCallback(result);
        }).catch(failCallback);
    }
    const failCallback = function (err) {
        const $modal = $(".modal");
        $modal.find(".modal-body").text("Something went wrong while retriving data. Try again later");
        $modal.modal("show");
    };
    $("#employees").on("click", function (event) {
        event.preventDefault();
        // move the active menu item class to current item
        $(".nav-item.active").removeClass("active");
        $(this).closest(".nav-item").addClass("active");

        // render the response data
        const successCallback = function (response) {
            $("main>*").fadeOut("slow");
            const $container = $("#employee_table_container");
            const $body = $container.find("tbody");

            $body.empty();
            $body.append(response.data.map(({
                id,
                first_name: firstName,
                last_name: lastName,
                title,
                department_name: department,
                salary,
                manager
            })=>$("<tr>").data("id", id).append([
                    $("<td>", { text: firstName }),
                    $("<td>", { text: lastName }),
                    $("<td>", { text: title }),
                    $("<td>", { text: department }),
                    $("<td>", { text: salary }),
                    $("<td>", { text: manager }),
                    $("<td>").append($("#btn_template").clone().removeAttr("id"))
                ])
            ));
            $container.fadeIn("slow");
        }
        getData("/employees", successCallback, failCallback);
    });

    $("#roles").on("click", function (event) {
        event.preventDefault();
        // move the active menu item class to current item
        $(".nav-item.active").removeClass("active");
        $(this).closest(".nav-item").addClass("active");

        // render the response data
        const successCallback = function (response) {
            $("main>*").fadeOut("slow");
            const $container = $("#roles_table_container");
            const $body = $container.find("tbody");

            $body.empty();
            $body.append(response.data.map(({
                id,
                title,
                department,
                default_salary: salary,
            }) => 
                $("<tr>").data("id", id).append([
                    $("<td>", { text: title }),
                    $("<td>", { text: department }),
                    $("<td>", { text: salary }),
                    $("<td>").append($("#btn_template").clone().removeAttr("id"))
                ])
            ));
            $container.fadeIn("slow");
        }
        getData("/roles", successCallback, failCallback);
    });

    $("#departments").on("click", function (event) {
        event.preventDefault();
        // move the active menu item class to current item
        $(".nav-item.active").removeClass("active");
        $(this).closest(".nav-item").addClass("active");

        // render the response data
        const successCallback = function (response) {
            $("main>*").fadeOut("slow");
            const $container = $("#departments_list_container");
            const $body = $container.find("table");

            $body.empty();
            $body.append(response.data.map(({
                id,
                name 
            }) => $("<tr>").data("id", id).append([
                $("<td>", { text: name }),
                $("<td>").append($("#btn_template").clone().removeAttr("id"))
            ])));
            $container.fadeIn("slow");
        }
        getData("/departments", successCallback, failCallback);
    });
});