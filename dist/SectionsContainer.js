'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionsContainer = function (_Component) {
  _inherits(SectionsContainer, _Component);

  function SectionsContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SectionsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SectionsContainer.__proto__ || Object.getPrototypeOf(SectionsContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeSection: _this.props.activeSection,
      scrollingStarted: false,
      sectionScrolledPosition: 0,
      windowHeight: 0
    }, _this.removeDefaultEventListeners = function () {
      window.removeEventListener('resize', _this.handleResize);
      window.removeEventListener('hashchange', _this.handleAnchor);

      if (_this.props.arrowNavigation) {
        window.removeEventListener('keydown', _this.handleArrowKeys);
      }
    }, _this.addCSS3Scroll = function () {
      _this.addOverflowToBody();
      _this.addMouseWheelEventHandlers();
    }, _this.addActiveClass = function () {
      _this.removeActiveClass();

      var hash = window.location.hash.substring(1);
      var activeLinks = document.querySelectorAll('a[href="#' + hash + '"]');

      for (var i = 0; i < activeLinks.length; i++) {
        activeLinks[i].className = activeLinks[i].className + (activeLinks[i].className.length > 0 ? ' ' : '') + ('' + _this.props.activeClass);
      }
    }, _this.removeActiveClass = function () {
      var activeLinks = document.querySelectorAll('a:not([href="#' + _this.props.anchors[_this.state.activeSection] + '"])');

      for (var i = 0; i < activeLinks.length; i++) {
        activeLinks[i].className = activeLinks[i].className.replace(/\b ?active/g, '');
      }
    }, _this.addChildrenWithAnchorId = function () {
      var index = 0;

      return _react.Children.map(_this.props.children, function (child) {
        var id = _this.props.anchors[index];

        index++;

        if (id) {
          return (0, _react.cloneElement)(child, {
            id: id
          });
        } else {
          return child;
        }
      });
    }, _this.addOverflowToBody = function () {
      document.querySelector('body').style.overflow = 'hidden';
    }, _this.removeOverflowFromBody = function () {
      document.querySelector('body').style.overflow = 'initial';
    }, _this.addMouseWheelEventHandlers = function () {
      window.addEventListener('mousewheel', _this.handleMouseWheel, false);
      window.addEventListener('DOMMouseScroll', _this.handleMouseWheel, false);
    }, _this.removeMouseWheelEventHandlers = function () {
      window.removeEventListener('mousewheel', _this.handleMouseWheel);
      window.removeEventListener('DOMMouseScroll', _this.handleMouseWheel);
    }, _this.handleMouseWheel = function (event) {
      var e = window.event || event;
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      var activeSection = _this.state.activeSection - delta;

      if (_this.state.scrollingStarted || activeSection < 0 || _this.childrenLength === activeSection) {
        return false;
      }

      _this.setAnchor(activeSection);
      _this.handleSectionTransition(activeSection);
      _this.addActiveClass();
    }, _this.handleResize = function () {
      var position = 0 - _this.state.activeSection * window.innerHeight;

      _this.setState({
        scrollingStarted: true,
        windowHeight: window.innerHeight,
        sectionScrolledPosition: position
      });

      _this.resetScroll();
    }, _this.handleSectionTransition = function (index) {
      var position = 0 - index * _this.state.windowHeight;

      if (!_this.props.anchors.length || index === -1 || index >= _this.props.anchors.length) {
        return false;
      }

      _this.setState({
        scrollingStarted: true,
        activeSection: index,
        sectionScrolledPosition: position
      });

      _this.resetScroll();
      _this.handleScrollCallback();
    }, _this.handleArrowKeys = function (e) {

      var event = window.event ? window.event : e;
      var activeSection = event.keyCode === 38 || event.keyCode === 37 ? _this.state.activeSection - 1 : event.keyCode === 40 || event.keyCode === 39 ? _this.state.activeSection + 1 : -1;

      if (_this.state.scrollingStarted || activeSection < 0 || _this.childrenLength === activeSection) {
        return false;
      }

      _this.setAnchor(activeSection);
      _this.handleSectionTransition(activeSection);
      _this.addActiveClass();
    }, _this.handleTouchNav = function () {
      var that = _this;

      var touchsurface = document.querySelector('.' + _this.props.className),
          swipedir = void 0,
          startX = void 0,
          startY = void 0,
          dist = void 0,
          distX = void 0,
          distY = void 0,
          threshold = 50,
          restraint = 100,
          allowedTime = 1000,
          elapsedTime = void 0,
          startTime = void 0,
          handleswipe = function handleswipe(swipedir) {
        console.log(swipedir);
      };

      touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
      }, false);

      touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);

      touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {

          if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {

            swipedir = distY < 0 ? 'up' : 'down';
            var direction = swipedir === 'down' ? that.state.activeSection - 1 : swipedir === 'up' ? that.state.activeSection + 1 : -1;
            var hash = that.props.anchors[direction];

            if (!that.props.anchors.length || hash) {
              window.location.hash = '#' + hash;
            }

            that.handleSectionTransition(direction);
          }
        }
        handleswipe(swipedir);
      }, false);
    }, _this.handleAnchor = function () {
      var hash = window.location.hash.substring(1);
      var activeSection = _this.props.anchors.indexOf(hash);

      if (_this.state.activeSection !== activeSection) {
        _this.handleSectionTransition(activeSection);
        _this.addActiveClass();
      }
    }, _this.setAnchor = function (index) {
      var hash = _this.props.anchors[index];

      if (!_this.props.anchors.length || hash) {
        window.location.hash = '#' + hash;
      }
    }, _this.handleScrollCallback = function () {
      if (_this.props.scrollCallback) {
        setTimeout(function () {
          return _this.props.scrollCallback(_this.state);
        }, 0);
      }
    }, _this.resetScroll = function () {
      _this.clearResetScrollTimer();

      _this.resetScrollTimer = setTimeout(function () {
        _this.setState({
          scrollingStarted: false
        });
      }, _this.props.delay + 300);
    }, _this.clearResetScrollTimer = function () {
      if (_this.resetScrollTimer) {
        clearTimeout(_this.resetScrollTimer);
      }
    }, _this.renderNavigation = function () {
      var navigationStyle = {
        position: 'fixed',
        zIndex: '10',
        right: '20px',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      };

      var anchors = _this.props.anchors.map(function (link, index) {
        var anchorStyle = {
          display: 'block',
          margin: '10px',
          borderRadius: '100%',
          backgroundColor: '#556270',
          padding: '5px',
          transition: 'all 0.2s',
          transform: _this.state.activeSection === index ? 'scale(1.3)' : 'none'
        };

        return _react2.default.createElement('a', {
          href: '#' + link,
          key: index,
          className: _this.props.navigationAnchorClass || 'Navigation-Anchor',
          style: _this.props.navigationAnchorClass ? null : anchorStyle
        });
      });

      return _react2.default.createElement(
        'div',
        {
          className: _this.props.navigationClass || 'Navigation',
          style: _this.props.navigationClass ? null : navigationStyle },
        anchors
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SectionsContainer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        verticalAlign: this.props.verticalAlign,
        sectionClassName: this.props.sectionClassName,
        sectionPaddingTop: this.props.sectionPaddingTop,
        sectionPaddingBottom: this.props.sectionPaddingBottom
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearResetScrollTimer();
      this.removeDefaultEventListeners();
      this.removeMouseWheelEventHandlers();
      this.removeOverflowFromBody();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.childrenLength = this.props.children.length;

      this.handleResize();
      window.addEventListener('resize', this.handleResize);

      if (!this.props.scrollBar) {
        this.addCSS3Scroll();
        this.handleAnchor();

        window.addEventListener('hashchange', this.handleAnchor, false);

        if (this.props.arrowNavigation) {
          window.addEventListener('keydown', this.handleArrowKeys);
        }

        if (this.props.touchNavigation) {
          this.handleTouchNav();
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeSection !== nextProps.activeSection) {
        this.setState({ activeSection: nextProps.activeSection });
        this.setAnchor(nextProps.activeSection);
        this.handleSectionTransition(nextProps.activeSection);
        this.addActiveClass();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var containerStyle = {
        height: '100%',
        width: '100%',
        position: 'relative',
        transform: 'translate3d(0px, ' + this.state.sectionScrolledPosition + 'px, 0px)',
        transition: 'all ' + this.props.delay + 'ms ease'
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: this.props.className, style: containerStyle },
          this.props.scrollBar ? this.addChildrenWithAnchorId() : this.props.children
        ),
        this.props.navigation && !this.props.scrollBar ? this.renderNavigation() : null
      );
    }
  }]);

  return SectionsContainer;
}(_react.Component);

