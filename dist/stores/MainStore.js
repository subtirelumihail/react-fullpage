'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options) {
    return (0, _redux.createStore)((0, _FullPageRendererReducer2.default)(options), (0, _redux.applyMiddleware)(_reduxThunk2.default));
};

var _FullPageRendererReducer = require('../reducers/FullPageRendererReducer');

var _FullPageRendererReducer2 = _interopRequireDefault(_FullPageRendererReducer);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }