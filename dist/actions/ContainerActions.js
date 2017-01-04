'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startScroll = startScroll;
exports.scrollStop = scrollStop;
exports.moveTo = moveTo;

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

function moveTo(direction, isSlide) {
    return function (dispatch) {
        dispatch(startScroll(direction, isSlide));

        setTimeout(function () {
            return dispatch(scrollStop());
        }, 1000);
    };
}