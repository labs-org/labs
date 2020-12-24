import React from 'react';
import  { Component } from 'react';
import Login from "./components/Login"
import AppNavbar from "./components/AppNavbar";
// import ProfilePage from "./components/ProfilePage";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
// import * as ReactBootstrap from 'react-bootstrap';
import AddPost from "./components/AddPost.js";
import {HomePage} from "./components/HomePage";
import {NoMatch} from "./components/NoMatch";
import {Layout} from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from './components/Jumbotron';
import Signup from './components/Signup';

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
              <Route path="/AddPost" component={AddPost} />
              {/* <Route path="/contact" component={Contact} /> */}
              <Route path = "/login" component = { Login } />
              <Route path = "/addUser"  component = { Signup } />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

// const App = () => {
//     return (

//           // <div className = "App" >
//           //   <AppNavbar />
//           //     <Container>
//           //       <AddPost />
//           //      </Container>

//           // </div>
//           <React.Fragment>
//             <AppNavbar />
            
//             <Layout>
//               <Router>
//                  <Switch>
//                     <Route exact path ="/" component ={HomePage} />
//                     <Route exact path="/AddPost" component={AddPost} />
//                     <Route component={NoMatch} />              
//                  </Switch>
//               </Router>
//             </Layout>
//           </React.Fragment>

//     );
// };

// export default App; 