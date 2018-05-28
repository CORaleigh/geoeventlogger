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
    winston.configure({
        transports: [
            new(winston.transports.File)({
                filename: 'somefile.log'
            })
        ]
    });

    winston.log('info', 'Hello distributed log files!');

    console.log('req.body = ', req.body); // your JSON
    // console.log('req.query.data = ', req.query.data);
    // console.log('req.params.data = ', req.params.data);

    var output = JSON.stringify(request.body);
    winston.log('info', output);

    res.send(request.body); // echo the result back
});
console.log('listening on 3001');
app.listen(3001);