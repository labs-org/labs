import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
   Container
  } from 'reactstrap';
  import { Link } from "react-router-dom";
//   import { About } from './About';
// import { Contact } from './Contact';

 class AppNavbar extends Component {
     state = {
             isOpen: false
         }
     toggle = () => {
         //so either it's open he will toggle, and if it's close it will toggle to open
         this.setState({
             isOpen: !this.state.isOpen
         });
     }

     render () {
         return (
         <div>
             <Navbar color ="dark" dark expand="sm" className="mb-5">
              <Container>
                  <NavbarBrand href="/">Home</NavbarBrand>
                  <NavbarBrand href="/About">About</NavbarBrand>
              <NavbarBrand href="/Contact" >Contact Us </NavbarBrand>
              <li className="navbar-item">
                <NavbarBrand href="/AllLabs">
                  All Labs
                </NavbarBrand >
              </li>
              <li className="navbar-item" onClick={logout}>
                <Link to="/logout" className="nav-link">
                  Log out
                </Link>
              </li>
                    <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar />
                          <Nav className="ml-auto" navbar>
                            <NavItem>
                    <Link to="/login" className="nav-link">
                  Login
                </Link>
                
                    </NavItem>
                    </Nav>
               </Container>
             </Navbar>
         </div>
         )
     }
 }
 function logout() {
  window.localStorage.clear();
  window.location = "/";
}


 export default AppNavbar;