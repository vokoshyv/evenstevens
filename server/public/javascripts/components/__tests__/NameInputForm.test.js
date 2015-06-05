/* 
* @Author: Johnny Nguyen
* @Date:   2015-05-29 15:12:30
* @Last Modified by:   Johnny Nguyen
* @Last Modified time: 2015-06-04 16:46:02
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
    });

  it('expects prevented spaces', function() {
    TestUtils.Simulate.keyPress(inputs[0], {key: ' '});
    expect(node.state.errMessage).toEqual('Only alphanumeric characters allowed.');
    expect(node.state.billName).toEqual('');
  });

  it('expects error on non-alphanumeric characters', function() {
    node.state.billName = 'johnn';
    TestUtils.Simulate.keyPress(inputs[0], {key: '!'});
    TestUtils.Simulate.submit(form);
    expect(node.state.errMessage).toEqual('Only alphanumeric characters allowed.');
    expect(node.state.billName).toEqual('johnn');
  });
});