SectionsContainer.defaultProps = {
  scrollCallback: null,
  delay: 1000,
  verticalAlign: false,
  scrollBar: false,
  navigation: true,
  className: 'SectionContainer',
  sectionClassName: 'Section',
  anchors: [],
  activeClass: 'active',
  sectionPaddingTop: '0',
  sectionPaddingBottom: '0',
  arrowNavigation: true,
  activeSection: 0,
  touchNavigation: true
};

SectionsContainer.propTypes = {
  scrollCallback: _propTypes2.default.func,
  delay: _propTypes2.default.number,
  verticalAlign: _propTypes2.default.bool,
  scrollBar: _propTypes2.default.bool,
  navigation: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  sectionClassName: _propTypes2.default.string,
  navigationClass: _propTypes2.default.string,
  navigationAnchorClass: _propTypes2.default.string,
  activeClass: _propTypes2.default.string,
  sectionPaddingTop: _propTypes2.default.string,
  sectionPaddingBottom: _propTypes2.default.string,
  arrowNavigation: _propTypes2.default.bool,
  activeSection: _propTypes2.default.number,
  touchNavigation: _propTypes2.default.bool
};

SectionsContainer.childContextTypes = {
  verticalAlign: _propTypes2.default.bool,
  sectionClassName: _propTypes2.default.string,
  sectionPaddingTop: _propTypes2.default.string,
  sectionPaddingBottom: _propTypes2.default.string
};

exports.default = SectionsContainer;