import React, { Component } from 'react';
//import './App.css';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'


import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
const axios = require('axios');

var host = '10.254.20.112';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRows: 0,
      fieldcolumns: [
        {
          dataField: 'pname',
          text: 'Problem Name',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field1',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field2',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field3',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field4',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field5',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field6',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field7',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field8',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        },
        {
          dataField: 'field9',
          text: '',
          headerAlign: '',
          headerStyle: { backgroundColor: '#00ff00', width: '100px' },
          hidden: false
        }
      ],
      fielddata: [],
      columns: [{
        dataField: 'generalinfo_id',
        text: 'Info     ID',
        headerAlign: 'center',
        sort: true,
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        footerStyle: {
          backgroundColor: '#c8e6c9'
        },
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      }, {
        dataField: 'fromcompletedby',
        text: 'Completed By',
        headerAlign: 'center',
        footer: this.arrangeFilter,
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        footer: 'Total',
       
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      }, {
        dataField: 'gpsproduct',
        text: 'Product',
        headerAlign: 'center',
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        editor: {
          type: Type.SELECT,
          options: [{

            value: 'E',
            label: 'E'
          }]
        },
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      },
      {
        dataField: 'startdate',
        text: 'Date',
        headerAlign: 'left',
        filter: dateFilter({
          dateStyle: { width: '150px' }
        }),
        editable: false,
        editor: {
          type: Type.TEXTAREA
        },
        editor: {
          type: Type.DATE
        },
        headerStyle: { backgroundColor: '#81c784', width: '100px' ,height:'75px' }
      },
      {
        dataField: 'caseid',
        text: 'Case        ID',
        sort: true,
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        editable: false,
        // headerFormatter: this.caseIDFormatter,
        headerAlign: 'center',
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      },
      {
        dataField: 'customername',
        text: 'Customer Name',
        headerAlign: 'center',
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      },
      {
        dataField: 'description',
        text: 'Description',
        headerAlign: 'center',
        filter: textFilter(),
        editor: {
          type: Type.TEXTAREA
        },
        formatter: this.descriptionFormatter,
        headerStyle: { backgroundColor: '#81c784', width: '250px'  }

      },
      {
        dataField: 'pname',
        text: 'Problem     Name',
        headerAlign: 'center',
        filter: textFilter(),
        editor: {
          type: Type.SELECT,
         
          options: [{

            value: 'E',
            label: 'E'
          }]
        },
        headerStyle: { backgroundColor: '#81c784', width: '100px' }
      }


      ],

      selectedRows: [],

      generalinfo: [

      ],


    }
    this.handleSelected = this.handleSelected.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteRows = this.deleteRows.bind(this);
    this.updateProblem = this.updateProblem.bind(this);
    this.handleGetCurrentData = this.handleGetCurrentData.bind(this);
  }

descriptionFormatter(cell,row){
  const h = (row.description.length > 300) ? '120px' : ''
  return(
  <div style= {{height: h ,width: '400px',overflowY: 'scroll', overflowX: 'hidden'}}>{row.description}</div>
  );
}
handleGetCurrentData = () => {
  alert(this.node.table.props.data.length  + " reports viewed by filters");
}

