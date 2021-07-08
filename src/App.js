import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from "react";

import RegistrationPage from "./pages/registration/register";
import LoginPage from './pages/login/login';
import ForgetPasswordPage from './pages/forgetPassword/forgetPassword';
import ResetPasswordPage from './pages/resetPassword/resetPassword';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* <Redirect from="/" to="/login" /> */}
        <Switch>
          {/* <Route exact path = "/" component = {LoginPage} /> */}
          <Route exact path = "/login" component = {LoginPage} />
          <Route exact path = "/signup" component = {RegistrationPage} />
          <Route exact path = "/forget-password" component = {ForgetPasswordPage} />
          <Route exact path = "/resetpassword/:token" component = {ResetPasswordPage} />
          <Route exact path = "/dashboard" component = {Dashboard} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;