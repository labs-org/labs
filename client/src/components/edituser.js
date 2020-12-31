import React, { Component } from 'react';
import axios from "axios";




export default class Edituser extends Component {
    constructor(props) {
      super(props);
  
      //Defining the "this" in the functions using .bind method
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangeLabName= this.onChangeLabName.bind(this);
      this.onChangeLocation= this.onChangeLocation.bind(this);
      this.onChangePhone= this.onChangePhone.bind(this);
    //   this.onChangeOfficialWebSite= this.onChangeOfficialWebSite.bind(this);


      this.onSubmit = this.onSubmit.bind(this);
    
      this.state = {
        email: "",
        password: "",
        labName: "",
        location:"",
        phone:"",
        // officialWebSite :"",
       
      
      }
    }


       componentDidMount() {
        axios.get('http://localhost:3000/users/'+this.props.match.params.id)

        
          .then(response => {
            console.log(response)       // when i click the button it will send the get req to the middleware  in the data base so we will send the response and setState    part1 from the schema   :part2 from the response
            this.setState({
              email: response.data.email,
              password: response.data.password,
              labName: response.data.labName,
              location: response.data.location,
              phone: response.data.phone,
            //   officialWebSite: response.data.officialWebSite
            })  
    
          })
          .catch(function (error) {
            console.log(error);
          })
        }



//Event Handlers:
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password : e.target.value
    });
  }
  
  onChangeLabName(e) {
    this.setState({
      labName: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location : e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone : e.target.value
    });
  }
    
//   onChangeOfficialWebSite(e) {
//     this.setState({
//       officialWebSite : e.target.value
//     });
//   }
  

  onSubmit(e) {
    e.preventDefault();   
    const user= {
      email: this.state.email,
      password: this.state.password,
      labName: this.state.labName,
      location: this.state.location,
      phone: this.state.phone,
    //   officialWebSite :this.state.officialWebSite,
    }

    console.log(user);



axios.post("http://localhost:3000/users/edit/"+this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/AllLabs'
  }


  render(){
    return (

      <div>
        <br />
        <div className = "container text-center">
        <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
            <h3 className = "mb-3">
            Edit user information 
            </h3>
            <br />
            <div className = "col">
            <label >  New User Email </label>
            <br></br>
            <input required='true' type='text'className="form-control col"value= {this.state.email}onChange={this.onChangeEmail} placeholder='User Email'/>                   
            <br></br>                
            </div>




            <div className = "col">
            <label > New Password </label>
            <br></br>
            <input required='true'  type="password" name="password" className="form-control col"value= {this.state.password} onChange={this.onChangePassword} placeholder='Creat Password' />
            <br></br>
            </div>
            <div className = "col">
            <label > New Lab Name </label>
            <br></br>
            <input required='true'  type="text" className="form-control col"value= {this.state.labName} onChange={this.onChangeLabName} placeholder='Creat New Lab Name' />
            <br></br>
            </div>
            <div className = "col">
            <label > New Address </label>
            <br></br>
            <input required='true'  type="text" className="form-control col"value= {this.state.location} onChange={this.onChangeLocation} placeholder='Creat New Address' />
            <br></br>
            </div>

            <div className = "col">
            <label >  New Phone Number </label>

            <input required='true'  className="form-control col"  value= {this.state.phone} onChange={this.onChangePhone} placeholder='Phone Number' />
            <br></br>
            </div>

            <div className = "col">
            <label >  New Web Site </label>
            <br></br>
            <input required='true' type='text' className="form-control col" value= {this.state.officialWebSite} onChange={this.onChangeOfficialWebSite} placeholder='New Web Site' />
            <br></br>
            </div>
            

            <input type='submit' value='Edit Account' className="btn btn-deep-orange darken-4"/>
            <br></br>
            <br></br>
          <a href='/AllLabs'> Save </a>
            <br></br>
        </form>
   
        </div>
      
        </div>
      
     
    )
}
}

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Button } from 'react-bootstrap'

// const EditFruit = ({match}) => {
//     const [fruit, setFruit] = useState({
//         name: "",
//         amount: 0,
//         info: ""
//     })

//     useEffect(() => {
//         axios.get('/api/fruits/'+match.params.id)
//         .then(response => setFruit(response.data))
//     }, [])

//     const fruitUpdate = () => {
//         axios.put('/api/fruits/'+match.params.id, fruit)
//         .then((fruit) => console.log(fruit))
//         window.location = '/fruitlist'
//     }

//     const fruitDelete = () => {
//         axios.delete('/api/fruits/'+match.params.id)
//         .then((res) => console.log(res.status))
//         window.location = '/fruitlist'
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFruit(oldFruit => {
//             return {
//                 ...oldFruit,
//                 [name]: value
//             }
//         })
//     }

//     return (
//         <div>
//             <h1>Editing {fruit.name}</h1>
//             <p><b>ID: {fruit._id}</b></p>
//             <label>Fruit Name: </label>
//             <input type="text" name="name" value={fruit.name} required 
//                 onChange={handleChange}/><br/>
//             <label>Amount: </label>
//             <input type="text" name="amount" value={fruit.amount}
//                 onChange={handleChange}/><br/>
//             <label>Info: </label>
//             <input type="text" name="info" value={fruit.info}
//                 onChange={handleChange}/><br/>
//             <Button className='btn btn-warning' onClick={fruitUpdate}>Update Fruit</Button>
//             <Button className='btn btn-danger' onClick={fruitDelete}>Delete Fruit</Button>
//         </div>
//     )
// }

// export default EditFruit