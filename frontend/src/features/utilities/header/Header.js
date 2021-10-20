import "./Header.css";
import { useSelector } from "react-redux";

const Header = ({ textOne, textTwo, handleOne, handleTwo }) => {
  const student = useSelector((state) => state.loginStudent.student.name);
  const admin = useSelector((state) => state.loginAdmin.admin.name);
  let user;
  if (student) {
    user = student;
  } else if (admin) {
    user = admin;
  }
  return (
    <div className="w-full min-h-50 h-12 flex items-center justify-end bg-blue-700 text-blue-200 border-b-4 border-blue-200">
      {user ? (
        <p className="m-2">{user}</p>
      ) : (
        <button onClick={handleOne} className="btn-header">
          {textOne}
        </button>
      )}
      <button onClick={handleTwo} className="btn-header mr-2">
        {textTwo}
      </button>
    </div>
  );
};

export default Header;
