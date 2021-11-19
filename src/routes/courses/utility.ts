import { database } from "../../config/firebase-config";
import { child, get, ref } from "firebase/database";

const verifyCourseAdmin = async(courseId:string,adminId:string):Promise<boolean>=>{
    const adminReference  = ref(database,`admin/${adminId}/courses/${courseId}`);
    const isCourse = ((await get(child(adminReference, "/")))).val();
    return (!!isCourse);
  }

  export {verifyCourseAdmin};