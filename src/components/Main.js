/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import StoreCreator from '../stores/MainStore';
import FullPageContainer from '../containers/FullPageContainer';


export default class extends React.Component {
    store;

    constructor( props ) {
        super( props );

        this.store = StoreCreator( this.props.options );
    }

    render () {
        return (
            <Provider store={ this.store }>
                <FullPageContainer>
                    { this.props.children }
                </FullPageContainer>
            </Provider>
        )
    }
}