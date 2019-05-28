
import React from 'react';
//import './styles/custom.css';
//import './styles/normalize.css';
import './styles/general.css';
import './styles/skeleton.css';
import { Button, DropdownButton } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";


import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
var host = '10.254.20.112';
class General extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),

      currentProblem: 'Select the Problem!',
      problemTypes: [

      ],
      problemFieldsNames: [

      ],
      problemFieldsContent: [
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
        { val: '' },
      ],
      currentProduct: 'Select the Product!',
      productTypes: [
      ],
      caseID: '',
      name: '',
      customerName: '',
      description: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleProduct = this.handleProduct.bind(this);
    this.handleFieldContent = this.handleFieldContent.bind(this);


  }

  handleChange(event) {
    this.setState({ [[event.target.name]]: event.target.value });
  }
  handleFieldContent(event) {
    var newfields = this.state.problemFieldsContent.slice() //copy the array
    console.log("print index and value passed form event");
    console.log(event.target.placeholder);
    console.log(newfields);
    switch (event.target.placeholder) {
      case '0':

        newfields[0] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '1':
        newfields[1] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '2':
        newfields[2] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '3':
        newfields[3] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '4':
        newfields[4] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '5':
        newfields[5] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '6':
        newfields[6] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '7':
        newfields[7] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '8':
        newfields[8] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      case '9':
        newfields[9] = { val: event.target.value } //execute the manipulations
        this.setState({ problemFieldsContent: newfields }) //set the new state
        break;
      default:
        alert("Unexpected value for problem sub fields entry");
    }
  }
  handleDate(inputDate) {
    this.setState({ date: inputDate });
  }
  componentWillMount() {
    this.assignProductTypes();
    this.assignProblemTypes();
  }
  assignProductTypes() {
    fetch(`http://${host}:4000/products`)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ productTypes: data })
        console.log("products selectedddddddddddddddddd");
      })
      .catch(err => console.error()
      )
  }
  assignProblemTypes() {
    fetch(`http://${host}:4000/problems`)
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({ problemTypes: data })
        console.log("problems selectedddddddddddddddddd");
      })
      .catch(err => console.error()
      )
  }

  handleDrop(event) {
    console.log("enter handledrop");

    let prom = new Promise((resolve, reject) => {
      let passing = event.target.value;
      console.log(passing);
      if (!this.state.currentProblem == '') {
        resolve(passing);
      }
      else {
        reject('Data didnt change');
      }

    })
    prom.then((result) => {
      this.setState({ currentProblem: result });
    })
      .then(() => {
        this.setCurrent();
      })
      .then(() => {

      })
      .catch((result) => {
        console.log(result)
      })


  }
  setCurrent() {
    fetch(`http://${host}:4000/problemfields?pname=${this.state.currentProblem}`)
      .then(response => response.json())
      .then(({ data }) => {
        var enames = ["pname", "field1", "field2", "field3", "field4", "field5", "field6", "field7", "field8", "field9"];
        var fields = [];
        var job = data[0];
        for (var i = 1; i < enames.length; i++) {

          if (job[enames[i]] !== null) {
            fields[i - 1] = job[enames[i]];
          }
        }
        this.setState({ problemFieldsNames: fields });
      })
      .catch(err => console.error()
      )
  }

  handleProduct(event) {
    this.setState({ currentProduct: event.target.value })
  }
  //////////////////////////////////////////Insert to database - save report
  handleClick(e) {
    e.preventDefault();
    ////////////////////// cleared form data ///////////////////////////////
    var nexts = { caseID: '', name: '', customerName: '', description: '', date: new Date() };
    var copiedContents = this.state.problemFieldsContent;
    var result = copiedContents.map(f => {
      return { val: '' };

    });

    /////////////////////////////////////////////////////////////////////////////////
    if (e.target.name === 'save') {
      if (this.state.description === '' || this.state.caseID === '' || this.state.customerName === '' ||
        this.state.currentProduct === 'Select the Product!' || this.state.currentProblem === 'Select the Problem!') {
        alert("please check the input values ");
      }
      else {
        alert("General Info inserted");
        const axios = require('axios');
        axios.post(`http://${host}:4000/generalinfo/add?startdate=${this.formatDate()}&caseid=${this.state.caseID}
        &gpsproduct=${this.state.currentProduct}&fromcompletedby=${this.state.name}&customername=${this.state.customerName}
        &pname=${this.state.currentProblem}`, {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            data: {
              description: this.state.description
            }
          })
        axios.post(`http://${host}:4000/fieldcontents/add?caseid=${this.state.caseID}&pname=${this.state.currentProblem}&field1=${this.state.problemFieldsContent[0].val}&field2=${this.state.problemFieldsContent[1].val}&field3=${this.state.problemFieldsContent[2].val}
      &field4=${this.state.problemFieldsContent[3].val}&field5=${this.state.problemFieldsContent[4].val}&field6=${this.state.problemFieldsContent[5].val}&field7=${this.state.problemFieldsContent[6].val}&field8=${this.state.problemFieldsContent[7].val}&field9=${this.state.problemFieldsContent[8].val}`, {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            data: {
              caseid: this.state.caseID,
              pname: this.state.currentProblem,
              field1: this.state.problemFieldsContent[0],
              field2: this.state.problemFieldsContent[1],
              field3: this.state.problemFieldsContent[2],
              field4: this.state.problemFieldsContent[3],
              field5: this.state.problemFieldsContent[4],
              field6: this.state.problemFieldsContent[5],
              field7: this.state.problemFieldsContent[6],
              field8: this.state.problemFieldsContent[7],
              field9: this.state.problemFieldsContent[8]
            }
          })
          .then(function (response) {
            // handle success
            console.log(response.data);
            alert("Report Saved!");
            console.log("description is printibng");

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            //  this.setState();



          });
      }


      this.setState(nexts);
      this.setState({ problemFieldsContent: result });
      console.log(result);

    }




  }
  formatDate() {
    var result = '';
    result = result.concat(this.state.date.getFullYear()).concat('-');

    result = result.concat(this.state.date.getMonth() + 1).concat('-');
    result = result.concat(this.state.date.getDate());
    return result;
  }


  render() {
    return (
      <div >

        <Container>
          <Row>
            <Col>
              <header className='header' bg="blue" style={{ fontSize: 20 }}>
                Please Select the date!</header>
              <DatePicker size="lg" dateFormat="yyyy/MM/dd" type="text"
                selected={this.state.date} onChange={this.handleDate} withPortal showMonthDropdown strictParsing></DatePicker>
              <hr></hr>
              <div className='row'  >
                <div className='six columns'>
                  <label>Case ID: </label>
                  <input name='caseID'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.caseID}
                  />
                </div>
              </div>
              <hr></hr>
              <Row>

                <DropdownButton id="dropdown-item-button" title={this.state.currentProduct} size="lg">
                  {<ProductMenu func={this} />}
                </DropdownButton>
              </Row>
              <hr></hr>
              <div className='row'>
                <div className='six columns'>
                  <label>Reporter: </label>
                  <input name='name'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='six columns'>
                  <label>Customer Name : </label>
                  <input name='customerName'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.customerName}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='six columns'>
                  <label>  Description: </label>
                  <textarea style={{ height: '150px', width: '400px',overflowY: 'scroll', overflowX: 'hidden'}} name='description'
                    className='u-full-width'

                    type='textarea'
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </div>
              </div>

            </Col>
            <Col >
              <DropdownButton id="dropdown-item-button" title={this.state.currentProblem} size="lg">
                {<ProblemMenu func={this} />}
              </DropdownButton>
              {<ProblemView func={this}>view geldi </ProblemView>}
            </Col>

          </Row>
        </Container>
        <Container>
          <Button onClick={this.handleClick} name='save' variant="danger" size="lg" active block>
            Save Report
        </Button>
        </Container>


      </div>
    )
  }
}
export default General;

