'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionInner = function (_React$Component) {
    _inherits(SectionInner, _React$Component);

    function SectionInner(props) {
        _classCallCheck(this, SectionInner);

        var _this = _possibleConstructorReturn(this, (SectionInner.__proto__ || Object.getPrototypeOf(SectionInner)).call(this, props));

        _this.state = {
            activated: false
        };
        return _this;
    }

    _createClass(SectionInner, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps.currentSection === this.props.index) {
                setTimeout(function () {
                    _this2.setState({
                        activated: true
                    });
                }, 10);
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
            return React.createElement(
                'div',
                { className: className },
                this.props.children
            );
        }
    }]);

    return SectionInner;
}(React.Component);

exports.default = SectionInner;