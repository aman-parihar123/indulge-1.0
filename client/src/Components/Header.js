import React from "react";
import { Route, Redirect } from "react-router";
import { Navbar, Nav, Container, Form, FormControl, NavDropdown } from "react-bootstrap";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ChangePassForm from './ChangePassForm'

export default function Header() {

  const [state, setState] = React.useState({
    changePass: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    console.log("log out");
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    // Toast
    window.location.replace("/");
  };


  const list = (anchor) => (
    <Box
      sx={{ anchor: 'changePass', 'width': 500, 'height': 150 }}
      role="presentation"
    >
      <ChangePassForm setState={setState} />
    </Box>
  );

  return (
    <Navbar className="p-3 sticky-top bg-light" expand="lg">
      <Container className="navbarContainer">
        <Navbar.Brand href="#home" className="navbarBrand"><strong>Career Development Center <br /></strong><span className="fw-light fs-5">IIT ISM Dhanbad</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="me-auto"></div>
          <Nav className="">
            <NavDropdown className="fs-4" title={localStorage.getItem('user_id')} id="basic-nav-dropdown">
              <NavDropdown.Item><React.Fragment key="changePass">
                <Button onClick={toggleDrawer("changePass", true)}>Change Password</Button>
                <Drawer
                  anchor="right"
                  open={state["changePass"]}
                  onClose={toggleDrawer("changePass", false)}
                >
                  {list("changePass")}
                </Drawer>
              </React.Fragment></NavDropdown.Item>
              <NavDropdown.Item>
                <Button onClick={logOut}>Log Out</Button></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
