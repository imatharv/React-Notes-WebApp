import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import RegistrationPage from "./pages/registration/register";
import LoginPage from './pages/login/login';
import ForgetPasswordPage from './pages/forgetPassword/forgetPassword';
import ResetPasswordPage from './pages/resetPassword/resetPassword';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-containt">
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
      </header>
    </div>
  );
}

export default App;