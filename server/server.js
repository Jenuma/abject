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
var exec = require("child_process").exec;
var dbConfig = require("../config/db.conf");
var fbConfig = require("../config/fb.conf");

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
app.use("/angular-ui-router-title", express.static(__dirname + "/../node_modules/angular-ui-router-title"));
app.use("/app", express.static(__dirname + "/../client/app"));
app.use("/features", express.static(__dirname + "/../client/features"));

app.use(express.static(__dirname + "/../client/app"));

// ---------------------------------------------------------------------------------------------------------|
// MongoDB Connection Logic                                                                                 |
// ---------------------------------------------------------------------------------------------------------|
mongoose.connect(dbConfig.prodUrl);
var connection = mongoose.connection;
global.autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

connection.on("error", console.error.bind(console, "Connection error: "));

connection.once("open", function() {
   console.log(`Connected to database.`);
});

mongoose.Promise = global.Promise;

// ---------------------------------------------------------------------------------------------------------|
// Routes                                                                                                   |
// ---------------------------------------------------------------------------------------------------------|
app.use("/", require("./routes")(passport));

app.use(function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/../client/app/index.html"));
});

app.use(function(err, req, res, next) {
    if(err) {
        if(err.status) {
            if(err.status === 401) {
                res.status(401).redirect("/401");
            } else if(err.status === 404) {
                res.status(404).send(err.message || "The requested resource could not be found.");
            } else if(err.status === 503) {
                res.status(503).send(err.message || "The database service may be temporarily down.");
            }
        } else {
            console.log("Error: " + err);
            res.status(500).send(err.message || "An unknown error occurred.");
        }
    }
});

// ---------------------------------------------------------------------------------------------------------|
// App Start                                                                                                |
// ---------------------------------------------------------------------------------------------------------|
var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running on port ${port}...`);

function gatherBankData() {
    
    clearInterval(bankInterval);
    var cmd = "casperjs ../../mogul.io/mogul.io.js";
        
    exec(cmd, function(error, stdout, stderr) {
        var strAmount = stdout.match(/Value: \$((?:,?\d{0,3})*\.\d\d)/)[1];

        if(strAmount) {
            var balance = {amount: strAmount};
            
            var Balance = require("./models/balance").Balance;
            Balance.findOneAndUpdate(balance)
                .catch(function(err) {
                    console.log(err);
                    clearInterval(bankInterval);
                });

        } else {
            clearInterval(bankInterval);
        }
    });
}

var bankInterval = setInterval(gatherBankData, 60000);
