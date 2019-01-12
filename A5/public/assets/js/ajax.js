// save the available properties to get the column number of the property strings
var props = [];

function state(state, message="") {
    var color = "";
    if(state < 0) {
        color = "red";
    }
    if(state > 0) {
        color = "green";
    }
    
    $("#status").text(message).css("background-color", color);
}

// filter countries action
$("#filter_countries").click(function () {
    state(0);
    // get the values from the two input fields
    var country_filter_range = $("#country_filter_range").val();
    var country_filter_id = $("#country_filter_id").val();

    // the url to get starts always with "/items"
    var url = "/items";
    
    // if the range input field contains some content we ask the rest api for that specific range, if available
    if (country_filter_range != "") {
        // ranges are given by for example "3-5"
        country_filter_range = country_filter_range.split("-");

        // catch several faulty inputs
        var wrongInput = false;
        var firstInput = -1;
        var secondInput = -1;

        if (country_filter_range.length != 2
            || (firstInput = parseInt(country_filter_range[0])) == NaN
            || (secondInput = country_filter_range[1]) == NaN
            || firstInput < 1
            || firstInput > secondInput) {
            wrongInput = true;
        }

        // throw error
        if (wrongInput) {
            state(-1, "Range not possible!");
            return false;
        }

        // add the range to the url
        url += "/" + firstInput.toString() + "/" + secondInput.toString();
    } else if (country_filter_id != "") {
        // if the range input does not contain anything but the id input, we only want to ask for that specific country
        // therefore add the od to the url
        url += "/" + country_filter_id;
    }

    // asynchronous get call to the rest api
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        success: function (data) {
            // data contains the resulting json array or ["err", error message] in case of error
            // catch error
            if (data[0] == "err") {
                state(-1,data[1]);
                return;
            }
            
            // remove old content from table
            $("#table_body").empty();

            // build table body
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
            
            // show all columns on "reload"
            $(`td,th`).show();
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });

    // prevent reload of hole page
    return false;
});

// add country to database
$("#submit_country").click(function () {
    // get values from input fields
    var country_name = $("#country_name").val();
    var birth_rate_per_1000 = $("#country_birth").val();
    var cell_phones_per_100 = $("#country_cellphone").val();

    // asynchronous post call to add country to database
    $.ajax({
        type: "POST",
        url: "items",
        async: true,
        data: `{"name":"${country_name}", "birth_rate_per_1000":"${birth_rate_per_1000}", "cell_phones_per_100":"${cell_phones_per_100}"}`,
        contentType: "application/json",
        success: function (data) {
            state(1,data);
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });

    // prevent reload of page
    return false;
});

// remove an entry
$("#rm_submit").click(function () {
    // get value of input field
    var country_id = $("#country_delete_id").val();

    // the delete url starts with "items"
    var url = "items";

    // if specified, add given id to the url
    if (country_id != "") {
        url += "/" + country_id;
    }

    // asynchronous delete call
    $.ajax({
        type: "DELETE",
        url: url,
        async: true,
        success: function (data) {
            state(1,data);
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    })

    // prevent reload of page
    return false;
});

// load the possible properties when the page has finished loading
$("document").ready(function () {
    $.ajax({
        type: "GET",
        url: "/properties",
        async: true,
        success: function (data) {
            // add properties to the select
            $(function () {
                $.each(data, function (i, item) {
                    $('#prop_selection').append($("<option />").val(item).text(item));
                });
            });

            // save properties list for later
            props = data;
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });
})

// show column
$("#show_selected_prop").click(function () {
    // get value from select
    var prop = $("#prop_selection");
    var selectorValue = prop.val();
    
    // get column number
    var columnNumber = getColNumber(selectorValue);
    
    // show column
    $(`td:nth-child(${columnNumber}),th:nth-child(${columnNumber})`).show();

});

// hide column
$("#hide_selected_prop").click(function () {
    // get value from select
    var prop = $("#prop_selection");
    var selectorValue = prop.val();
    
    // get column number
    var columnNumber = getColNumber(selectorValue);
    
    // hide column
    $(`td:nth-child(${columnNumber}),th:nth-child(${columnNumber})`).hide();
});

// search column number
function getColNumber(id) {
    for(var i = 0; i < props.length; i++) {
        if(id == props[i]) {
            return i+1;
        }
    }
    return -1;
}
