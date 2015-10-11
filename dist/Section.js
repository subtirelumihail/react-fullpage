'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Section = _react2['default'].createClass({
  displayName: 'Section',

  propTypes: {
    color: _react2['default'].PropTypes.string
  },

  contextTypes: {
    verticalAlign: _react2['default'].PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      windowHeight: window.innerHeight
    };
  },

  handleResize: function handleResize() {
    this.setState({
      windowHeight: window.innerHeight
    });
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function render() {
    var alignVertical = this.props.verticalAlign || this.context.verticalAlign;

    var sectionStyle = {
      backgroundColor: this.props.color || 'green',
      height: this.state.windowHeight,
      width: '100%',
      display: alignVertical ? 'table' : 'block'
    };

    return _react2['default'].createElement(
      'div',
      { className: 'Section', style: sectionStyle },
      alignVertical ? this._renderVerticalAlign() : this.props.children
    );
  },

  _renderVerticalAlign: function _renderVerticalAlign() {
    var verticalAlignStyle = {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '100%'
    };

    return _react2['default'].createElement(
      'div',
      { style: verticalAlignStyle },
      this.props.children
    );
  }
});

exports['default'] = Section;
module.exports = exports['default'];