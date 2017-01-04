/**
 * Created by yura on 04.01.17.
 */

import { SCROLL } from '../actions/ActionTypes';

// Reducer creator. We can make some actions with state
export default function( options ) {


    return function(state = options, action) {
        switch( action.type ) {
            case SCROLL:

                return { ...state };

            default: return state;
        }
    }
};