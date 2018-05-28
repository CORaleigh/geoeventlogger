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
        transports: [
          //
          // - Write to all logs with level `info` and below to `combined.log` 
          // - Write all logs error (and below) to `error.log`.
          //
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' })
        ]
      });
      
    // logger.add(winston.transports.Console, {
    //     level: 'info',
    //     prettyPrint: true,
    //     colorize: true,
    //     silent: false,
    //     timestamp: false,
    //     format: winston.format.json()
    // });

    // logger.add(winston.transports.File, {
    //     prettyPrint: true,
    //     level: 'info',
    //     silent: false,
    //     colorize: true,
    //     timestamp: true,
    //     filename: 'chf.log',
    //     maxsize: 40000,
    //     maxFiles: 10,
    //     json: false,
    //     format: winston.format.json(),
    // });

    logger.log('info', 'Hello distributed log files!');

    // .log('req.body = ', req.body); // your JSON
    // console.log('req.query.data = ', req.query.data);
    // console.log('req.params.data = ', req.params.data);

    var output = JSON.stringify(req.body);
    logger.log('info', req.body);

    // res.send(request.body); // echo the result back
});
console.log('listening on 3001');
app.listen(3001);