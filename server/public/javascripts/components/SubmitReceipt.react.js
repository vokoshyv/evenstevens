/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 10:19:44
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 15:25:06
*/

var React = require('react');
var UserStore = require('../stores/AppStore');
var ReceiptStore = require('../stores/ReceiptStore');
var NameInputForm = require('./NameInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var Router = require('react-router');


// helper function to pull changes from the stores
var getSubmitState = function() {
  return {
     userName: UserStore.getUserName(),
     imageBeingProcessed: UserStore.getBeingProcessed(),
  }
};

// This view-controller component houses components for
// the input of username and image
var SubmitReceipt = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function() {
    return getSubmitState();
  },
  // Adds change listener to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    ReceiptStore.addChangeListener(this._onChange);
  },
  // Removes change listener fom stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    ReceiptStore.removeChangeListener(this._onChange);
  },
  // Render the row!
  render: function(){
    return (<div className = "row"> 
      <NameInputForm  userName={this.state.userName} />
      <CameraImageCapture imageBeingProcessed={this.state.imageBeingProcessed} userName={this.state.userName}  />
      </div>);
  },
  // This method is called when changes occur in the store, 
  // pulling data to update the state, which flows into the
  // state of nested components
  _onChange: function() {
    var self = this;
    // Once receipt is loaded, this triggers a transition
    // to receipt list route
    if(ReceiptStore.receiptIsLoaded()) {
      this.transitionTo('/'+this.state.userName);
    } else {
      this.setState(getSubmitState());

    }
  }

});

module.exports = SubmitReceipt;