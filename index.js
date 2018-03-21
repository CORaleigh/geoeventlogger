var express = require('express'),
    bodyParser = require('body-parser'),
    request = require("request-promise");
var app = express();

app.use(bodyParser.json());

app.post('/geoeventlogger', function (request, response) {
    console.log(request.body); // your JSON
    //    response.send(request.body);    // echo the result back
    let results = '';
    this.results = JSON.parse(request.body);
    console.log('results = ', this.results.street);

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