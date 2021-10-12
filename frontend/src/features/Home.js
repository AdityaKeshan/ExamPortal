import React from "react";
import { useDispatch } from "react-redux";
import { setStudent } from "../Auth/studentLogin";
import { setAdmin } from "../Auth/adminLogin";
import { useHistory } from "react-router";

const Home = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleClickStudent = () => {
    dispatch(setStudent({ name: "kaushal" }));
    history.push("/student");
  };
  const handleClickAdmin = () => {
    dispatch(setAdmin({ name: "kaushal" }));
    history.push("/admin");
  };
  return (
    <div>
      <button onClick={handleClickAdmin}>Sign in as admin</button>
      <button onClick={handleClickStudent}>Sign in as student</button>
    </div>
  );
};

export default Home;
