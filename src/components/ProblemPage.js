
import React, { Component } from 'react';


class ProblemPage extends Component {
    constructor(props){
      super(props)
      this.state = {
        from: '',
        toLoad: '',
        currentLoad: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
      console.log('changed');
    }
    handleClick(e) {
      console.log('clicked');
    }
  
 
 
   render() {
    console.log(this.props.proplem);
    if(this.props.proplem === 'Hardware'){
      return (
      
        <div>
          <hr></hr>
          <label>Current Load: </label>
                  <input name='currentLoad'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.currentLoad}
                  />

        </div>
      );
     
    }
    else if(this.props.proplem === 'Upgrade'){
         return (
      
        <div>
          <hr></hr>
          <label>from: </label>
                  <input name='from'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.from}
                  />
                   <label>to Load: </label>
                  <input name='toLoad'
                    className='u-full-width'

                    type='text'
                    onChange={this.handleChange}
                    value={this.state.toLoad}
                  />

        </div>
      );
      
    }
    else {
      return (
        <div>
          <header>laaaaaaaaaaaaan</header>
        </div>
      );
    }
   }






 }
 
 export default ProblemPage;