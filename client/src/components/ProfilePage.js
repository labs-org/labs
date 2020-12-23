import React, { Component } from 'react';
import axios from "axios"

const Post = (props) => (
  <tr>
    <td>{props.item.testType}</td>
    <td>{props.item.price}</td>
  </tr>
);
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
   
  }
  componentDidMount() {  
     axios.get('/fetch') 
       .then(response => { this.setState({ items: response.data })})     
        .catch((error) => {    
              console.log(error);  
                  })  }
  
 profile() {    
    return this.state.items.map(currentitem => { 
          console.log(currentitem._id)   
             return <Post item={currentitem} />    })  }

  

  render() {
   
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
          <table className="table">
            <tbody>{this.profile()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
