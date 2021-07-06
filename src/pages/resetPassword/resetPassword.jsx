//import { Redirect } from "react-router-dom";
import "./resetPasswordStyles.css";
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
import Checkbox from "@material-ui/core/Checkbox";

const Service = new UserService();

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      SnackbarMessage: "",
      SnackbarStyle: "",
      password: "",
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
      cnf_password: "",
      cnf_passwordError: false,
      cnf_passwordErrorMsg: "",
    };
  }

  handleClickToLogin = (e) => {
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
      passwordError: false,
      passwordErrorMsg: "Should be alphanumeric",
      cnf_passwordError: false,
      cnf_passwordErrorMsg: "",
    });

    let valid = true;

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
      console.log("API call");
      let data = {
        newPassword: this.state.password,
      };
      let token = this.props.match.params.token;
      Service.resetPassword(data, token)
        .then((data, token) => {
          console.log(data);
          this.setState({
            open: true,
            SnackbarMessage: "Password updated successfully",
            SnackbarStyle: "snackbar-success",
          });
          //this.props.history.push("/login");
          //<Redirect to="/login" />;
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
      <Container className="py-3 px-0 reset-password-page-container">
        <Card className="component-card">
          <CardContent className="card-content">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
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
                  Please provide new password to your FundooNotes account
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
                  <Grid item xs={12}>
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
                      component="h6"
                      className="font-weight-light text-secondary d-inline"
                    >
                      Show password
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} className="card-footing">
                  <Grid item xs={12} className="button-wrapper">
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

// export default function resetPassword() {
//   return (
//     <Container className="py-3 px-0 reset-password-page-container">
//         <Card className="component-card">
//           <CardContent className="card-content">
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="center"
//             >
//               <Grid item xs={12} className="card-heading">
//                 <Typography
//                   variant="h5"
//                   component="h5"
//                   className="font-weight-bold mb-1"
//                 >
//                   <span className="text-primary">F</span>
//                   <span className="text-danger">u</span>
//                   <span className="text-warning">n</span>
//                   <span className="text-info">d</span>
//                   <span className="text-secondary">o</span>
//                   <span className="text-success">o</span>
//                   <span className="text-dark">Notes</span>
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   component="h5"
//                   className="font-weight-light mb-2"
//                 >
//                   Please provide new password to your FundooNotes account
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Grid
//               container
//               direction="row"
//               justify="center"
//               alignItems="flex-start"
//             >
//               <Grid item xs={12} className="card-data">
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       size="small"
//                       type={this.state.showPassword ? "text" : "password"}
//                       fullWidth
//                       id="outlined-basic"
//                       name="password"
//                       label="Password"
//                       variant="outlined"
//                       margin="normal"
//                       onChange={this.handelInput}
//                       error={this.state.passwordError}
//                       helperText={this.state.passwordErrorMsg}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       size="small"
//                       type={this.state.showPassword ? "text" : "password"}
//                       id="outlined-basic"
//                       fullWidth
//                       name="cnf_password"
//                       label="Confirm password"
//                       variant="outlined"
//                       margin="normal"
//                       onChange={this.handelInput}
//                       error={this.state.cnf_passwordError}
//                       helperText={this.state.cnf_passwordErrorMsg}
//                       required
//                     />
//                   </Grid>
//                   <Grid item sx={12} className="" margin="none">
//                     <Checkbox
//                       className=""
//                       size="small"
//                       onClick={this.handleClickShowPassword}
//                     />
//                     <Typography
//                       component="h6"
//                       className="font-weight-light text-secondary d-inline"
//                     >
//                       Show password
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={3} className="card-footing">
//                   <Grid item xs={12} className="button-wrapper">
//                     <Button
//                       type="button"
//                       variant="contained"
//                       size="medium"
//                       className="button-login"
//                       onClick={this.submit}
//                     >
//                       Submit
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//         <Snackbar
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "center",
//           }}
//           open={this.state.open}
//           autoHideDuration={2000}
//           onClose={this.handleClose}
//           message={this.state.SnackbarMessage}
//           className={this.state.SnackbarStyle}
//           action={
//             <React.Fragment>
//               <IconButton
//                 size="small"
//                 aria-label="close"
//                 color="inherit"
//                 onClick={this.handleClose}
//               >
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </React.Fragment>
//           }
//         />
//       </Container>
//   )
// }
