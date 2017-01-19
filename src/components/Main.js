/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import StoreCreator from '../stores/MainStore';
import FullPageContainer from '../containers/FullPageContainer';


export default class extends React.Component {
    constructor( props ) {
        super( props );
    }

    render () {
        return (
            <Provider store={ StoreCreator( this.props.options ) }>
                <FullPageContainer>
                    { this.props.children }
                </FullPageContainer>
            </Provider>
        )
    }
}