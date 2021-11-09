"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var app = express();
require("./config/firebase-config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//configuring cors
var corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
//importing routes
var courseRouter = require("./routes/admin/course");
//setting up routes
app.use("/admin/course", courseRouter);
//set up front-end file
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//changing port to 3001 to accomodate react app
app.listen(3001, function () {
    console.log("Listening on port 3001");
});
