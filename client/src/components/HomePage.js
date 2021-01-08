import React from 'react';
import { Link, Redirect } from 'react-router-dom';
// import Cards from "./Cards";
// import { MDBContainer, MDBFooter } from "mdbreact";
import FooterPage from './Footer';


export const HomePage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
 <div className="Container-sm">
    <div 
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + './images/ladyLab.jpeg'
        })`,
        backgroundSize:"cover",
        marginLeft: '-400px',
        width: '100rem ',
        width: "100vw",
        height: '900px',
        backgroundRepeat:'no-repeat',
        position: "relative"
      }}
    > 
      <div className="home">
        <div
          className="landing-inner"
          style={{ position: 'absolute', bottom: '150px', margin: '100px' }}
        >
          <h2
            className="large"
            style={{ color: 'black', marginTop: '50px' }}
          >
            LABS
          </h2>
          <br></br>
          <br></br>

          <h2 className="lead" style={{ color: 'black', position: "relative" }}>
            LABS WAS INITIALLY A CREATIVESHOP FOUNDED BY THE STUDENTS OF ACADEMY
            OF RBK, AND DESIGN IN JORDEN AND COLLABORATED WITH INTERNATIONAL
            COMMUNICATION AGENCIES
          </h2>
          <div className="buttons">
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ margin: '15px', marginRight:"10px"}}
            >
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
           
        <div className="footer-copyright text-center py-3">
          </div>      
          </div>
          {/* <FooterPage/> */}
        </div>
       </div> 
     </div> 
     </div>
  );
};