function ProblemView(props) {
  console.log("problemview a girildi");
  console.log(props.func.state.problemFieldsNames.length);
  var elements = [];
  for (var i = 0; i < props.func.state.problemFieldsNames.length; i++) {
    elements.push(
      <div key={i}  >
        <hr></hr>
        <label>{props.func.state.problemFieldsNames[i]}: </label>
        <input name={props.func.state.problemFieldsNames[i]
        }
          placeholder={i}
          className='u-full-width'

          type='text'
          onChange={props.func.handleFieldContent}
          value={props.func.state.problemFieldsContent[i].val}
        />

      </div>
    )
  }
  return elements;

}

/// Drop down items for product types 
function ProductMenu(props) {
  var elements = [];
  for (var i = 0; i < props.func.state.productTypes.length; i++) {
    console.log(props.func.state.productTypes.length);
    console.log(props.func.state.productTypes[i].productname);
    elements.push(
      <Dropdown.Item key={i} as="button" name='productTypes' onClick={props.func.handleProduct}
        value={props.func.state.productTypes[i].productname}> {props.func.state.productTypes[i].productname} </Dropdown.Item>
    )
  }
  return elements;
}
/// Drop down items for problem types 
function ProblemMenu(props) {
  var elements = [];
  for (var i = 0; i < props.func.state.problemTypes.length; i++) {
    elements.push(
      <Dropdown.Item key={i} as="button" name='problemTypes' onClick={props.func.handleDrop}
        value={props.func.state.problemTypes[i].problemname}> {props.func.state.problemTypes[i].problemname} </Dropdown.Item>
    )

  }
  return elements;
}
