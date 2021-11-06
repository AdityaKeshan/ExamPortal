const express = require("express");
const router = express.Router();
const path = require("path");
const { app, admin } = require(path.resolve("../ExamPortal/src/config/firebase-config"));

router.get("/",(req,res)=> {
  res.send("Hello");
});
router.post("/", (req, res) => {
  const { tokenid } = req.body;
  admin.auth().verifyIdToken(tokenid).then((decodedToken) => {
     const uid = decodedToken.uid;
     res.json({ message: "this works!", id: uid });
  }).catch((error) => {
    res.status(400);
     res.json({ message: "verification failed!" });
  });
  
    // .verifyIdToken(idToken)
   
});

module.exports = router;
