import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import { Button,ButtonGroup } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Row,Col,Dropdown,DropdownButton } from 'react-bootstrap';
import ViewUser from './ViewUser.js';
import RemoveProductProblem from './removeProductProblem.js';
const axios = require('axios');
var host = '10.254.20.112';
class Login extends Component {
   constructor(props){
     super(props)
     this.state = {
       currentPage :<ViewUser ></ViewUser>,
       newUserName: '',
       newUserPassword: '',
       newProduct:'',
       newProblem: '',
       problemfields: '',
       pageName:'View Users'

     }
    this.handleUserInsert = this.handleUserInsert.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleControl = this.handleControl.bind(this);
    this.handleProblemInsert = this.handleProblemInsert.bind(this);
    this.handleClick = this.handleClick.bind(this);
   }
   handleClick(event){
    if(event.target.name == "ppinsert" ){
      this.setState({currentPage: <ControlPanel func = {this}></ControlPanel>});
      this.setState({pageName: 'Problem&Product Insert'})

    }
   else if(event.target.name == "userinsert" ){
      this.setState({currentPage: <AddUser func = {this}></AddUser>});
      this.setState({pageName: 'Add User'})
    }
    else if(event.target.name == "viewuser" ){
      this.setState({currentPage: <ViewUser></ViewUser>});
      this.setState({pageName: 'View Users'})
    }
    else if(event.target.name == "removeProductProblem" ){
      this.setState({currentPage: <RemoveProductProblem></RemoveProductProblem>});
      this.setState({pageName: 'remove Product&Problem'})
    }
   }
   handleUserInsert(event){
     let nextSt = {newUserName: '', newUserPassword: ''};
    if(this.state.newUserName == '' || this.state.newUserPassword  == ''){
      alert("Please check the input values!\nSomething is missing")
    }
    else{
      axios.post(`http://${host}:4000/users/add`,{
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        data:{
          adminName : this.props.adminName,
          userName : this.state.newUserName,
          userPassword: this.state.newUserPassword
        }
      })
  .then(function (response) {
    console.log(response.data);
   if(response.data.data == undefined){
     alert('ERROR: ' +response.data.code + '\n User is not able to be inserted');
   }
   else{
     alert("User is inserted");

   }
  })
  .catch(function (error) {
    alert("Some Error Occured");
    console.log(error);
  })
  .then(() => {
  
  });
    }
  
   }

   handleUserChange(event){
    if(event.target.placeholder === "Enter User Name"){
      this.setState({newUserName: event.target.value});
    }
    else if(event.target.placeholder === "Password"){
      this.setState({newUserPassword: event.target.value});
    }
   }
  handleChange(event){
      if(event.target.type == "email" ){
        this.setState({userName: event.target.value });
        
      }
      if(event.target.placeholder == "Enter a product name"){
        this.setState({newProduct: event.target.value});
      }
      if(event.target.placeholder == "Enter a problem type"){
        this.setState({newProblem: event.target.value});
      }
      if(event.target.placeholder == "Enter subfields"){
        this.setState({problemfields: event.target.value});
      }
    if(event.target.type == "password"){
        this.setState({password: event.target.value });
    }
  }
  handleControl(event){
  
      this.addProduct(this.state);
  }
  addProduct(product) {
    if(product.newProduct === ''){
      alert("please check the input value");
    }
    else{
      alert("new Product inserted");
      const axios = require('axios');
      axios.post(`http://${host}:4000/products/add?productname=${product.newProduct}`,{
        headers: {"Content-Type": "text/plain"},
        method: 'POST',
        data: product.newProduct
      })
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    }
   
}
  handleProblemInsert(event){
    this.addProblem(this.state);
    this.addProblemFields(this.state);
}
  addProblem(problem) {
    
    const axios = require('axios');
    if(problem.newProblem === '' || problem.problemfields === ''){
      alert("missing fields!")
    }
    else {
      axios.post(`http://${host}:4000/problems/add?problemname=${problem.newProblem}`,{
        headers: {"Content-Type": "text/plain"},
        method: 'POST',
        data:{
          problemname : problem.newProblem,
          problemfields: problem.problemfields
        }
      })
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  alert("new Problem inserted");
    }

}
addProblemFields(problem) {
  console.log(problem.problemfields+ "problem");
  const axios = require('axios');
  if(problem.newProblem === '' || problem.problemfields === ''){
    alert("missing fields!")
  }
  else {
    axios.post(`http://${host}:4000/problemfields/add?problemname=${problem.newProblem}&problemfields=${problem.problemfields}`,{
      headers: {"Content-Type": "text/plain"},
      method: 'POST',
      data:{
        problemfields: problem.problemfields
      }
    })
.then(function (response) {
  // handle success
  console.log(response.data);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});
alert("new Problem inserted");
  }

}


