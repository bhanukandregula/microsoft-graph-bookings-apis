// Require the dependencies.
const debug = require('debug')('HealthBot-NODE-APIs:listDocFromAPIs');
var bodyParser = require('body-parser');
require('dotenv').config();
const rp = require('request-promise');

// Configure express server.
const express  = require('express');
const app = express();

// Middleware for express object for request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API check.
app.get('/', function(request, response){
    response.send("Express server is running successfully.");
});

// Get the list of staffmembers from mLab Database.
// Bhanu Staff Member ID - 70f45ca7-a5c0-4ecd-af5c-05f27dded46d
app.post('/createAppointment', function(request, response){

    // Configure the request parameters.
    const options = {
        method: 'POST',
        uri: 'https://graph.microsoft.com/beta/bookingBusinesses/Healthcare@greatcode.onmicrosoft.com/appointments',
        json: true,
        body: {
            "@odata.type":"#microsoft.graph.bookingAppointment",
            "customerEmailAddress":"jordanm@contoso.com",
            // "staffMemberIds": "70f45ca7-a5c0-4ecd-af5c-05f27dded46d",
            "customerLocation":{
                "@odata.type":"#microsoft.graph.location",
                "address":{
                    "@odata.type":"#microsoft.graph.physicalAddress",
                    "city":"Buffalo",
                    "countryOrRegion":"USA",
                    "postalCode":"98052",
                    "postOfficeBox":null,
                    "state":"NY",
                    "street":"123 First Avenue",
                    "type@odata.type":"#microsoft.graph.physicalAddressType",
                    "type":null
                },
                "coordinates":null,
                "displayName":"Customer",
                "locationEmailAddress":null,
                "locationType@odata.type":"#microsoft.graph.locationType",
                "locationType":null,
                "locationUri":null,
                "uniqueId":null,
                "uniqueIdType@odata.type":"#microsoft.graph.locationUniqueIdType",
                "uniqueIdType":null
            },
            "customerName":"Jordan Miller",
            "customerNotes":"Please be on time.",
            "customerPhone":"213-555-0199",
            "end":{
                "@odata.type":"#microsoft.graph.dateTimeTimeZone",
                "dateTime":"2018-12-20T11:00:00.0000000+00:00",
                "timeZone":"America/New_York"
            },
            "invoiceAmount":10.0,
            "invoiceDate":{
                "@odata.type":"#microsoft.graph.dateTimeTimeZone",
                "dateTime":"2018-05-01T12:30:00.0000000+00:00",
                "timeZone":"America/New_York"
            },
            "invoiceId":"1001",
            "invoiceStatus@odata.type":"#microsoft.graph.bookingInvoiceStatus",
            "invoiceStatus":"open",
            "invoiceUrl":"theInvoiceUrl",
            "optOutOfCustomerEmail":false,
            "postBuffer":"PT10M",
            "preBuffer":"PT5M",
            "price":10.0,
            "priceType@odata.type":"#microsoft.graph.bookingPriceType",
            "priceType":"fixedPrice",
            "reminders@odata.type":"#Collection(microsoft.graph.bookingReminder)",
            "reminders":[
                {
                    "@odata.type":"#microsoft.graph.bookingReminder",
                    "message":"This service is tomorrow",
                    "offset":"P1D",
                    "recipients@odata.type":"#microsoft.graph.bookingReminderRecipients",
                    "recipients":"allAttendees"
                },
                {
                    "@odata.type":"#microsoft.graph.bookingReminder",
                    "message":"Please be available to enjoy your lunch service.",
                    "offset":"PT1H",
                    "recipients@odata.type":"#microsoft.graph.bookingReminderRecipients",
                    "recipients":"customer"
                },
                {
                    "@odata.type":"#microsoft.graph.bookingReminder",
                    "message":"Please check traffic for next cater.",
                    "offset":"PT2H",
                    "recipients@odata.type":"#microsoft.graph.bookingReminderRecipients",
                    "recipients":"staff"
                }
            ],
            "serviceId":"57da6774-a087-4d69-b0e6-6fb82c339976",
            "serviceLocation":{
                "@odata.type":"#microsoft.graph.location",
                "address":{
                    "@odata.type":"#microsoft.graph.physicalAddress",
                    "city":"Buffalo",
                    "countryOrRegion":"USA",
                    "postalCode":"98052",
                    "postOfficeBox":null,
                    "state":"NY",
                    "street":"123 First Avenue",
                    "type@odata.type":"#microsoft.graph.physicalAddressType",
                    "type":null
                },
                "coordinates":null,
                "displayName":"Customer location",
                "locationEmailAddress":null,
                "locationType@odata.type":"#microsoft.graph.locationType",
                "locationType":null,
                "locationUri":null,
                "uniqueId":null,
                "uniqueIdType@odata.type":"#microsoft.graph.locationUniqueIdType",
                "uniqueIdType":null
            },
            "serviceName":"Catered bento",
            "serviceNotes":"Customer requires punctual service.",
            "start":{
                "@odata.type":"#microsoft.graph.dateTimeTimeZone",
                "dateTime":"2018-12-20T10:00:00.0000000+00:00",
                "timeZone":"America/New_York"
            }
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': process.env.TOKEN
        }
    };

    // request-promise object to send request to end point.
    rp(options).then(response => {
        debug('This is the response: ', response);
    }).catch(function(error){
        debug("This is the error: ", error);
        throw error;
    });

});

// Assign the port for the express endpoint to access.
app.listen('3000', function(){
    debug(`Server is up and running on port 3000`);
});

