import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import reportWebVitals from './reportWebVitals';
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="md">
          <App />   
        </Container>
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
