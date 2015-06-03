/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-29 15:12:30
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-02 20:20:24
*/

jest.dontMock('../NameInputForm.react.js');
jest.dontMock('../../../../utils/regex');

describe('NameInputForm', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var NameInputForm = require('../NameInputForm.react.js');
    
    var node;
    var form;
    var inputs; 

    beforeEach(function() {
      node = TestUtils.renderIntoDocument(<NameInputForm />);
      form = TestUtils.findRenderedDOMComponentWithTag(node, 'form');
      inputs = TestUtils.scryRenderedDOMComponentsWithTag(node, 'input');

      node.handleInput = jest.genMockFunction();
      node.state.errMessage = '';
    });

  it('expects trimmed spaces', function() {
    inputs[0].getDOMNode().value = ' johnny ';
    TestUtils.Simulate.submit(form);
    expect(node.state.errMessage).toEqual('');
    expect(node.state.billName).toEqual('johnny');
  });

  it('expects error on inner spaces', function() {
    inputs[0].getDOMNode().value = ' johnny tsunami ';
    TestUtils.Simulate.submit(form);
    expect(node.state.errMessage).toEqual('Only alphanumeric characters allowed');
  });

  it('expects error on non-alphanumeric characters', function() {
    inputs[0].getDOMNode().value = 'johnny!';
    TestUtils.Simulate.submit(form);
    expect(node.state.errMessage).toEqual('Only alphanumeric characters allowed');
  });  

  it('expects error on empty value', function() {
    inputs[0].getDOMNode().value = '';
    TestUtils.Simulate.submit(form);
    expect(node.state.errMessage).toEqual('Please enter your name');
  });
});