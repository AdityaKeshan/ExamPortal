const express = require("express");
const router = express.Router();
const { getAuth } = require("firebase/auth");
router.post("/", (req, res) => {
  const { idToken } = req.body;
  console.log(getAuth());
  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.json({ message: "this works!", id: uid });
    })
    .catch((error) => {
      res.status(400);
      res.json({ message: "verification failed!" });
    });
});

module.exports = router;
