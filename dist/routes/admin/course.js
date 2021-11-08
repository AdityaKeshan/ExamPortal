"use strict";
var express = require("express");
var router = express.Router();
var path = require("path");
var _a = require(path.resolve("../ExamPortal/src/config/firebase-config")), app = _a.app, admin = _a.admin;
router.get("/", function (req, res) {
    res.send("Hello");
});
router.post("/", function (req, res) {
    var tokenid = req.body.tokenid;
    admin.auth().verifyIdToken(tokenid).then(function (decodedToken) {
        var uid = decodedToken.uid;
        res.json({ message: "this works!", id: uid });
    }).catch(function (error) {
        res.status(400);
        res.json({ message: "verification failed!" });
    });
    // .verifyIdToken(idToken)
});
module.exports = router;
