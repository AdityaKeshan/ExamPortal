import express from "express";
const router = express.Router();
import {database } from "../../config/firebase-config";
import {ref,get,query, orderByChild, equalTo, child} from "firebase/database"
import { Request, Response} from 'express';
import {question} from "../../structures/structures"

router.get("/test/:testId",async (req:Request,res:Response):Promise<void>=>{
    const {testId} = req.params;
    try{
        const testQuestionRef = ref(database,`tests/${testId}/questions`);
        const questionIds = ((await get(child(testQuestionRef, "/")))).val();
        if(!questionIds){
        res.set(200);
        res.json({
            message:"You have not created any Questions",
            tests:[]
        })
        }
        if(typeof questionIds==="object"){
        const questions:question[] = await Promise.all(Object.keys(questionIds).map(async (element:string):Promise<question>=>{
            const questionRef = ref(database,`questions/${element}`);
            const questionObj:question = ((await get(child(questionRef, "/")))).val();
            return {...questionObj,questionId:element};
        }))
        res.status(200).json({
            message:"successful",
            questions:questions
        })
        }else{
        res.status(500).json({
            message:"Something went seriously wrong",
            tests:[]
        })
        } 
    }catch(err:any){
        res.status(500).json(err);
    }
         
});



module.exports = router;