import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Personalprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      Data: '',
      labName: [],
      items: [],
      LabName: props.match.params.name,
    };
  }

  componentDidMount() {
    console.log(this.state.items);
    // console.log(this.state.users);
    var newInfo = [];
    axios
      .get('http://localhost:3000/addItems')
      .then((res) => {
        console.log(res.data);
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].labName === this.state.LabName) {
            // this.state.items.push(data[i]);
            newInfo.push(data[i]);
            this.setState({ items: newInfo });
            console.log(newInfo);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

 

  render() {
    return (
      <div className="container flex-direction">
      <div className="row">
       <div className="" style={{ width: "50%" , float:"right",borderRadius: '2.5rem', marginTop: "20px"}}>
         <span className="card-up indigo lighten-1"></span>
         <span className="avatar mx-auto white">      
         </span>
  <span className="card-body">
      <span className="card-title">
          {this.state.items.map((item, index) => (
            <ul key={index} className="list-unstyled">
              <div className="card testimonial-card " >
              <span className="card-up indigo lighten-1"></span>
    <span className="avatar mx-auto white">
      
  </span>
  <span className="card-body">
                     <img
        src={item.image}
        width="150"
        height="100"
        className=" rounded-circle z-depth-2" 
        alt="100x100"
        
        // flexDirection="row"
        data-holder-rendered={true}
       
      />
              <p className="fas fa-quote-left card-text">Lab Name : {item.labName}</p>
              <p className="fas fa-quote-left card-text"> Location : {item.location}</p>
              <p className="fas fa-quote-left card-text"> Phone : {item.phone}</p>
              <p className="fas fa-quote-left card-text"> Test Type : {item.testType}</p>
              <p className="fas fa-quote-left card-text"> Price : {item.price}</p>
              </span>
              </div>
            </ul>
            
          ))}
           <a href="/EmailUs" className="btn btn-outline-success"> Email Us</a>
        </span>
        </span>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Personalprofile);
