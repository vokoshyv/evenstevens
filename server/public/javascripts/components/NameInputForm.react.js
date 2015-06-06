/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 16:25:39
*/

var React = require('react');
var AppActions = require('../actions/AppActions');
var validBillName = require('../../../utils/regex').billName();

/**
 * This component accepts billName input
 */
var NameInputForm = React.createClass({
  /**
   * Get initial state.
   */
  getInitialState: function(){
    return {
      errMessage: '',
      billName: ''
    };
  },
  /**
   * Performs validation on key press and saves to state.
   * @param {Event} e The billName input onKeyPress event.
   */
  handleKeyPress: function(e) {
    this.setState({errMessage: ""});

    if (e.key.search(validBillName) === -1) {
      this.setState({errMessage: "Only alphanumeric characters allowed."});
      e.preventDefault();
      return;
    }

    if (e.key !== "Enter") {
      var billName = e.target.value + e.key;

      if (billName.length > 10) {
        this.setState({errMessage: "Name must be less than 10 characters."});
        e.preventDefault();
        return;
      }
      
      this.setState({billName: e.target.value + e.key});  
    }
  },
  /**
   * Submits the form.
   * @param {Event} e The form onSubmit event.
   */
  handleInput: function(e, holler, at, foobar){
    e.preventDefault();
    
    var billName = this.state.billName;
    var name = React.findDOMNode(this.refs.name).value.trim();
    
    // empty billName validation
    if (!billName) {
      this.setState({errMessage:"Please enter your name."});
      return;
    }

    // join room here if not master client
    if (this.props.joinRoom)  { 
      var url = window.location.href.split('/');  
      AppActions.joinSocketRoom(url[url.length - 1], billName);
    }

    // clear error message
    this.setState({errMessage:""});

    // initiate addUser action
    AppActions.addUser(billName);

    ////////////////////////////////////////////////////
    // NATE: I don't think line is necessary 
    // clear input field
    // React.findDOMNode(this.refs.name).value = '';
    ////////////////////////////////////////////////////
    
    return;
  },
  /**
   * Render form HTML for billName.
   */
  render: function() {
    // Hide if billName has previously been input
    if (this.props.userName) {
      return null;
    }
  
    return (
      <form className="form" onSubmit={this.handleInput}>
        <div className="form-group">
          <input className="form-control input-lg"  type="text" placeholder="Enter your name" ref="name" onKeyPress={this.handleKeyPress} />
        </div>
        <button className="btn-lg btn-primary" type="submit" value="Keep It Even">Keep It Even</button>
        <div className="errorBox"> {this.state.errMessage}</div>
      </form>
    );
  }
});

module.exports = NameInputForm;