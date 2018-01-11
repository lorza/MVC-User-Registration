var express = require("express");
var bodyParser = require("body-parser");
var port = 80;
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var uid = require("crypto-random-string");
var app = express();

var log = function(x) {console.log(x);}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/resources/css", express.static("public/css"));
app.use("/resources/bulma", express.static("node_modules/bulma"));

app.get("/", function (req, res) {
    res.render("index")
})

app.listen(port, () => {
    log("Server is running B..." + port);
});
