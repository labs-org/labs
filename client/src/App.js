import React from 'react';
import AppNavbar from "./components/AppNavbar";
// import ProfilePage from "./components/ProfilePage";


import AddPost from "./components/AddPost";
import {Container} from "reactstrap";

// import "./App/css";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
    return (
       
          <div className = "App" >
            <AppNavbar />
              <Container>
                <AddPost />
               </Container>
           
          </div>
    
    );
};

export default App;