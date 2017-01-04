'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _MainStore = require('../stores/MainStore');

var _MainStore2 = _interopRequireDefault(_MainStore);

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

        _this._childrenLength = _this.props.children.length;
        _this.state = {};

        _this._handleResize = _this._handleResize.bind(_this);
        _this._handleMouseWheel = _this._handleMouseWheel.bind(_this);
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                wrapperHeight: this._calculateHeight() + 'px'
            });

            this.bindEvents();

            document.querySelector('body').style.overflow = 'hidden';
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.currentSection !== this.props.currentSection) {
                this.setState({
                    offset: this._calculateOffset(nextProps.currentSection)
                });
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
            window.addEventListener('resize', this._handleResize);
            window.addEventListener('mousewheel', this._handleMouseWheel, false);
        }
    }, {
        key: 'unbindEvents',
        value: function unbindEvents() {
            window.removeEventListener('resize', this._handleMouseWheel);
            window.removeEventListener('mousewheel', this._handleMouseWheel);
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

            return height + window.innerHeight - (0, _reactDom.findDOMNode)(this.refs[this._childrenLength - 1]).offsetHeight;
        }
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

            for (var i = 0; i < currentSection; i++) {
                offset += (0, _reactDom.findDOMNode)(this.refs[i]).offsetHeight;
            }

            return offset;
        }

        /*
        * Handlers
        * */

    }, {
        key: '_handleResize',
        value: function _handleResize() {
            this.setState({
                wrapperHeight: this._calculateHeight()
            });
        }
    }, {
        key: '_handleMouseWheel',
        value: function _handleMouseWheel(event) {
            if (this.props.scrolling) {
                return false;
            }

            var e = window.event || event;
            var direction = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            if (this._isSlideAction()) {
                this.props.actions.moveTo(direction, true);
            } else {
                if (this._canScroll(direction)) {
                    this.props.actions.moveTo(direction, false);
                } else {
                    return false;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var containerStyle = {
                height: this.state.wrapperHeight,
                width: '100%',
                position: 'relative',
                transform: 'translate3d(0px, -' + this.state.offset + 'px, 0px)',
                transition: 'all ' + this.props.delay + 'ms ease'
            };

            return _react2.default.createElement(
                'div',
                { className: this.props.className, style: containerStyle },
                _react2.default.Children.map(this.props.children, function (child, id) {
                    return _react2.default.cloneElement(child, {
                        ref: id,
                        index: id
                    });
                })
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;