const createError = require('http-errors');
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mountRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler.middleware");

// modelMode refers to whether the app is going to use the default model or the mock model
//  the default model can be either the production DB or the Dev DB depending on the db.config.js
//  while the mock model consists of mock data in the models-mock folder used when the tests are run only.

const makeApp = (modelMode) => {
    const app = express();

    app.use(express.json());
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Enable CORS for the client route
    app.use(cors({
        origin: process.env.CLIENT_URL, // Allow requests from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Include cookies in the CORS requests
    }));

// serve static files from 'public' folder:
// app.use(express.static(path.join(__dirname, 'public')));

    mountRoutes(app, modelMode);
    app.use(errorHandler);


    app.get("/", (req, res) => {
        res.send(`apartments management system - server`);
    });

    return app;
}

module.exports = {makeApp}