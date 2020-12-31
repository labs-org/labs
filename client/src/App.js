import React from 'react';
import  { useState, useEffect } from "react";
import Header from './components/layout/Header';
import AppNavbar from "./components/AppNavbar";
import AllLabs from "./components/AllLabs";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import AddPost from "./components/AddPost.js";
import {HomePage} from "./components/HomePage";
import { About } from './components/About';
import { Contact } from './components/Contact';
import {NoMatch} from "./components/NoMatch";
import {Layout} from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from './components/Jumbotron';
import  Personalprofile from './components/Personalprofile';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Edituser from './components/edituser';
import EditPost from './components/edit';
import UserContext from "./context/userContext";
import Axios from "axios";



export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("x-auth-token");
      if (token === null) {
        localStorage.setItem("x-auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3000/users/Personalprofile", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token: token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    
      <React.Fragment>
         <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <AppNavbar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/AddPost" component={AddPost} />
              <Route path="/AllLabs" component={AllLabs} />
              <Route path = "/login" component = { Login } />
              <Route path = "/edit/:id" component = { EditPost }/>
              <Route path = "/edituser/:id" component = { Edituser}/>
              <Route path = "/personalprofile" component = {Personalprofile} />
              {/* <Route path = "/add"  component = { Signup } /> */}
              <Route path = "/register" component = {Register} />
           
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
        </UserContext.Provider>
      </React.Fragment>
    );
  }


