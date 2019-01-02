var props = [];

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
                    if(i >= 2) {
                        $('#select1').append($("<option />").val(item).text(item));
                        $('#select2').append($("<option />").val(item).text(item));
                    }
                });
            });

            // save properties list for later
            props = data;
            
            refresh(1);
            refresh(2);
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });
})

// Quelle: http://www.d3noob.org/2014/02/making-bar-chart-in-d3js.html

function refresh(barnum) {
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    $("#bar" + barnum.toString()).empty();
    
    var svg = d3.select("#bar" + barnum.toString()).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    var val = $("#select" + barnum.toString()).val();
    if(val == undefined) {
        val = props[2];
    }
    
    d3.csv("world_data.csv", function(error, data) {

        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return parseFloat(d[val]); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value ($)");

        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d[val]); })
            .attr("height", function(d) { return height - y(d[val]); });

    });
}

$("#select1").on("change", function () {
    refresh(1);
});

$("#select2").on("change", function () {
    refresh(2);
});

