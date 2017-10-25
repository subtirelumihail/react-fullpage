'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = undefined;
exports.startScroll = startScroll;
exports.scrollStop = scrollStop;
exports.startJump = startJump;
exports.moveTo = moveTo;
exports.jumpTo = jumpTo;

var _reactRouterRedux = require('react-router-redux');

Object.defineProperty(exports, 'push', {
    enumerable: true,
    get: function get() {
        return _reactRouterRedux.push;
    }
});
Object.defineProperty(exports, 'replace', {
    enumerable: true,
    get: function get() {
        return _reactRouterRedux.replace;
    }
});
Object.defineProperty(exports, 'go', {
    enumerable: true,
    get: function get() {
        return _reactRouterRedux.go;
    }
});
Object.defineProperty(exports, 'goBack', {
    enumerable: true,
    get: function get() {
        return _reactRouterRedux.goBack;
    }
});
Object.defineProperty(exports, 'goForward', {
    enumerable: true,
    get: function get() {
        return _reactRouterRedux.goForward;
    }
});

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