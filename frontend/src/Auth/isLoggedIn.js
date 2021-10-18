const IsLoggedIn = (item) => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (item === "student") {
    if (loggedIn) return true;
    else return false;
  } else if (item === "admin") {
    if (loggedIn) return true;
    else return false;
  }
};

export default IsLoggedIn;
