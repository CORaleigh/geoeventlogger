const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const winston = require('winston');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.get('/birds', function (req, res) {

    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "api.bird.co",
        "port": null,
        "path": "/bird/nearby?latitude=35.787743&longitude=-78.644257&radius=1000",
        "headers": {
            "authorization": "Bird eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBVVRIIiwidXNlcl9pZCI6IjA4YzA3OGUxLTBhODEtNDcxYS1iZDAyLWM5Mzc0YWVmNzExMSIsImRldmljZV9pZCI6IjQ1NTdkMDJjLWU3NmItNDc2Yi05NjNlLTdmYTc1ZTAwOTA0MCIsImV4cCI6MTU2MzI5NjExM30.94tVSKTQsVyX5kMwsQ9E-56cPAjvzTkZSZ-baGo1MAM",
            "device-id": "20c6a680-6194-41e8-bedd-7e421cb61cd4",
            "app-version": "3.0.5",
            "location": "{\\\"latitude\\\":35.787743,\\\"longitude\\\":-78.644257,\\\"altitude\\\":315,\\\"accuracy\\\":100,\\\"speed\\\":-1,\\\"heading\\\":-1}",
            "cache-control": "no-cache",
            // "postman-token": "285a22d2-b2c8-8b5e-e002-1f2ad89dc488"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();

    // var birdurl = 'https://api.bird.co/bird/nearby?latitude=35.787743&longitude=-78.644257&radius=1000';

    // var options = {
    //     method: 'POST',
    //     uri: birdurl,
    //     body: {
    //         // some: 'payload'
    //     },
    //     headers: {
    //         /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
    //         'content-type': 'application/json',


    //     }
    //     json: true // Automatically stringifies the body to JSON
    // };

    // rp(options)
    //     .then(function (parsedBody) {
    //         // POST succeeded...
    //     })
    //     .catch(function (err) {
    //         // POST failed...
    //     });
    // //res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Authorization', 'Bird e0266cca-3265-4abb-8c74-8b2e49f70c96');
    // res.setHeader('Device-id','20c6a680-6194-41e8-bedd-7e421cb61cd4');
    // res.setHeader('App-Version', '[{"key":"App-Version","value":"3.0.5","description":""}]');
    // res.setHeader('Location', '{"latitude":35.787743,"longitude":-78.644257,"altitude":315,"accuracy":100,"speed":-1,"heading":-1}');


});
// GET method route
app.get('/fakewazedata', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    const wazedata = {
        country: 'US',
        imageId: null,
        city: 'Raleigh, NC',
        reportRating: 2,
        confidence: 0,
        reliability: 6,
        reportDescription: null,
        type: 'WEATHERHAZARD',
        uuid: '57db1b12-7623-3a93-a059-bb8b5b0fc969',
        roadType: 3,
        magvar: 102,
        subtype: 'HAZARD_ON_SHOULDER_CAR_STOPPED',
        street: 'I-540 E',
        imageUrl: null,
        location: {
            x: -78.746812,
            y: 35.909272
        },
        pubMillis: 1527207191537,
        geometry: {
            x: -78.746812,
            y: 35.909272,
            spatialReference: {
                wkid: 4326
            }
        }
    };

    res.send(JSON.stringify(wazedata));
})

app.post('/geoeventlogger', function (req, res) {

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        prettyPrint: true,
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({
                filename: 'error.log',
                level: 'error'
            }),
            new winston.transports.File({
                filename: 'combined.log'
            })
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
    logger.log('info', 'Hello distributed log files!');

    var output = JSON.stringify(req.body);
    logger.log('info', req.body);

    // res.send(request.body); // echo the result back
});
console.log('listening on 3001');
app.listen(3001);