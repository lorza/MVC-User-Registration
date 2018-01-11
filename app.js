var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT;
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = ""; // <-- set this later

var log = function(x) {console.log(x);}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mongoose.connect() 

app.get("/", function (req, res) {
    res.send("Index Page");
})

app.listen(port, () => {
    log("Server is running B...");
});