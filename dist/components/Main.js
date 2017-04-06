'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _MainStore = require('../stores/MainStore');

var _MainStore2 = _interopRequireDefault(_MainStore);

var _FullPageContainer = require('../containers/FullPageContainer');

var _FullPageContainer2 = _interopRequireDefault(_FullPageContainer);

var _history = require('history');

var _ConnectedRouter = require('./ConnectedRouter');

var _ConnectedRouter2 = _interopRequireDefault(_ConnectedRouter);

var _reactRouter = require('react-router');

var _SectionInner = require('../components/SectionInner');

var _SectionInner2 = _interopRequireDefault(_SectionInner);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ContainerActions = require('../actions/ContainerActions');

var actions = _interopRequireWildcard(_ContainerActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

        var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
        _this.history = _this.props.history || (canUseDOM ? (0, _history.createBrowserHistory)() : (0, _history.createMemoryHistory)());
        _this.routes = [];
        _react2.default.Children.forEach(_this.props.children, function (child, index) {
            child.props && child.props.link && _this.routes.push(child.props.link);
        });
        _this.store = (0, _MainStore2.default)(_extends({}, _this.props.options, { routes: _this.routes }), _this.history);
        return _this;
    }

    _createClass(_class, [{
        key: 'goTo',
        value: function goTo() {
            var section = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.store.dispatch(actions.jumpTo(section, slide));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var routes = function routes(location) {
                return _react2.default.Children.map(_this2.props.children, function (child, index) {
                    if (child && child.props && child.props.link) {
                        var path = child.props.link;
                        return _react2.default.createElement(
                            _reactAddonsCssTransitionGroup2.default,
                            {
                                key: index,
                                component: _SectionInner2.default,
                                className: child.props.className,
                                transitionName: {
                                    enter: 'section-enter',
                                    enterActive: 'section-enter-active',
                                    leave: 'section-leave',
                                    leaveActive: 'section-leave-active'
                                },
                                transitionEnter: false,
                                transitionLeave: true,
                                transitionEnterTimeout: 1000,
                                transitionLeaveTimeout: 6000
                            },
                            _react2.default.createElement(_reactRouter.Route, {
                                location: location,
                                key: location.key,
                                path: path,
                                exact: true,
                                render: function render() {
                                    return _react2.default.cloneElement(child);
                                }
                            })
                        );
                    } else {
                        return _react2.default.cloneElement(child);
                    }
                });
            };
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRedux.Provider,
                    { store: this.store },
                    _react2.default.createElement(
                        _ConnectedRouter2.default,
                        { history: this.history },
                        _react2.default.createElement(_reactRouter.Route, { render: function render(_ref) {
                                var location = _ref.location;
                                return _react2.default.createElement(
                                    _FullPageContainer2.default,
                                    { anchors: _this2.routes },
                                    routes(location),
                                    _this2.props.options.redirectToFirstSlide && _this2.routes.length > 0 ? _react2.default.createElement(_reactRouter.Redirect, { to: _this2.routes[0] }) : null
                                );
                            } })
                    )
                )
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;