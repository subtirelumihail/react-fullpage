'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 04.01.17.
                                                                                                                                                                                                                                                                   */

// Reducer creator. We can make some actions with state


exports.default = function (options) {

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options;
        var action = arguments[1];

        switch (action.type) {
            case _ActionTypes.SCROLL:

                return _extends({}, state);

            default:
                return state;
        }
    };
};

var _ActionTypes = require('../actions/ActionTypes');

;