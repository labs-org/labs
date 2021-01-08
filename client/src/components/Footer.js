import React from 'react';

// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
const FooterPage = () => {
  return (
  
<div className="main-footer">
<div classname = "container"  style={{background:"#171819", width: "100vw"}}>
    <div className="row">
        <div className="col-md-3 col-sm-6" style={{color:"white"}}>
            <h4>About Us</h4>
            <p style={{color:"white"}}> LABS WAS INITIALLY A CREATIVESHOP FOUNDED BY THE STUDENTS OF RBK ACADEMY
              </p>

        </div>
        <div className="col-md-3 col-sm-6" style={{color:"white"}}>
            <h4>ADDRESS</h4>
            <p style={{color:"white"}}>Al- Sha'ab St. 29, Al-Jandaweel, Amman, Jordan</p>

        </div>
        <div className="col-md-3 col-sm-6" style={{color:"white"}}>
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
                       <li><a href="mailto:labs.organization@labs.com">labs.organization@labs.com</a></li>
                      <li> <a href="tel:+962 7 985 07626">Call us at +962 7 980 7680</a></li>
           </ul>
        </div>
    </div>
    <div className="footer-bottom" style={{color:"white"}}>
        <p className="text-xs-ceter">
        &copy; {new Date().getFullYear()} LABS - All Rights Reserved
        </p>

    </div>
</div>
</div>
      
  );
};
export default FooterPage;
