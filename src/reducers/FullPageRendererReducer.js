/**
 * Created by yura on 04.01.17.
 */

import { SCROLL_START, SCROLL_STOP } from '../actions/ActionTypes';


const defaultOptions = {
    delay: 1000,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    activatedClass: 'activated'
};


// Reducer creator. We can make some actions with state
export default function( options ) {

    const initialState = {
        ...defaultOptions,
        ...options,
        scrolling: false,
        currentSection: 0,
        currentSlide: 0
    };

    return function(state = initialState, action) {
        switch( action.type ) {
            case SCROLL_START:
                if ( action.isSlide ) {
                    return { ...state, currentSlide: state.currentSlide - action.direction, scrolling: true };
                }
                else {
                    return { ...state, currentSection: state.currentSection - action.direction, scrolling: true }
                }

            case SCROLL_STOP:
                return { ...state, scrolling: false };

            default: return state;
        }
    }
};