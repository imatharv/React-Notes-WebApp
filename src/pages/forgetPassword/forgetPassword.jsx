//import { Redirect } from "react-router-dom";
import "./forgetPasswordStyles.css";
import UserService from "../../services/userService";
import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Service = new UserService();

export default class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      SnackbarMessage: "",
      SnackbarStyle: "",
      email: "",
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
    };
  }

  handleClickToLogin = (e) => {
    this.props.history.push("/login");
    //<Redirect to="/login" />;
  };

  handelInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    this.setState({
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
    });

    let valid = true;

    // validating email address
    if (this.state.email.length != 0) {
      if (
        /^[A-Za-z0-9]+([._+-][A-Za-z0-9]+)*@[A-Za-z0-9]+.[A-Za-z]{2,4}([.][A-Za-z]{2})*$/.test(
          this.state.email
        )
      ) {
        this.setState({
          emailErrorMsg: "",
          emailError: false,
        });
      } else {
        valid = false;
        this.setState({
          emailError: true,
          emailErrorMsg: "Kindly recheck your email",
        });
      }
    } else {
      valid = false;
      this.setState({
        emailError: true,
        emailErrorMsg: "Email is required",
      });
    }
    return valid;
  };

  submit = () => {
    if (this.validate()) {
      console.log("API call");
      let data = {
        email: this.state.email,
        service: "advance",
      };
      Service.forgetPassword(data)
        .then((data) => {
          console.log(data);
          this.setState({
            open: true,
            SnackbarMessage: "Check your email for the password reset link",
            SnackbarStyle: "snackbar-info",
          });
        })
        .catch((error) => {
          console.log("error: ", error);
          this.setState({
            open: true,
            SnackbarMessage: "Something went wrong",
            SnackbarStyle: "error",
          });
        });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
      SnackbarMessage: "",
      SnackbarStyle: "",
    });
  };

  render() {
    return (
      <Container className="py-3 px-0 forget-password-page-container">
        <Card className="component-card ">
          <CardContent className="card-content">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} className="card-heading">
                <Typography
                  variant="h6"
                  component="h6"
                  className="font-weight-bold mb-2"
                >
                  <span className="text-primary">F</span>
                  <span className="text-danger">u</span>
                  <span className="text-warning">n</span>
                  <span className="text-info">d</span>
                  <span className="text-secondary">o</span>
                  <span className="text-success">o</span>
                  <span className="text-dark">Notes</span>
                </Typography>
                <Typography
                  variant="h5"
                  component="h5"
                  className="font-weight-light mb-2"
                >
                  Please provide your registered email ID to reset the password
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} className="card-data">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      type="email"
                      fullWidth
                      id="outlined-basic"
                      name="email"
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      onChange={this.handelInput}
                      error={this.state.emailError}
                      helperText={this.state.emailErrorMsg}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} className="card-footing">
                  <Grid item xs={6} className="link-wrapper">
                    <Button
                      size="medium"
                      color="primary"
                      className="mb-0 mb-sm-0 text-primary"
                      onClick={this.handleClickToLogin}
                      style={{ textTransform: "unset" }}
                    >
                      Sign in instead
                    </Button>
                  </Grid>
                  <Grid item xs={6} className="button-wrapper">
                    <Button
                      type="button"
                      variant="contained"
                      size="medium"
                      className="button-login"
                      onClick={this.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={this.state.SnackbarMessage}
          className={this.state.SnackbarStyle}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    );
  }
}
