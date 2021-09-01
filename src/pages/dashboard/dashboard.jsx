import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";
import UserService from "../../services/userService";
import Archive from "../../components/archives/archives";
import Trash from "../../components/trash/trash";
import "./dashboardStyles.css";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Profiler } from "react";

const Service = new UserService();

function Dashboard(props) {
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);
  const [searchedTerm, setSearchedTerm] = React.useState("");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const handleSearchInput = (term) => {
    setSearchedTerm(term);
  };

  const logout = () => {
    localStorage.clear();
    props.history.push("/login");
  };
  const navigateToNotes = () => {
    props.dispatch({ type: "Notes" });
    props.history.push("/dashboard/notes");
  };
  const navigateToArchives = () => {
    props.dispatch({ type: "Archives" });
    props.history.push("/dashboard/archives");
  };
  const navigateToTrash = () => {
    props.dispatch({ type: "Trash" });
    props.history.push("/dashboard/trash");
  };
  const handleNavbarDrawerToggle = () => {
    setNavbarDrawerExpand(!navbarDrawerExpand);
  };
  // function onRenderCallback(actualDuration, interactions) {
  //   // console.log("Time spent rendering the comitted update :: ", actualDuration);
  //   // console.log(
  //   //   "Set of interactions belonging to this update :: ",
  //   //   interactions
  //   // );
  // }
  return (
    <React.Fragment>
      <Navigation
        drawerExpand={handleNavbarDrawerToggle}
        email={email}
        firstName={firstName}
        lastName={lastName}
        islogout={logout}
        handleSearchInput={handleSearchInput}
      />
      <div className="content-wrapper">
        <Drawer
          open={navbarDrawerExpand}
          handleNavbarDrawerToggle={handleNavbarDrawerToggle}
          navigateToNotes={navigateToNotes}
          navigateToArchives={navigateToArchives}
          navigateToTrash={navigateToTrash}
        />
        {/* <Profiler id="Navigation" onRender={onRenderCallback}> */}
        <Route
          exact
          path="/dashboard/notes"
          component={() => <Notes searchTerm={searchedTerm} />}
        />
        <Route exact path="/dashboard/archives" component={Archive} />
        <Route exact path="/dashboard/trash" component={Trash} />
        {/* </Profiler> */}
      </div>
    </React.Fragment>
  );
}

export default connect()(Dashboard);
