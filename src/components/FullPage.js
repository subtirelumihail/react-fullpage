/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import { Provider } from 'react-redux';
import StoreCreator from '../stores/MainStore';


export default class extends React.Component {
    _childrenLength;

    constructor( props ) {
        super( props );


        this._childrenLength = this.props.children.length;
        this.state = {};

        this._handleResize = this._handleResize.bind(this);
        this._handleMouseWheel = this._handleMouseWheel.bind(this);
    }

    componentDidMount() {
        this.setState({
            wrapperHeight: `${ this._calculateHeight() }px`
        });

        this.bindEvents();

        document.querySelector('body').style.overflow = 'hidden';
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.currentSection !== this.props.currentSection ) {
            this.setState({
                offset: this._calculateOffset( nextProps.currentSection )
            });
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    bindEvents() {
        window.addEventListener('resize', this._handleResize);
        window.addEventListener('mousewheel', this._handleMouseWheel, false);
    }

    unbindEvents() {
        window.removeEventListener('resize', this._handleMouseWheel);
        window.removeEventListener('mousewheel', this._handleMouseWheel);
    }

    /*
    * Calculators
    * */
    _calculateHeight() {
        let height = 0;

        Object.keys( this.refs ).forEach( ( key ) => {
            height += findDOMNode( this.refs[key] ).offsetHeight;
        });

        return height + window.innerHeight - findDOMNode(this.refs[ this._childrenLength - 1 ]).offsetHeight
    }

    _isSlideAction() {
        let currentSection = this.props.anchors[ this.props.currentSection ];

        return Array.isArray(currentSection) && currentSection.length < this.props.currentSlide && this.props.currentSlide >= 0;
    }

    _canScroll( direction ) {
        return direction > 0 && this.props.currentSection > 0 ||
               direction < 0 && this.props.currentSection < this.props.anchors.length - 1
    }

    _calculateOffset( currentSection ) {
        let offset = 0;

        for(let i = 0; i < currentSection; i ++) {
            offset += findDOMNode( this.refs[i] ).offsetHeight;
        }

        return offset;
    }

    /*
    * Handlers
    * */
    _handleResize() {
        this.setState({
            wrapperHeight: this._calculateHeight()
        });
    }

    _handleMouseWheel(event) {
        if (this.props.scrolling) {
            return false;
        }

        const e = window.event || event;
        const direction = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        if (this._isSlideAction()) {
            this.props.actions.moveTo( direction, true );
        }
        else {
            if(this._canScroll( direction )) {
                this.props.actions.moveTo( direction, false );
            }
            else {
                return false;
            }
        }
    }

    render () {
        let containerStyle = {
            height: this.state.wrapperHeight,
            width: '100%',
            position: 'relative',
            transform: `translate3d(0px, -${this.state.offset}px, 0px)`,
            transition: `all ${this.props.delay}ms ease`,
        };

        return (
            <div className={ this.props.className } style={ containerStyle }>
                {React.Children.map(this.props.children, (child, id) => {
                    return React.cloneElement(child, {
                        ref: id
                    });
                })}
            </div>
        )
    }
}