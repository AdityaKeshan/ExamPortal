let express = require("express");
//let bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
require("./config/firebase-config");

// app.use(upload.array()); // will use if image in router doesnt work
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//configuring cors
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

//importing routes
const adminRouterCourse = require("./routes/admin/course");
const adminRouterTests = require("./routes/admin/test");
const courseRouter = require("./routes/courses/course");
const studentRouter = require("./routes/student/course");
const testRouter = require("./routes/tests/test");
const adminRouterQuestions = require("./routes/admin/questions");
const studentRouterAnswers = require("./routes/student/answers");
const questionRoute = require("./routes/questions/question");
//setting up routes

app.use("/admin/course", adminRouterCourse);
app.use("/admin/test", adminRouterTests);
app.use("/course", courseRouter);
app.use("/student/course", studentRouter);
app.use("/student/answers", studentRouterAnswers);
app.use("/test", testRouter);
app.use("/admin/question", adminRouterQuestions);
app.use("/question", questionRoute);
//set up front-end file
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//changing port to 3001 to accomodate react app
app.listen(3001, function () {
  console.log("Listening on port 3001");
});
