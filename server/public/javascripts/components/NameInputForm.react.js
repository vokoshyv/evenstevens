/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
*
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-13 17:33:26
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
      var billName = (e.target.value + e.key).toLowerCase();

      if (billName.length > 10) {
        this.setState({errMessage: "Name must be less than 10 characters."});
        e.preventDefault();
        return;
      }
      
      this.setState({billName: billName});
    }
  },
  /**
   * Submits the form.
   * @param {Event} e The form onSubmit event.
   */
  handleInput: function(e){
    e.preventDefault();
    
    var billName = this.state.billName.toLowerCase();
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
      <div className = "name-input-wrapper">
      <div className="landingPage"> 
        <div className="brand">
          <h2>Even Stevens</h2>
        </div>
        <img src = "../../images/even-stevens-logo.png" />


        <h1>Interactive Bill Splitting</h1>

        <form className="form name-form" onSubmit={this.handleInput}>
          <div className="form-group">
            <input className="name-input form-control input-lg"  type="text" placeholder="Enter your name to begin" ref="name" onKeyPress={this.handleKeyPress} />
          </div>
          <input className ="btn btn-primary submit-btn" type="submit" />
          <div className="errorBox"> {this.state.errMessage}</div>
        </form>
        
      </div>

      <div className="marketing bringItDown">
        <div className="row">
          <div className="col-md-6 darken marketingWords">
            <h1>Take a Picture</h1>
            <h1>Claim your items</h1>
            <h1>Know what you owe</h1>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-4 darken marketingWords">
            <p>We, at Even Stevens, grew tired of dealing with
            unnecessary stress when it came time to divide up 
            the bill at large dinner parties. Why not tap into 
            a resource that all of us carry around twenty-four
            seven? Whenever you&#39;re out eating dinner with your 
            friends, just remember: keep it Even Stevens </p>
          </div>
          <div className="col-md-12">
            <div className="row marketingPhones">
              <div className="col-md-3">
                <img src="images/iphone1.png" className="img-responsive"></img>
              </div>
              <div className="col-md-3">
                <img src="images/iphone2.png" className="img-responsive"></img>
              </div>
              <div className="col-md-3">
                <img src="images/iphone3.png" className="img-responsive"></img>
              </div>
              <div className="col-md-3">
                <img src="images/iphone4.png" className="img-responsive"></img>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright row darken">
          <div className="col-md-4">
            <p>Decentralized Saxophone</p>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-1">
            <a href="https://github.com/decentralizedsaxophone/evenstevens">
              <p>GitHub</p>
            </a>
          </div>
          <div className="col-md-1"></div>
        </div>

      </div>
      
      </div>
    );
  }
});

module.exports = NameInputForm;