arrangeFilter(filteredData){
  return (filteredData.length);
}

  handleSelected() {
    console.log(this.state.generalinfo.dataField);
  }

  componentWillMount() {
    this.assignGeneralInfo();
    this.assingProductBox();
    this.assignProblemBox();
  }

  deleteRows() {
    let l = this.state.selectedRows.length;
    if(l>0){
      let r = (l > 1) ? "reports" : "report";
      if (window.confirm("Are you sure to delete " + l + " " + r + " ?")) {
        for (let row of this.state.selectedRows) {
          this.deleteRow(row.generalinfo_id,row.caseid);
        }
      } else {
    
      }
    }
  else{
    alert("No reports selected!");
  }
  

  }
  deleteRow(generalinfo_id,caseid) {
    const axios = require('axios');
    axios.post(`http://${host}:4000/generalinfo/remove?generalinfo_id=${generalinfo_id}`, {
      headers: { "Content-Type": "text/plain" },
      method: 'POST',
      data: "delete sent"
    })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }).then(()=>{
        this.assignGeneralInfo();
      })
      
      axios.post(`http://${host}:4000/fieldcontents/remove?caseid=${caseid}`, {
        headers: { "Content-Type": "text/plain" },
        method: 'POST',
        data: "delete sent"
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
  
  
        });


  }
  saveChanges(generalinfo_id, fromcompletedby, gpsproduct, startdate, caseid, customername, description, pname) {

    axios.post(`http://${host}:4000/generalinfo/update?generalinfo_id=${generalinfo_id}&startdate=${startdate}&caseid=${caseid}
      &gpsproduct=${gpsproduct}&fromcompletedby=${fromcompletedby}&customername=${customername}&pname=${pname}`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        data: {
          description: description
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


      });
    alert("changes saved");

  }
  assignGeneralInfo() {

    fetch(`http://${host}:4000/generalinfo`)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ generalinfo: data })

      })
      .catch(err => console.error()
      )
  }
  assingProductBox() {
    let products = [];
    let opt = [];
    fetch(`http://${host}:4000/products`)
      .then(response => response.json())
      .then(({ data }) => {
        for (var el of data) {
          products.push(el.productname);

        }

      })
      .then(() => {
        for (var k = 0; k < products.length; k++) {
          opt.push({ value: products[k], label: products[k] });
        }
        var copy = this.state.columns.slice();
        copy[2].editor.options = opt;
        this.setState({ columns: copy });
      })
      .catch(err => console.error()
      )


  }
  assignProblemBox() {
    let problems = [];
    let opt = [];
    fetch(`http://${host}:4000/problems`)
      .then(response => response.json())
      .then(({ data }) => {
        for (var el of data) {
          problems.push(el.problemname);
          console.log(el.problemname);
        }

      })
      .then(() => {
        for (var k = 0; k < problems.length; k++) {
          opt.push({ value: problems[k], label: problems[k] });
        }
        var copy = this.state.columns.slice();
        copy[7].editor.options = opt;
        this.setState({ columns: copy });
      })
      .catch(err => console.error()
      )


  }
  arrangeExpand(pname) {
    fetch(`http://${host}:4000/problemfields?pname=${pname}`)
      .then(response => response.json())
      .then(({ data }) => {
        var sortedValues = Object.values(data[0]);
        var copiedfieldcolumns = this.state.fieldcolumns.slice();



        for (let i = 1; i < sortedValues.length; i++) {

          if (sortedValues[i] === null) {
            copiedfieldcolumns[i].hidden = true;

          }
          else {
            copiedfieldcolumns[i].hidden = false;
            copiedfieldcolumns[i].text = sortedValues[i];

          }
        }
        this.setState({ fieldcolumns: copiedfieldcolumns });
      })
      .catch(err => console.error()
      )
  }

  setFieldContents(caseid) {
    fetch(`http://${host}:4000/fieldcontents?caseid=${caseid}`)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ fielddata: data });
        this.arrangeExpand(data[0].pname)
      
      })
      .catch(err => console.error()
      )
  }
  updateProblem(newPname,caseid){
    var newFields = [];
    var newContents = [];
    fetch(`http://${host}:4000/problemfields?pname=${newPname}`, {
      headers: { "Content-Type": "application/json" },
      method: 'GET',
      data: "delete sent"
    })
      .then( response => response.json())
      .then(({ data }) => {
        var requestedProblemField = Object.values(data[0]);
        for(var i=1; i< requestedProblemField.length; i++){
          if(requestedProblemField[i]!= null){
            newFields[i-1] = requestedProblemField[i];
          }
        }
      })
      .then(()=>{
        for(var i=0; i< newFields.length; i++){
          newContents[i] = window.prompt("Please enter new problem's subfields",newFields[i]);
        }
      }).then(()=>{
        for(var i=0; i< newFields.length; i++){
          this.sendProblemToServer(`field${i+1}`,newContents[i],caseid,newPname);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () { 
        console.log(newFields);

      });
  }
  sendProblemToServer(field,content,caseid,newPname){
    axios.post(`http://${host}:4000/fieldcontents/update?field=${field}&content=${content}&caseid=${caseid}&pname=${newPname}`, {
      headers: { "Content-Type": "text/plain" },
      method: 'POST',
      data: "problem sent"
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


      });
  }
  render() {
    // { this.handleGetCurrentData()}
    const expandRow = {
      renderer: row => (

        <div>

          <Container>
            <BootstrapTable keyField='caseid' data={this.state.fielddata} columns={this.state.fieldcolumns} />
          </Container>

        </div>
      )
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: (row, rowIndex) => (rowIndex % 2 == 0 ? '#00BFFF' : '#00FFFF'),
      clickToExpand: true,
      clickToEdit: true,
      onSelect: (row, isSelect, rowIndex, e) => {
       
        if (isSelect === true) {
          this.state.selectedRows.push(row);

       
          this.setFieldContents(row.caseid);
        }
        if (isSelect === false) {
          this.state.selectedRows.splice(this.state.selectedRows.indexOf(row), 1);
       
        }


      },
      onSelectAll: (isSelect, rows, e) => {
        if (isSelect === true) {
          for (let i = 0; i < rows.length; i++) {
            this.state.selectedRows.push(rows[i]);
            

            this.setFieldContents(rows[i].caseid);
          }
        }
        if (isSelect === false) {
          for (let i = 0; i < rows.length; i++) {
            this.state.selectedRows.splice(this.state.selectedRows.indexOf(rows[i]), 1);
       
          }
        }

      }
    };
    const cellEdit = {
      mode: 'click'
    };
     const pagination = paginationFactory({
        });

    const filter = filterFactory({
  
    });
    return (

      <div>
        <Container>

          <Row>
            <Button onClick={this.deleteRows} variant="danger" size="lg" active >
              Delete Selected Rows
         </Button>
          {/* <hr></hr>
          <Button onClick={this.handleGetCurrentData} variant="danger" size="lg" active >
              Filter results
         </Button> */}

          </Row>
          <hr></hr>
          <Row>
            <BootstrapTable ref ={n => this.node = n} keyField='generalinfo_id' filter={filter} selectRow={selectRow}
              data={this.state.generalinfo} columns={this.state.columns}
              striped hover condensed
              expandRow={expandRow}
              cellEdit={cellEditFactory({
                mode: 'dbclick', blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => {
                  if(oldValue != newValue && !(newValue === '') ){
                    this.saveChanges(row.generalinfo_id, row.fromcompletedby, row.gpsproduct, row.startdate, row.caseid, row.customername, row.description, row.pname)
                    if(column.dataField === 'pname'){
                      this.updateProblem(newValue,row.caseid);
                    }
                  }
                }
              })}
              pagination={pagination}
            >


            </BootstrapTable>

          </Row>

        </Container>

      </div>
    );
  }
  
}


export default SearchPage;
