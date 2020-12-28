import React, { Component } from 'react';
import axios from "axios";




export default class EditPost extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    //we bind the event handlers
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
     testType: "",
      price : ""   
    }
  }


  componentDidMount() {
    axios.get('http://localhost:3000/addItems/update'+this.props.match.params.id)
    
      .then(response => {
        this.setState({
          testType: response.data.testType,
          price: response.data.price
      
        })  

      })
      .catch(function (error) {
        console.log(error);
      })
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
      price: this.state.price,
   
    }

    console.log(item);

    axios.post("/update/"+this.props.match.params.id, item)
      .then(res => console.log(res.data));
      console.log("updated")
// go bact to all labs page after update the post
    window.location = '/AllLabs'
  }

  render() {
    return (
        <div className = "container">

          <form className="text-center border border-light p-5" action="#!" onSubmit = {this.onSubmit}>

            <p className="h4 mb-4">Edit Your Post</p>

                <div className="col">
                <label>Test Type</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.testType} 
                  onChange = {this.onChangeTestType}
                  text-align = "center"
             
                  />
                </div>

              
          <br />

                <div className = "col">
                  <label>Price </label>
                  <input 
                    type = "text" 
                    className = "form-control" 
                    value = {this.state.price} 
                    onChange = {this.onChangePrice}
                   />
                </div>

                <div>
                <button type="submit" value = "Submit" className="btn btn-dark">Edit</button>
                </div>

        </form>
        </div>
        
    )
  }
}