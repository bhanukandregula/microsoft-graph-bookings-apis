// Require the dependencies.
const debug = require('debug')('MSBookings_NODE_APIs:deleteCustomer');
var bodyParser = require('body-parser');
const rp = require('request-promise');
require('dotenv').config();

const express  = require('express');
const app = express();

// Middleware for express object for request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API check.
app.get('/', function(request, response){
    response.send("Express server is running successfully.");
});

// Get the list of staffmembers from Microsoft Bookings.
// Healthcare@greatcode.onmicrosoft.com - Bookings organization name.
app.delete('/deleteCustomer', function(request, response){
    
    // configure the request params.
    // uri inclused the Business ID of which we need to get the details.
    const options = {
        method: 'DELETE',
        uri: process.env.deleteCustomerURI,
        json: true,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : process.env.TOKEN
        }
    };

    // request-promise object to send request to endpoint.
    rp(options).then(response => {
        debug("POST request was successfull - Business deleted.");
    }).catch(function(error){
        debug("This is the error object: ", error);
    }); 

});

// Assign the port for the express endpoint to access.
app.listen('3000', function(){
    debug(`Server is up and running on port 3000`);
});

