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
    verticalAlign: _react2['default'].PropTypes.bool,
    scrollBar: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    sectionClassName: _react2['default'].PropTypes.string
  },

  childContextTypes: {
    verticalAlign: _react2['default'].PropTypes.bool,
    sectionClassName: _react2['default'].PropTypes.string
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
      verticalAlign: false,
      scrollBar: false,
      className: 'SectionContainer',
      sectionClassName: 'Section',
      anchors: []
    };
  },

  getChildContext: function getChildContext() {
    return {
      verticalAlign: this.props.verticalAlign,
      sectionClassName: this.props.sectionClassName
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this._handleResize);

    if (!this.props.scrollBar) {
      this._addCSS3Scroll();
      this._handleAnchor(); //Go to anchor in case we found it in the URL
      window.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes
    }
  },

  _addCSS3Scroll: function _addCSS3Scroll() {
    this._addOverflowToBody();
    this._addHeightToParents();
    this._addMouseWheelEventHandlers();
  },

  _addAnchorsToChildren: function _addAnchorsToChildren() {
    var index = 0;
    return _react2['default'].Children.map(this.props.children, (function (child) {
      var id = this.props.anchors[index];
      index++;
      if (id) {
        return _react2['default'].cloneElement(child, {
          id: id
        });
      } else {
        return child;
      }
    }).bind(this));
  },

  _addOverflowToBody: function _addOverflowToBody() {
    document.querySelector('body').style.overflow = 'hidden';
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
    var position = this.state.sectionScrolledPosition + delta * this.state.windowHeight;
    var activeSection = this.state.activeSection - delta;
    var maxPosition = 0 - this.props.children.length * this.state.windowHeight;

    if (position > 0 || maxPosition === position || this.state.scrollingStarted) {
      return this._addMouseWheelEventHandlers();
    }

    var index = this.props.anchors[activeSection];
    if (!this.props.anchors.length || index) {
      window.location.hash = '#' + index;
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

  _handleAnchor: function _handleAnchor() {
    var hash = window.location.hash.substring(1);
    var index = this.props.anchors.indexOf(hash);
    var position = 0 - index * this.state.windowHeight;

    if (!this.props.anchors.length || index === -1) {
      return false;
    }

    this.setState({
      activeSection: index,
      sectionScrolledPosition: position
    });

    //  history.pushState(null, null, window.location);
  },

  render: function render() {
    var containerStyle = {
      height: '100%',
      width: '100%',
      position: 'relative',
      transform: 'translate3d(0px, ' + this.state.sectionScrolledPosition + 'px, 0px)',
      transition: 'all ' + this.props.delay + 'ms ease'
    };

    return _react2['default'].createElement(
      'div',
      { className: this.props.className, style: containerStyle },
      this.props.scrollBar ? this._addAnchorsToChildren() : this.props.children
    );
  }

});

exports['default'] = SectionsContainer;
module.exports = exports['default'];