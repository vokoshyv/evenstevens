/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-29 16:05:17
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-05-29 16:06:09
*/

'use strict';

// CheckboxWithLabel.js

var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        ></input>
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
});

module.exports = CheckboxWithLabel;