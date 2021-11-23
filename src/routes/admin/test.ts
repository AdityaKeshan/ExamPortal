import express,{Request,Response} from "express";
const router=express.Router();
import {verifyBody} from "../middleware/userVerification"
import {verifyCourseAdmin} from "../courses/utility"
import {v4 as uuid} from "uuid";
import { ref, set } from "firebase/database";
import { database } from "../../config/firebase-config";

router.post("/",verifyBody,async (req:Request,res:Response)=>{
    const {courseId,testName,startTime,endTime,duration}:{courseId:string,testName:string,startTime:Date,endTime:Date,duration:Date} = req.body;
    if(await verifyCourseAdmin(courseId,res.locals.userId)){
        //TODO check start time
        const testId = uuid();
        try{
            const createTest =  set(ref(database,`tests/${testId}`),{
              testName: testName,
              startTime: startTime,
              endTime:endTime,
              duration:duration,
              questions:{},
            });
            const setTest = set(ref(database,`courses/${courseId}/tests/${testId}`),true);
            await Promise.all([createTest,setTest]);
            res.sendStatus(200);
        }catch(err:any){
              res.status(500).json(err);
        }
    }else{
        res.status(400).json({message:"This course does not belong to you"});
    }
})




module.exports = router;