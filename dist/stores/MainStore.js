'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by yura on 04.01.17.
                                                                                                                                                                                                                                                                               */

exports.default = function (options, history) {
    var router = (0, _reactRouterRedux.routerMiddleware)(history);
    var enhancer = composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, router));
    var fullPageReducer = (0, _FullPageRendererReducer2.default)(options);
    return (0, _redux.createStore)((0, _redux.combineReducers)({
        routing: _reactRouterRedux.routerReducer,
        fullpage: fullPageReducer
    }), enhancer);
};

var _FullPageRendererReducer = require('../reducers/FullPageRendererReducer');

var _FullPageRendererReducer2 = _interopRequireDefault(_FullPageRendererReducer);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : _redux.compose;