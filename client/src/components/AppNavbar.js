import React, { Component } from 'react';

import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap';
// import { Link } from 'react-router-dom';

var value = false;
if (window.localStorage.labName) {
  value = true;
} else {
  value = false;
}




class AppNavbar extends Component {

  render() {
    return (
      <div>
        {value === true ? (
          <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href="/">Home</NavbarBrand>
              <li className="navbar-item" onClick={logout}>
                <NavbarBrand href="/">Log out</NavbarBrand>
                <NavbarBrand href="/Personalprofile">Profile</NavbarBrand>
                {/* <NavbarBrand href="/fetch">All Posts</NavbarBrand> */}
              </li>
            
              <Nav className="ml-auto" navbar></Nav>
            </Container>
          </Navbar>
        
        ) : (
           <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href="/">Home</NavbarBrand>
              <NavbarBrand href="/About">About</NavbarBrand>
              <NavbarBrand href="/Contact" >Contact Us </NavbarBrand>
            
                <NavbarBrand href="/AllLabs"> All Labs </NavbarBrand >
              
                <NavbarBrand href="/login" > Login</NavbarBrand>
              <Nav className="ml-auto" navbar></Nav>
            </Container>
          </Navbar>
        )}
      </div>
    );
  }
}
function logout() {
  window.localStorage.clear();
  window.location = '/';
}

export default AppNavbar;
