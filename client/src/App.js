import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LangingPage from "./components/views/LandingPage/LangingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LangingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
      </Switch>
    </Router>
  );
}

export default App;
