/**
 * Created by yura on 04.01.17.
 */

import { SCROLL_START, SCROLL_STOP, JUMP_START } from '../actions/ActionTypes';


const defaultOptions = {
    delay: 1000,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    activatedClass: 'activated',

    horizontalScroll: false
};


// Reducer creator. We can make some actions with state
export default function( options ) {

    const initialState = {
        ...defaultOptions,
        ...options,
        scrolling: false,
        currentSection: 0,
        currentSlide: 0,
        lastActivated: 0,
    };

    return function(state = initialState, action) {
        switch( action.type ) {
            case SCROLL_START:
                if ( action.isSlide ) {
                    return {
                        ...state,
                        currentSlide: state.currentSlide - action.direction,
                        scrolling: true
                    };
                }
                else {
                    let nextSection = state.currentSection - action.direction;

                    return {
                        ...state,
                        currentSection: nextSection,
                        scrolling: true,
                        lastActivated: state.lastActivated < nextSection ? nextSection : state.lastActivated
                    };
                }

            case JUMP_START:
                return {
                    ...state,
                    currentSection: action.section,
                    currentSlide: action.slide,
                    lastActivated: state.lastActivated < action.section ? action.section : state.lastActivated
                };

            case SCROLL_STOP:
                return { ...state, scrolling: false };

            default: return state;
        }
    }
};