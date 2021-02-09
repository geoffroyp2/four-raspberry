import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import { selectCurrentScreen, setCurrentScreen } from "./MainNavSlice";

const MainNavBar = () => {
  const dispatch = useDispatch();
  const currentScreen = useSelector(selectCurrentScreen);

  return (
    <Navbar expand="sm" className={`navbar-dark ${currentScreen}`}>
      <Navbar.Brand className="mr-4 ml-2">Four</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => dispatch(setCurrentScreen("live"))}>Cuisson en Direct</Nav.Link>
          <NavDropdown id="navDropDown" title="Base de données">
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("target"))}>
              Courbes de Référence
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("record"))}>Courbes de Cuisson</NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("piece"))}>Poteries</NavDropdown.Item>
            <NavDropdown.Item onClick={() => dispatch(setCurrentScreen("formula"))}>
              Formules Chimiques
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
