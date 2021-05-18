import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import { selectCurrentScreen, setCurrentScreen } from "./MainNavSlice";

const headers = {
  target: "Courbes de Référence",
  record: "Courbes de Cuisson",
  piece: "Poteries",
  formula: "Émaux",
  live: "Cuisson en Direct",
};

const MainNavBar = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector(selectCurrentScreen);

  return (
    <Navbar expand="md" className={`navbar-dark shadow-sm ${currentScreen}`}>
      <Navbar.Brand className="mr-4 ml-2">Four-Raspberry</Navbar.Brand>
      <div className="nav-title-container">
        <Nav.Item className="nav-title">{headers[currentScreen]}</Nav.Item>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavDropdown id="navDropDown" title="Base de données">
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("target"))}>Courbes de Référence</NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("record"))}>Courbes de Cuisson</NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("piece"))}>Poteries</NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("formula"))}>Émaux</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={() => dispatch(setCurrentScreen("live"))}>Cuisson en Direct</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
