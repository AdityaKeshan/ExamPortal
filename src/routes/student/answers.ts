import express from "express";
const router=express.Router();
import { database } from "../../config/firebase-config";
import { set, ref,get,push,child } from "firebase/database";
import {v4 as uuid} from "uuid";
import { Request, Response, NextFunction } from "express";
import { question} from "structures/structures";
router.post("/",async (req:Request,res:Response):Promise<void>=>{
const answerId=uuid();
const {studentId,questionId}=req.body;
try{
    //Add image for answers/text
    await set(ref(database,`answers/${answerId}`),{
        studentId:studentId,
        questionId:questionId
    });
}
catch(error)
{
    console.log(error);
    res.status(200);
    res.json({message:"Error occured while posting answers"})
}
res.status(200);
  res.json({message:"Successfully uploaded"});
});
module.exports=router;