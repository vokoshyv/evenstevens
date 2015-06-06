/* 
* @Author: Johnny Nguyen
* @Date:   2015-06-05 14:41:39
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 19:25:41
*/

/* 
* @Author: Nathan Bailey
* @Date:   2015-05-27 10:53:40
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-05 11:52:51
*/

var React = require('react');
var AppActions = require('../actions/AppActions');
var validBillName = require('../../../utils/regex').billName();
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

/**
 * This component accepts billName input
 */
var TipPercentInputForm = React.createClass({
  /**
   * Get initial state.
   */
  getInitialState: function(){
    return {
      tipPercent: 0
    };
  },
  /**
   * Submits the form.
   * @param {Event} e The form onSubmit event.
   */
  handleSubmit: function(e){
    e.preventDefault();
    
    var tipPercent = e.target.value;
    console.log(e.target.value)
    
    // not sure if setting tip percent is necessary
    this.setState({tipPercent: tipPercent});

    // initiate addUser action
    AppActions.addTipPercent(tipPercent);
    
    console.log(this.props)
    return;
  },
  /**
   * Render form HTML for billName.
   */
  render: function() {
    // Hide if tipPercent has previously been input
    // if (!this.props.billName) {
    //   return null;
    // }
    console.log(this.props)
    console.log(!!this.props.billName)
    if (!this.props.userName) {
      console.log('billname')
      return null;
    }

    if (this.props.tipPercent) {
      console.log('tip')
      return null;
    }
    
    return (
      <div className = "btn-group btn-group-justified" role="group">
        <ButtonGroup bsSize="large">
          <Button onClick={this.handleSubmit} value='.15'>15%</Button>
        </ ButtonGroup>
        <ButtonGroup bsSize="large">
          <Button onClick={this.handleSubmit} value='.18'>18%</Button>
        </ ButtonGroup>
        <ButtonGroup bsSize="large">
          <Button onClick={this.handleSubmit} value='.20'>20%</Button>
        </ ButtonGroup>
      </div>
    );
  }
});

module.exports = TipPercentInputForm;