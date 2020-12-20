import React, {Component} from "react";
import {Container, Button} from "reactstrap";
// import {CSSTransition, TransitionGroup} from "react-transition-group";
import {v1 as uuid} from "uuid"; 

class ProfilePage extends Component {
 state = {
     items : [
         {id: uuid(), testType:'blood', price: "6"},
         {id: uuid(), testType:'urin', price: "5"},
         {id: uuid(), testType:'suger', price: "10"},
     ]
 }
 render() {
     const {items} = this.state;
     return (
         <Container>
             <Button color ="dark" style ={{marginBottom: "2rem"}} onClick={() => {
                 const name = prompt('Enter A Test');
                 if(name) {
                    this.setState(state => ({
                        items: [...state.items, {id:uuid(),}]
                    })) 
                 }
             }}>ADD</Button>
         </Container>
     )
 }

  
}

export default ProfilePage;