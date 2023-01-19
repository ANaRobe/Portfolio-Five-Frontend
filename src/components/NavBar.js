import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {  useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
const setCurrentUser = useSetCurrentUser();

const addPost = ( 
  <NavLink to="/posts/create"><i className="far fa-plus-square"></i></NavLink>
);

const signOut = async () => {
  try {
    await axios.post("dj-rest-auth/logout/");
    setCurrentUser(null);
  } catch (error) {
    // console.log(err);
  }
};
    
  const loggedInDisplay = (
    <>
      <NavLink className={styles.NavLink} to="/feed">Feed</NavLink>
      <NavLink className={styles.NavLink} to="/liked"></NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={signOut}>Sign out</NavLink>
      <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
      <Avatar className={styles.NavLink} src={currentUser?.profile_image} /></NavLink>
    </>
  );
  const loggedOutDisplay = (
    <>
      <NavLink className={styles.NavLink} to="/signin">Sign in</NavLink>
      <NavLink className={styles.NavLink} to="/signup">Sign up</NavLink>
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
            {currentUser && addPost }
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
