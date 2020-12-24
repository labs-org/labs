import React, { Component } from 'react';
// import axios from "axios";
// import { Link } from "react-router-dom";
import $ from "jquery";
import {Button} from "reactstrap";
import ProfilePage from "./ProfilePage"




class AddPost extends Component {
    constructor(props) {
      super(props);


    //Defining the "this" in the functions using .bind method
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice= this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


  this.state= {  
  
      testType : '',
      price: ''
  
  }
}
onChangeTestType(e) {
    this.setState({
        testType: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
        price: e.target.value
    });
  }


  onSubmit(e) {
    
    e.preventDefault();

    const item = {
      testType: this.state.testType,
      price: this.state.price
         }

    console.log(item);

   
      // window.location = '/ProfilePage'
      $.ajax ({
        method: "POST",
        url: "/",
        data: JSON.stringify(item),
        contentType : "application/json",
        success : function () {
          console.log('data posted successfully')
        },
          
          error : function (err) {
            console.log(err)
          }

      
      })
  }


  render() {
      return (
        <div>
        <br />
        <div className = "container">
       
          <form className="text-center border border-light p-9" action="#!"  >

            <p className="h4 mb-4">Please enter you post</p>

                <div className="col">
                <label>test type</label>
                <input 
                required="true"
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.testType} 
                  onChange = {this.onChangeTestType}
                  text-align = "center"
                  placeholder = "Enter your posts"/>
                </div>

                <div className="col">
                <label>Price</label>
                <input 
                required="true"
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.price} 
                  onChange = {this.onChangePrice}
                  text-align = "center"
                  placeholder = "Enter your price"/>
                </div>
                   <div>
                <Button color="primary" type="submit" onClick= {this.onSubmit} className="btn btn-deep-orange darken-4">Submit</Button>
                </div>

                
          </form>
       <ProfilePage />
        </div>
      
      </div>
      )
  }
}



export default AddPost ;