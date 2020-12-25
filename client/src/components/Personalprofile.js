import React, { Component } from 'react';
import { storage } from "./firebase.js";
import axios from "axios";
import {  Link,withRouter } from "react-router-dom" ;
import Footer from './Footer';
// var imgModel = require('../../backend/models/user.model');

const Profileuser= props => (
  <tr>
    
      <td>{props.user.email}</td>
      <td>{props.user.password}</td>
      <td>{props.user.labName}</td>
      <td>{props.user.location}</td>
      <td>{props.user.phone}</td>  
      <td>{props.user.officialWebSite}</td>         
                                             {/* // i dont Know if it right  */}
      <td>
      {/* <img src= {props.user.image} width="200" height="200" class="w3-round" alt="Norway"/> */}
      {/* <img src={props.user.url || "http://via.placeholder.com/50 50"} alt="firebase-image" width="200" height="200" class="w3-round"   /> */}
      </td>
      <td>
      <Link to ={"/edituser/"+props.user._id} className="btn btn-deep-orange darken-4" >Edit User</Link>
      <button type = "button" 
      className="btn btn-deep-orange darken-4"
      onClick = {() => {props.deleteUser(props.user._id)}}> Delete User
      </button>
      </td>
  </tr>
)


const Profileitems= props => (
  <tr>
    
      <td>{props.post.testType}</td>
      <td>{props.post.price}</td>
     
       <td> 
      <Link to ={"/edit/"+props.item._id} className="btn btn-deep-orange darken-4" >Edit item</Link>
      <button type = "button" 
      className="btn btn-deep-orange darken-4"
      onClick = {() => {props.deleteItem(props.post._id)}}> Delete Post
      </button>
      </td> 
  </tr>
)




class Personalprofile extends React.Component {
    constructor(props) {
      super(props);
      this.deleteUser = this.deleteUser.bind(this);
      this.state = {
        users:[],
        Data:[],
        userName:[],
        image:null,
        url :'',
        progress:0,
        Info:[],
      items:[],
           };
    
    }
    componentDidMount() {
      axios.get("http://localhost:3000/addUser/")   
         .then( res => {
             this.setState({users : res.data})
           
         })
         .catch((error) => {
             console.log(error);
         });

         axios.get("http://localhost:3000/addItems/")   
         .then( res => {
           var newitems=[]
           for(var i =0 ; i< res.data.length;i++){
             if(res.data[i].userName === localStorage.getItem('username')){
                newitems.push(res.data[i])
             }
           }
          
             this.setState({items: newitems})
            //  console.log(res.data)
         })
         .catch((error) => {
             console.log(error);
         })
 }
 deleteUser(id) {
  axios.delete("http://localhost:3000/addUser/" + id)    /// sent this req to the middleware in the index.js server
      .then(res => console.log(res.data));
  this.setState({
      users: this.state.users.filter(el => el._id !== id)
  })
}


deleteItem(id) {
  axios.delete("http://localhost:3000/addItems/" + id)
      .then(res => console.log(res.data));
  this.setState({
      items: this.state.items.filter(el => el._id !== id)
  })
}




 usersList() {
  let listedusers = (this.state.Data.length >0)? this.state.data :this.state.users;

  return listedusers.filter(elet=> localStorage.getItem('username') === elet.username).map(currentUser => {
    return <Profileuser user= { currentUser } deleteUser = { this.deleteUser} key = { currentUser._id }/>; 
  })
} 

itemsList() {
  let listeditem = this.state.items;

  return listeditem.map(currentItem => {
    return <Profileitems item= { currentItem } deleteItem= { this.deleteItem} key = { currentItem._id }/>; 
  })
} 



// usersList() {
//   let listedusers = (this.st
//     ate.Data.length >0)? this.state.data :this.state.users;

//   return listedusers.filter(elet => localStorage.getItem('username')=== elet.username).map((ele,index) =>{
//     return <Profileuser user= { ele.username}  deleteUser = { this.deleteUser} key = { ele._id }  address = { ele.address} phone = { ele.phone }/>; 
//   })
  
// } 









    // it addes the values of the input fileds in the states
    handleChangeImage(e) {
          if (e.target.files[0]) {
              this.setState({
              image: e.target.files[0]
              })
          }
        
      }
     // it handles the upload of the picture in the firbase
      handleUpload () {
        var uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
          uploadTask.on(
            "state_changed",
            snapshot => {
              var progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              this.setState({
                progress:progress})
              },
              error => {
              console.log(error);
             },
              () => {
                storage
                .ref("images")
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url => {
                  this.setState({
                    url : url
                })
                });
                }
                );
             }
  
             render() {
                return (
                  <div>
                  <br />
                  <div className = "container text-center border border-light p-9">
                  <h2>Hello User</h2>
                   <p>  user information </p>
                <table className = "table">
                <thead className = "thead">
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Image </th>
                    </tr>
                </thead>
                <tbody>
                    {this.usersList()}
                    {/* {this.itemsList()} */}
                   
                </tbody>
                <thead className = "thead">
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Address</th>
                        
                    </tr>
                </thead>
                <tbody>
                  
                    {this.itemsList()}
                   
                </tbody>
                

               </table>

               </div>
                            <div className = "col">
                            <label>Image</label>
                           <div  id='image' > <img src={this.state.url || "http://via.placeholder.com/50 50"} 
                            alt="firebase"  /></div> 
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
                            <br />
                           
                    <Footer />
                  </div>
                    
                )
              }
            }
            
            export default withRouter(Personalprofile)

















