/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:46:34
* @Last Modified by:   Nathan Bailey
* @Last Modified time: 2015-05-27 15:17:44
*/

/** 
 * This component is the "Controller View"
 * 
 */

var NameInputForm = require('./NameInputForm.react');
var CameraImageCapture = require('./CameraImageCapture.react');
var React = require('react');
var AppStore = require('../stores/AppStore');

var getAppState = function() {
  return {
    userName: AppStore.getUserName()
    // receiptItems : ReceiptStore.getAll(),
    // nameInput: ReceiptStore.nameNotInput().
    // showCameraBtn: ReceiptStore.imageNotInput()
  }
};

var EvenStevensApp = React.createClass({
  getInitialState: function() {
    return getAppState();
    
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        <h1>Even Stevens</h1>
        <NameInputForm userName={this.state.userName} />
      </div>
    );
  },
  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = EvenStevensApp;