import React, { Component } from 'react';
import axios from "axios";
// import Search from "./search";
// import { Router} from "react-router-dom";


const Post = (props) => (

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
  
  
 </tr>

);


class AllLabs extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      items: [],
      // searchTrim:''
    };
   
  }
  componentDidMount() {  
     axios.get('/addItems/') 
       .then(response => { this.setState({ items: response.data })})     
        .catch((error) => {    
              console.log(error);  
                  }) 
                 }
  
 lab() {    
    return this.state.items.map(currentitem => {     
             return <Post item={currentitem} 
             deletePost={this.deletePost}
             key={currentitem._id} />    })  }

  

  render() {
   
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
        {/* <h2>Search loaction</h2>
          <input
            name="search"
            className="form-control"
            onChange={(e) => this.onSearch(e)}
            value={this.state.SearchString}
            placeholder="Search for Lab Name"
          /> */}
          <table className="table">
           
            <tbody>{this.lab()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AllLabs;
