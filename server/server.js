//
// Main entry point for the program; this file serves all files to the browser
//
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var dbConfig = require("../config/db");
var routes = require("./routes");

var app = express();

//
// Static directories
//
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
app.use(bodyParser.json());

//
// Mongoose connection logic
//
mongoose.connect(dbConfig.url);
var connection = mongoose.connection;
global.autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

connection.on("error", console.error.bind(console, "Connection error: "));

connection.once("open", function() {
   console.log("Connected to: db.abject-admin-dev"); 
});

mongoose.Promise = global.Promise;

app.use("/", routes);

app.get("/*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/views/index.html"));
});

app.listen(3000);
console.log("Server running on port 3000...");

module.exports = app;
