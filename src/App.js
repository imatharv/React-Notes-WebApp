import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import RegistrationPage from "./pages/registration/register";
import LoginPage from './pages/login/login';

function App() {
  return (
    <div className="App">
      <header className="App-containt">
          <BrowserRouter>
          <Switch>
            <Route exact path = "/login" component = {LoginPage} />
            <Route exact path = "/signup" component = {RegistrationPage} />
          </Switch>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;