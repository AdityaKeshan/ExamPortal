import express from "express";
const router = express.Router();
import {database } from "../../config/firebase-config";
import {ref,get,query, orderByChild, equalTo, child} from "firebase/database"
import { Request, Response} from 'express';
import {test } from "../../structures/structures"

router.get("/:testId",async(req:Request,res:Response)=>{
  const {testId} = req.params;
  const testRef = ref(database,`tests/${testId}`);
  try{
    const testDetails = ((await get(child(testRef, "/")))).val();
    if(!testDetails){
      res.status(400).json({message:"test does not exist"});
    }
    res.status(200).json({...testDetails,testId:testId});
  }catch(err:any){
    res.status(500).json(err);
  }
})





router.get("/course/:courseId",async (req:Request,res:Response):Promise<void>=>{
  const {courseId} = req.params;
  const courseTestRef = ref(database,`courses/${courseId}/tests`);
  const testIds = ((await get(child(courseTestRef, "/")))).val();
  if(!testIds){
    res.set(200);
    res.json({
      message:"You have not created any Tests",
      tests:[]
    })
  }
  if(typeof testIds==="object"){
    const tests:test[] = await Promise.all(Object.keys(testIds).map(async (element:string):Promise<test>=>{
      const testRef = ref(database,`tests/${element}`);
      const courseObj:test = ((await get(child(testRef, "/")))).val();
      return {...courseObj,testId:element};
    }))
    res.status(200).json({
      message:"successful",
      tests:tests
    })
  }else{
    res.status(500).json({
      message:"Something went seriously wrong",
      tests:[]
    })
  }
    
  })



  module.exports = router;