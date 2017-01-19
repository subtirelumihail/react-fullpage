/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { findDOMNode } from 'react-dom';


export default class extends React.Component {
    _childrenLength;

    constructor( props ) {
        super( props );


        this._childrenLength = this.props.children.length;
        this.state = {};

        this._handleResize = this._handleResize.bind(this);
        this._handleMouseWheel = this._handleMouseWheel.bind(this);
        this._handleAnchor = this._handleAnchor.bind(this);
        //this._generateKeyFrames = this._generateKeyFrames.bind(this);
    }

    componentDidMount() {

        // comment this
        this.state.wrapperHeight = this._calculateHeight();

        this.bindEvents();
        this._handleAnchor();

        document.querySelector('body').style.overflow = 'hidden';

        //if( this.props.horizontalScroll ) this._generateKeyFrames();
    }

    componentWillReceiveProps(nextProps) {
        if( nextProps.currentSection !== this.props.currentSection ) {
            this.setState({
                offset: this._calculateOffset(nextProps.currentSection)
            });

            this._setAnchor(nextProps.currentSection, nextProps.currentSlide);
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    bindEvents() {
        // comment resize for horizontal scroll
        window.addEventListener('resize', this._handleResize);
        window.addEventListener('mousewheel', this._handleMouseWheel, false);
        window.removeEventListener('DOMMouseScroll', this._handleMouseWheel, false);
        window.addEventListener('hashchange', this._handleAnchor, false);
    }

    unbindEvents() {
        window.removeEventListener('resize', this._handleMouseWheel);
        window.removeEventListener('mousewheel', this._handleMouseWheel);
        window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
        window.removeEventListener('hashchange', this._handleAnchor);
    }

    /*
    * Calculators
    * */
    _calculateHeight() {
        let height = 0;

        Object.keys( this.refs ).forEach( ( key ) => {
            height += findDOMNode( this.refs[key] ).offsetHeight;
        });

        // If we want to reserve for last block (need to add flag)
        //return height + window.innerHeight - findDOMNode(this.refs[ this._childrenLength - 1 ]).offsetHeight

        return height;
    }

    // remove (or finish) this in future
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

        if( this.props.horizontalScroll ) {
            offset = 100 * currentSection;
        } else {
            for(let i = 0; i < currentSection; i ++) {
                offset += findDOMNode( this.refs[i] ).offsetHeight;
            }

            if (offset > this.state.wrapperHeight - window.innerHeight)
                offset = this.state.wrapperHeight - window.innerHeight;
        }

        return offset;
    }

    _setAnchor( section, slide ) {
        let anchor = this.props.anchors[section];

        if (Array.isArray(anchor)) anchor = anchor[ slide ];

        window.location.hash = anchor;
    }

/*    _generateKeyFrames( currentSection, direction ) {
        const hsVars = this.props.horizontalScrollVariables;

        let keyframes = `@-webkit-keyframes rifpskf {
              0%{
                -webkit-transform: translateX(${hsVars.translateX * (currentSection - direction )}vw);
                -webkit-transform: rotate (0deg);
                -webkit-transform: scale (0);
              }
              50% {
                -webkit-transform: rotate (${ hsVars.rotate }deg);
                -webkit-transform: scale (${ hsVars.scale });
              }
              100%{
                -webkit-transform: translateX(${hsVars.translateX * currentSection}vw);
                -webkit-transform: rotate (0deg);
                -webkit-transform: scale (0);
              }
            }`;
    }*/

    /*
    * Handlers
    * */
    _handleResize() {
        this.setState({
            wrapperHeight: this._calculateHeight(),
            offset: this._calculateOffset( this.props.currentSection )
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

    _handleAnchor() {
        const hash = window.location.hash.substring(1);

        let cords = this._findAnchorCords( hash );

        if ( cords ) return this.props.actions.jumpTo( cords[0], cords[1] );
    }

    // Black magic! (really black, need refactoring)
    _findAnchorCords( anchor ) {
        let anchors = this.props.anchors;

        for(let i = 0; i < anchors.length; i ++) {
            if (Array.isArray(anchors[i])) {
                for(let j = 0; j < anchors[i].length; j ++)
                    if (anchors[i][j] == anchor) return [i, j];
            }
            else if( anchors[i] == anchor ) return [i, 0];
        }

        return false;
    }

    render () {
        let containerStyle = { };

        if( this.props.horizontalScroll ) {
            containerStyle = {
                height: this.state.wrapperHeight,
                width: '100%',
                position: 'relative',
                transform: `translate3d(-${this.state.offset}vw, 0, 0)`,
                transition: `transform ${this.props.delay}ms ease`
            };
        }
        else {
            containerStyle = {
                height: this.state.wrapperHeight,
                width: '100%',
                position: 'relative',
                transform: `translate3d(0,-${this.state.offset}px,0)`,
                transition: `transform ${this.props.delay}ms ease`
            };
        }

        return (
            <div className={ this.props.className } style={ containerStyle }>
                {React.Children.map(this.props.children, (child, id) => {
                    return React.cloneElement(child, {
                        ref: id,
                        index: id,
                    });
                })}
            </div>
        )
    }
}