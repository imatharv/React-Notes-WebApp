import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";
import UserService from "../../services/userService";
import Archive from "../../components/archives/archives";
import Trash from "../../components/trash/trash";
import "./dashboardStyles.css";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Service = new UserService();

export default function Dashboard(props) {
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.clear();
    props.history.push("/login");
  };

  const navigateToNotes = () => {
    props.history.push("/dashboard/notes");
  };
  const navigateToArchives = () => {
    props.history.push("/dashboard/archives");
  };
  const navigateToTrash = () => {
    props.history.push("/dashboard/trash");
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
          handleNavbarDrawerToggle={handleNavbarDrawerToggle}
          navigateToNotes={navigateToNotes}
          navigateToArchives={navigateToArchives}
          navigateToTrash={navigateToTrash}
        />
        <Route exact path="/dashboard/notes" component={Notes} />
        <Route exact path="/dashboard/archives" component={Archive} />
        <Route exact path="/dashboard/trash" component={Trash} />
      </div>
    </React.Fragment>
  );
}
