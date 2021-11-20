import express from "express";
const router = express.Router();
import { database, storage, ref1 } from "../../config/firebase-config";
import { set, ref } from "firebase/database";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import multer from "multer";
const upload = multer();
import { Request, Response } from "express";
import { question } from "structures/structures";
router.post(
  "/",
  upload.any(),
  async (req: Request, res: Response): Promise<void> => {
    const answerId = uuid();
    const { studentId, questionId } = req.body;
    try {
      //Add image for answers/text
      const metadata = {
        contentType: "image/png",
      };
      var files = req.files as Express.Multer.File[];
      let size = files?.length;
      let downloadURLs: string[] = [];
      if (size != null && files != null) {
        for (let i = 0; i < size; i++) {
          const fileName = `${i}.png`;
          const storageRef = ref1(storage, answerId + "/" + fileName);
          const file = files[i];
          await uploadBytes(storageRef, file.buffer, metadata);
          const downloadURL = await getDownloadURL(storageRef);
          downloadURLs[i] = downloadURL;
        }
      }

      await set(ref(database, `answers/${answerId}`), {
        studentId: studentId,
        questionId: questionId,
        uploads: downloadURLs,
      });
      res.json({ message: "Successfully uploaded" });
    } catch (error) {
      console.log(error);
      res.status(200);
      res.json({ message: "Error occured while posting answers" });
    }
  }
);
module.exports = router;
