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
    verticalAlign: _react2['default'].PropTypes.bool,
    sectionClassName: _react2['default'].PropTypes.string,
    sectionPaddingTop: _react2['default'].PropTypes.string,
    sectionPaddingBottom: _react2['default'].PropTypes.string
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
      width: '100%',
      display: alignVertical ? 'table' : 'block',
      height: this.state.windowHeight,
      maxHeight: this.state.windowHeight,
      overflow: 'scroll',
      backgroundColor: this.props.color,
      paddingTop: this.context.sectionPaddingTop,
      paddingBottom: this.context.sectionPaddingBottom
    };

    return _react2['default'].createElement(
      'div',
      { className: this.context.sectionClassName + (this.props.className ? ' ' + this.props.className : ''), id: this.props.id, style: sectionStyle },
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