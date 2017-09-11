var express = require('express');
var app = express();
var fs = require("fs");

var patient = {
    "patient4": {
        "id": 4,
        "lastname": "mahesh",
        "firstname": "kire",
        "birthday": "01/01/1970",
        "description": "this a description",
        "appointments": [
            {
                "id": 1,
                "date": "01/01/1970",
                "firstname": "kire",
                "description": "this a description",
                "rate": 60,
                "duration": 35
            }
        ]
    }
}

app.get('/listPatients', function (req, res) {
    fs.readFile(__dirname + "/" + "mock/patient.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.post('/addPatient', function (req, res) {
    // First read existing patients.
    fs.readFile(__dirname + "/" + "mock/patient.json", 'utf8', function (err, data) {
        console.log(data);
        data = JSON.parse(data);
        data["patient4"] = patient["patient4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})