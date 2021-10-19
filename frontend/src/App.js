import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import React, { useEffect } from "react";
import Home from "./features/Home";
import StudentHomePage from "./features/Student/homepage";
import AdminHomePage from "./features/Admin/Homepage";
import IsLoggedIn from "./Auth/isLoggedIn";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setStudent } from "./Auth/studentLogin";
import { setAdmin } from "./Auth/adminLogin";
import Loading from "./features/utilities/loadingScreen/Loading";
import Header from "./features/utilities/header/Header";
function App() {
  useSelector((state) => state.loginStudent);
  useSelector((state) => state.loginAdmin);
  const auth = getAuth();
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const loggedIn = localStorage.getItem("loggedIn");
        const token = await user.getIdToken();
        if (loggedIn === "student") {
          history.push("/student");
          dispatch(
            setStudent({
              name: user.displayName,
              email: user.email,
              token: token,
            })
          );
        } else if (loggedIn === "admin") {
          history.push("/admin");
          dispatch(
            setAdmin({
              name: user.displayName,
              email: user.email,
              token: token,
            })
          );
        }
      }
    });
    return unsubscribe;
  }, []);

  const getStudentPath = () => {
    const flag = IsLoggedIn("student");
    return (
      <Route path="/student">
        {flag ? <StudentHomePage /> : <Redirect to="/"></Redirect>}
      </Route>
    );
  };
  const getAdminPath = () => {
    const flag = IsLoggedIn("admin");
    return (
      <Route path="/admin">
        {flag ? <AdminHomePage /> : <Redirect to="/"></Redirect>}
      </Route>
    );
  };
  const getHomePath = () => {
    const flag = localStorage.getItem("loggedIn");
    return (
      <Route path="/">
        {flag ? (
          <div>
            <Header textTwo="Sign Out" textOne="Loggin In.." />
            <Loading />
          </div>
        ) : (
          <Home />
        )}
      </Route>
    );
  };

  return (
    <div>
      <Switch>
        {getStudentPath()}
        {getAdminPath()}
        {getHomePath()}
      </Switch>
    </div>
  );
}

const WrapperApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default WrapperApp;
