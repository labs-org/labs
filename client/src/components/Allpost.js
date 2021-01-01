import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';




const Profileuser= (props) => (
  <tr>
    
      <td>{props.post.testType}</td>
      <td>{props.post.price}</td>
      <td>
      <img
        src={props.post.image}
        width="200"
        height="200"
        class="w3-round"
        alt="Norway"
      />
    </td>
       <td> 
      <Link to ={'/edit/' + props.post._id} className="btn btn-deep-orange darken-4" >Edit item</Link>
      <button type = "button" 
      className="btn btn-deep-orange darken-4"
      onClick = {() => { props.deletePost(props.post._id)}}> Delete Item
      </button>
      </td> 
  </tr>
)


class AllPost extends React.Component {
  constructor(props) {
    super(props);
    // this.deleteUser = this.deleteUser.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      users: [],
      Data: [],
      labName: [],
      posts: []
     
    };
  }
 
  componentDidMount() {
    
    // axios
    //   .get('http://localhost:3000/addItems/fetch')
    //   .then((res) => {
    //     this.setState({ users: res.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios.get('http://localhost:3000/addItems',  {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token") ,
        'labName': localStorage.getItem("labName") 
      }
    })
       .then((res) => {
        var newposts=[]
        for(var i =0 ; i< res.data.length;i++){
          if(res.data[i].labName === localStorage.getItem('labName')){
             newposts.push(res.data[i])
             console.log(res.data)
          }
        }
          // console.log(res.data.length);
          this.setState({ posts: newposts });
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
        'x-auth-token': localStorage.getItem("x-auth-token") ,
        'labName': localStorage.getItem("labName") 
      }
    }
    ).then((res) => console.log(res.data));
    this.setState({
      posts: this.state.posts.filter((el) => el._id !== id),
    });
  }




//   deleteUser(id) {
//     axios.delete('http://localhost:3000/users/Personalprofile' + id,
//     {
//       headers: {
//         'x-auth-token': localStorage.getItem("x-auth-token"),
//         'labName': localStorage.getItem("labName") 
//       }
//     }
//     ).then((res) => console.log(res.data));
//     this.setState({
//       users: this.state.users.filter((el) => el._id !== id),
//     });
//   }

  usersList() {
    let listedusers = (this.state.Data.length >0)? this.state.data :this.state.posts;
  
    return listedusers.filter(elet=> localStorage.getItem('labName') === elet.labName).map(currentpost => {
      return <Profileuser post= { currentpost } deletePost = { this.deletePost} key = { currentpost._id }/>; 
    })
  }


//   itemsList() {
//     return this.state.items.map((currentitem) => {
//       // console.log(currentitem._id)

//       return (
//         <Profileitems
//           item={currentitem}
//           deletePost={this.deletePost}
//           key={currentitem._id}
//         />
//       );
//     });
//   }


  render() {
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
          {/* <b>
            Want to Post Anything?<a href="/AddPost"> Add Post </a>
          </b> */}
          <br></br>
                      <p> post information </p>  
                        
         
          <table className="table">
            
           <tbody>{this.usersList()}</tbody>
            {/* <tbody>{this.itemsList()}</tbody> */}
          </table>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(AllPost);