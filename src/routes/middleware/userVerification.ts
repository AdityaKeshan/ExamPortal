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
    const { tokenId } = req.params;
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
  }

  export {verifyParams,verifyBody};