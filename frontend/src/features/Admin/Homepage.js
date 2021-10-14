import React from "react";
import { getAuth, signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { resetAdmin } from "../../Auth/adminLogin";
import Header from "../utilities/header/Header";
const Homepage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      <Header  textTwo="Sign Out" handleTwo={handleSignOut} />
    </div>
  );
};

export default Homepage;
