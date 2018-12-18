// Require the dependencies.
const debug = require('debug')('HealthBot-NODE-APIs:listDocFromAPIs');
var bodyParser = require('body-parser');
require('dotenv').config();
const rp = require('request-promise');

// Configure express server.
const express = require('express');
const app = express();

// Middleware for express object for request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API check.
app.get('/', function (request, response) {
    response.send("Express server is running successfully.");
});

// Get the list of staffmembers from mLab Database.
app.post('/publishBusiness', function (request, response) {

    // Configure the request parameters.
    const options = {
        method: 'POST',
        uri: process.env.publishBusinessURI,
        json: true,
        body: {
            
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': process.env.TOKEN
        }
    };

    // request-promise object to send request to end point.
    rp(options).then(response => {
        debug("POST request was successfull - Business published.");
    }).catch(function (error) {
        debug("This is the error: ", error);
        throw error;
    });

});

// Assign the port for the express endpoint to access.
app.listen('3000', function () {
    debug(`Server is up and running on port 3000`);
});

