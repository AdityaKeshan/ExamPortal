import { admin } from "../../config/firebase-config";
import { NextFunction,Request,Response } from "express";

const verifyBody = function (req:Request, res:Response, next:NextFunction):void {
    const { tokenId } = req.body;
    if(!tokenId){
        res.status(400);
        res.json({ message: "verification failed! No tokenId"});
    }
    admin
      .auth()
      .verifyIdToken(tokenId)
      .then((ticket) => {
        res.locals.userId = ticket.sub;
        return next();
      })
      .catch((error:Error) => {
        res.status(400);
        res.json({ message: "verification failed!", err: error });
      });
  };

  const verifyParams = (req:Request, res:Response, next:NextFunction):void =>{
    let { tokenId } = req.query;
    if(!tokenId){
        res.status(400);
        res.json({ message: "verification failed! No tokenId"});
        return;
    }
    if(typeof tokenId == "string"){
      admin
      .auth()
      .verifyIdToken(tokenId)
      .then((ticket) => {
        res.locals.userId = ticket.sub;
        return next();
      })
      .catch((error:Error) => {
        res.status(400);
        res.json({ message: "verification failed!", err: error });
      });
    }else{
      res.status(400).json({ message: "verification failed! Invalid token"});
    }
    
  }

  export {verifyParams,verifyBody};