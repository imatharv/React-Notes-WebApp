import "./login.css";
import React, { Component } from "react";
import Service from "../../services/userService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
      password: "",
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
    };
  }

  handleClickShowPassword = (e) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handelInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    this.setState({
      emailError: false,
      emailErrorMsg: "You can use letters, numbers and periods",
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
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

    return valid;
  };

  submit = () => {
    if (this.validate()) {
      console.log("api call");
      let data = {
        email: this.state.email,
        service: "advance",
        password: this.state.password,
      };
      //Service.registration(data);
    }
  };
  render() {
    return (
      <Card className="component-card">
        <CardContent className="card-content">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} className="card-heading">
              <Typography
                variant="h5"
                component="h5"
                className="font-weight-bold mb-1"
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
                Login to your FundooNotes account
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item sm={7} xs={12} className="card-data">
              <Grid container spacing={1}>
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
                <Grid item xs={12}>
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
                <Grid item sx={12} className="" margin="none">
                  <Checkbox
                    className=""
                    size="small"
                    onClick={this.handleClickShowPassword}
                  />
                  <Typography
                    component="h5"
                    className="font-weight-normal d-inline"
                  >
                    Show password
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3} className="card-footing">
                <Grid item sm={6} xs={12} className="link-wrapper">
                  <Button
                    size="medium"
                    color="primary"
                    className="mb-0 mb-sm-0 text-primary"
                    onClick=""
                    style={{ textTransform: "unset" }}
                  >
                    Sign up instead
                  </Button>
                </Grid>
                <Grid item sm={6} xs={12} className="button-wrapper ">
                  <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    className="button-login"
                    onClick={this.submit}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={5} xs={12} className="image-wrapper">
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
    );
  }
}
