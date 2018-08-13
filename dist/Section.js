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

var Section = function (_Component) {
  _inherits(Section, _Component);

  function Section() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Section);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Section.__proto__ || Object.getPrototypeOf(Section)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      windowHeight: 0
    }, _this.renderVerticalAlign = function () {
      var verticalAlignStyle = {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '100%'
      };

      return _react2.default.createElement(
        'div',
        { style: verticalAlignStyle },
        _this.props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Section, [{
    key: 'handleResize',
    value: function handleResize() {
      this.setState({
        windowHeight: window.innerHeight
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.handleResize();
      window.addEventListener('resize', function () {
        return _this2.handleResize();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      window.removeEventListener('resize', function () {
        return _this3.handleResize();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var alignVertical = this.props.verticalAlign || this.context.verticalAlign;

      var sectionStyle = {
        width: '100%',
        display: alignVertical ? 'table' : 'block',
        height: this.state.windowHeight,
        maxHeight: this.state.windowHeight,
        overflow: 'auto',
        backgroundColor: this.props.color,
        paddingTop: this.context.sectionPaddingTop,
        paddingBottom: this.context.sectionPaddingBottom
      };

      return _react2.default.createElement(
        'div',
        {
          className: this.context.sectionClassName + (this.props.className ? ' ' + this.props.className : ''),
          id: this.props.id,
          style: sectionStyle },
        alignVertical ? this.renderVerticalAlign() : this.props.children
      );
    }
  }]);

  return Section;
}(_react.Component);

Section.propTypes = {
  color: _propTypes2.default.string
};

Section.contextTypes = {
  verticalAlign: _propTypes2.default.bool,
  sectionClassName: _propTypes2.default.string,
  sectionPaddingTop: _propTypes2.default.string,
  sectionPaddingBottom: _propTypes2.default.string
};

exports.default = Section;