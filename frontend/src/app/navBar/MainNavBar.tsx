import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setCurrentScreen } from "./MainNavSlice";

const MainNavBar = () => {
  const dispatch = useDispatch();

  return (
    <Navbar bg="primary" expand="sm" className="navbar-dark">
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
