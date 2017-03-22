'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fn = function fn(callback, time) {
    setTimeout(callback, time || 1000 / 60);
};
var canUseDOM = function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

var SectionInner = function (_React$Component) {
    _inherits(SectionInner, _React$Component);

    function SectionInner(props) {
        _classCallCheck(this, SectionInner);

        var _this = _possibleConstructorReturn(this, (SectionInner.__proto__ || Object.getPrototypeOf(SectionInner)).call(this, props));

        _this.state = {
            activated: false,
            leave: false
        };
        return _this;
    }

    _createClass(SectionInner, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                isActivated: this.isActivated.bind(this)
            };
        }
    }, {
        key: 'isActivated',
        value: function isActivated() {
            return this.state.activated;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps.currentSection === this.props.index) {
                fn(function () {
                    _this2.setState({
                        activated: true,
                        leave: false
                    });
                });
            } else {
                if (this.props.index === this.props.currentSection && nextProps.currentSection !== this.props.index) {
                    fn(function () {
                        _this2.setState({
                            leave: true
                        });
                    }, 1000);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.props.sectionClassName;
            var _props = this.props,
                index = _props.index,
                currentSection = _props.currentSection,
                activeClass = _props.activeClass,
                activatedClass = _props.activatedClass;

            if (this.props.className && this.props.className.length > 0) className += ' ' + this.props.className;
            if (index == currentSection) className += ' ' + activeClass;
            if (this.state.activated) className += ' ' + activatedClass;
            if (this.state.leave) className += ' section-leave-finish';
            return _react2.default.createElement(
                'div',
                { className: className },
                this.props.children
            );
        }
    }]);

    return SectionInner;
}(_react2.default.Component);

SectionInner.childContextTypes = {
    isActivated: _react.PropTypes.any.isRequired
};
exports.default = SectionInner;