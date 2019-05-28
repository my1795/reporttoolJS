import React, { Component } from 'react';
//import './App.css';
import logo from './netas.png'
import bground from './netasback.jpg'
import gif from './logout.gif'
import General from './components/General'; 
import {Container} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { Form , Col,Row, Card} from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Login from './components/Login';
import SearchPage from './components/SearchPage';
const axios = require('axios');
var host = '10.254.20.112';
class App extends Component {
   constructor(props){
     super(props)
     this.state = {
       currentPage : <header/>,
       loggedin: '',
       userName: '',
       userPassword: '',
       isHomeorAuth:true,
       isUser: false,
       isUserAdmin: false
     }
    this.handleClick = this.handleClick.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.logOut = this.logOut.bind(this);
   }
   handleChange(event){
     console.log("handleChange entered");
    if(event.target.type === "text"){
      this.setState({userName: event.target.value});
    }
    if(event.target.type === "password"){
      this.setState({userPassword: event.target.value});
    }
   }
   handleSubmit(event){
     if(event.target.variant = "primary"){
        this.checkUser();
        this.checkAdmin();

     }
    
  }
  logOut(event){
      console.log("logout clicked");
      this.setState({isUser: false,isUserAdmin: false,isHomeorAuth: true,userName: '',userPassword:''});
      this.setState({currentPage:
        <Container style = {{backgroundColor: '#d3d3d3'}}>
        <Col md={{ span: 6, offset: 3 }}>
      <Form>
      
    <Form.Group controlId="formBasicEmail">
    <Form.Label>User Name: </Form.Label>
    <Form.Control type="text" placeholder="Enter User Name" onChange = {this.handleChange}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" autoComplete = {false} onChange = {this.handleChange}/>
  </Form.Group>
  
  </Form>
 
     <Row>
     <hr></hr>
    
     <Button name= "sb" onClick = {this.handleSubmit} disabled = {this.state.isUser || this.state.isUserAdmin}> 
        Log in
      </Button>
      <hr></hr>
    
     </Row>
      </Col>
      </Container>
      });
   
  }
   componentWillMount(){
     this.setState({ currentPage:
      <Container style = {{backgroundColor: '#d3d3d3'}}>
        <Col md={{ span: 6, offset: 3 }}>
      <Form>
      
    <Form.Group controlId="formBasicEmail">
    <Form.Label>User Name: </Form.Label>
    <Form.Control type="text" placeholder="Enter User Name" onChange = {this.handleChange}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" autoComplete = {false} onChange = {this.handleChange}/>
  </Form.Group>
  
  </Form>
 
     <Row>
     <hr></hr>
    
     <Button name= "sb" onClick = {this.handleSubmit} disabled = {this.state.isUser || this.state.isUserAdmin}> 
        Log in
      </Button>
      <hr></hr>
    
     </Row>
      </Col>
      </Container>
     });
   }
   
