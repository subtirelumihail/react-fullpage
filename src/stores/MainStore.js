/**
 * Created by yura on 04.01.17.
 */

import reducerCreator from '../reducers/FullPageRendererReducer';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


export default function ( options ) {
    return createStore(
        reducerCreator( options ),
        applyMiddleware( ReduxThunk )
    )
}