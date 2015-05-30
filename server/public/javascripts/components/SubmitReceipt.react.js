/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 10:19:44
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-30 16:39:59
*/

var React = require('react');
var UserStore = require('../stores/UserStore');
var ReceiptStore = require('../stores/ReceiptStore');
var NameInputForm = require('./NameInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var LoadingView = require('./LoadingView.react');
var Router = require('react-router');


// helper function to pull changes from the stores
var getSubmitState = function() {
  return {
     userName: UserStore.getUserName(),
     billName: ReceiptStore.getBillName(),
     isLoading: UserStore.getIsLoading()
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
      <NameInputForm userName={this.state.userName} />
      <CameraImageCapture isLoading={this.state.isLoading}  userName={this.state.userName} />
      <LoadingView isLoading={this.state.isLoading} />
      </div>
      );
  },
  // This method is called when changes occur in the store, 
  // pulling data to update the state, which flows into the
  // state of nested components
  _onChange: function() {
    var self = this;
    // Once receipt is loaded, this triggers a transition
    // to receipt list route
    this.setState(getSubmitState());
    console.log("bill ", this.state.billName);
    if(this.state.billName.length > 0) {
      console.log("transit!")
      this.transitionTo('/'+this.state.billName);
    } 
  }

});

module.exports = SubmitReceipt;