   checkUser(){
     let user = false;
    axios.post(`http://${host}:4000/users`,{
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      data:{
        userName : this.state.userName,
        userPassword: this.state.userPassword
      }
    })
.then(function (response) {
  var arr = Object.values(response.data.data[0]);
  console.log(arr[0]);
  if(arr[0] === 1){
    
    user = true;
    console.log("Check User correct output");
    }
   
    
}).then(() =>{
  this.setState({isUser: user});
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(() => {
   if( this.state.isUser === true){
    this.setState({currentPage: <SearchPage/> });
    this.setState({isHomeorAuth: false});
  }
});
   }
   checkAdmin(){
    let admin = false;
    axios.post(`http://${host}:4000/admins`,{
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      data:{
        userName : this.state.userName,
        userPassword: this.state.userPassword
      }
    })
.then(function (response) {
  var arr = Object.values(response.data.data[0]);
  console.log(arr[0]);
  if(arr[0] === 1){
    admin = true;
    console.log("Check Admin correct output");
    }
}).then(()=>{
  this.setState({isUserAdmin: admin});
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(() => {
   if( this.state.isUserAdmin === true){
    this.setState({currentPage: <Login adminName = {this.state.userName}/> });
    this.setState({isHomeorAuth: false});
  }
});
   }
  handleClick(event){
    if(event.target.name == "insert" && this.state.isUser === true){
      this.setState({currentPage: <General/> });
      this.setState({isHomeorAuth: false});
    }
    else if(event.target.name == "search" && this.state.isUser === true){
      this.setState({currentPage: <SearchPage/> });
      this.setState({isHomeorAuth: false});
    }
    else if(event.target.name == "login" && this.state.isUserAdmin === true){
      this.setState({currentPage: <Login adminName = {this.state.userName}/> });
      this.setState({isHomeorAuth: false});
    }
    else if(event.target.name == "home"){
      this.setState({isHomeorAuth: true});
      this.setState({currentPage:
        <Container style = {{backgroundColor: '#d3d3d3'}}>
        <Col md={{ span: 6, offset: 3 }}>
      <Form>
      
    <Form.Group controlId="formBasicEmail">
    <Form.Label>User Name: </Form.Label>
    <Form.Control type="text" placeholder="Enter User Name" onChange = {this.handleChange}/>
    <Form.Text className="text-muted">

    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" autoComplete = {false}  onChange = {this.handleChange}/>
  </Form.Group>
  
  </Form>
 
  <Row>
  <hr></hr>
     <Button name= "sb" onClick = {this.handleSubmit} disabled = {this.state.isUser || this.state.isUserAdmin}> 
        Log in
      </Button>
      <hr></hr>
     </Row>
      </Col>
      </Container>
     });
    }
    else{
      this.setState({isHomeorAuth: true});
      this.setState({currentPage:
        <div style={{ zIndex:2,backgroundColor: "#00ffff"}}>
          <header style= {{fontSize: 30}}> You are not authorized to enter to this page.  
            You can have an authorization under these circumstances:
              </header>
              <li style= {{fontSize: 20}}>
               1- If you are an admin you can view Control Panel
              </li>
              <li style= {{fontSize: 20}}>
               1- Admin can view all the pages if he/she records himself/herself as a user
              </li>
              <li style= {{fontSize: 20}}>
               2- If you are a registered user you can view all the pages except Control Panel
              </li>
              <li style= {{fontSize: 20}}>
               3-  And Do not forget to leave without logging out!
              </li>
            <header style = {{alignItems: 'center'}}>
             {/* <img src={gif} width= "600" height = "300" /> */}
            </header>
        </div>
      });
    }
    this.forceUpdate();
  }
   
 


  render() {
    let imgurl = './netasback.svg';
    const st = (this.state.isHomeorAuth) ? { backgroundImage: `url(${bground})`,  backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    ,top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'} : {};
    return (


      <div className="App"  >
          <Container >
          <Navbar collapseOnSelect expand='lg' bg= 'light' variant= 'green' >
          <img src={logo} height = "70"/>
         <Navbar.Brand expand = "sm" bg = "gray" >

        </Navbar.Brand>
         <hr></hr>
         <Button onClick = {this.handleClick} variant="outline-primary" size = "lg" bg= "blue" name="home" disabled = {this.state.isUser || this.state.isUserAdmin}>Home</Button>
          <hr></hr>
          <Button onClick = {this.handleClick} variant="outline-primary" size = "lg" bg= "blue" name="insert">Insert A Report </Button>
          <hr></hr>
          <Button  onClick = {this.handleClick}  variant="outline-primary"  size = "lg" bg = "blue" name = "search">See Search Options</Button>
          <hr></hr>
          <Button onClick = {this.handleClick} variant="outline-primary" size = "lg" bg= "blue" name="login">Control Panel</Button>
          <hr></hr>
          <Button name= "sbo" onClick = {this.logOut} variant = "danger" disabled = { !this.state.isUser && !this.state.isUserAdmin}> 
        Log out
      </Button>
        </Navbar>
       {this.state.currentPage}
        <hr></hr>
          </Container>
          <Container>
          <Card style={{ width: '100%' }}>
      <Card.Img variant="bottom" />
       <Card.Body>
     <Card.Title style= {{fontSize: 24, textAlign: 'center'}}>Pager Report Tool</Card.Title>
      <Card.Text style= {{fontSize: 18, textAlign: 'center'}} >
      Please Contact  me if any problem happens:
        </Card.Text>
        <Card.Link  style= {{fontSize: 16, textAlign: 'center', display: 'block'}} href="mailto: okircali@netrd.com.tr">Ömer KIRCALI</Card.Link>
        <Card.Link  style= {{fontSize: 16, textAlign: 'center' , display: 'block'}} href="mailto: mustafa.yildirim@ozu.edu.tr">Mustafa YILDIRIM</Card.Link>

        <Card.Text style= {{fontSize: 12, textAlign: 'center'}} >
        Copyright ©NETAS 2019
        </Card.Text>
       </Card.Body>
              </Card>
          </Container>
      </div>
    );
  }
}



export default App;
