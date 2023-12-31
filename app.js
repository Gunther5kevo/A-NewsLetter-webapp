const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;

      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merged_fields: {
            FNAME: firstName,
            LNAME: lastName,
          }
        }]
      }
      const jsonData = JSON.stringify(data);

      const url = "https://us10.api.mailchimp.com/3.0/lists/ebd620849c";

      const options = {
        method: "POST",
        auth: "Kevo1:f085d66e0cdf9a17807e7b93470ebc51-us10"
      }

      const request = https.request(url, options, function(response) {
          response.on("data", function(data) {
            console.log(JSON.parse(data));
          })
        })
        request.write(jsonData);
        request.end();

      });




    app.listen(3000, function() {
      console.log("Server is running on port 3000");
    });

    //f085d66e0cdf9a17807e7b93470ebc51-us10
    //ebd620849c
