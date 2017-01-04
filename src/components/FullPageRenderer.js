/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import StoreCreator from '../stores/MainStore';


export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            store: StoreCreator( this.props.options )
        }
    }

    render () {
        return (
            <Provider store={ this.state.store }>
                <div>
                    { this.props.children }
                </div>
            </Provider>
        )
    }
}