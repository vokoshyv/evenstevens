/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 15:24:12
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

// This component accepts userName input
var NameInputForm = React.createClass({
  // initial error message set to empty string
  getInitialState: function(){
    return {errMessage: ""};
  },
  handleInput: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    // if input field empty, display error message and return
    if(!name) {
      this.setState({errMessage:"Please enter your name"});
      return;
    }
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
    if(this.props.userName.length > 0) {
      return null;
    }
    // Display name input dif
    return (
      <div className = "u-full-width">
      <form className ="inputForm " onSubmit={this.handleInput}>
        <input className = "u-full-width" type="text" placeholder="Enter your name" ref="name" />
        <input className = "u-full-width button-primary" type="submit" value="Keep it even" />
        <div className ="errorBox"> {this.state.errMessage}</div>
      </form>
      </div>
    );
  }
});

module.exports = NameInputForm;