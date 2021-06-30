import './App.css';
import Container from '@material-ui/core/Container';
import RegistrationForm from "./pages/registration/register";

function App() {
  return (
    <div className="App">
      <header className="App-containt">
        <Container maxWidth="md" className="py-3 px-0">
          <RegistrationForm />
        </Container>
      </header>
    </div>
  );
}

export default App;