'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 04.01.17.
                                                                                                                                                                                                                                                                   */

exports.default = function (options) {

    var initialState = _extends({}, defaultOptions, options, {
        scrolling: false,
        currentSection: 0,
        currentSlide: 0,
        lastActivated: 0
    });

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        switch (action.type) {
            case _ActionTypes.SCROLL_START:
                {
                    if (action.isSlide) {
                        return _extends({}, state, {
                            currentSlide: state.currentSlide - action.direction,
                            scrolling: true
                        });
                    } else {
                        var nextSection = state.currentSection - action.direction;

                        return _extends({}, state, {
                            currentSection: nextSection,
                            scrolling: true,
                            lastActivated: state.lastActivated < nextSection ? nextSection : state.lastActivated
                        });
                    }
                }break;

            case _ActionTypes.JUMP_START:
                {
                    return _extends({}, state, {
                        currentSection: action.section,
                        currentSlide: action.slide,
                        scrolling: true,
                        lastActivated: state.lastActivated < action.section ? action.section : state.lastActivated
                    });
                }break;

            case _ActionTypes.SCROLL_STOP:
                {
                    return _extends({}, state, { scrolling: false });
                }break;

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
    activeClass: 'active',
    activatedClass: 'activated',
    bindToSelector: '.ovf-box',
    horizontalScroll: false,
    recalculateHeight: false
};

// Reducer creator. We can make some actions with state
;