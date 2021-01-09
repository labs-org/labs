import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterPage from './Footer';


const Post = (props) => (
  
  <div className="container flex-direction">
 <div className="row">
  <div className="card testimonial-card " style={{ width: "50%" , float:"right",borderRadius: '2.5rem', marginTop: "20px"}}>
    <span className="card-up indigo lighten-1"></span>
    <span className="avatar mx-auto white">
      
  </span>
  <span className="card-body">
  
      <span className="card-title">
      <p className="fas fa-quote-left card-text">LabName :  {props.user.labName}</p> </span>
      <span className="card-title">
      <p className="fas fa-quote-left card-text"> Location : {props.user.location}</p></span>
      <span className="card-title">
      <p className="fas fa-quote-left card-text"> Phone :{props.user.phone}</p></span>
      <span className="card-title"> 
      <p className="fas fa-quote-left card-text"> Description : {props.user.description}</p></span>
      <br/>
      <Link className="btn btn-outline-success" to={'Labprofile/' + props.user.labName}>View more</Link>

    </span>
    </div>
  </div>
  </div>


);

class AllLabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredItems: [],
      SearchString: '',
      
    };
  }
  componentDidMount() {
   
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
      <div style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + './images/ladyLab.jpeg'
        })`,
        backgroundSize:"cover",
        marginLeft: '-400px',
        width: '100rem ',
        width: "100vw",
        height: '100vh',
        backgroundRepeat:'no-repeat',
        position: "relative"
      }}>
        <br />
        <div className="text-center " style ={{marginTop : '10px', borderRadius:'2.5rem',width:"1000px",marginLeft:"400PX"}}>
       
          <input
            name="search"
            type="text"
            className="form-control form-control-sm ml-3 w-50" 
            onChange={(e) => this.onSearch(e)}
            value={this.state.SearchString}
            placeholder="Search for Location"
          />
          <div className="container ">
            <div className="row"></div>
          </div>
        </div>
        <div>{this.lab()}</div> 
     <FooterPage/>
      </div>
      
    );
  }
}
export default AllLabs;
