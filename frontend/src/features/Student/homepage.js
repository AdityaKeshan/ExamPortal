import React from "react";
import { getAuth, signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { resetStudent } from "../../Auth/studentLogin";
import Header from "../utilities/header/Header";
import SideBar from "../utilities/SideBar/SideBar";
const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedIn");
        dispatch(resetStudent());
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
    </div>
  );
};

export default Homepage;
