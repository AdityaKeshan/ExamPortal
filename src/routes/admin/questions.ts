import express from "express";
const router=express.Router();
import { database ,storage,ref1} from "../../config/firebase-config";
import { set, ref,get,push,child } from "firebase/database";
import {uploadBytes ,getDownloadURL} from "firebase/storage";
import {v4 as uuid} from "uuid";
import multer from "multer";
const upload=multer();
import { Request, Response } from "express";
import { question} from "structures/structures";
router.post("/",upload.any(),async (req:Request,res:Response):Promise<void> =>{
    let {testId,courseId,message}=req.body;
    let questionId:string = uuid();
    try{
        const metadata = {
            contentType: "image/png",
          };
          var files = req.files as Express.Multer.File[];
          let size = files?.length;
          let downloadURLs: string[] = [];
          if (size != null && files != null) {
            for (let i = 0; i < size; i++) {
              const fileName = `${i}.png`;
              const storageRef = ref1(storage, questionId + "/" + fileName);
              const file = files[i];
              await uploadBytes(storageRef, file.buffer, metadata);
              const downloadURL = await getDownloadURL(storageRef);
              downloadURLs[i] = downloadURL;
            }
          }
        await set(ref(database,`/questions/${questionId}`),
        {
            courseId:courseId,
            testId:testId,
            message:message,
            imageUrl:downloadURLs,
        });
        await(set(ref(database,`/tests/${testId}/questions/${questionId}`),true));
        res.status(200);
        res.json({message:"Success"})
    }
    catch(error){
        console.log(error);
        res.status(400);
        res.json({message:"Error occured while setting question"});
    }
});
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