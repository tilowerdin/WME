$("#filter_countries").click(function () {


    var country_filter_range = $("#country_filter_range").val();
    var country_filter_id = $("#country_filter_id").val();

    console.log(country_filter_id);
    console.log(country_filter_range);

    var url = "http://localhost:3000/items";
    if (country_filter_id !== "" && country_filter_range == "") {
        url = "http://localhost:3000/items/" + country_filter_id;
    } else if (country_filter_range !== "") {
        country_filter_range = country_filter_range.split("-");

        var firstNumber = parseInt(country_filter_range[0]);
        var secondNumber = parseInt(country_filter_range[1]);
        if (firstNumber > secondNumber) {
            alert("Range not possible");
        }
        url = "http://localhost:3000/items/" + firstNumber + "/" + secondNumber;

    }

    $.ajax({
        type: "GET",
        url: url,
        async: true,
        success: function (data) {
            $("#table_body").empty();

            // data = $.parseJSON(data);

            $(function () {
                $.each(data, function (i, item) {
                    $('<tr>').append(
                        $('<td>').text(item.id),
                        $('<td>').text(item.name),
                        $('<td>').text(item.birth_rate_per_1000),
                        $('<td>').text(item.cell_phones_per_100),
                        $('<td>').text(item.children_per_woman),
                        $('<td>').text(item.electricity_consumption_per_capita),
                        $('<td>').text(item.internet_user_per_100)
                    ).appendTo('#table_body');

                });
            });


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

    var url = "http://localhost:3000/items"

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/properties",
        async: true,
        data: {
            "name": country_name,
            "cell_phones_per_100": parseInt(cell_phones_per_100),
            "children_per_woman": parseInt(birth_rate_per_1000)
        },
        success: function (data) {
        },

        error: function (jqXHR, text, err) {

        }
    })


});

$("document").ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/properties",
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
})