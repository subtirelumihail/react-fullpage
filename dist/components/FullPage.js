'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 04.01.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this._scrolling = false;


        _react2.default.Children.map(_this.props.children, function (child) {
            if (typeof child.type == 'function') _this._childrenLength += 1;
        });

        _this._childrenLength = _this.props.children.length;
        _this.state = {};

        _this._handleResize = _this._handleResize.bind(_this);
        _this._handleMouseWheel = _this._handleMouseWheel.bind(_this);
        _this._handleAnchor = _this._handleAnchor.bind(_this);
        //this._generateKeyFrames = this._generateKeyFrames.bind(this);
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.state.wrapperHeight = this._calculateHeight();

            this.bindEvents();
            this._handleAnchor();

            document.querySelector('body').style.overflow = 'hidden';

            //if( this.props.horizontalScroll ) this._generateKeyFrames();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._scrolling = nextProps.scrolling;

            if (nextProps.currentSection !== this.props.currentSection) {
                this.setState({
                    offset: this._calculateOffset(nextProps.currentSection)
                });

                this._setAnchor(nextProps.currentSection, nextProps.currentSlide);

                if (this.props.scrollCallback) this.props.scrollCallback(nextProps.currentSection);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindEvents();
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            // comment resize for horizontal scroll
            window.addEventListener('resize', this._handleResize);
            window.addEventListener('mousewheel', this._handleMouseWheel, false);
            window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
            window.addEventListener('hashchange', this._handleAnchor, false);
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            window.removeEventListener('resize', this._handleMouseWheel);
            window.removeEventListener('mousewheel', this._handleMouseWheel);
            window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
            window.removeEventListener('hashchange', this._handleAnchor);
        }

        /*
        * Calculators
        * */

    }, {
        key: '_calculateHeight',
        value: function _calculateHeight() {
            var _this2 = this;

            var height = 0;

            Object.keys(this.refs).forEach(function (key) {
                height += (0, _reactDom.findDOMNode)(_this2.refs[key]).offsetHeight;
            });

            // If we want to reserve for last block (need to add flag)
            //return height + window.innerHeight - findDOMNode(this.refs[ this._childrenLength - 1 ]).offsetHeight

            return height;
        }

        // remove (or finish) this in future

    }, {
        key: '_isSlideAction',
        value: function _isSlideAction() {
            var currentSection = this.props.anchors[this.props.currentSection];

            return Array.isArray(currentSection) && currentSection.length < this.props.currentSlide && this.props.currentSlide >= 0;
        }
    }, {
        key: '_canScroll',
        value: function _canScroll(direction) {
            return direction > 0 && this.props.currentSection > 0 || direction < 0 && this.props.currentSection < this.props.anchors.length - 1;
        }
    }, {
        key: '_calculateOffset',
        value: function _calculateOffset(currentSection) {
            var offset = 0;

            if (this.props.horizontalScroll) {
                offset = 100 * currentSection;
            } else {
                for (var i = 0; i < currentSection; i++) {
                    offset += (0, _reactDom.findDOMNode)(this.refs[i]).offsetHeight;
                }

                if (offset > this.state.wrapperHeight - window.innerHeight) offset = this.state.wrapperHeight - window.innerHeight;
            }

            return offset;
        }
    }, {
        key: '_setAnchor',
        value: function _setAnchor(section, slide) {
            var anchor = this.props.anchors[section];

            if (Array.isArray(anchor)) anchor = anchor[slide];

            window.location.hash = anchor;
        }

        /*    _generateKeyFrames( currentSection, direction ) {
                const hsVars = this.props.horizontalScrollVariables;
        
                let keyframes = `@-webkit-keyframes rifpskf {
                      0%{
                        -webkit-transform: translateX(${hsVars.translateX * (currentSection - direction )}vw);
                        -webkit-transform: rotate (0deg);
                        -webkit-transform: scale (0);
                      }
                      50% {
                        -webkit-transform: rotate (${ hsVars.rotate }deg);
                        -webkit-transform: scale (${ hsVars.scale });
                      }
                      100%{
                        -webkit-transform: translateX(${hsVars.translateX * currentSection}vw);
                        -webkit-transform: rotate (0deg);
                        -webkit-transform: scale (0);
                      }
                    }`;
            }*/

        /*
        * Handlers
        * */

    }, {
        key: '_handleResize',
        value: function _handleResize() {
            this.setState({
                wrapperHeight: this._calculateHeight(),
                offset: this._calculateOffset(this.props.currentSection)
            });
        }
    }, {
        key: '_handleMouseWheel',
        value: function _handleMouseWheel(event) {
            if (this._scrolling) {
                return false;
            }

            this._scrolling = true;

            var e = window.event || event;
            var direction = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            if (this._isSlideAction()) {
                this.props.actions.moveTo(direction, true);
            } else {
                if (this._canScroll(direction)) {
                    this.props.actions.moveTo(direction, false);
                } else {
                    this._scrolling = false;
                    return false;
                }
            }
        }
    }, {
        key: '_handleAnchor',
        value: function _handleAnchor() {
            if (this._scrolling) {
                return false;
            }

            var hash = window.location.hash.substring(1);

            var cords = this._findAnchorCords(hash);

            if (cords) {
                this._scrolling = true;
                this.props.actions.jumpTo(cords[0], cords[1]);
            }
        }

        // Black magic! (really black, need refactoring)

    }, {
        key: '_findAnchorCords',
        value: function _findAnchorCords(anchor) {
            var anchors = this.props.anchors;

            for (var i = 0; i < anchors.length; i++) {
                if (Array.isArray(anchors[i])) {
                    for (var j = 0; j < anchors[i].length; j++) {
                        if (anchors[i][j] == anchor) return [i, j];
                    }
                } else if (anchors[i] == anchor) return [i, 0];
            }

            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var containerStyle = {};

            if (this.props.horizontalScroll) {
                containerStyle = {
                    height: this.state.wrapperHeight,
                    width: this._childrenLength * 100 + 'vw',
                    position: 'relative',

                    transform: 'translate3d(-' + this.state.offset + 'vw, 0, 0)',
                    MozTransform: 'translate3d(-' + this.state.offset + 'vw, 0, 0)',
                    msTransform: 'translate3d(-' + this.state.offset + 'vw, 0, 0)',
                    WebkitTransform: 'translate3d(-' + this.state.offset + 'vw, 0, 0)',
                    OTransform: 'translate3d(-' + this.state.offset + 'vw, 0, 0)',

                    transition: 'transform ' + this.props.delay + 'ms ease',
                    WebkitTransition: 'transform ' + this.props.delay + 'ms ease',
                    MozTransition: 'transform ' + this.props.delay + 'ms ease',
                    OTransition: 'transform ' + this.props.delay + 'ms ease'
                };
            } else {
                containerStyle = {
                    height: this.state.wrapperHeight,
                    width: '100%',
                    position: 'relative',

                    transform: 'translate3d(0,-' + this.state.offset + 'px,0)',
                    MozTransform: 'translate3d(0,-' + this.state.offset + 'px,0)',
                    msTransform: 'translate3d(0,-' + this.state.offset + 'px,0)',
                    WebkitTransform: 'translate3d(0,-' + this.state.offset + 'px,0)',
                    OTransform: 'translate3d(0,-' + this.state.offset + 'px,0)',

                    transition: 'transform ' + this.props.delay + 'ms ease',
                    WebkitTransition: 'transform ' + this.props.delay + 'ms ease',
                    MozTransition: 'transform ' + this.props.delay + 'ms ease',
                    OTransition: 'transform ' + this.props.delay + 'ms ease'
                };
            }

            var ignoredCount = 0;
            return _react2.default.createElement(
                'div',
                { className: this.props.className, style: containerStyle },
                _react2.default.Children.map(this.props.children, function (child, id) {
                    if (typeof child.type == 'function') {
                        return _react2.default.cloneElement(child, {
                            ref: id - ignoredCount,
                            index: id - ignoredCount,
                            activeClass: _this3.props.activeClass,
                            activatedClass: _this3.props.activatedClass,
                            sectionClassName: _this3.props.sectionClassName,
                            currentSection: _this3.props.currentSection,
                            lastActivated: _this3.props.lastActivated
                        });
                    } else {
                        ignoredCount += 1;
                        return child;
                    }
                })
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;