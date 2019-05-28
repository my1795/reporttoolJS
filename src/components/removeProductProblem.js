import React, { Component } from 'react';
import { Form, Row,Col ,Container,Button} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter} from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
const axios = require('axios');
var host = '10.254.20.112';
class removeProductProblem extends Component {


constructor(props){
  super(props);
  this.state = {
    problemName: '',
    productName: ''
  }
this.deleteProduct = this.deleteProduct.bind(this);
this.deleteProblem = this.deleteProblem.bind(this);
this.handleChange = this.handleChange.bind(this);
}
handleChange(event){
  if(event.target.name === "productName"){
    this.setState({productName: event.target.value})
  }
  else if(event.target.name === "problemName"){
    this.setState({problemName: event.target.value})
  }
}
deleteProblem(){
  axios.post(`http://${host}:4000/problems/remove?problemName=${this.state.problemName}`,{
    headers: {"Content-Type": "application/json"},
    method: 'POST',
    data: {
        
    }
  })
.then(function (response) {
  
  console.log(response.data);
})
.catch(function (error) {

  console.log(error);
})
.then(() => {

});
}

deleteProduct(){
    axios.post(`http://${host}:4000/products/remove?productName=${this.state.productName}`,{
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      data: {
          
      }
    })
  .then(function (response) {
    
    console.log(response.data);
  })
  .catch(function (error) {

    console.log(error);
  })
  .then(() => {
  
  });
  
}


  render() {
    return(
      
    
      <Container  style = {{backgroundColor: '#d3d3d3'}}>
         <Row>
      <Col  md={{ span: 6, offset: 3}}>
  <Form>

  <Form.Group controlId="formBasicEmail">
  <Form.Label>Product Name: </Form.Label>
  <Form.Control type="text"  name= "productName" placeholder="Enter User Name" onChange = {this.handleChange}/>
  <Form.Text className="text-muted">
 
  </Form.Text>

  </Form.Group>
  
  </Form>
  <Col  md={{ span: 6, offset: 3}}>
    <Button variant = "danger"  onClick={this.deleteProduct}> 
    Remove Product Type
  </Button>
    </Col>
  </Col>
  </Row>
      <Row>
      <Col  md={{ span: 6, offset: 3}}>
  <Form>
 
  <Form.Group controlId="formBasicPassword">
  <Form.Label>Problem Name: </Form.Label>
  <Form.Control type="text" name= "problemName" placeholder="Problem "   onChange = {this.handleChange}/>
  </Form.Group>
  
  </Form>
  <Col  md={{ span: 6, offset: 3}}>
    <Button variant = "danger"  onClick={this.deleteProblem} > 
    Remove Problem Type
  </Button>
    </Col>
  </Col>
  </Row>
    </Container>

    );
   
    }
    
    
  
}

export default removeProductProblem;