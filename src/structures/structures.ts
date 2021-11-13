interface present{
  [propName: string]: boolean;
}

interface question{
    questionId:string,
    message:string,
    imageUrl:string,
  }
  interface test{
    testId:string,
    testName:string,
    startTime:Date;
    endTime:Date,
    questionID:present,
  
  }
  
  interface course{
      courseName:string,
      adminId:string,
      testIds:present,
      studentIds:present,
      semester:string,
  }


  export {question,test,course}