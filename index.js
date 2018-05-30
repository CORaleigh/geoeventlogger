const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const winston = require('winston');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

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