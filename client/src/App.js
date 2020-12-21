import React from 'react';
import AppNavbar from "./components/AppNavbar";
import ProfilePage from "./components/ProfilePage";
import { Provider}  from "react-redux";
import store from "./store";
import ItemModel from "./components/ItemModel";
import {Container} from "reactstrap";

// import "./App/css";
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
    return (
        <Provider store = {store} >
          <div className = "App" >
            <AppNavbar />
              <Container>
                <ItemModel />
               </Container>
            <ProfilePage />
          </div>
        </Provider>
    );
};

export default App;