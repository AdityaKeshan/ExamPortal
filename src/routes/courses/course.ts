import express from "express";
const router = express.Router();
import {database } from "../../config/firebase-config";
// const { app, admin, database } = require(path.resolve(
//   "../ExamPortal/src/config/firebase-config"
// ));
import {ref,get,query, orderByChild, equalTo} from "firebase/database"
import { Request, Response} from 'express';

router.get("/:courseName",async (req:Request,res:Response):Promise<void>=>{
    const {courseName} = req.params;
    const courseRef = ref(database,"courses");
    const courseQuery = query(courseRef,orderByChild("courseName"),equalTo(courseName));
    try{
      const course = await get(courseQuery);
      res.status(200).json({courses:course});
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
    
  })
  module.exports = router;