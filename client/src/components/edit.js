import React, { Component } from 'react';
import axios from "axios";
import { storage } from "./firebase.js";




export default class EditPost extends Component {
  constructor(props) {
    super(props);

    //Defining the "this" in the functions using .bind method
    //we bind the event handlers
    this.onChangeTestType = this.onChangeTestType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeimg = this.onChangeimg.bind(this);
    this.state = {
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
    axios.get('http://127.0.0.1:3000/addItems/'+this.props.match.params.id)
    
      .then(response => {
        this.setState({
          testType: response.data.testType,
          price: response.data.price,
          image: response.data.image,      
        })  
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.put('http://127.0.0.1:3000/addItems/edit/' +this.props.match.params.id)
      .then((item) => window.location = '/')
      
      .catch(function (error) {
        console.log(error)
      })

      
        // axios.delete('http://localhost:3000/addItems/' +this.props.match.params.id).then((res) => console.log(res.data))
        // // this.setState({
        // //   items: this.state.items.filter((el) => el._id !== id),
        // // });
    
    
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
      testType: this.state.testType,
      price: this.state.price,
      image:this.state.image
   
    }

    console.log(item);

    axios.post("addItems/edit/"+this.props.match.params.id, item)
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


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Button } from 'react-bootstrap'

// const EditPost = ({match}) => {
//     const [item, setItem] = useState({
//         testType: "",
//         price: "",
//         image: ""
//     })
//     // const [testType, setTestType] = useState;
//     // const [price, setPrice] = useState;
//     // const [image, setImage] = useState;

//     useEffect(() => {
//         axios.get('/addItems/'+ match.params.id)
//         .then(response => setItem(response.data))
//     }, [])

//     const postUpdate = () => {
//         axios.put('/addItems/'+ match.params.id, item)
//         .then((item) => console.log(fruit))
//         window.location = '/Peronalprofile'
//     }

//     const postDelete = () => {
//         axios.delete('/addItems/'+ match.params.id)
//         .then((res) => console.log(res.status))
//         window.location = '/Peronalprofile'
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setItem(oldItem => {
//             return {
//                 ...oldItem,
//                 [testType]: value,
//                 [price]: value,
//                 [image]: value
//             }
//         })
//     }

//     return (
//         <div>
//             <h1>Editing {item.testType}</h1>
//             <p><b>testType: {item.testType}</b></p>
//             <label>Price: </label>
//             <input type="text" name="name" value={item.price} required 
//                 onChange={handleChange}/><br/>
//             <label>Image: </label>
//             <input type="text" name="amount" value={item.image}
//                 onChange={handleChange}/><br/>
           
//             <Button className='btn btn-warning' onClick={postUpdate}>Update post</Button>
//             <Button className='btn btn-danger' onClick={postDelete}>Delete post</Button>
//         </div>
//     )
// }

// export default EditPost;