  render() {
    return (
       
      <div className="App" >
      <Container>
        <Row>
      <Col >
      <ButtonGroup aria-label="Basic example" toggle = {true}>
    <Button  name = 'ppinsert' value = "Problem&Product Insert" onClick= {this.handleClick} > Problem&Product Insert </Button>
    <Button  name = 'removeProductProblem' value = "Remove Problem&Product " onClick= {this.handleClick} > Remove Problem&Product  </Button>
     <Button name = 'userinsert' value = "Add User" onClick= {this.handleClick} >Add User </Button>
    <Button name = 'viewuser' value = "View User" onClick= {this.handleClick} > View User</Button>
    </ButtonGroup>
    </Col>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <Col>
      {this.state.currentPage}
      </Col>
    </Row>
         
       
      </Container>
      
  </div>
    );
  
  }
}
function ControlPanel(props){
    return (
        <Container  style = {{backgroundColor: '#d3d3d3'}}>
          <Row>
          <Col  md={{ span: 6, offset: 3}} >
            <Form>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label >Product Name:  </Form.Label>
          <Form.Control type = "text" placeholder="Enter a product name" onChange = {props.func.handleChange}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        
        <Button  onClick={props.func.handleControl} input ="newProduct" variant="danger" size="lg" active >
         Insert New Product!
         </Button>
         <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
    <Row>
      <h1>               </h1>
    </Row>
         <Form.Group  controlId="formBasicEmail">
          <Form.Label > Problem Type:  </Form.Label>
          <Form.Control type = "text" placeholder="Enter a problem type" onChange = {props.func.handleChange}/>
          <Form.Text className="text-muted">
          </Form.Text>
          </Form.Group>
          <Form.Group  controlId="formBasicEmail">
          <Form.Label> Problem SubFields: (Seperate subfields by comma-,- ie: sf1,sf2,sf3):  </Form.Label>
          <Form.Control placeholder="Enter subfields"  onChange = {props.func.handleChange}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Button  onClick={props.func.handleProblemInsert} variant="danger" size="lg" active >
         Insert New Problem Type!
         </Button>
         
      </Form>
      </Col>
      </Row>
        </Container>

      
    );
}
    function AddUser(props){
      return (
          <Container  style = {{backgroundColor: '#d3d3d3'}}>
            <Row>
            <Col  md={{ span: 6, offset: 3}}>
      <Form>
      
      <Form.Group controlId="formBasicEmail">
      <Form.Label>User Name: </Form.Label>
      <Form.Control type="text" placeholder="Enter User Name" onChange = {props.func.handleUserChange}/>
      <Form.Text className="text-muted">
      </Form.Text>
    </Form.Group>
  
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="text" placeholder="Password"   onChange = {props.func.handleUserChange}/>
    </Form.Group>
    
    </Form>
    <Col  md={{ span: 6, offset: 3}}>
          <Button name= "sb" onClick={props.func.handleUserInsert} > 
          Add a New User!
        </Button>
          </Col>
      </Col>
        </Row>
          </Container>
  
        
      );
}

export default Login;