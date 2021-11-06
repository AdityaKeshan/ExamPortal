import React from "react";
import { getAuth, signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetAdmin } from "../../Auth/adminLogin";
import Header from "../utilities/header/Header";
import axios from "axios";
import SideBar from "../utilities/SideBar/SideBar";
const Homepage = () => {
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.loginAdmin.admin);
  const history = useHistory();
  
  const getCourses = async () => {
    const result = await axios
      .post("http://localhost:3001/admin/course", {
        tokenid: admin.token,
      })
      .catch((err) => console.log(err));
    console.log(result);
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedIn");
        dispatch(resetAdmin());
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header textTwo="Sign Out" handleTwo={handleSignOut} />
      <SideBar />
      <div className="ml-16">
        <button type="submit" onClick={getCourses}>
          Click here to get cources
        </button>
      </div>
    </div>
  );
};

export default Homepage;
