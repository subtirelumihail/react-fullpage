'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Header = _react2['default'].createClass({
  displayName: 'Header',

  render: function render() {
    var headerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      top: '0'
    };

    return _react2['default'].createElement(
      'header',
      { style: headerStyle },
      this.props.children
    );
  }

});

exports['default'] = Header;
module.exports = exports['default'];