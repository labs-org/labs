import React, {Component} from "react";
import {Container,ListGroupItem, Button, ListGroup} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {getItems, deleteItem} from "../actions/itemActions";
import PropTypes from "prop-types";
import store from "../store";


class ProfilePage extends Component {
//  componentDidMount() {
//      this.props.getItems();
//  };
componentDidMount () {
    // subscribe
     store.getState(()=>{
         this.forceUpdate(); 
     });

   // Dispatch
     store.dispatch({
         type:"POST",
         payload: {
           items: [
             {
               name:"testType",
               price:"price"
             }
             
         ]
     }
 });
}


 onDeleteClick = (_id)=> {
     this.props.deleteItem(_id)

 };


 render() {
     
    const {items} = this.props.item;
    console.log({items})
     return (
         <Container>         
             <ListGroup>
                 <TransitionGroup className = "ProfilePage">
                    {items.map((item, _id) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade" >
                             {/* list of the post the client did */}
                            <ListGroupItem>
                                
                                <Button className="remove-btn" color ="danger" size ="sm" onClick = {this.onDeleteClick.bind(this, _id)} >
                                    &times;
                                </Button>
                                {item.testType}
                                {item.price}
                            </ListGroupItem>
                        </CSSTransition>
                    )
                    )}
                 </TransitionGroup>
             </ListGroup>
         </Container>
     )
 }

  
}
ProfilePage.propTypes = {
    getItems: PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
}

 const mapStateToProps = (state) => ({
     item: state.item
 })


export default connect(mapStateToProps, { getItems, deleteItem}) (ProfilePage);


// {items.map((item) => 
//     <p>{item.testType}</p>