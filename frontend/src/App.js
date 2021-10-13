import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./features/Home";
import StudentHomePage from "./features/Student/homepage";
import AdminHomePage from "./features/Admin/Homepage";
import IsLoggedIn from "./Auth/isLoggedIn";

function App() {
  const GetStudentPath = () => {
    debugger;
    const flag = IsLoggedIn("student");
    return (
      <Route path="/student">
        {flag ? <StudentHomePage /> : <Redirect to="/"></Redirect>}
      </Route>
    );
  };
  const GetAdminPath = () => {
    debugger;
    const flag = IsLoggedIn("admin");
    return (
      <Route path="/admin">
        {flag ? <AdminHomePage /> : <Redirect to="/"></Redirect>}
      </Route>
    );
  };
  return (
    <Router>
      <div>
        <Switch>
          {GetStudentPath()}
          {GetAdminPath()}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
