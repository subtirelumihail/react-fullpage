/**
 * Created by mr47 on 3/18/2017.
 */

// it's a work around.
// get it from https://github.com/ReactTraining/react-router/issues/4713

import invariant from 'invariant';
import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';

class ConnectedRouter extends Component {
    static propTypes = {
        store: PropTypes.object,
        history: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object
    };
    constructor(props){
        super(props);
    }
    componentWillMount() {
        const { children } = this.props;

        // invariant(
        //     children == null || React.Children.count(children) === 1,
        //     'A <ConnectedRouter> may have only one child element'
        // )
    }

    render() {
        const { store: propsStore, history, children, ...props } = this.props;
        let store = propsStore || this.context.store;

        return (
            <Router {...props} history={history}>
                <Route render={({ location }) =>
                    <div>
                        <MountedRoute store={store} location={location}>
                            {children}
                        </MountedRoute>
                    </div>
                }/>
            </Router>
        )
    }
}

class MountedRoute extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.location = this.props.location;
        this.store = this.props.store;

        this.props.store.dispatch({
            type: '@@router/LOCATION_CHANGE',
            payload: this.props.location
        })
    }

    componentWillUpdate(nextProps) {
        this.store = nextProps.store;
        if (this.location.pathname != nextProps.location.pathname) {
            this.location = nextProps.location;

            this.store.dispatch({
                type: '@@router/LOCATION_CHANGE',
                payload: nextProps.location
            })
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default ConnectedRouter;