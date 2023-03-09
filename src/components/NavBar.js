import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";
import logo from "../assets/Logo.png";
import styles from "../styles/NavBar.module.css";
import {NavLink} from "react-router-dom";
import {useCurrentUser, useSetCurrentUser} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import {removeTokenTimestamp} from '../utils/utils';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const addPost = (
        <>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>New Post</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    activeClassName={
                        styles.Active
                    }
                    to="/posts/create">
                    <i className="far fa-plus-square"></i>
                </NavLink>
            </OverlayTrigger>
        </>

    );

    const addWorkshop = (
        <>

            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>New Workshop</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    activeClassName={
                        styles.Active
                    }
                    to="/workshops/create">
                    <i className="fa-regular fa-calendar-plus"/>
                </NavLink>
            </OverlayTrigger>
        </>

    );

    /* 
    Handle Sign out
  */
    const signOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (error) {}
    };

    const loggedInDisplay = (
        <>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Feed</Tooltip>
            }>
                <NavLink to="/feed" className={
                        styles.NavLink
                    }
                    activeClassName={
                        styles.Active
                }>
                    <i className="fa-solid fa-rss fa-fw"></i>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Liked</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    to="/liked"><i className="fas fa-heart"/></NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Sign Out</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    to="/"
                    onClick={signOut}
                    role="link"
                    aria-label="Sign out">
                    <i className="fas fa-sign-out-alt"></i>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Contact Us</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    to="/contact/">
                    <i className="fa-solid fa-envelope"></i>
                </NavLink>
            </OverlayTrigger>
            <NavLink className={
                    styles.NavLink
                }
                role="link"
                aria-label="Profile"
                to={
                    `/profiles/${
                        currentUser?.profile_id
                    }`
            }>
                <Avatar className={
                        styles.NavLink
                    }
                    src={
                        currentUser?.profile_image
                    }/></NavLink>
        </>
    );
    const loggedOutDisplay = (
        <>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Sign In</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    role="link"
                    aria-label="Sign in"
                    to="/signin">
                    <i className="fa-solid fa-right-to-bracket"></i>
                </NavLink>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom"
                overlay={
                    <Tooltip>Sign Up</Tooltip>
            }>
                <NavLink className={
                        styles.NavLink
                    }
                    role="link"
                    aria-label="Sign up"
                    to="/signup">
                    <i className="fa-solid fa-user-plus"></i>
                </NavLink>
            </OverlayTrigger>
        </>
    );

    return (
        <Navbar className={
                styles.NavBar
            }
            expand="md"
            fixed="top"
            expanded={expanded}>
            <Container>
                <NavLink exact
                    className={
                        styles.NavLink
                    }
                    activeClassName={
                        styles.Active
                    }
                    to="/">
                    <Navbar.Brand>
                        <img src={logo}
                            alt="Logo"
                            height="30"/>
                    </Navbar.Brand>
                </NavLink>
                {
                currentUser && addPost
            }
                {
                currentUser && addWorkshop
            }
                <Navbar.Toggle aria-controls="basic-navbar-nav"
                    onClick={
                        () => setExpanded(!expanded)
                    }
                    ref={ref}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <OverlayTrigger placement="bottom"
                            overlay={
                                <Tooltip>Home</Tooltip>
                        }>
                            <NavLink exact
                                className={
                                    styles.NavLink
                                }
                                to="/">
                                <i className="fa-solid fa-house"></i>
                            </NavLink>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom"
                            overlay={
                                <Tooltip>Workshops</Tooltip>
                        }>
                            <NavLink exact
                                className={
                                    styles.NavLink
                                }
                                to="/workshops">
                                <i className="fa-solid fa-screwdriver-wrench"></i>
                            </NavLink>
                        </OverlayTrigger>
                        {
                        currentUser ? loggedInDisplay : loggedOutDisplay
                    } </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavBar;
