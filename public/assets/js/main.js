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
        $modal.find(".modal-content").text("Something went wrong while retriving data. Try again later");
        $modal.show();
    };
    $("#employees").on("click", function (event) {
        event.preventDefault();
        const successCallback = function (response) {
            console.log("success")
            const $container = $("#employee_table_container");
            const $body = $container.find("tbody");
            const trList = [];
            
            response.data.forEach(({
                    id, 
                    first_name: firstName,
                    last_name: lastName,
                    title,
                    department_name: department,
                    salary,
                    manager
                }) => {
                    const $tr = $("<tr>").data("id", id);
                    $tr.append([
                        $("<td>", {text: firstName}),
                        $("<td>", {text: lastName}),
                        $("<td>", {text: title}),
                        $("<td>", {text: department}),
                        $("<td>", {text: salary}),
                        $("<td>", {text: manager}),
                    ]);
                    trList.push($tr);
                }
            );
            $body.append(trList);
            $container.show();
            console.log(trList,"done")
        }
        getData("/employees", successCallback, failCallback);
    });

    $("#roles").on("click", function (event) {
        event.preventDefault();
        console.log("roles link clicked")
        const successCallback = function (response) {
            console.log(response);
        }
        getData("/roles", successCallback, failCallback);

    });

    $("#departments").on("click", function (event) {
        event.preventDefault();
        console.log("departments link clicked")
        const successCallback = function (response) {
            console.log(response);
        }
        getData("/departments", successCallback, failCallback);
    });
});