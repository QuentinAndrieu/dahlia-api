var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Patient = require('./api/models/patient-model'), 
    Appointment = require('./api/models/appointment-model'),
    User = require('./api/models/user-model'),
    Setting = require('./api/models/setting-model'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dahliadb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Dahlia RESTful API server started on: ' + port);