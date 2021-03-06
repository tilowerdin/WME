var props = [];
var mymap;
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
            
            showMap();
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });

    // Quelle: https://leafletjs.com/examples/quick-start/
//    var mymap = L.map('map').setView([51.505, -0.09], 13);
//    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18,
//    id: 'mapbox.streets',
//    accessToken: 'your.mapbox.access.token'
//}).addTo(mymap);
})

// Quelle: http://www.d3noob.org/2014/02/making-bar-chart-in-d3js.html
// Erstellt Balkendiagramm-SVG im vis.html
function refresh(barnum) {
    // Setze einige style-spezifische "Rahmenbedingungen"
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    // Skaliere X-Achse/Domaene fuer das besetzen mit diskreten Laendern-"Werten"
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    // Skaliere Y-Achse/Domaene linear; linear passt fuer alle verfuegbaren Daten
    var y = d3.scale.linear().range([height, 0]);

    // Setze X-Achse mit entsprechender Skalierung unten am Graph
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Setze Y-Achse mit entsprechender Skalierung links am Graph
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // Lade Graphen in unsere #bar1 und #bar2 divs als SVG
    $("#bar" + barnum.toString()).empty();
    
    var svg = d3.select("#bar" + barnum.toString()).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");


    // Bestimme welches Property gelistet werden soll
    var val = $("#select" + barnum.toString()).val();
    if(val == undefined) {
        val = props[2];
    }

    // Lade Daten aus unserer world_data.csv
    d3.csv("world_data.csv", function(error, data) {

        // Passe X/Y-Achsen Skalierung/Domaene unseren .csv Werten an
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return parseFloat(d[val]); })]);

        // Fuege X-Achsenwerte der SVG hinzu, vertikal geschrieben, unter dem jeweiligen Baaren gelistet
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );
        // Fuege Y-Achsenwerte der SVG hinzu
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value ($)");

        // Fuege die Bars/Balken der SVG hinzu
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

// Stelle Balkendiagramm neu dar wenn sich etwas an der jeweiligen Auswahl aendert
$("#select1").on("change", function () {
    refresh(1);
    showMap();
});

// Stelle Balkendiagramm neu dar wenn sich etwas an der jeweiligen Auswahl aendert
$("#select2").on("change", function () {
    refresh(2);
    showMap();
});



// Quelle: https://leafletjs.com/examples/quick-start/

// Zeichnet Karte mit Orten aus Balkendiagramm
function showMap() {
    if (mymap != undefined)
        mymap.remove();
    // Erstelle Karte in div #map
    mymap = L.map('map').setView([20, -10], 1.5);

    // Lade die Kartenuebersicht mit Kacheln/Kartenauschnitten von Openstreetmaps
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    // Bestimme die aktuellen Auswahlen der beiden Balkendiagramme
    var att1 = $("#select1").val();
    var att2 = $("#select2").val();

    if (att1 == undefined)
        att1 = props[2];
    if (att2 == undefined)
        att2 = props[2];
    
    // Rufe alle verfuegbaren Items/Eintrage ueber unsere REST-API aus A3 ab
    $.ajax({
        type: "GET",
        url: "/items",
        async: true,
        success: function (data) {
            // data contains the resulting json array or ["err", error message] in case of error
            // catch error
            if (data[0] == "err") {
                state(-1,data[1]);
                return;
            }
            
            // Markiere alle verfuegbaren Laender auf der Karte und fuege Popup zu diesen hinzu
            $(function () {
                $.each(data, function (i, item) {
                    // Fuege Namen des Landes im zugehoerigen Popup ein
                    var popupString = "<b>" + item.name + "</b><br \><br \>";
                    // Fuege im oberen Balkendiagramm ausgewahltes Attribut mit Wert des Landes im Popup hinzu
                    popupString += att1 + ": " + item[att1];

                    // Mache das gleiche fuer das untere Balkendiagramm, wenn unterschiedliche Attribute gewaehlt worden
                    if ( att1 != att2 )
                        popupString += "<br\>" + att2 + ": " + item[att2];

                    // Platziere Marker auf Karte
                    L.marker([item.gps_lat, item.gps_long]).addTo(mymap)
                        .bindPopup(popupString);
                })
            });          
        },
        error: function (jqXHR, text, err) {
            alert(err);
        }
    });
}