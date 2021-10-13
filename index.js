let express = require("express");
let bodyParser = require("body-parser");
let passport=require('passport')
let GoogleStrategy= require('passport-google-oauth').OAuth2Strategy
passport.use(new GoogleStrategy())
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(passport.initialize())
app.use(passport.session())

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
// TODO: We can basically start with requiring passport and passport-google-auth
// Specify the route and store the user info but before we needs to test it with a frontend 