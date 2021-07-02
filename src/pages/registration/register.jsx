import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import UserService from "../../services/userService";
import "./registerStyles.css";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

const Service = new UserService();

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      SnackbarMessage: "",
      SnackbarStyle: "",
      fname: "",
      fnameSuccess: false,
      fnameError: false,
      fnameErrorMsg: "",
      lname: "",
      lnameError: false,
      lnameErrorMsg: "",
      email: "",
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
      password: "",
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
      cnf_password: "",
      cnf_passwordError: false,
      cnf_passwordErrorMsg: "",
    };
  }

  handleClickToLogin = (e) => {
    console.log("asd");
    this.props.history.push("/login");
    //<Redirect to="/login" />;
  };

  handleClickShowPassword = (e) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handelInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    this.setState({
      fnameSuccess: false,
      fnameError: false,
      fnameErrorMsg: "",
      lnameError: false,
      lnameErrorMsg: "",
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
      cnf_passwordError: false,
      cnf_passwordErrorMsg: "",
    });

    let valid = true;

    // validating first name
    if (this.state.fname.length != 0) {
      if (/^[A-Za-z]{1}[a-z]{2,}/.test(this.state.fname)) {
        this.setState({
          fnameErrorMsg: "",
          fnameError: false,
        });
      } else {
        valid = false;
        this.setState({
          fnameError: true,
          fnameErrorMsg: "Only alphabates are allowed",
        });
      }
    } else {
      valid = false;
      this.setState({
        fnameError: true,
        fnameErrorMsg: "First name is required",
      });
    }

    // validating last name
    if (this.state.lname.length != 0) {
      if (/^[A-Za-z]{1}[a-z]{2,}/.test(this.state.lname)) {
        this.setState({
          lnameErrorMsg: "",
          lnameError: false,
        });
      } else {
        valid = false;
        this.setState({
          lnameError: true,
          lnameErrorMsg: "Only alphabates are allowed",
        });
      }
    } else {
      valid = false;
      this.setState({
        lnameError: true,
        lnameErrorMsg: "Last name is required",
      });
    }

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

    //validating password
    if (this.state.password.length != 0) {
      if (
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
          this.state.password
        )
      ) {
        this.setState({
          passwordError: false,
          passwordErrorMsg: "",
        });
      } else {
        valid = false;
        this.setState({
          passwordError: true,
          passwordErrorMsg:
            "Password should be alphanumeric (min 8 charectors, atleast one alphabate, one number & one special charector)",
        });
      }
    } else {
      valid = false;
      this.setState({
        passwordError: true,
        passwordErrorMsg: "Password is required",
      });
    }

    // Valildating confirm password
    if (this.state.cnf_password.length != 0) {
      if (this.state.password === this.state.cnf_password) {
        this.setState({
          cnf_passwordErrorMsg: "",
          cnf_passwordError: false,
        });
      } else {
        valid = false;
        this.setState({
          cnf_passwordError: true,
          cnf_passwordErrorMsg: "Should match with password",
        });
      }
    } else {
      valid = false;
      this.setState({
        cnf_passwordError: true,
        cnf_passwordErrorMsg: "Confirm password is required",
      });
    }

    return valid;
  };

  submit = () => {
    if (this.validate()) {
      let data = {
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        service: "advance",
        password: this.state.password,
      };
      Service.registration(data)
        .then((data) => {
          console.log(data);
          this.setState({
            open: true,
            SnackbarMessage: "Signup successful",
            SnackbarStyle: "snackbar-success",
          });
        })
        .catch((error) => {
          console.log("error: ", error);
          this.setState({
            open: true,
            SnackbarMessage: "Something went wrong",
            SnackbarStyle: "snackbar-error",
          });
        });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
      SnackbarMessage: "",
      SnackbarStyle: "error",
    });
  };

  render() {
    return (
      <Container className="py-3 px-0 signup-page-container ">
        <Card className="shadow p-2 p-sm-3 component-card">
          <CardContent className="p-1 p-sm-3">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} className="p-2 p-sm-3">
                <Typography
                  variant="h5"
                  component="h5"
                  className="font-weight-bolder mb-1"
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
                  Create your FundooNotes account
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item sm={7} xs={12} className="p-2 p-sm-3">
                <Grid container spacing={1}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      type="text"
                      fullWidth
                      id="outlined-basic"
                      name="fname"
                      label="First name"
                      variant="outlined"
                      margin="normal"
                      onChange={this.handelInput}
                      error={this.state.fnameError}
                      helperText={this.state.fnameErrorMsg}
                      required
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      type="text"
                      fullWidth
                      id="outlined-basic"
                      name="lname"
                      label="Last name"
                      variant="outlined"
                      margin="normal"
                      onChange={this.handelInput}
                      error={this.state.lnameError}
                      helperText={this.state.lnameErrorMsg}
                      required
                    />
                  </Grid>
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
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      type={this.state.showPassword ? "text" : "password"}
                      fullWidth
                      id="outlined-basic"
                      name="password"
                      label="Password"
                      variant="outlined"
                      margin="normal"
                      onChange={this.handelInput}
                      error={this.state.passwordError}
                      helperText={this.state.passwordErrorMsg}
                      required
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      size="small"
                      type={this.state.showPassword ? "text" : "password"}
                      id="outlined-basic"
                      fullWidth
                      name="cnf_password"
                      label="Confirm password"
                      variant="outlined"
                      margin="normal"
                      onChange={this.handelInput}
                      error={this.state.cnf_passwordError}
                      helperText={this.state.cnf_passwordErrorMsg}
                      required
                    />
                  </Grid>
                  <Grid item sx={12} className="" margin="none">
                    <Checkbox
                      className=""
                      size="small"
                      onClick={this.handleClickShowPassword}
                    />
                    <Typography
                      component="h5"
                      className="font-weight-light d-inline"
                    >
                      Show password
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} className="mt-5">
                  <Grid item xs={6} className="text-left">
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
                  <Grid item xs={6} className="text-right">
                    <Button
                      type="button"
                      variant="contained"
                      size="medium"
                      className="bg-primary text-white shadow mb-3 mb-sm-0 px-4"
                      onClick={this.submit}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sm={5}
                xs={12}
                className="p-2 px-sm-3 pb-sm-3 image-container"
              >
                <Grid container direction="row" justify="center">
                  <img
                    src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                    alt="svg"
                    className="image-auto"
                  />
                  <Typography className="font-weight-light text-center w-75">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat, alias.
                  </Typography>
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
