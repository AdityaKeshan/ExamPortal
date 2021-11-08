const express = require("express");
const router = express.Router();
const path = require("path");
let { set, ref } = require("firebase/database");
const { app, admin, database } = require(path.resolve(
  "../ExamPortal/src/config/firebase-config"
));

router.get("/", (req, res) => {
  res.send("Hello");
});
router.post("/", (req, res) => {
  let courseId = Math.random();
  const { tokenId, courseName, admin } = req.body;
  set(ref(database, "admin/" + "1"), {
    courseId: courseId,
    courseName: courseName,
    admin: admin,
  });
});

const verify = function (req, res, next) {
  console.log("LOGGED");
  const { tokenid } = req.body;
  admin
    .auth()
    .verifyIdToken(tokenid)
    .then(() => {
      return next();
    })
    .catch((error) => {
      res.status(400);
      res.json({ message: "verification failed!", err: error });
      return next(Error("middleware 2 failed"));
    });
};

module.exports = router;
