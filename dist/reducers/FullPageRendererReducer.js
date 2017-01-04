'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 04.01.17.
                                                                                                                                                                                                                                                                   */

exports.default = function (options) {

    var initialState = _extends({}, defaultOptions, options);
    // need to parse anchor here

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
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

var defaultOptions = {
    delay: 1000,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    activatedClass: 'activated'
};

// Reducer creator. We can make some actions with state
;