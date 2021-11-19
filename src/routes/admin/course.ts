import express from "express";
const router = express.Router();
import {database } from "../../config/firebase-config";
// const { app, admin, database } = require(path.resolve(
//   "../ExamPortal/src/config/firebase-config"
// ));
import {set,ref,get,child,push} from "firebase/database"
import { Request, Response} from 'express';
import {v4 as uuid} from "uuid";
import {course} from "../../structures/structures";
import { verifyBody,verifyParams } from "../middleware/userVerification";

interface courseWithId extends course{
  courseId:string,
}



router.get("/",verifyParams ,async (req:Request, res:Response):Promise<void> => {
  const adminReference  = ref(database,`admin/${res.locals.userId}/courses`);
  const courseIds = ((await get(child(adminReference, "/")))).val();
  if(!courseIds){
    res.set(200);
    res.json({
      message:"You have not created any courses",
      courses:[]
    })
  }
  if(typeof courseIds==="object"){
    const courses:courseWithId[] = await Promise.all(Object.keys(courseIds).map(async (element:string):Promise<courseWithId>=>{
      const courseRef = ref(database,`courses/${element}`);
      const courseObj:course = ((await get(child(courseRef, "/")))).val();
      return {...courseObj,courseId:element};
    }))
    res.status(200).json({
      message:"successful",
      courses:courses
    })
  }else{
    res.sendStatus(500);
    res.json({
      message:"Something went seriously wrong",
      courses:[]
    })
  }
});
router.post("/", verifyBody,async (req:Request, res:Response):Promise<void> => {
  let courseId:string = uuid();
  const { courseName,semester } = req.body;
  try{
    await set(ref(database,`courses/${courseId}`),{
      courseName: courseName,
      adminId: res.locals.userId,
      testIds:{},
      studentIds:{},
      semester:semester,
    });
    await set(ref(database,`admin/${res.locals.userId}/courses/${courseId}`),true);
  }catch(e){
    res.status(500);
    res.json({
      message:"Registration failed :(",
      error:e,
    });
    return;
  }
  res.status(200);
  res.send("Course Registration successfull");
})

module.exports = router;
