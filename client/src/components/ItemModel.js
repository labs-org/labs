import React, {Component} from "react";
import {
   Button,
   Modal,
   ModalHeader,
   Form,
   FormGroup,
   Label,
   Input, 
   ModalBody
} from "reactstrap";
import {connect} from "react-redux";
import {addItem} from "../actions/itemActions";


// import {addItem} from"../actions/itemActions";

class ItemModel extends Component {
  state= {
      model: false,
      testType : '',
      price: ''
  }
  toggle = () => {
      this.setState({
          model: ! this.state.model
      })
  }
 onChange = (e) => {
     //in this way if we have multipul inputs  we don't need to have another on change.
     //This is to dynamically update object property
     this.setState({ [e.target.name] : e.target.value})
 }
 onSubmit = (e) => {
     e.preventDefault();
     const newItem = {
        
        testType: this.state.testType,
        price: this.state.price
     }
     //add item via addItem action
     this.props.addItem(newItem);

     //close model
     this.toggle();
 }

  render() {
      return (
          <div>
         <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add</Button>
             < Modal isOpen={this.state.model}
             toggle={this.toggle}>
                 <ModalHeader toggle={this.toggle}>Add To Your Posts</ModalHeader>
                    <ModalBody>
                       <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                              <Label for="item" >Post</Label>
                                  <Input type="text"
                                     name="testType"
                                     id="item"
                                     placeholder="Add your posts"
                                     onChange={this.onChange}></Input>
                                      <Input type="text"
                                     name="price"
                                     id="item"
                                     placeholder="Add your price"
                                     onChange={this.onChange}></Input>
                                     <Button 
                                     color ="dark"
                                     style={{marginTop:'2rem'}} block
                                     >Add</Button>
                         </FormGroup>
                       </Form>
                    </ModalBody>
             </Modal>
          </div>
      )
  }
}

const mapStateToProps = state => ({
    item : state.item
})

export default connect(mapStateToProps, { addItem})(ItemModel);

{/* <input type="text" name="title" onChange={this.onChange} value={this.state.title} />
<input type="text" name="address" onChange={this.onChange} value={this.state.address} />
<input type="text" name="description" onChange={this.onChange} value={this.state.description} />

onChange (e) {
   this.setState({ [e.target.name] : e.target.value});
} */}