import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
} from 'reactstrap';


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
          <nav color="dark" dark expand="sm" className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/* <Container> */}
            <Link to="/Personalprofile" className="navbar-brand" style={{marginRight: "50px"}}>Profile</Link>             
            <Link to="/AllLabs" className="navbar-brand" style={{marginRight: "500px"}}> All Labs </Link >
              <li className="navbar-item" onClick={logout}>
                
                <Link to="/" className="navbar-brand">Log out</Link>
              
                    
               
              </li>           
              <Nav className="ml-auto" navbar></Nav>
            {/* </Container> */}
          </nav>   
        ) : (
           <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <Link to="/" className="navbar-brand" style={{marginRight: "50px"}}>Home</Link>
              {/* <Link to="/About" className="navbar-brand" style={{marginRight: "50px", marginLeft: '50px'}}>About</Link> */}
              
              {/* <Link to="/Contact" className="navbar-brand" style={{marginRight: "50px"}}>Contact Us </Link> */}
            
                <Link to="/AllLabs" className="navbar-brand" style={{marginRight: "50px"}}> All Labs </Link >          
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
