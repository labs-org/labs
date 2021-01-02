import React, { Component } from 'react';
import axios from "axios";
import { storage } from "./firebase.js";

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    //we bind the event handlers
  
    this.onChangelabName = this.onChangelabName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimg = this.onChangeimg.bind(this);
    this.state = {
    
      labName:'',
      location:'',
      phone: '',
      testType: "",
      price : "" ,
      image:null, 
      url :'',
      progress:0,
    }
  }
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

  componentDidMount() {
    axios.get('http://localhost:3000/addItems/'+this.props.match.params.id,
    {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token"),
        'labName': localStorage.getItem("labName")
      }
    }
    )
    
      .then(response => {
        this.setState({
     
          labName: response.data.labName,
          location: response.data.location,
          phone: response.data.phone,
          testType: response.data.testType,
          price: response.data.price,
          image: response.data.image,      
        })  
      })
      .catch(function (error) {
        console.log(error);
      })
     
    
    }

 
 
  onChangelabName(e) {
    this.setState({
        labName: e.target.value
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
 
  onChangeimg(e) {
    this.setState({
      image : e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const item = {
     
      labName: this.state.labName,
      location: this.state.location,
      phone: this.state.phone,
      testType: this.state.testType,
      price: this.state.price,
      image:this.state.image
   
    }

    console.log(this.props.match.params);
   

    axios.patch("http://localhost:3000/addItems/edit/"+this.props.match.params.id,item
    , {
        headers: {
          'x-auth-token': localStorage.getItem("x-auth-token"),
          'labName': localStorage.getItem("labName")
        }
      })
    .then(res => console.log(res));
      console.log("updated")
// go bact to personal profile page after update the post
    window.location = '/Personalprofile'


  }

  render() {
    return (
        <div className = "container">
          <form className="text-center border border-light p-5" action="#!" onSubmit = {this.onSubmit}>
            <p className="h4 mb-4">Edit Your Post</p>             
          <div className="col">
                <label>Lab Name</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.labName} 
                  onChange = {this.onChangelabName}
                  text-align = "center"           
                  />
                </div>
                <br>
                </br>
                <div className="col">
                <label>Address</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.location} 
                  onChange = {this.onChangeLocation}
                  text-align = "center"
             
                  />
                </div>
                <div className = "col">
                  <label>Phone No </label>
                  <input 
                    type = "text" 
                    className = "form-control" 
                    value = {this.state.phone} 
                    onChange = {this.onChangePhone}
                   />
                </div>

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
          <div className="col">
                <label>Price</label>
                <input 
                  type = "text" 
                  className = "form-control" 
                  value = {this.state.price} 
                  onChange = {this.onChangePrice}
                  text-align = "center"
             
                  />
                </div>
                  <div className = "col">
                            <label>Image</label>
                           <div  id='image' > <img src={this.state.url || "http://via.placeholder.com/50 50"} 
                            alt="firebase"  /></div> 
                           <input  type="file" onChange={this.handleChangeImage.bind(this)} className="btn btn-deep-orange darken-4" />
                           <button  onClick={this.handleUpload.bind(this)} className="btn btn-deep-orange darken-4">Upload</button>
                           </div>
                            <br />

                <div>
                <button type="submit" value = "Submit" className="btn btn-dark">Edit</button>
                </div>

        </form>
        </div>
        
    )
  }
}

