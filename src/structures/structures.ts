interface present {
  [propName: string]: boolean;
}

interface question {
  questionId?:string;
  courseId:string;
  testId:string;
  message: string;
  imageUrl: string[];
}
interface test {
  testId?: string;
  testName: string;
  startTime: Date;
  endTime: Date;
  duration: Date;
  questionId?: present[];
  studentId?:present[];
}

interface course {
  courseName: string;
  adminId: string;
  testIds: present;
  studentIds: present;
  semester: string;
}
//courseId

interface answers{
  studentId:string;
  questionId:string;
  text?:string;
  uploads?:string[];
}
export { question, test, course };
