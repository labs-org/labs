
import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
// import { timers } from 'jquery';


const Profileuser = (props) => (
  
  <div  >
    <div className="row">
    <div className="col-sm">{props.user.labName}</div>
    <div className="col-sm">{props.user.location}</div>
    <div className="col-sm">{props.user.phone}</div>
  </div>
  </div>
);


const Profileitems= props => (
  <div className="container">
    <div className="row">
  <div className="card" 
  style={{ margin: '0 auto', width: '22rem', borderRadius: '2.5rem', }}>
   
    <div className="card-body">
    <div>
      <img class="card-img-top"

        src={props.item.image}
        width="150"
        height="100"
        className="rounded-circle z-depth-2" 
        alt="100x100"
        data-holder-rendered={true}
      />
    </div>
     <div className="card-title" >LAB Name:
     <p className="card-text"> {props.item.labName}</p></div>
     <div className="card-title" >Location:
     <p className="card-text"> {props.item.location}</p></div>
     <div className="card-title" >Phone:
     <p className="card-text"> {props.item.phone}</p></div>
     <div className="card-title" >Test Type:
     <p className="card-text"> {props.item.testType}</p></div>
     <div className="card-title" >Price:
     <p className="card-text"> {props.item.price}</p></div>
     {/* <div className="col-sm">Location: {props.item.location}</div>
     <div className="col-sm">Phone: {props.item.phone}</div>
      <div className="col-sm">Test Type: {props.item.testType}</div>
      <div className="col-sm">Price: {props.item.price}</div> */}
  
      </div>
      <div className="card-body" style={{display:"inline"}}>
      <div>
      <Link to ={'/edit/' + props.item._id}  className="btn btn-primary btn-sm float-left" > Edit </Link>
      </div>
      
      <div style={{display:"inline"}}>
      <button type = "button" 
      className="btn btn-danger btn-sm float-right"
   
    
      onClick = {() => { props.deletePost(props.item._id)}}> Delete
      </button>
      </div>
      </div>
  </div>
  </div>
  </div>
)
var newitems=[];

class Personalprofile extends React.Component {
  constructor(props) {
    super(props);
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

    axios.get('http://localhost:3000/addItems',  {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token") ,
        'labName': localStorage.getItem("labName") 
      }
    })
       .then((res) => {
      
        // console.log(res.data,"res.data")
        for(var i =0 ; i< res.data.length;i++){
          console.log(res.data[i].labName)
          if(res.data[i].labName === localStorage.getItem('labName')){
            newitems.push(res.data[i])
            console.log(res.data[i])           
          }        
        }
          // console.log(newitems, "newitems");
          this.setState({items:newitems});
        }
       )
       .catch((error) => {
           console.log(error);
       })

  }
  
  deletePost(id) {
    axios.delete('http://localhost:3000/addItems/' + id,
    {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token") ,
        'labName': localStorage.getItem("labName") 
      }
    }
    ).then((res) => console.log(res.data));
    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
    });
  }


  usersList() {
    let listedusers = (this.state.Data.length >0)? this.state.data :this.state.users;  
    return listedusers.filter(elet=> localStorage.getItem('labName') === elet.labName).map(currentUser => {
      return <Profileuser user= { currentUser } key = { currentUser._id }/>; 
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
 


  render() {

    return (
      
      <div  className="container text-center border border-light p-9">


                      <p> user information </p>  
                
                      <b>
            Want to Post Anything?<a href="/AddPost"> Add Post </a>
          </b>
              <div className = "container ">
                   <div className = "row">
                    {/* <tr>
                        <th>LAB Name</th>
                         <th>Location</th>
                         <th>Phone</th>
                         <th>TEST TYPE</th>
                         <th>PRICE</th>
                          <th>IMAGE</th>
      
                    </tr> */}
                </div>
            <div>{this.itemsList()}</div>
           
          </div>
         
        </div>
        
      // </div>
    );
  }
}

export default withRouter(Personalprofile);