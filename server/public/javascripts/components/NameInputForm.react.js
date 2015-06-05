/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-04 19:51:51
*/

var React = require('react');
var AppActions = require('../actions/AppActions');
var validBillName = require('../../../utils/regex').billName();

// This component accepts userName input
var NameInputForm = React.createClass({
  // initial error message set to empty string
  getInitialState: function(){
    return {
      errMessage: '',
      billName: ''
    };
  },
  checkSpace: function(e) {
    if (e.which === 32) {
      e.preventDefault();
    }
  },
  handleInput: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    // if input field empty, display error message and return
    if(!name) {
      this.setState({errMessage:"Please enter your name"});
      return;
      
    } else if (this.props.joinRoom)  { // join room here if not master client
        var url = window.location.href.split('/');  
        AppActions.joinSocketRoom(url[url.length-1],name);
    }

    if(name.search(validBillName) === -1) {
      this.setState({errMessage: "Only alphanumeric characters allowed"});
      return;
    }

    this.setState({billName: name});

    // clear error message
    this.setState({errMessage:""});

    // initiate addUser action
    AppActions.addUser(name);

    // clear input field
    React.findDOMNode(this.refs.name).value = '';
    return;
  },
  // Draw dat div
  render: function() {
    // If userName has previously been input, hide input
    // field
    if(this.props.userName) {
      return null;
    }
    // Display name input dif
    return (
      <div className="">
      <form className ="inputForm " onSubmit={this.handleInput}>
        <input className = "u-full-width" type="text" placeholder="Enter your name" onKeyPress={this.checkSpace} ref="name" />
        <input className = "u-full-width button-primary" type="submit" value="Keep it even" />
        <div className ="errorBox"> {this.state.errMessage}</div>
      </form>
      </div>
    );
  }
});

module.exports = NameInputForm;

       // <input className = "u-full-width btn orange" type="submit" value="Keep it even" />