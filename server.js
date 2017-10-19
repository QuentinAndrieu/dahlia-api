let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Patient = require('./api/models/patient-model'),
    Appointment = require('./api/models/appointment-model'),
    User = require('./api/models/user-model'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    passport = require('passport'),
    config = require('./config/main'),
    cors = require('cors');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

let routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Dahlia RESTful API server started on: ' + port);