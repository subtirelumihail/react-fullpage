'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by mr47 on 3/18/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// it's a work around.
// get it from https://github.com/ReactTraining/react-router/issues/4713

var ConnectedRouter = function (_Component) {
    _inherits(ConnectedRouter, _Component);

    function ConnectedRouter() {
        _classCallCheck(this, ConnectedRouter);

        return _possibleConstructorReturn(this, (ConnectedRouter.__proto__ || Object.getPrototypeOf(ConnectedRouter)).apply(this, arguments));
    }

    _createClass(ConnectedRouter, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var children = this.props.children;

            // invariant(
            //     children == null || React.Children.count(children) === 1,
            //     'A <ConnectedRouter> may have only one child element'
            // )
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                propsStore = _props.store,
                history = _props.history,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['store', 'history', 'children']);

            var store = propsStore || this.context.store;

            return _react2.default.createElement(
                _reactRouter.Router,
                _extends({}, props, { history: history }),
                _react2.default.createElement(_reactRouter.Route, { render: function render(_ref) {
                        var location = _ref.location;

                        return _react2.default.createElement(MountedRoute, { store: store, location: location, children: children });
                    } })
            );
        }
    }]);

    return ConnectedRouter;
}(_react.Component);

ConnectedRouter.propTypes = {
    store: _react.PropTypes.object,
    history: _react.PropTypes.object,
    children: _react.PropTypes.node
};
ConnectedRouter.contextTypes = {
    store: _react.PropTypes.object
};

var MountedRoute = function (_Component2) {
    _inherits(MountedRoute, _Component2);

    function MountedRoute() {
        _classCallCheck(this, MountedRoute);

        return _possibleConstructorReturn(this, (MountedRoute.__proto__ || Object.getPrototypeOf(MountedRoute)).apply(this, arguments));
    }

    _createClass(MountedRoute, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.location = this.props.location;
            this.store = this.props.store;

            this.props.store.dispatch({
                type: '@@router/LOCATION_CHANGE',
                payload: this.props.location
            });
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            this.store = nextProps.store;
            if (this.location.pathname != nextProps.location.pathname) {
                this.location = nextProps.location;

                this.store.dispatch({
                    type: '@@router/LOCATION_CHANGE',
                    payload: nextProps.location
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return MountedRoute;
}(_react.Component);

exports.default = ConnectedRouter;