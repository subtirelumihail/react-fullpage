/**
 * Created by yura on 04.01.17.
 */

import reducerCreator from '../reducers/FullPageRendererReducer';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export default function ( options, history ) {
    const router = routerMiddleware(history);
    const enhancer = composeEnhancers(
        applyMiddleware( thunk, router )
    );
    const fullPageReducer = reducerCreator( options );
    return createStore(
        combineReducers({
            routing: routerReducer,
            fullpage: fullPageReducer
        }),
        enhancer
    )
}