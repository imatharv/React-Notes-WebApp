import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";
import React from "react";

export default function Dashboard() {
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

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
      />
      <div className="content-wrapper">
        <Drawer open={navbarDrawerExpand} />
        <Notes />
      </div>
    </React.Fragment>
  );
}
