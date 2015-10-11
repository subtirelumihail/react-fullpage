'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var SectionsContainer = _react2['default'].createClass({
  displayName: 'SectionsContainer',

  propTypes: {
    delay: _react2['default'].PropTypes.number,
    verticalAlign: _react2['default'].PropTypes.bool
  },

  childContextTypes: {
    verticalAlign: _react2['default'].PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      activeSection: 0,
      scrollingStarted: false,
      sectionScrolledPosition: 0,
      windowHeight: window.innerHeight
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      delay: 1000,
      verticalAlign: false
    };
  },

  getChildContext: function getChildContext() {
    return {
      verticalAlign: this.props.verticalAlign
    };
  },

  componentWillMount: function componentWillMount() {
    document.querySelector('body').style.overflow = 'hidden';
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this._handleResize);
    this._addHeightToParents();
    this._addMouseWheelEventHandlers();
  },

  _addHeightToParents: function _addHeightToParents() {
    var child = _reactDom2['default'].findDOMNode(this);
    var previousParent = child.parentNode;

    while (previousParent) {
      if ('style' in previousParent) {
        previousParent.style.height = '100%';
        previousParent = previousParent.parentNode;
      } else {
        return false;
      }
    }
  },

  _addMouseWheelEventHandlers: function _addMouseWheelEventHandlers() {
    window.addEventListener('mousewheel', this._mouseWheelHandler, false);
    window.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false);
  },

  _removeMouseWheelEventHandlers: function _removeMouseWheelEventHandlers() {
    window.removeEventListener('mousewheel', this._mouseWheelHandler);
    window.removeEventListener('DOMMouseScroll', this._mouseWheelHandler);
  },

  _mouseWheelHandler: function _mouseWheelHandler() {
    var _this = this;

    this._removeMouseWheelEventHandlers();

    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    var activeSection = this.state.activeSection - delta;
    var position = this.state.sectionScrolledPosition + delta * this.state.windowHeight;
    var maxPosition = 0 - this.props.children.length * this.state.windowHeight;

    if (position > 0 || maxPosition === position || this.state.scrollingStarted) {
      this._addMouseWheelEventHandlers();
      return false;
    }

    this.setState({
      activeSection: activeSection,
      scrollingStarted: true,
      sectionScrolledPosition: position
    });

    setTimeout(function () {
      _this.setState({
        scrollingStarted: false
      });
      _this._addMouseWheelEventHandlers();
    }, this.props.delay + 300);
  },

  _handleResize: function _handleResize() {
    var position = 0 - this.state.activeSection * window.innerHeight;
    this.setState({
      windowHeight: window.innerHeight,
      sectionScrolledPosition: position
    });
  },

  render: function render() {
    var containerStyle = {
      transform: 'translate3d(0px, ' + this.state.sectionScrolledPosition + 'px, 0px)',
      transition: 'all ' + this.props.delay + 'ms ease',
      height: '100%',
      width: '100%'
    };

    return _react2['default'].createElement(
      'div',
      { className: 'SectionContainer', style: containerStyle },
      this.props.children
    );
  }

});

exports['default'] = SectionsContainer;
module.exports = exports['default'];