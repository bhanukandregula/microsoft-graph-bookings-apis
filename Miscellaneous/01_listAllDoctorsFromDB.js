// Require the dependencies.
const debug = require('debug')('HealthBot-NODE-APIs:listDocFromAPIs');
var bodyParser = require('body-parser');
require('dotenv').config();

// Configure express server.
const express  = require('express');
const app = express();

// Middleware for express object for request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo DB parameters,
const mongo_username = process.env.DB_USERNAME;
const mongo_userpassword = process.env.DB_PASSWORD;
const mongo_db_name = process.env.DB_NAME;
const mongo_url = process.env.DB_URL;

// Mongo DB connection.
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var connectionURL = `mongodb://${mongo_username}:${mongo_userpassword}@${mongo_url}/${mongo_db_name}`;

// API check.
app.get('/', function(request, response){
    response.send("Express server is running successfully.");
});

// Get the list of staffmembers from mLab Database.
app.get('/listdocfromdb', function(request, response){

    // Connect to the database with MongoClient.
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, function(error, database){
        if(error){
            debug('This is the rrror: ', error);
            throw error;
        }else{
            const databaseName = database.db('healthcarebot');
            databaseName.collection("doctors").find().toArray(function(error, result){
                if(error){
                    debug("This is the error: ", error);
                    throw error;
                }else{
                    debug("This is the result: ", result);
                    response.send(result);
                    database.close();
                }
            });
        }
    });

});

// Assign the port for the express endpoint to access.
app.listen('3000', function(){
    debug(`Server is up and running on port 3000`);
});

