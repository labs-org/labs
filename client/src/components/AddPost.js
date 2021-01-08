import React, { Component } from 'react';
import $ from "jquery";
import {Button} from "reactstrap";
import { storage } from "./firebase.js";



class AddPost extends Component {
    constructor(props) {
      super(props);

    //Defining the "this" in the functions using .bind method
 
    // this.onChangeLabName= this.onChangeLabName.bind(this);
    this.onChangeLocation= this.onChangeLocation.bind(this);
    this.onChangePhone= this.onChangePhone.bind(this);
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice= this.onChangePrice.bind(this);
    this.onChangeWorkingHours= this.onChangeWorkingHours.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  this.state= {    
      // labName: '',
      location:'',
      phone: '',
      testType : '',
      price: '' ,
      workingHours: '',
      image:null,
      url :'',
      progress:0,
  }
}

onChangeWorkingHours(e) {
  this.setState({
      workingHours: e.target.value
  });
}

onChangeLocation(e) {
  this.setState({
      location: e.target.value
  });
}
onChangePhone(e) {
  this.setState({
      phone: e.target.value
  });
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
          image: e.target.files[0],
          progress: e.target.progress,
          })
      }
    
  }

  handleUpload (e) {
    e.preventDefault();
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
    // console.log(localStorage.labName)
    e.preventDefault();
    const item = {
      labName: localStorage.labName,
      location: this.state.location,
      phone: this.state.phone,
      testType: this.state.testType,
      price: this.state.price,
      workingHours: this.state.workingHours,
      image: this.state.url,
         }
    console.log(item);
      $.ajax ({
        method: "POST",
        url: "http://localhost:3000/addItems/",
        data: JSON.stringify(item),
        contentType : "application/json",
        success : function () {
          console.log('data posted successfully')
          window.location = '/Personalprofile'
        },
          error : function (err) {
            console.log(err)
          }      
      })
  }


  render() {
      return (
        <div className="card p-3"  style={{width: '35rem', padding: '15px ', marginLeft: '150px' , marginTop: '100px'}}>
        <br />
        <div className = "container">       
          <form className="text-center border border-light p-9" action="#!"  >
            <p className="h4 mb-4">Please enter you Post</p>
                <div className="col">

                </div>
                <div className="col">
                <label>Location</label>
                <input 
                required={true}
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.location} 
                  onChange = {this.onChangeLocation}
                  text-align = "center"
                  placeholder = "Enter your location"/>
                </div>
                <div className="col">
                <label>Phone No</label>
                <input 
                required={true}
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.phone} 
                  onChange = {this.onChangePhone}
                  text-align = "center"
                  placeholder = "Enter your Phone no"/>
                </div>

                <div className="col">
                <label>test type</label>
                <input 
                required={true}
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
                required={true}
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.price} 
                  onChange = {this.onChangePrice}
                  text-align = "center"
                  placeholder = "Enter your price"/>
                </div>
                <div className="col">
                <label>Working Hours</label>
                <input 
                required={true}
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.workingHours} 
                  onChange = {this.onChangeWorkingHours}
                  text-align = "center"
                  placeholder = "Enter your working Hours"/>
                </div>

                <div className = "col">
                            <label>Image</label>
                            <div class="progress">
                <div class="progress-bar" role="progressbar" style={{width: 'this.setState.progress'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.progress}</div>
</div>
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