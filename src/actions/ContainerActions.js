/**
 * Created by yura on 04.01.17.
 */

import { SCROLL_START, SCROLL_STOP, JUMP_START } from './ActionTypes';

export function startScroll(direction, isSlide) {
    return {
        type: SCROLL_START,
        direction: direction,
        isSlide: isSlide
    }
}

export function scrollStop() {
    return {
        type: SCROLL_STOP
    }
}

export function startJump(section, slide) {
    return {
        type: JUMP_START,
        section: section,
        slide: slide
    }
}

export function moveTo(direction, isSlide) {
    return dispatch => {
        dispatch(startScroll(direction, isSlide));

        setTimeout(
            () => dispatch(scrollStop()),
            1000
        );
    }
}

export function jumpTo(section, slide) {
    return dispatch => {
        dispatch(startJump(section, slide));

        setTimeout(
            () => dispatch(scrollStop()),
            1000
        );
    }
}

export { push, replace, go, goBack, goForward } from 'react-router-redux';