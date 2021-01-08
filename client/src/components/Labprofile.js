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
      <div>
        <div>
          {this.state.items.map((item, index) => (
            <ul key={index} className="list-unstyled">
              <li>{item.labName}</li>
              <li>{item.location}</li>
              <li>{item.phone}</li>
              <li>{item.testType}</li>
              <li>{item.price}</li>
              <img
        src={item.image}
        width="150"
        height="100"
        className="rounded-circle z-depth-2" 
        alt="100x100"
        data-holder-rendered={true}
      />
            </ul>
          ))}
           <a href="/EmailUs"> Email Us</a>
        </div>
      </div>
    );
  }
}

export default withRouter(Personalprofile);
