import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {  useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();
    
  const loggedInDisplay = <>{currentUser?.username}</>
  const loggedOutDisplay = (
    <>
      <NavLink className={styles.NavLink}to="/signin">Sign in</NavLink>
      <NavLink to="/signup" className={styles.NavLink}>Sign up</NavLink>
    </>
  );

  return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
          <Container>
            <NavLink to="/">
              <Navbar.Brand>
                <img src={Logo} alt="logo" height="40" />
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto text-left">
                <NavLink exact className={styles.NavLink} to="/">Home</NavLink>
                {currentUser ? loggedInDisplay : loggedOutDisplay}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
};
export default NavBar;
