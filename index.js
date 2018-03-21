var express = require('express'),
    bodyParser = require('body-parser'),
    request = require("request-promise");
var app = express();
let results = "";
let testResults = "";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   });

app.post('/geoeventlogger', function (request, response) {
    console.log(request.body); // your JSON
    response.send(request.body);    // echo the result back

    this.results = request.body;
    console.log('results = ', this.results.street);

    this.testResults = JSON.stringify(this.results);
    console.log('test results = ', this.testResults.street);

    let srPostBody = {
        callerFirstName: "Waze",
        callerLastName: "Waze",
        callerWorkPhone: "9196708062",
        location: "",
        callerEmail: "charles.foley@raleighnc.gov ",
        problemSid: "263574",
        x: "",
        y: "",
        details: "This Service Request was created by Waze",
        submitTo: 293626,
        callerAddress: "726 davenbury way",
        callerCity: "cary",
        callerState: "NC",
        callerZip: "27513"
    };

    srPostBody.x = this.results.geometry.x;
    srPostBody.y = this.results.geometry.y;
    srPostBody.location = this.results.street;

    var options = {
        method: "POST",
        url:
          "http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/createServiceRequest/",
        headers: {
          "Content-Type": "application/json"
        },
        body: srPostBody,
        json: true
      };
      
      function createServiceRequest() {
        request(options)
          .then(response => {
            // Handle the response
            console.log("response is ", response);
          })
          .catch(err => {
            // Deal with the error
            console.log("error is ", err);
          });
      }

});

app.listen(3001);