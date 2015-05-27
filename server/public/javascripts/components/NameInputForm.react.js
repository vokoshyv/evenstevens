/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 15:29:26
*/

var React = require('react');
var AppActions = require('../actions/AppActions')

var NameInputForm = React.createClass({
  getInitialState: function(){
    return {message: ""};
  },

  _handleInput: function(e){

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
      <form className ="inputForm" onSubmit={this._handleInput}>
        <input type="text" placeholder="Enter your name" ref="name" />
        <input type="submit" value="Keep it even" />
        <div className ="errorBox"> {this.state.message}</div>
      </form>
    );
  }
});


module.exports = NameInputForm;