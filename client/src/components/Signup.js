import React, { Component } from 'react';
import axios from 'axios';
import {Button} from "reactstrap";


//creat a class for the sign up component 
export default class Signup extends Component {
    constructor(props) {
        super(props);
            
        //bind functions, you can use this.function without the need to bind it everytime
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeLabName = this.onChangeLabName.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeOfficalWebSite = this.onChangeOfficalWebSite.bind(this);
        
     
      
        this.onSubmit = this.onSubmit.bind(this);
      //the keys are the same as the Schema .. see the modle userSchema in user.model.js
     
        this.state = {
            email: '',
            password:'',
            labName:'',
            location:'',
            phone:'',
            officialWebsite:'',    
          }

        }
        //onChance function to track the changes and help to set (change) the state .
          onChangeEmail(e) {
            this.setState({
            email : e.target.value 

            })
          }
          onChangePassword(e) {          
            this.setState({
            password : e.target.value
            })
          }
          onChangeLabName(e) {
            
            this.setState({
            labName : e.target.value
            })
          }
          onChangeLocation(e) {           
            this.setState({
            location: e.target.value
            })
          }
          onChangePhone(e) {            
            this.setState({
                phone : e.target.value
            })
          }
          onChangeOfficalWebSite(e) {            
            this.setState({
              officalWebSite : e.target.value
            })
          }
   


          onSubmit(e) {
            e.preventDefault();
        //where we set the state and send it in the post request
            const user = {
              email : this.state.email,
              password: this.state.password,
              labName : this.state.labName,
              location : this.state.location,
              phone: this.state.phone,
              officialWebsite: this.state.officalWebSite,
            }
           
            axios.post("http://localhost:3000/User", user)
            .then(res => {
             window.location = '/login'

            })  
           .catch(err => alert('Email or phone number is used') );
            console.log('user added')   
        }
        
        
    render(){
        return (

          <div>
            <br />
            <div className = "container text-center">
            <form className="text-center border border-light p-9" onSubmit={this.onSubmit}>
                <h3 className = "mb-3">
                Sign Up
                </h3>
                <br />
                <div className = "col">
                <label > Email </label>
                <br></br>
                <input required='true' type='text'className="form-control col"value= {this.setState.email}onChange={this.onChangeEmail} placeholder='Email'/>                   
                <br></br>                
                </div>
                <div className = "col">
                <label > Creat Password </label>
                <br></br>
                <input required='true'  type="password" name="password" className="form-control col"value= {this.setState.password} onChange={this.onChangePassword} placeholder='Creat Password' />
                <br></br>
                </div>
                <div className = "col">
                <label > Lab Name </label>

                <input required='true'  className="form-control col"  value= {this.setState.labName} onChange={this.onChangeLabName} placeholder='Lab Name' />
                <br></br>
                </div>
                <div className = "col">
                <label > Location </label>

                <input required='true'  className="form-control col"  value= {this.setState.location} onChange={this.onChangeLocation} placeholder='You Lab Location' />
                <br></br>
                </div>

                <div className = "col">
                <label > Phone Number </label>

                <input required='true'  className="form-control col"  value= {this.setState.phone} onChange={this.onChangePhone} placeholder='Phone Number' />
                <br></br>
                </div>

                <div className = "col">
                <label > Official WebSite </label>
                <br></br>
                <input required='true' type='text' className="form-control col" value= {this.setState.officialWebsite} onChange={this.onChangeOfficalWebSite} placeholder='Web Site' />
                <br></br>
                </div>
                            <br />
                <Button class="btn btn-secondary" type='submit' value='Creat Account' className="btn btn-deep-orange darken-4">Creat Account</Button>
                <br></br>
                <br></br>
                <b>If you already have an account<a href='/login'> Log In </a></b>
                <br></br>
            </form>
       
            </div>
            </div>
          
         
        )
    }
}


