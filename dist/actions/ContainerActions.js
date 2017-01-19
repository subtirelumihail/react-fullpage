'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startScroll = startScroll;
exports.scrollStop = scrollStop;
exports.startJump = startJump;
exports.moveTo = moveTo;
exports.jumpTo = jumpTo;

var _ActionTypes = require('./ActionTypes');

function startScroll(direction, isSlide) {
    return {
        type: _ActionTypes.SCROLL_START,
        direction: direction,
        isSlide: isSlide
    };
} /**
   * Created by yura on 04.01.17.
   */

function scrollStop() {
    return {
        type: _ActionTypes.SCROLL_STOP
    };
}

function startJump(section, slide) {
    return {
        type: _ActionTypes.JUMP_START,
        section: section,
        slide: slide
    };
}

function moveTo(direction, isSlide) {
    return function (dispatch) {
        dispatch(startScroll(direction, isSlide));

        setTimeout(function () {
            return dispatch(scrollStop());
        }, 1000);
    };
}

function jumpTo(section, slide) {
    return function (dispatch) {
        dispatch(startJump(section, slide));

        setTimeout(function () {
            return dispatch(scrollStop());
        }, 1000);
    };
}