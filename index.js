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
        levels: {
            trace: 0,
            input: 1,
            verbose: 2,
            prompt: 3,
            debug: 4,
            info: 5,
            data: 6,
            help: 7,
            warn: 8,
            error: 9
        },
        colors: {
            trace: 'magenta',
            input: 'grey',
            verbose: 'cyan',
            prompt: 'grey',
            debug: 'blue',
            info: 'green',
            data: 'grey',
            help: 'cyan',
            warn: 'yellow',
            error: 'red'
        }
    });

    logger.add(winston.transports.Console, {
        level: 'info',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false
    });

    logger.add(winston.transports.File, {
        prettyPrint: true,
        level: 'info',
        silent: false,
        colorize: true,
        timestamp: true,
        filename: 'chf.log',
        maxsize: 40000,
        maxFiles: 10,
        json: false
    });

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