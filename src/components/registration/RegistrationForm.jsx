import React, { Component } from "react";
import "./registration-form.css";
import logo from "../../assets/images/register.svg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

export default class RegistrationForm extends Component {
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
