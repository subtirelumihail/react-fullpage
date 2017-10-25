/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { Provider } from 'react-redux';
import storeCreator from '../stores/MainStore';
import FullPageContainer from '../containers/FullPageContainer';
import { createBrowserHistory, createMemoryHistory } from 'history';
// import ConnectedRouter from './ConnectedRouter';
import { Route, Redirect, Router } from 'react-router';
import SectionInner from '../components/SectionInner';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import { ConnectedRouter } from 'react-router-redux';
import * as actions from '../actions/ContainerActions';

export default class extends React.Component {
    store;
    history;
    constructor( props ) {
        super( props );
        const canUseDOM = !!(
            (typeof window !== 'undefined' &&
            window.document && window.document.createElement)
        );
        this.history = this.props.history || (canUseDOM ? createBrowserHistory() : createMemoryHistory());
        this.routes = [];
        React.Children.forEach(this.props.children, (child, index) => {
            child.props && child.props.link && this.routes.push(child.props.link);
        });
        this.store = storeCreator( { ...this.props.options, routes: this.routes }, this.history );
    }
    goTo(section = 0, slide = 0){
        this.store.dispatch(actions.jumpTo(section, slide));
    }
    render () {
        const routes = (location) => {
            return React.Children.map(this.props.children, (child, index) => {
                if (child && child.props && child.props.link){
                    let path = child.props.link;
                    return (
                        <ReactCSSTransitionGroup
                            key={index}
                            component={SectionInner}
                            className={child.props.className}
                            transitionName={ {
                                enter: 'section-enter',
                                enterActive: 'section-enter-active',
                                leave: 'section-leave',
                                leaveActive: 'section-leave-active',
                            } }
                            transitionEnter={false}
                            transitionLeave={true}
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={6000}
                        >
                            <Route
                                location={location}
                                key={location.key}
                                path={path}
                                exact={true}
                                render={()=> child}
                            />
                        </ReactCSSTransitionGroup>
                    );
                } else {
                    return child;
                }

            });
        };
        return (
            <Provider store={ this.store }>
                <ConnectedRouter history={this.history}>
                    <div>
                        <Route render={({location})=>
                            <FullPageContainer anchors={this.routes}>
                                {[ ...routes(location), this.props.options.redirectToFirstSlide && this.routes.length > 0 ? <Redirect to={this.routes[0]}/> : null]}
                            </FullPageContainer>
                        } />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}