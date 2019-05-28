import React, { Component } from 'react';
import { Form, Row,Col ,Container,Button} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter} from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
const axios = require('axios');
var host = '10.254.20.112';
class ViewUser extends Component {


constructor(props){
  super(props);
  this.state = {
    columns: [
        {
          dataField: 'adminname',
          text: 'Admin Name',
          headerAlign: 'center',
          sort: true,
          filter: textFilter(),
          headerStyle:{ backgroundColor: '#81c784',width:'150px'}
        },
        {
          dataField: 'username',
          text: 'User Name',
          headerAlign: 'center',
          sort: true,
          filter: textFilter(),
          headerStyle:{ backgroundColor: '#81c784',width:'150px'}
        },
        {
          dataField: 'userpassword',
          text: 'User Password',
          headerAlign: 'center',
          sort: true,
          filter: textFilter(),
          headerStyle:{ backgroundColor: '#81c784',width:'150px'}
        },
       ],
       users : [],
       selectedUsers: []
  }
this.deleteUser = this.deleteUser.bind(this);
this.deleteUsers = this.deleteUsers.bind(this);

}
assignData(){

  fetch(`http://${host}:4000/allusers`)
  .then(response => response.json())
  .then(({ data }) => {
    console.log(data);
    this.setState({users : data})
    
  })
  .catch(err => console.error()
  )
 }
deleteUsers(){
  // var copySelected = this.state.selectedUsers;
  //  copySelected.forEach(user =>{
  //    deleteUser(user);
  //  })
   let l = this.state.selectedUsers.length;
   let r = (l > 1) ? "users" : "user";
   if (window.confirm("Are you sure to delete " + l + " " + r + " ?")) {
     for (let user of this.state.selectedUsers) {
       this.deleteUser(user);
     }
  
   } else {
   
   }
}

deleteUser(user){
    axios.post(`http://${host}:4000/users/remove`,{
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      data: {
          userName: user
      }
    })
  .then(function (response) {
    
    console.log(response.data);
  })
  .catch(function (error) {

    console.log(error);
  })
  .then(() => {
    this.assignData();
  });
  
}
componentWillMount(){
  this.assignData();
}


  render() {
    const selectRow = {
        mode: 'checkbox',
        hideSelectAll: true,
        clickToSelect: true,
        bgColor: (row, rowIndex) => (rowIndex % 2 == 0 ? '#00BFFF' : '#00FFFF'),
        clickToEdit: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if(isSelect === true){
               let copiedUsers = this.state.selectedUsers;
               copiedUsers.push(row.username);
               this.setState({selectedUsers: copiedUsers});
              }
              if(isSelect === false){
                let copiedUsers = this.state.selectedUsers;
                copiedUsers.splice(this.state.selectedUsers.indexOf(row.username),1);
                this.setState({selectedUsers: copiedUsers});
              }
             console.log(row.rowKey);
          
        }
    }
      return (
        <Container>
            <Row>
                <Col  md={{ span: 6, offset: 5}}>
                <Button    variant="danger" size="lg" active onClick = {this.deleteUsers} >
                        Delete Selected Users
                    </Button>
                </Col>
            </Row>
        
        <Row>
       <Col  md={{ span: 6, offset: 3}}>
       <BootstrapTable keyField = 'username' selectRow = {selectRow}  data = {this.state.users} columns = {this.state.columns}  
         pagination={ paginationFactory() }
           >


    </BootstrapTable>
    </Col>
    </Row>
    </Container>
      );
    }
    
    
  
}

export default ViewUser;