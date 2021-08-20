import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";

import RegistrationPage from "./pages/registration/register";
import LoginPage from './pages/login/login';
import ForgetPasswordPage from './pages/forgetPassword/forgetPassword';
import ResetPasswordPage from './pages/resetPassword/resetPassword';
import Dashboard from './pages/dashboard/dashboard';
import ProtectedRoute from "./components/authenticate/authenticate"

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path = "/" component = {LoginPage} /> 
          <Route exact path = "/login" component = {LoginPage} />
          <Route exact path = "/signup" component = {RegistrationPage} />
          <Route exact path = "/forget-password" component = {ForgetPasswordPage} />
          <Route exact path = "/resetpassword/:token" component = {ResetPasswordPage} />
          <ProtectedRoute path = "/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;