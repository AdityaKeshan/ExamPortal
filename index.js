let express = require("express");
let bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//set up front-end file
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

//changing port to 3001 to accomodate react app
app.listen(3001, function () {
  console.log("Listening on port 3001");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/", function (req, res) {
  res.send("Okay!");
});
