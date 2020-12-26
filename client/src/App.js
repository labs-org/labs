import React from 'react';
import  { Component } from 'react';
import Login from "./components/Login"
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
import Signup from './components/Signup';
import Edituser from './components/edituser';
import EditPost from './components/edit';


class App extends Component {
  render() {
    return (
      <React.Fragment>
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
              <Route path = "/User"  component = { Signup } />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
