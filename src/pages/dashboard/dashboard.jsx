import Navigation from "../../components/navbar/navbar";
import Drawer from "../../components/drawer/drawer";
import Notes from "../../components/notes/notes";

import React from "react";

export default function Dashboard() {
  const [navbarDrawerExpand, setNavbarDrawerExpand] = React.useState(false);

  const handleNavbarDrawerToggle = () => {
    // props.drawerExpand(!navbarDrawerExpand);
    // props.navbarDrawerExpand = !navbarDrawerExpand;
    setNavbarDrawerExpand(!navbarDrawerExpand);
  };

  return (
    <div>
      <Navigation drawerExpand={handleNavbarDrawerToggle} />
      <Drawer open={navbarDrawerExpand} />
      <Notes />
    </div>
  );
}
