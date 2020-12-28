import React, { Component } from 'react';
import $ from "jquery";
import {Button} from "reactstrap";
import { storage } from "./firebase.js";


class AddPost extends Component {
    constructor(props) {
      super(props);

    //Defining the "this" in the functions using .bind method
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice= this.onChangePrice.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  this.state= {    
      testType : '',
      price: '' ,
      image:null,
      url :'',
      progress:0,
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

    // it addes the values of the input fileds in the states so we add the image from fire base 
    handleChangeImage(e) {
      if (e.target.files[0]) {
          this.setState({
          image: e.target.files[0]
          })
      }
    
  }

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


  onSubmit(e) {  
    e.preventDefault();
    const item = {
      labName:localStorage.getItem('labName'),
      testType: this.state.testType,
      price: this.state.price,
      image: this.state.url,
         }

    console.log(item);

      $.ajax ({
        method: "POST",
        url: "addItems/add",
        data: JSON.stringify(item),
        contentType : "application/json",
        success : function () {
          console.log('data posted successfully')
          window.location = '/AllLabs'
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

                <div className = "col">
                            <label>Image</label>
                           <div  id='image' > <img src={this.state.url || "http://via.placeholder.com/50*50"} 
                            alt="firebase"  /></div> 
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
                   <div>
                <Button color="primary" onClick= {this.onSubmit} className="btn btn-deep-orange darken-4">Submit</Button>
                </div>

                
          </form>
 
        </div>
      
      </div>
      )
  }
}



export default AddPost ;