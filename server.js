var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var port = 3000;
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var uid = require("crypto-random-string");
var session = require("express-session");
var flash = require("connect-flash");
var config = require("./config/config.js");

var log = function(x) {console.log(x);}

mongoose.connect(config.db, {useMongoClient: true}, (err) => {
    let m;
    err ? m = "\nERR CONNECTING TO DB" : m = "\nMongoDB Cloud Server: CONNECTION SUCCESSFUL";
    log(m);
    // log(err);
  });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/resources/css", express.static("public/css"));
app.use("/resources/bulma", express.static("node_modules/bulma"));
app.use(session({secret: "doyouknowdewae?showmedewaemyqueen"})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./config/passport")(passport);
require("./routes")(app, passport);

app.listen(port, () => {
    log("Server is running B..." + port);
});