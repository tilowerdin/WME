// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use(bodyParser.json());

//register public dir to serve static files (html, css, js)
app.use(express.static(path.join(__dirname, "public")));

// END DO NOT CHANGE!


/**************************************************************************
 ****************************** csv2json *********************************
 **************************************************************************/

var csvFilePath = "world_data.csv"
var converter = new Converter({});
converter
    .fromFile(csvFilePath);

var json;

converter.then((obj) => {
    json = obj;
    console.log("done");
});


/**************************************************************************
 ********************** handle HTTP METHODS ***********************
 **************************************************************************/
// GET call "/items"
app.get("/items", function (req, res) {
    res.send(json);
});

// GET call "/items/id"
app.get("/items/:id", function (req, res) {
    let id = parseInt(req.params.id);
    var answer = "No such id " + id + " in database.";
    for (var i = 0; i < json.length; i++) {
        if (json[i].id== id) {
            answer = json[i];
        }
    }

    // sending message "ERROR" on failure
    res.send(answer);
});

// GET call "/items/id1/id2"
app.get("/items/:id1/:id2", function (req, res) {
    let id1 = parseInt(req.params.id1);
    let id2 = parseInt(req.params.id2);
    var answer = "Range not possible.";

    if (id1 > 0 &&
        id1 < id2
    ) {
        var i = 0;
        for (; i < json.length; i++) {
            if (parseInt(json[i]["id"]) == id1) {
                answer = [];
                break;
            }
        }
        while (true) {
            if (i >= json.length) {
                answer = "Range not possible.";
                break;
            }
            answer.push(json[i]);
            if (parseInt(json[i]["id"]) == id2) {
                break;
            }
            i++;
        }
    }

    res.send(answer);
});

// GET call "/properties"
app.get("/properties", function (req, res) {
    var answer = [];

    for (var key in json[0]) {
        answer.push(key);
    }

    res.send(answer);
});

// GET call "/properties/num"
app.get("/properties/:num", function (req, res) {
    let num = parseInt(req.params.num);
    var answer = "No such property available.";



    if (num >= 0) {
        var i = 0;
        for (var key in json[0]) {
            if (i == num) {
                answer = key;
                break;
            }
            i++;
        }
    }

    res.send(answer);
});


// POST call "/items"
// json-Objekt mit Property name und zwei beliebigen weiteren Properties
// teste mit:  curl --data "{\"name\": \"Isengard\",\"cell_phones_per_100\":0,\"children_per_woman\":1000"} localhost:3000/items -H "Content-Type: application/json"
app.post("/items", function (req, res) {
    console.log(req.body);
    var newCountry = req.body;
    let name = newCountry.name;
    var lastEntry = json[json.length - 1];
    var lastID = lastEntry.id;
    var highestID = parseInt(lastID);
    newCountry["id"] = (highestID + 1).toString();
    json.push(newCountry);
    res.send("Added country " + name + " to list!");
});

// DELETE call "/items"
// HOW TO TEST: curl -X DELETE "localhost:3000/items"
app.delete("/items", function (req, res) {
    let name = json[json.length - 1].name;
    json.splice(-1, 1);

    res.send("Deleted last country: " + name + "!");
});

// DELETE call "/items/id"
// HOW TO TEST: curl -X DELETE "localhost:3000/items/25"
app.delete("/items/:id", function (req, res) {
    let id = parseInt(req.params.id);
    var answer = "No such id " + id + " in database";
    for (var i = 0; i < json.length; i++) {
        if (json[i].id == id) {
            json.splice(i, 1);
            answer = "Item " + id + " deleted successfully.";
            break;
        }
    }
    res.send(answer);
});

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});