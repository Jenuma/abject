// ---------------------------------------------------------------------------------------------------------|
// server.js                                                                                                |
//                                                                                                          |
// This is the main entry point for the MEAN app.                                                           |
//                                                                                                          |         
// Author: Clifton Roberts                                                                                  |         
// Date: 2 December 2016                                                                                    |         
// ---------------------------------------------------------------------------------------------------------|
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var path = require("path");
var dbConfig = require("../config/db.conf");
var fbConfig = require("../config/fb.conf");
//var routes = require("./routes");

var app = express();

// ---------------------------------------------------------------------------------------------------------|
// Passport Facebook Authentication                                                                         |
// ---------------------------------------------------------------------------------------------------------|
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: fbConfig.appId,
    clientSecret: fbConfig.appSecret,
    callbackURL: fbConfig.callbackUrl,
    profileFields: ["id", "displayName", "photos"]
    },
    function(accessToken, refreshToken, profile, done) {
        var authorizedUsers = fbConfig.authorizedUsers;

        for(var i = 0; i < authorizedUsers.length; i++) {
            if(profile.id === authorizedUsers[i]) {
                return done(null, profile);
            }
        }
        return done(null, false);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// ---------------------------------------------------------------------------------------------------------|
// App Configuration                                                                                        |
// ---------------------------------------------------------------------------------------------------------|
app.use(session({secret: fbConfig.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// ---------------------------------------------------------------------------------------------------------|
// Static Directories                                                                                       |
// ---------------------------------------------------------------------------------------------------------|
app.use("/angular", express.static(__dirname + "/../node_modules/angular"));
app.use("/angular-ui-router", express.static(__dirname + "/../node_modules/angular-ui-router/release"));
app.use("/angular-ui-router-title", express.static(__dirname + "/../node_modules/angular-ui-router-title"));
app.use("/angular-animate", express.static(__dirname + "/../node_modules/angular-animate"));
app.use("/animate.css", express.static(__dirname + "/../node_modules/animate.css"));
app.use("/jquery", express.static(__dirname + "/../node_modules/jquery/dist"));
app.use("/bootstrap", express.static(__dirname + "/../node_modules/bootstrap/dist"));
app.use("/font-awesome", express.static(__dirname + "/../node_modules/font-awesome"));
app.use("/directives", express.static(__dirname + "/../client/common/directives"));
app.use("/services", express.static(__dirname + "/../client/common/services"));
app.use("/controllers", express.static(__dirname + "/../client/controllers"));
app.use("/stylesheets", express.static(__dirname + "/../client/stylesheets"));
app.use("/views", express.static(__dirname + "/../client/views"));
app.use(express.static(__dirname + "/../client/views"));

// ---------------------------------------------------------------------------------------------------------|
// MongoDB Connection Logic                                                                                 |
// ---------------------------------------------------------------------------------------------------------|
mongoose.connect(dbConfig.url);
var connection = mongoose.connection;
global.autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

connection.on("error", console.error.bind(console, "Connection error: "));

connection.once("open", function() {
   console.log(`Connected to: ${dbConfig.url}`);
});

mongoose.Promise = global.Promise;

// ---------------------------------------------------------------------------------------------------------|
// Routes                                                                                                   |
// ---------------------------------------------------------------------------------------------------------|
app.use("/", require("./routes")(passport));

app.use(function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/views/index.html"));
});

// ---------------------------------------------------------------------------------------------------------|
// App Start                                                                                                |
// ---------------------------------------------------------------------------------------------------------|
var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running on port ${port}...`);

module.exports = app;
