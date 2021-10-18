import React from "react";
import { useDispatch } from "react-redux";
import { setStudent } from "../Auth/studentLogin";
import { setAdmin } from "../Auth/adminLogin";
import { useHistory } from "react-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Header from "../features/utilities/header/Header"
import "./Home.css"

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleClickStudent = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem("loggedIn", "student");
      dispatch(
        setStudent({ name: user.displayName, email: user.email, token: token })
      );
      history.push("/student");
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickAdmin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem("loggedIn", "admin");
      dispatch(
        setAdmin({ name: user.displayName, email: user.email, token: token })
      );
      history.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header textOne="Sign in as Student" handleOne={handleClickStudent} textTwo="Sign in as Admin" handleTwo={handleClickAdmin}/>
    </div>
  );
};

export default Home;
