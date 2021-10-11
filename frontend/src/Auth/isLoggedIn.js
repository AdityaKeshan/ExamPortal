import { useSelector } from "react-redux";

const IsLoggedIn = (item) => {
  debugger;
  const student = useSelector((state) => state.loginStudent.student);
  const admin = useSelector((state) => state.loginAdmin.admin);
  if (item === "student") {
    if (student.name !== "") return true;
    else return false;
  } else {
    if (admin.name !== "") return true;
    else return false;
  }
};

export default IsLoggedIn;
