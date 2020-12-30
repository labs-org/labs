
import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';


const Profileitems = (props) => (
  
  <tr>
    <td>{props.item.testType}</td>
    <td>{props.item.price}</td>
    <td>
      <img
        src={props.item.image}
        width="200"
        height="200"
        class="w3-round"
        alt="Norway"
      />
    </td>

    <td>
      <Link
        to={'/edit/' + props.item._id}
        className="btn btn-deep-orange darken-4"
      >
        Edit
      </Link>
      <button
        type="button"
        className="btn btn-deep-orange darken-4"
        onClick={() => {
          // console.log(props)
          props.deletePost(props.item._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class Personalprofile extends React.Component {
  constructor(props) {
    super(props);
    // this.deleteUser = this.deleteUser.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      users: [],
      Data: [],
      labName: [],
      items: []
     
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

    axios.get('http://localhost:3000/addItems')
  
       .then((res) => {
          // console.log(res.data.length);
          this.setState({ items: res.data });
        }
       )
       .catch((error) => {
           console.log(error);
       })
    // );
  }
  
 

  deletePost(id) {
    axios.delete('http://localhost:3000/addItems/' + id,
    {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token") 
      }
    }
    ).then((res) => console.log(res.data));
    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
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
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
          <b>
            Want to Post Anything?<a href="/AddPost"> Add Post </a>
          </b>
          <br></br>
          <p> user information </p>
          <table className="table">
            

            <tbody>{this.itemsList()}</tbody>
          </table>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(Personalprofile);