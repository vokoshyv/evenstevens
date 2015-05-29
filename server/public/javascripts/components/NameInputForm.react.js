/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 13:42:56
*/

var React = require('react');
var AppActions = require('../actions/AppActions');

var NameInputForm = React.createClass({
  getInitialState: function(){
    return {message: ""};
  },

  handleInput: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    if(!name) {
      this.setState({message:"Please enter your name"});
      return;
    }
    this.setState({message:""});

    // Call actions
    AppActions.addUser(name);

    React.findDOMNode(this.refs.name).value = '';
    return;
  },
  render: function() {

    if(this.props.userName.length > 0) {
      return null;
    }

    return (
      <div className = "u-full-width">
      <form className ="inputForm " onSubmit={this.handleInput}>
        <input className = "u-full-width" type="text" placeholder="Enter your name" ref="name" />
        <input className = "u-full-width button-primary" type="submit" value="Keep it even" />
        <div className ="errorBox"> {this.state.message}</div>
      </form>
      </div>
    );
  }
});


module.exports = NameInputForm;