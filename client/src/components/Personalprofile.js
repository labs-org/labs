import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { storage } from "./firebase.js";




const Profileuser = props => (
  <tr>

      <td>{props.user.email}</td>
      <td>{props.user.password}</td>
      <td>{props.user.labName}</td>
      <td>{props.user.location}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.officialWebSite}</td>
      {/* <td>{props.user.image}</td>  */}

      {/* <td>
      <img src= {props.user.image} width="200" height="200" class="w3-round" alt="Norway"/>
      <img src={props.user.url || "http://via.placeholder.com/50 50"} alt="firebase-image" width="200" height="200" class="w3-round"   />
      </td> */}


      <td>
      <Link to ={"/edituser/"+props.user._id} className="btn btn-deep-orange darken-4" >Edit User</Link>
      <button type = "button"
      className="btn btn-deep-orange darken-4"
      onClick = {() => {props.deleteUser(props.user._id)}}> Delete User
      </button>
      </td>
  </tr>
)

const Profileitems = (props) => (
  <tr>
    <td>{props.item.testType}</td>
    <td>{props.item.price}</td>
    <td>{props.item.image}</td>
      
    {/* <td>
      <img src= {props.user.image} width="200" height="200" class="w3-round" alt="Norway"/>
      <img src={props.user.url || "http://via.placeholder.com/50 50"} alt="firebase-image" width="200" height="200" class="w3-round"   />
       </td> */}


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
    this.deleteUser = this.deleteUser.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      users: [],
      Data: [],
      labName: [],
      items: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3000/users/")
       .then( res => {
           this.setState({users : res.data})

       })
       .catch((error) => {
           console.log(error);
       });

     axios.get("/fetch")
     .then( res => {
       var newitems=[];
       for(var i =0 ; i< res.data.length;i++){
         if(res.data[i].labName === localStorage.getItem('labName')){
            newitems.push(res.data[i])
         }
       }

         this.setState({items: newitems})
        //  console.log(res.data)
     })
     .catch((error) => {
         console.log(error);
     })
    axios
      .get('/fetch')
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
   deleteUser(id) {
    axios.delete("/users" + id)
        .then(res => console.log(res.data));
    this.setState({
        users: this.state.users.filter(el => el._id !== id)
    })
  }

  deletePost(id) {
    axios.delete('/fetch' + id).then((res) => console.log(res.data));
    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
    });
  }

   usersList() {
    let listedusers = (this.state.Data.length >0)? this.state.data :this.state.users;

    return listedusers.filter(elet=> localStorage.getItem('email') === elet.email).map(currentEmail => {
      return <Profileuser user= { currentEmail } deleteUser = { this.deleteUser} key = { currentEmail._id }/>;
    })
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
        <div className="container text-center border border-light p-9">
          {/* <h2>Hello User</h2> */}
          <p> user information </p>
          <table className="table">
            <tbody>
              {this.usersList()}
              {this.itemsList()}
           
            </tbody>
         
            <tbody>{this.itemsList()}</tbody>
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
      </div>
    );
  }
}

export default withRouter(Personalprofile);
