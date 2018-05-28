const express = require('express');
const bodyParser = require('body-parser');
const request = require("request-promise");
const winston = require('winston');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

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