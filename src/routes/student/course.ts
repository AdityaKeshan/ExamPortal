import express from "express";
const router=express.Router();
import { database } from "../../config/firebase-config";
import { set, ref,get,push,child } from "firebase/database";
import { Request, Response, NextFunction } from "express";
import { verifyBody,verifyParams } from "../middleware/userVerification";
import { course } from "structures/structures";
router.get("/",verifyParams, async (req: Request, res: Response): Promise<void> => {
    let uid = res.locals.userId;
    const studentReference= ref(database,"students/$uid/courses");
    const courseIds =(await get(child(studentReference,"/"))).val();
    if(!courseIds)
    {
      res.status(200);
      res.json({
        message:"You don't have any course registered",
        courses:[]
      })
    }
    if(typeof courseIds=="object")
    {
        const courses:course[]=await Promise.all(Object.keys(courseIds).map(async (element:string):Promise<course>=>{
          const courseRef=ref(database,'courses/${Object.keys(courseIds[element])[0]}');
          const courseObj: course=(await get(child(courseRef,'/'))).val();
          return courseObj;
        }))
        res.status(200);
        res.json({message:"Success",
      courses:courses});
    }
    else{
      res.status(200);
        res.json({message:"Error occured",
      courses:[]});
    }
});
router.post("/",verifyBody,async (req: Request, res: Response):Promise<void> => {
    let uid=res.locals.userId;
    let {courseId}=req.body;
    console.log(courseId);
    try{
      const courseRef=ref(database,'courses/'+courseId);
      const courseValid=((await get(child(courseRef,"/")))).val();
      console.log(courseValid);
      if(!courseValid){
        res.status(200);
        res.json({message:"Course Does not exist"});
        // Something seems missing here
      }
      await set(ref(database,'student/${uid}/courses'),{
        [courseId]:true
      });
      await set(ref(database,'courses/${courseId}/studentIds'),{
          [uid]:true
      });
    }catch(e)
    {
      res.status(500);
      res.json({message:"Registration of Course Failed", error :e});
      return;
    }
    res.status(200);
    res.send("Course Registration Successful");
  });
  
  module.exports = router;

    // let uid = req.body["uid"];
    // let courseId: string = ((Math.random() * 10000 + 1) | 0).toString(); //TODO : - use uuid
    // const { courseName, adminName } = req.body;
    // set(ref(database, "student/" + uid + "/courses/"+courseId), {
    //   courseName: courseName,
    // });
    // set(ref(database,"courses/"+courseId),{
    //   courseName: courseName,
    //   adminName: adminName,
    //   adminID: uid,
    // });
    // res.send("successful");