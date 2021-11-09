import express from "express" 
const router = express.Router();
import {admin,database} from "../../config/firebase-config"
// const { app, admin, database } = require(path.resolve(
//   "../ExamPortal/src/config/firebase-config"
// ));
import {set,ref} from "firebase/database"
import { Request, Response, NextFunction } from 'express';

const verify = function (req:Request, res:Response, next:NextFunction):void {
  const { tokenId } = req.body;
  admin
    .auth()
    .verifyIdToken(tokenId)
    .then(() => {
      return next();
    })
    .catch((error:Error) => {
      res.status(400);
      res.json({ message: "verification failed!", err: error });
    });
};

router.get("/", (req:Request, res:Response) => {
  res.send("Hello");
});
router.post("/", verify, (req:Request, res:Response) => {
  console.log("here");
  let courseId:string = Math.random().toString(); //TODO : - use uuid
  const { courseName, admin } = req.body;
  set(ref(database, "admin/" + "1"), {
    courseId: courseId,
    courseName: courseName,
    admin: admin,
  });
  res.send("successfull");
});

module.exports = router;
