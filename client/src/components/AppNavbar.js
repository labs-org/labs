import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
   Container
  } from 'reactstrap';
  import { Link } from "react-router-dom";

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
                  <NavbarBrand href="/">Profile</NavbarBrand>
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

 export default AppNavbar;