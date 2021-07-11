import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";
import "./dashboardStyles.css";
import React from "react";
import {Redirect} from "react-router-dom";
import UserService from "../../services/userService";

const Service = new UserService();

export default function Dashboard() {
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const logout = () => {
      console.log("API call");
      const token = localStorage.getItem("token"); 
      Service.logout(token)
        .then((data) => {
          localStorage.clear();
          console.log("Successfully logged out.");
          <Redirect to="/login" />
          //this.props.history.push("/dashboard");
        })
        .catch((error) => {
          console.log("Logout error: ", error);
        });
  };

  const handleNavbarDrawerToggle = () => {
    setNavbarDrawerExpand(!navbarDrawerExpand);
  };

  return (
    <React.Fragment>
      <Navigation
        drawerExpand={handleNavbarDrawerToggle}
        email={email}
        firstName={firstName}
        lastName={lastName}
        islogout={logout}
      />
      <div className="content-wrapper">
        <Drawer open={navbarDrawerExpand} />
        <Notes />
      </div>
    </React.Fragment>
  );
}
