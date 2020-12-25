import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

// import { Router} from "react-router-dom";


const Post = (props) => (

  <tr>
    <td>{props.item.testType}</td>
    <td>{props.item.price}</td>
    <td>
      <Link
        to={"/edit/" + props.item._id}
        className="btn btn-deep-orange darken-4"
      >
        Edit
      </Link>
      <button
        type="button"
        className="btn btn-deep-orange darken-4"
        onClick={() => {
          props.deletePost(props.item._id);
        }}
      >
        Delete
      </button>
    </td>
  
 </tr>

);


class AllLabs extends Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
    
    this.state = {
      items: [],
    };
   
  }
  componentDidMount() {  
     axios.get('/fetch') 
       .then(response => { this.setState({ items: response.data })})     
        .catch((error) => {    
              console.log(error);  
                  }) 
                 }

                 deletePost(id) {
                  axios
                    .delete("http://localhost:3000/addPost/" + id)
                    .then((res) => console.log(res.data));
                  this.setState({
                    items: this.state.items.filter((el) => el._id !== id),
                  });
                }


  
 lab() {    
    return this.state.items.map(currentitem => { 
          // console.log(currentitem._id)   
        
             return <Post item={currentitem} 
             deletePost={this.deletePost}
             key={currentitem._id} />    })  }

  

  render() {
   
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
          <table className="table">
            <tbody>{this.lab()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AllLabs;
