import express from "express";
const router = express.Router();
import { app, admin, database } from "../../config/firebase-config";
// const { app, admin, database } = require(path.resolve(
//   "../ExamPortal/src/config/firebase-config"
// ));
import { set, ref } from "firebase/database";
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const verify = function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { tokenId } = req.body;
  admin
    .auth()
    .verifyIdToken(tokenId)
    .then((decodedToken: DecodedIdToken) => {
      req.body["uid"] = decodedToken.uid;
      return next();
    })
    .catch((error: Error) => {
      res.status(400);
      res.json({ message: "verification failed!", err: error });
    });
};

router.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});
// TODO:  Courses need to have more attributes
router.post("/", verify, (req: Request, res: Response) => {
  console.log("here");
  let uid = req.body["uid"];
  let courseId: string = ((Math.random() * 10000 + 1) | 0).toString(); //TODO : - use uuid
  const { courseName, admin } = req.body;
  set(ref(database, "admin/" + uid + "/courses/" + courseId), {
    courseName: courseName,
    admin: admin,
  });
  res.send("successfull");
});

module.exports = router;
