/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:46:34
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-28 17:13:25
*/

/** 
 * This component is the "Controller View"
 * 
 */

var NameInputForm = require('./NameInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var ReceiptList = require('./ReceiptList.react');
var React = require('react');
var AppStore = require('../stores/AppStore');
var ReceiptStore = require('../stores/ReceiptStore');
var Navbar= require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var getAppState = function() {
  return {
    userName: AppStore.getUserName(),
    imageBeingProcessed: AppStore.getBeingProcessed(),
    receiptItems: ReceiptStore.getReceiptItems()
  }
};

var EvenStevensApp = React.createClass({
  getInitialState: function() {
    return getAppState();
    
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    ReceiptStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
    ReceiptStore.removeChangeListener(this._onChange);
  },


  render: function() {
    return (
      <div>
        <Navbar brand='Even Stevens'  toggleNavKey={0}>
    <Nav right eventKey={0}> {/* This is the eventKey referenced */}
      <NavItem eventKey={1} href='#'>Link</NavItem>
      <NavItem eventKey={2} href='#'>Link</NavItem>
      
    </Nav>
  </Navbar>
      <div className = "container">
        <NameInputForm userName={this.state.userName} />
        <CameraImageCapture imageBeingProcessed={this.state.imageBeingProcessed} userName={this.state.userName} />
        <ReceiptList receiptItems={this.state.receiptItems} />
        </div>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = EvenStevensApp;