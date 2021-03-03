// Imports
var express = require("express");
var endpoints = require("./endpoints");
const path = require('path');

// Variables
const env = process.env.NODE_ENV
var app = express()

// Set a port
app.set("PORT", process.env.PORT || 5000)

// Allow calls from frontend
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Parse request body application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse request body application/json
app.use(express.json());

// Register all our routes with /api
app.use("/api", endpoints);

// Custom 404 page
app.use("/api*", function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});
  
// Custom 500 page
app.use("/api*", function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server on a port
app.listen(app.get("PORT"), () => {
    console.log(`API running at: localhost:${app.get("PORT")}`)
    console.log(`NODE_ENV: ${env}`)
})