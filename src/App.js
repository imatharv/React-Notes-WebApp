import './App.css';
import Container from '@material-ui/core/Container';
import RegistrationPage from "./pages/registration/register";
import LoginPage from './pages/login/login';

function App() {
  return (
    <div className="App">
      <header className="App-containt">
        <Container maxWidth="md" className="py-3 px-0">
          <LoginPage />
          {/* <RegistrationPage /> */}
        </Container>
      </header>
    </div>
  );
}

export default App;