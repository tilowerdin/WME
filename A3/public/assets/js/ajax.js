$("#filter_countries").click(function () {


    var country_filter_range = $("#country_filter_range").val();
    var country_filter_id = $("#country_filter_id").val();

    console.log(country_filter_id);
    console.log(country_filter_range);

    var url = "/items";
    if (country_filter_range != "") {

        country_filter_range = country_filter_range.split("-");

        // catch several faulty inputs
        var wrongInput = false;
        var firstInput = -1;
        var secondInput = -1;

//        if(country_filter_range.length != 2) {
//            wrongInput = true;
//        }
//        if((firstInput = parseInt(country_filter_range[0])) == NaN) {
//            wrongInput = true;
//        }
//        if((secondInput = parseInt(country_filter_range[1])) == NaN) {
//            wrongInput = true;
//        }
//        if(firstInput < 1) {
//            wrongInput = true;
//        }
//        if(firstInput > secondInput) {
//            wrongInput = true;
//        }

        if (country_filter_range.length != 2
            || (firstInput = parseInt(country_filter_range[0])) == NaN
            || (secondInput = country_filter_range[1]) == NaN
            || firstInput < 1
            || firstInput > secondInput) {
            wrongInput = true;
        }

        if (wrongInput) {
            alert("Range not possible!");
            return false;
        }

        url += "/" + firstInput.toString() + "/" + secondInput.toString();


    } else if (country_filter_id != "") {
        url += "/" + country_filter_id;
    }

    $.ajax({
        type: "GET",
        url: url,
        async: true,
        success: function (data) {
            if (data[0] == "err") {
                alert(data[1]);
                return;
            }

            $("#table_body").empty();

            $(function () {
                $.each(data, function (i, item) {
                    $('<tr>').append(
                        $('<td>').addClass("colID").text(item.id),
                        $('<td>').addClass("colName").text(item.name),
                        $('<td>').addClass("colBirth").text(item.birth_rate_per_1000),
                        $('<td>').addClass("colCell").text(item.cell_phones_per_100),
                        $('<td>').addClass("colChildren").text(item.children_per_woman),
                        $('<td>').addClass("colElectricity").text(item.electricity_consumption_per_capita),
                        $('<td>').addClass("colGDP").text(item.gdp_per_capita),
                        $('<td>').addClass("colGDPGrowth").text(item.gdp_per_capita_growth),
                        $('<td>').addClass("colInflation").text(item.inflation_annual),
                        $('<td>').addClass("colInternet").text(item.internet_user_per_100),
                        $('<td>').addClass("colLife").text(item.life_expectancy),
                        $('<td>').addClass("colMilitary").text(item.military_expenditure_percent_of_gdp),
                        $('<td>').addClass("colGPSLat").text(item.gps_lat),
                        $('<td>').addClass("colGPSLong").text(item.gps_long)
                    ).appendTo('#table_body');
                });
            });
            //for (let i = 1; i < 15; i++) {
                $(`td,th`).show();
            //}
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });

    return false;
});

$("#submit_country").click(function () {
    var country_name = $("#country_name").val();
    var birth_rate_per_1000 = $("#country_birth").val();
    var cell_phones_per_100 = $("#country_cellphone").val();

    $.ajax({
        type: "POST",
        url: "items",
        async: true,
        data: `{"name":"${country_name}", "birth_rate_per_1000":"${birth_rate_per_1000}", "cell_phones_per_100":"${cell_phones_per_100}"}`,
        contentType: "application/json",
        success: function (data) {
            alert(data);
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });

    return false;
});

$("#rm_submit").click(function () {
    var country_id = $("#country_delete_id").val();

    var url = "items";

    if (country_id != "") {
        url += "/" + country_id;
    }

    $.ajax({
        type: "DELETE",
        url: url,
        async: true,
        success: function (data) {
            alert(data);
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    })

    return false;
});

$("document").ready(function () {
    $.ajax({
        type: "GET",
        url: "/properties",
        async: true,
        success: function (data) {

            $(function () {
                $.each(data, function (i, item) {
                    $('#prop_selection').append($("<option />").val(item).text(item));
                });
            });

        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    })
});

$(function () {



    $("#show_selected_prop").click(function () {
        var prop = $("#prop_selection");

        var columnNumber = 0;
        var selectorValue = prop.val();
        switch (selectorValue) {
            case "id":
                columnNumber = 1;
                console.log("ID wurde ausgewaehlt");
                break;
            case "name":
                columnNumber = 2;
                break;
            case "birth_rate_per_1000":
                columnNumber = 3;
                break;
            case "cell_phones_per_100":
                columnNumber = 4;
                break;
            case "children_per_woman":
                columnNumber = 5;
                break;
            case "electricity_consumption_per_capita":
                columnNumber = 6;
                break;
            case "gdp_per_capita":
                columnNumber = 7;
                break;
            case "gdp_per_capita_growth":
                columnNumber = 8;
                break;
            case "inflation_annual":
                columnNumber = 9;
                break;
            case "internet_user_per_100":
                columnNumber = 10;
                break;
            case "life_expectancy":
                columnNumber = 11;
                break;
            case "military_expenditure_percent_of_gdp":
                columnNumber = 12;
                break;
            case "gps_lat":
                columnNumber = 13;
                break;
            case "gps_long":
                columnNumber = 14;
                break;
            default:
                console.log("ALARM!!!");
                break;

        }
        console.log(prop.val());
        $(`td:nth-child(${columnNumber}),th:nth-child(${columnNumber})`).show();

    });

    $("#hide_selected_prop").click(function () {
        var prop = $("#prop_selection");

        var columnNumber = 0;
        var selectorValue = prop.val();
        switch (selectorValue) {
            case "id":
                columnNumber = 1;
                console.log("ID wurde ausgewaehlt");
                break;
            case "name":
                columnNumber = 2;
                break;
            case "birth_rate_per_1000":
                columnNumber = 3;
                break;
            case "cell_phones_per_100":
                columnNumber = 4;
                break;
            case "children_per_woman":
                columnNumber = 5;
                break;
            case "electricity_consumption_per_capita":
                columnNumber = 6;
                break;
            case "gdp_per_capita":
                columnNumber = 7;
                break;
            case "gdp_per_capita_growth":
                columnNumber = 8;
                break;
            case "inflation_annual":
                columnNumber = 9;
                break;
            case "internet_user_per_100":
                columnNumber = 10;
                break;
            case "life_expectancy":
                columnNumber = 11;
                break;
            case "military_expenditure_percent_of_gdp":
                columnNumber = 12;
                break;
            case "gps_lat":
                columnNumber = 13;
                break;
            case "gps_long":
                columnNumber = 14;
                break;
            default:
                console.log("ALARM!!!");
                break;

        }
        $(`td:nth-child(${columnNumber}),th:nth-child(${columnNumber})`).hide();
    });
});