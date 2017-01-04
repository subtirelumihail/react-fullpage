/**
 * Created by yura on 04.01.17.
 */

import { SCROLL } from '../actions/ActionTypes';


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

    const initialState = {...defaultOptions, ...options};
    // need to parse anchor here

    return function(state = initialState, action) {
        switch( action.type ) {
            case SCROLL:

                return { ...state };

            default: return state;
        }
    }
};