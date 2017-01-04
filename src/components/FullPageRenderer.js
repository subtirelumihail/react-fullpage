/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import ReducerCreator from '../reducers/FullPageRendererReducer';


class FullPageRenderer extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            store: ReducerCreator( this.props.options )
        }
    }

    render () {
        <Provider store={ this.state.store }>
            { this.props.children }
        </Provider>
    }
}