'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Footer = _react2['default'].createClass({
  displayName: 'Footer',

  render: function render() {
    var footerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      bottom: '0'
    };

    return _react2['default'].createElement(
      'footer',
      { style: footerStyle },
      this.props.children
    );
  }

});

exports['default'] = Footer;
module.exports = exports['default'];