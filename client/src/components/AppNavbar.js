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
            <Link to="/Personalprofile" className="navbar-brand" style={{marginRight: "50px", marginLeft:"100px"}}>Profile</Link>             
            <Link to="/AllLabs" className="navbar-brand" style={{marginRight: "1500px"}}> All Labs </Link >
              <span className="navbar-item " onClick={logout}>
                 <Link to="/" className="navbar-brand pull-right">Log out</Link>
              </span>           
              <Nav className="ml-auto" navbar></Nav>
          </nav>   
        ) : (
           <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <Link to="/" className="navbar-brand" style={{marginRight: "50px", marginLeft:"-80px"}}>Home</Link>
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
