/**
 * Created by yura on 04.01.17.
 */

import reducerCreator from '../reducers/FullPageRendererReducer';
import { createStore } from 'redux';


export default function ( options ) {
    return createStore( reducerCreator( options ) )
}