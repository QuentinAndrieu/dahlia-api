//@Flow
import express from 'express';
import mongoose from 'mongoose';
import Patient from './models/patient.model';
import Appointment from './models/appointment.model';
import User from './models/user.model';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import config from './config/main';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import winston from 'winston';

let app = express(),
    port = process.env.PORT || 3000;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true,
    /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

routes(app); //register the route

app.listen(port);

winston.info('Dahlia RESTful API server started on: ' + port);