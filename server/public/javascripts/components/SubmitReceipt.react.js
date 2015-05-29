/* 
* @Author: Nathan Bailey
* @Date:   2015-05-29 10:19:44
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-29 13:36:01
*/

var React = require('react');
var UserStore = require('../stores/AppStore');
var ReceiptStore = require('../stores/ReceiptStore');
var NameInputForm = require('./NameInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var Router = require('react-router');



var getSubmitState = function() {
  return {
     userName: UserStore.getUserName(),
     imageBeingProcessed: UserStore.getBeingProcessed(),
  }
};


var SubmitReceipt = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function() {
    return getSubmitState();
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    ReceiptStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    ReceiptStore.removeChangeListener(this._onChange);
  },


 render: function(){
    return (<div className = "row"> 
      <NameInputForm  userName={this.state.userName} />
      <CameraImageCapture imageBeingProcessed={this.state.imageBeingProcessed} userName={this.state.userName}  />
      </div>);
 },
  _onChange: function() {
    var self = this;

    if(ReceiptStore.receiptIsLoaded()) {
      console.log("redirect now!");
      this.transitionTo('/'+this.state.userName);
    } else {
      this.setState(getSubmitState());

    }
  }

});

module.exports = SubmitReceipt;