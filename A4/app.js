// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;
var fs = require('fs');

//register body-parser to handle json from res / req
app.use(bodyParser.json());

//register public dir to serve static files (html, css, js)
app.use(express.static(path.join(__dirname, "public")));

// END DO NOT CHANGE!

/**************************************************************************
 ****************************** csv2json *********************************
 **************************************************************************/

// create a new csv parser
var csvFilePath = "world_data.csv"
var converter = new Converter({});
// try to parse csvfile
converter
    .fromFile(csvFilePath);

var json;

// if parsing was successfull, save csv as json-array in json
converter.then((obj) => {
    json = obj;
    console.log("done");
});


var bar_dataCSV = "world_data.csv"
var bar_data;

fs.readFile(bar_dataCSV, 'utf8', function(err, contents) {
    bar_data = contents;
    console.log(err);
});


/**************************************************************************
 ********************** handle HTTP METHODS ***********************
 **************************************************************************/
app.get("/"+bar_dataCSV, function(req, res){
    console.log(bar_data);
    res.send(bar_data);
});

// GET call "/items"
// returns all available items
app.get("/items", function (req, res) {
    //console.log(json);
    res.send(json);
});

// GET call "/items/id"
app.get("/items/:id", function (req, res) {
    // read id
    let id = parseInt(req.params.id);
    // prepare error answer if id can not be found
    var answer = ["err","No such id " + id + " in database."];
    
    // search for id
    for (var i = 0; i < json.length; i++) {
        if (json[i].id== id) {
            answer = [json[i]];
        }
    }

    //console.log(answer);
    
    res.send(answer);
});

// GET call "/items/id1/id2"
app.get("/items/:id1/:id2", function (req, res) {
    // read ids
    let id1 = parseInt(req.params.id1);
    let id2 = parseInt(req.params.id2);
    // prepare error answer
    var answer = ["err","Range not possible."];

    // check for error cases 
    if (id1 > 0 &&
        id1 < id2
    ) {
        // search for the occurence of id1
        var i = 0;
        for (; i < json.length; i++) {
            if (parseInt(json[i]["id"]) == id1) {
                // reset answer
                answer = [];
                break;
            }
        }
        // search for id2
        while (true) {
            // error if we get out of range
            if (i >= json.length) {
                answer = ["err","Range not possible."];
                break;
            }
            // add all the ids in between id1 and id2 to the answer
            answer.push(json[i]);
            // break if we reach id2
            if (parseInt(json[i]["id"]) == id2) {
                break;
            }
            i++;
        }
    }

    //console.log(answer);
    res.send(answer);
});

// GET call "/properties"
// return all properties
app.get("/properties", function (req, res) {
    var answer = [];

    // read all keys from the zero element
    for (var key in json[0]) {
        answer.push(key);
    }

    res.send(answer);
});

// GET call "/properties/num"
app.get("/properties/:num", function (req, res) {
    // read num
    let num = parseInt(req.params.num);
    // prepare error message
    var answer = ["err","No such property available."];

    // hceck for error
    if (num >= 0) {
        // search for property
        var i = 0;
        for (var key in json[0]) {
            if (i == num) {
                answer = [key];
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
    //console.log(req);
    // get data
    var newCountry = req.body;
    // get name for success message
    let name = newCountry.name;
    
    // get last entry id and increment as new id
    var lastEntry = json[json.length - 1];
    var lastID = lastEntry.id;
    var highestID = parseInt(lastID);
    
    // add new id to json object
    newCountry["id"] = (highestID + 1).toString();
    
    // add new country
    json.push(newCountry);
    
    // success message
    res.send("Added country " + name + " to list!");
});

// DELETE call "/items"
// HOW TO TEST: curl -X DELETE "localhost:3000/items"
app.delete("/items", function (req, res) {
    // get last items name for sucess message
    let name = json[json.length-1].name;
    // remove last item
    json.splice(-1, 1);

    // success message
    res.send("Deleted last country: " + name + "!");
});

// DELETE call "/items/id"
// HOW TO TEST: curl -X DELETE "localhost:3000/items/25"
app.delete("/items/:id", function (req, res) {
    // read id
    let id = parseInt(req.params.id);
    // prepare error message
    var answer = ["err","No such id " + id + " in database"];
    
    // search for id and remove it
    for (var i = 0; i < json.length; i++) {
        if (json[i].id == id) {
            json.splice(i, 1);
            // success message
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