const express = require('express');
const bodyParser = require('body-parser');
const rp = require("request-promise");
const winston = require('winston');
const app = express();
var http = require("https");
const limeUrl = 'https://web-production.lime.bike/api/rider/v1/views/main?map_center_latitude=35.787743&map_center_longitude=-78.644257&user_latitude=35.787743&user_longitude=-78.644257';

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.get('/birds', function (req, response) {

    console.log('inside birds');

    var options = {
        "method": "GET",
        "hostname": "api.bird.co",
        "port": null,
        "path": "/bird/nearby?latitude=35.787743&longitude=-78.644257&radius=10000",
        "headers": {
            "authorization": "Bird eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBVVRIIiwidXNlcl9pZCI6IjA4YzA3OGUxLTBhODEtNDcxYS1iZDAyLWM5Mzc0YWVmNzExMSIsImRldmljZV9pZCI6IjQ1NTdkMDJjLWU3NmItNDc2Yi05NjNlLTdmYTc1ZTAwOTA0MCIsImV4cCI6MTU2MzI5NjExM30.94tVSKTQsVyX5kMwsQ9E-56cPAjvzTkZSZ-baGo1MAM",
            "device-id": "20c6a680-6194-41e8-bedd-7e421cb61cd4",
            "app-version": "3.0.5",
            // "location": "{\\\"latitude\\\":35.787743,\\\"longitude\\\":-78.644257,\\\"altitude\\\":315,\\\"accuracy\\\":100,\\\"speed\\\":-1,\\\"heading\\\":-1}",
            "Location": '{"latitude":35.787743,"longitude":-78.644257,"altitude":315,"accuracy":100,"heading":-1}',
            "cache-control": "no-cache",
            // "postman-token": "285a22d2-b2c8-8b5e-e002-1f2ad89dc488"
        }
    };        
    
    var body;

    var req = http.request(options, function (res) {
        var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);

        });

        res.on("end", function () {
            body = Buffer.concat(chunks);
            console.log(body.toString());
            response.end(body);

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


app.get('/limescooters', function (req, response) {

    var options = {
        "method": "GET",
        "hostname": "web-production.lime.bike",
        "port": null,
        "path": "/api/rider/v1/views/main?map_center_latitude=35.787743&map_center_longitude=-78.644257&user_latitude=35.787743&user_longitude=-78.644257",
        "headers": {
          "cookie": "_limebike-web_session=dFRzWFYxUkh1TGNCL0cxb2RTUUVkb1k3blJSRzZhTk9wcmt3dS9tVTQwcjNVendudHpjeXJFUlRONmJxd2R2YTRLNlhOSFVZWjkzbUZPUFFvV0w3aVJTNXhDRHJncU92TWFWZHMvWjFNQ1NVZHM0bnlldHN1bFNyYUYwVUlpWU1JOFlaZ3ppekhCNGxoT3EwMmZkMGlUNXFyS1d3eWhJN0E2aG01WERnUFNGVFg0Z0pTOC9iZ0hGTmNNMjk4T1R4MFIvTFdIaXhneWE0R0NIMnJHSEdvL0Y3SFhWb09vcCtDTWMwNkNYVDNwazFxaDhxcUVYU0FpQTFCOG5ZQUVPQ3NYNWtYek04REZ5dVRyN0xESXNEcFY4V2ErOWJOT2dIcTBmTE5UZ0FNaHJQWjhhd2dyaVlkMWFqMWU5S1gveGpmUEIrSGJuL0FSTVVGd01TZ0lEeWhBd0s0Ym50YXdvWVhLVDdNUlVVMjNNTTROQ05mbG9FUk9MemJGQjA4OXpQRTM0NDJvU2Z2STNxcDVQblNaNWZldz09LS0rWkEvQ1dQL0ticy9nZmhTeW5FSHlRPT0%3D--abfe81b6942719f361d47d7836ed7c64a60e28c8",
          "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiTUg3Q1ZXM0dRSUIyUSIsImxvZ2luX2NvdW50Ijo1fQ.9gFB7mDHq3IKo-aW6WZvTICeXVKwlQ0WGkRNknqd8jE",
          "cache-control": "no-cache",
          "postman-token": "d7904ab2-9412-b003-9396-72fd9839c0d4"
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
          console.log('body id = ', body.toString());
          response.end(body);

        });
      });
      
      req.end();


});

async function getLimeData(req, res) {
    let response;
    req.setHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3Rva2VuIjoiTUg3Q1ZXM0dRSUIyUSIsImxvZ2luX2NvdW50Ijo1fQ.9gFB7mDHq3IKo-aW6WZvTICeXVKwlQ0WGkRNknqd8jE');
    req.setHeader('Cookie', '_limebike-web_session=dFRzWFYxUkh1TGNCL0cxb2RTUUVkb1k3blJSRzZhTk9wcmt3dS9tVTQwcjNVendudHpjeXJFUlRONmJxd2R2YTRLNlhOSFVZWjkzbUZPUFFvV0w3aVJTNXhDRHJncU92TWFWZHMvWjFNQ1NVZHM0bnlldHN1bFNyYUYwVUlpWU1JOFlaZ3ppekhCNGxoT3EwMmZkMGlUNXFyS1d3eWhJN0E2aG01WERnUFNGVFg0Z0pTOC9iZ0hGTmNNMjk4T1R4MFIvTFdIaXhneWE0R0NIMnJHSEdvL0Y3SFhWb09vcCtDTWMwNkNYVDNwazFxaDhxcUVYU0FpQTFCOG5ZQUVPQ3NYNWtYek04REZ5dVRyN0xESXNEcFY4V2ErOWJOT2dIcTBmTE5UZ0FNaHJQWjhhd2dyaVlkMWFqMWU5S1gveGpmUEIrSGJuL0FSTVVGd01TZ0lEeWhBd0s0Ym50YXdvWVhLVDdNUlVVMjNNTTROQ05mbG9FUk9MemJGQjA4OXpQRTM0NDJvU2Z2STNxcDVQblNaNWZldz09LS0rWkEvQ1dQL0ticy9nZmhTeW5FSHlRPT0%3D--abfe81b6942719f361d47d7836ed7c64a60e28c8')
    try {
        response = await rp(limeUrl);
        // res.send(response);
        return response;
    } catch(err) {
        console.log('http error getting lime data', err);
        return res.status(500).send();
    }
}

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