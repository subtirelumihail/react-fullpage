/**
 * Created by yura on 04.01.17.
 */

import { SCROLL_START, SCROLL_STOP } from './ActionTypes';

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

export function moveTo(direction, isSlide) {
    return dispatch => {
        dispatch(startScroll(direction, isSlide));

        setTimeout(
            () => dispatch(scrollStop()),
            1000
        );
    }
}