import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";
import FooterPage from './Footer';


const Post = (props) => (
  
  <div className="container-fluid cntr">
   
  <div className="card testimonial-card " style={{ width: "50%" , float:"right",borderRadius: '2.5rem', marginTop: "20px" }}>
    <span className="card-up indigo lighten-1"></span>
    <span className="avatar mx-auto white">
      
      <div class="row"></div>
   
  </span>
  <span className="card-body">
  
      <span className="card-title">labName: 
      <p className="fas fa-quote-left card-text">{props.user.labName}</p> </span>
      <span className="card-title">location:
      <p className="fas fa-quote-left card-text"> {props.user.location}</p></span>
      <span className="card-title">phone:
      <p className="fas fa-quote-left card-text"> {props.user.phone}</p></span>
      <span className="card-title">description: 
      <p className="fas fa-quote-left card-text">{props.user.description}</p></span>
      <Link to={'Labprofile/' + props.user.labName}>View more</Link>
      
      {/* </div> */}
  
    </span>
  </div>
  </div>
// {/* person1 */}
// <div className="card testimonial-card " style={{ width: "33%" }}>
// {/* <!-- Background color --> */}
// <div className="card-up indigo lighten-1"></div>
// {/* <!-- Avatar --> */}
// <div className="avatar mx-auto white">
//   <img
//     src={process.env.PUBLIC_URL + "./Images/person4.jpg"}
//     className="rounded-circle"
//     alt="woman avatar"
//     style={{ width: 150, height: 150 }}
//   />
// </div>
// {/* <!-- Content --> */}
// <div className="card-body">
//   {/* <!-- Name --> */}
//   <h4 className="card-title">Christopher Hunt</h4>
//   {/* <!-- Quotation --> */}
//   <p>
//     <i className="fas fa-quote-left"></i> "The biggest achievement
//     I've made is, truly, fighting for myself. Through working with
//     Aiko and taking the time to discuss various issues with her,
//     I've become a bigger advocate for myself, and I'm so proud of
//     that."
//   </p>
// </div>
// </div>

);

class AllLabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredItems: [],
      SearchString: '',
      // userpost: ''
    };
  }
  componentDidMount() {
    // const { id } = this.props.match.params;
    axios
      .get(`http://localhost:3000/users/register `)
      .then((response) => {
        this.setState({ users: response.data });
        // console.log(this.props);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  find() {
    let listedItems =
      this.state.filteredItems.length > 0
        ? this.state.filteredItems
        : this.state.users;
    return listedItems.map((user) => {
      return <Post user={user} key={user._id} />;
    });
  }
  lab() {
    let listedItems =
      this.state.filteredItems.length > 0
        ? this.state.filteredItems
        : this.state.users;
    return listedItems.map((user) => {
      return <Post user={user} key={user._id} />;
    });
  }

  onSearch = (e) => {
    let { users } = this.state;
    let string = e.target.value;
    if (string.length > 0) {
      let filteredItems = users.filter((user) =>
        user.location.includes(string)
      );
      console.log(users);
      this.setState({ SearchString: string, filteredItems: filteredItems });
    } else this.setState({ SearchString: string, filteredItems: [] });
  };

  render() {
    return (
      <div>
        <br />
        <div className="text-center " style ={{marginTop : '10px'}}>
          <h2>Search loaction</h2>
          <input
            name="search"
            className="form-control"
            onChange={(e) => this.onSearch(e)}
            value={this.state.SearchString}
            placeholder="Search for location"
          />
          <div className="container ">
            <div className="row"></div>
          </div>
        </div>
        <div>{this.lab()}</div>
     
      </div>
      
    );
  }
}
export default AllLabs;
