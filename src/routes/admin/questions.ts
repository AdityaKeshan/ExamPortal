import express from "express";
const router=express.Router();
import { database } from "../../config/firebase-config";
import { set, ref,get,push,child } from "firebase/database";
import {v4 as uuid} from "uuid";
import { Request, Response, NextFunction } from "express";
// import { verifyBody,verifyParams } from "../middleware/userVerification";
import { question} from "structures/structures";
import { app, messaging } from "firebase-admin";

router.get("/",async (req:Request,res:Response):Promise<void>=>{
    let testId=req.query.testId;
 
    const testReference=ref(database,`tests/${testId}/questionId`);
    try{
        // TODO : Check if we need to verify a test exists or not
        const questionIds=((await get(child(testReference,"/")))).val();
        
        if(!questionIds){
            res.status(200);
            res.json({
              message:"You have not added any questions",
              questions:[]
            });
        }
        if(typeof questionIds=='object')
        {
            const questions:question[]= await Promise.all(Object.keys(questionIds).map(async (element:string)=>{
                    const questionRef= ref(database,`questions/${element}`);
                    const questionObj:question=( (await get(child(questionRef,"/")))).val();
                    return  {...questionObj,questionId:element};
            }));
            res.status(200);
            res.json({message:"Success",
            questions:questions});
        }
        else{
            res.status(200);
            res.json({
              message:"Something went seriously wrong",
              questions:[]
            })
          }
    }
    catch(error){
        console.log(error);
        res.status(200);
        res.json({message:"Error occured while getting question"})
    }
});
module.exports=router;