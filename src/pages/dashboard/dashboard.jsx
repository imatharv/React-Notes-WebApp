import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";
import "./dashboardStyles.css";
import React from "react";
import { Redirect } from "react-router-dom";
import UserService from "../../services/userService";

const Service = new UserService();

export default function Dashboard(props) {
  const [onDashboard, setOnDashboard] = React.useState(true);
  const [onArchives, setOnArchives] = React.useState(false);
  const [onTrash, setOnTrash] = React.useState(false);
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.clear();
    props.history.push("/login");
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
        <Drawer
          open={navbarDrawerExpand}
          //handleDrawerLinkClick={handleDrawerLinkClick}
        />
        <Notes />
      </div>
    </React.Fragment>
  );
}
