import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

const Profileuser = (props) => (
  <div>
    <div className="row">
      <div className="col-sm">{props.user.labName}</div>
      <div className="col-sm">{props.user.location}</div>
      <div className="col-sm">{props.user.phone}</div>
    </div>
  </div>
);

const Profileitems = (props) => (
  <div
    style={{
     
      backgroundColor: '#212326',
     
      marginLeft: '-420px',
      marginTop: '-75px',
      marginRight: '-420px',
     
    }}
  >
   
    <span className="container" style={{ marginTop: '20px' }}>
      <div className="row" style={{ display: 'flex' }}>
        <span
          className="card testimonial-card"
          style={{
            width: '22rem',
            borderRadius: '2.5rem',
            marginTop: '100px',
            marginLeft: '800px',
          }}
        >
          <div className="card-up indigo lighten-1"></div>
          <span className="avatar mx-auto white"></span>
          <div className="card-body">
            <div>
              <img
                className="card-img-top rounded-circle z-depth-2"
                src={props.item.image}
                width="150"
                height="100"
                alt="100x100"
                data-holder-rendered={true}
              />
            </div>
            <p className="card-text"> LAB Name: {props.item.labName}</p>
            <p className="card-text"> Location: {props.item.location}</p>
            <p className="card-text"> Phone: {props.item.phone}</p>
            <p className="card-text"> Test Type: {props.item.testType}</p>
            <p className="card-text"> Price: {props.item.price}</p>
          </div>
          <div className="card-body" style={{ display: 'inline' }}>
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              <Link
                to={'/edit/' + props.item._id}
                className="btn btn-primary btn-sm "
                style={{ marginRight: '10px', width: '200px' }}
              >
                {' '}
                Edit{' '}
              </Link>

              <button
                type="button"
                className="btn btn-danger btn-sm "
                style={{ width: '200px' }}
                onClick={() => {
                  props.deletePost(props.item._id);
                }}
              >
                {' '}
                Delete
              </button>
            </div>
          </div>
        </span>
      </div>
    </span>
  </div>
  
);
var newitems = [];

class Personalprofile extends React.Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      users: [],
      Data: [],
      labName: [],
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/users/register')
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('http://localhost:3000/addItems', {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token'),
          labName: localStorage.getItem('labName'),
        },
      })
      .then((res) => {
        // console.log(res.data,"res.data")
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].labName);
          if (res.data[i].labName === localStorage.getItem('labName')) {
            newitems.push(res.data[i]);
            console.log(res.data[i]);
          }
        }
        // console.log(newitems, "newitems");
        this.setState({ items: newitems });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletePost(id) {
    axios
      .delete('http://localhost:3000/addItems/' + id, {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token'),
          labName: localStorage.getItem('labName'),
        },
      })
      .then((res) => console.log(res.data));
    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
    });
  }

  usersList() {
    let listedusers =
      this.state.Data.length > 0 ? this.state.data : this.state.users;
    return listedusers
      .filter((elet) => localStorage.getItem('labName') === elet.labName)
      .map((currentUser) => {
        return <Profileuser user={currentUser} key={currentUser._id} />;
      });
  }

  itemsList() {
    return this.state.items.map((currentitem) => {
      // console.log(currentitem._id)
      return (
        <Profileitems
          item={currentitem}
          deletePost={this.deletePost}
          key={currentitem._id}
        />
      );
    });
  }

  render() {
    if (localStorage.getItem('x-auth-token') !== null) {
      return (
        <div className="container text-center border border-light p-9">
          <p style={{ color: '#fff' }}> user information </p>

          <b style={{ color: '#fff' }}>
            Want to Post Anything?<a href="/AddPost"> Add Post </a>
          </b>
          
          <div>{this.itemsList()}</div>
        </div>
        
      );
    } else {
      return <h1>Please Log in </h1>;
    }
  }
}

export default withRouter(Personalprofile);
