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
        
        if (   country_filter_range.length != 2
            || (firstInput = parseInt(country_filter_range[0])) == NaN 
            || (secondInput = country_filter_range[1]) == NaN
            || firstInput < 1
            || firstInput > secondInput){
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
            if(data[0] == "err") {
                alert(data[1]);
                return;
            }
            
            $("#table_body").empty();

            // data = $.parseJSON(data);

            $(function () {
                $.each(data, function (i, item) {
                    $('<tr>').append(
                        $('<td>').addClass("colID").text(item.id),
                        $('<td>').addClass("colName").text(item.name),
                        $('<td>').addClass("colBirth").text(item.birth_rate_per_1000),
                        $('<td>').addClass("colCell").text(item.cell_phones_per_100),
                        $('<td>').addClass("colChildren").text(item.children_per_woman),
                        $('<td>').addClass("colElectricity").text(item.electricity_consumption_per_capita),
                        $('<td>').addClass("colInternet").text(item.internet_user_per_100)
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
})