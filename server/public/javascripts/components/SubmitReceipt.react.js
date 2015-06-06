/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 10:19:44
* @Last Modified by:   nathanbailey
* @Last Modified time: 2015-06-06 12:03:05
*/

var React = require('react');
var AppStore = require('../stores/AppStore');
var NameInputForm = require('./NameInputForm.react');
var TipPercentInputForm = require('./TipPercentInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var LoadingView = require('./LoadingView.react');
var Router = require('react-router');


// helper function to pull changes from the stores
var getSubmitState = function() {
  return {
     userName: AppStore.getUserName(),
     billName: AppStore.getBillName(),
     isLoading: AppStore.getIsLoading(),
     tipPercent: AppStore.getTipPercent()
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
    AppStore.addChangeListener(this._onChange);
  },
  // Removes change listener fom stores
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },
  // Render the row!
  render: function(){
    return (
      <div className="submitReceipt">
        <NameInputForm userName={this.state.userName} />
        <TipPercentInputForm tipPercent={this.state.tipPercent} userName={this.state.userName} />
        <CameraImageCapture isLoading={this.state.isLoading} userName={this.state.userName}  tipPercent={this.state.tipPercent}/>
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
    if(this.state.billName.length > 0) {
      this.transitionTo('/'+this.state.billName);
    } 
  }

});

module.exports = SubmitReceipt;