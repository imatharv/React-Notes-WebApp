import Enzyme, { shallow, mount } from "enzyme";
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
//import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from "./pages/dashboard/dashboard"
import Navbar from "./components/navbar/navbar";
import Drawer from "./components/drawer/drawer"
import DisplayNotes from "./components/displayNote/displayNote"
import CreateNote from "./components/createNote/createNote"
import Notes from "./components/notes/notes"

Enzyme.configure({ adapter: new Adapter() })

describe("Testing dashboard page using enzyme..", () => {
  it("Is navbar is getting rendered in header", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Navbar).exists()).toBe(true);
  });
  it("Is drawer is getting rendered in header", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Drawer).exists()).toBe(true);
  });
  it("Is content wrapper class is getting rendered in dashboard", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(".content-wrapper").exists()).toBe(true);
  });
  it("Is create notes are getting rendered in dashboard", () => {
    const wrapper = shallow(<Notes />);
    expect(wrapper.find(".create-note-container").exists()).toBe(true);
  });
  it("Is display notes are getting rendered in dashboard", () => {
    const wrapper = shallow(<Notes />);
    expect(wrapper.find(".display-note-container").exists()).toBe(true);
  });
  // it("After clicking drawer toggle, extended drawer should be displayed", () => {
  //   const component = mount(<Dashboard />);
  //   const drawerToggleButton = component.find(".onDummyButtonClick");
  //   drawerToggleButton.simulate("click");
  //   component.update();
  //   expect(component.find(".drawer-expanded").exists()).toBe(true);
  // });
});

describe("Testing navbar component using react testing library..", () => {
  window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
  };

  it("After clicking avatar, a popper menu should not be displayed initially", () => {
    render(
      <Navbar />
    ); 
    expect(document.querySelector(".popper-menu")).not.toBeInTheDocument();
  })
  it("After clicking avatar, a popper menu should be displayed", () => {
    render(
      <Navbar />
    ); 
    let accountInfoMenuToggle = document.querySelector(".account-info-menu-toggle");
    fireEvent.click(accountInfoMenuToggle);
    expect(document.querySelector(".popper-menu")).toBeInTheDocument();
  })
  it("After clicking drawer toggle, extended drawer should be displayed", () => {
    render(
      <Dashboard />
    ); 
    let navbarDrawerToggle = document.querySelector(".navbar-drawer-toggle");
    fireEvent.click(navbarDrawerToggle);
    expect(document.querySelector(".drawer-expanded")).toBeInTheDocument();
  })
  it("After clicking note title, create note card should be expanded", () => {
    render(
      <CreateNote />
    ); 
    let navbarDrawerToggle = document.querySelector(".noteTitle");
    fireEvent.click(navbarDrawerToggle);
    expect(document.querySelector(".noteContent")).toBeInTheDocument();
  })
  it("After clicking note title, note content and icons should be displayed", () => {
    render(
      <CreateNote />
    ); 
    let navbarDrawerToggle = document.querySelector(".noteTitle");
    fireEvent.click(navbarDrawerToggle);
    expect(document.querySelector(".icons-group-create-note")).toBeInTheDocument();
  })
});
