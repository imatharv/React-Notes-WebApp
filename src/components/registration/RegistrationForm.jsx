import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      fnameSuccess: false,
      fnameError: false,
      fnameErrorMsg: "",
      lname: "",
      lnameError: false,
      lnameErrorMsg: "",
      email: "",
      emailError: false,
      emailErrorMsg: "",
      passowrd: "",
      passwordError: false,
      passwordErrorMsg: "",
      cnf_passowrd: "",
      cnf_passowrdError: false,
      cnf_passowrdErrorMsg: "",
    };
  }

  handelInput = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    this.setState({
      fname: "",
      fnameSuccess: false,
      fnameError: false,
      fnameErrorMsg: "",
      lname: "",
      lnameError: false,
      lnameErrorMsg: "",
      email: "",
      emailError: false,
      emailErrorMsg: "",
      passowrd: "",
      passwordError: false,
      passwordErrorMsg: "",
      cnf_passowrd: "",
      cnf_passowrdError: false,
      cnf_passowrdErrorMsg: "",
    });

    let valid = true;

    if (this.state.fname.length != 0) {
      if (/^[A-Z]{1}[a-z]{2,}/.test(this.state.fname)) {
        console.log();
        this.setState({
          //fname: this.state.fname,
          fnameSuccess: true,
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
      // if (this.state.fname.length === 0)
      this.setState({
        fnameError: true,
        fnameErrorMsg: "First name is required",
      });
    }

    return valid;
  };

  submit = () => {
    this.validate();
  };

  render() {
    return (
      <Card className="shadow p-2 p-sm-3 my-5">
        <CardContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} className="p-2 p-sm-3">
              <Typography
                variant="h5"
                component="h5"
                className="font-weight-bolder text-primary"
                color="textPrimary"
              >
                Notes
              </Typography>
              <Typography
                variant="h5"
                component="h5"
                className="font-weight-light"
              >
                Create your Notes account
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={7} xs={12} className="p-2 p-sm-3">
              <Grid container spacing={2}>
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
                    error={this.state.emailError}
                    helperText={this.state.emailErrorMsg}
                    required
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size="small"
                    type="password"
                    fullWidth
                    id="outlined-basic"
                    name="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    error={this.state.passwordError}
                    helperText={this.state.passwordErrorMsg}
                    required
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    size="small"
                    type="password"
                    id="outlined-basic"
                    fullWidth
                    name="cnf_password"
                    label="Confirm password"
                    variant="outlined"
                    margin="normal"
                    error={this.state.passwordError}
                    helperText={this.state.passwordErrorMsg}
                    required
                  />
                </Grid>
                <Grid item sx={12} className="" margin="none">
                  <Checkbox
                    className="mb-1"
                    size="small"
                    inputProps={{ label: "Show password" }}
                    label="Show password"
                  />
                  <Typography
                    component="h5"
                    className="font-weight-normal d-inline"
                  >
                    Show password
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={5} xs={12} className="p-2 p-sm-3">
              <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item sm={11} xs={6}>
                  <img
                    src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
                    alt="svg"
                    className=""
                  />
                  <Typography className="font-weight-light text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat, alias.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="text-center text-sm-left"
          >
            <Grid item xs={12} className="p-2 p-sm-4 ">
              <Button
                type="button"
                variant="contained"
                className="bg-primary text-white shadow px-5 py-2 mb-3 mb-sm-0"
                onClick={this.submit}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }
}
