/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import _isEqual from 'lodash/isEqual';

export default class extends React.Component {
    _childrenLength;
    _scrolling = false;
    state = {};
    constructor( props ) {
        super( props );

        React.Children.map(this.props.children, (child) => {
            if(child !== null && typeof child.type == 'function')
                this._childrenLength += 1;
        });
        this.state = {
            offset: 0,
            wrapperHeight: 0
        };
        this._childrenLength = this.props.children.length;

        this._handleResize = this._handleResize.bind(this);
        this._handleMouseWheel = this._handleMouseWheel.bind(this);
        this._handleAnchor = this._handleAnchor.bind(this);
        // this._getSectionClassName = this._getSectionClassName.bind(this);
        //this._generateKeyFrames = this._generateKeyFrames.bind(this);
    }
    componentDidMount() {
        this.state.wrapperHeight = this._calculateHeight();

        this.bindEvents();
        this._handleAnchor();
        if (this.state.offset === 0){
            this.setState({
                offset: this._calculateOffset(this.props.currentSection)
            });
            if (this.props.currentSection > 0 && this.props.scrollCallback){
               this.props.scrollCallback( this.props.currentSection );
            }
        }

        if (this.props.bindToSelector && this.props.bindToSelector.length > 0){
            // document.querySelector(this.props.bindToSelector).style.overflow = 'hidden';
        }

        //if( this.props.horizontalScroll ) this._generateKeyFrames();
    }
    shouldComponentUpdate(nextProps, nextState){
        return !_isEqual(nextProps, this.props) || !_isEqual(this.state, nextState);
    }
    componentWillReceiveProps(nextProps) {
        this._scrolling = nextProps.scrolling;

        if( nextProps.currentSection !== this.props.currentSection ) {
            this.setState({
                offset: this._calculateOffset(nextProps.currentSection)
            });

            this._setAnchor(nextProps.currentSection, nextProps.currentSlide);

            if ( this.props.scrollCallback ) this.props.scrollCallback( nextProps.currentSection );
        }
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    bindEvents() {
        // comment resize for horizontal scroll
        window.addEventListener('resize', this._handleResize);
        window.addEventListener('mousewheel', this._handleMouseWheel, false);
        window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
        // window.addEventListener('hashchange', this._handleAnchor, false);
    }

    unbindEvents() {
        window.removeEventListener('resize', this._handleMouseWheel);
        window.removeEventListener('mousewheel', this._handleMouseWheel);
        window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
        // window.removeEventListener('hashchange', this._handleAnchor);
    }

    /*
    * Calculators
    * */
    _calculateHeight() {
        let height = 0;
        Object.keys( this.refs ).forEach( ( key ) => {
            let node = findDOMNode( this.refs[key] );
            height += (node && node.offsetHeight);
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
                let node = findDOMNode( this.refs[i] );
                offset += (node && node.offsetHeight);
            }

            if (offset > this.state.wrapperHeight - window.innerHeight)
                offset = this.state.wrapperHeight - window.innerHeight;
        }

        return offset;
    }

    _setAnchor( section, slide ) {
        let anchor = this.props.anchors[section];

        if (Array.isArray(anchor)) anchor = anchor[ slide ];

        // window.location.hash = anchor;
        this.props.actions.replace(anchor);
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
        if (this._scrolling) {
            return false;
        }

        this._scrolling = true;

        const e = window.event || event;
        const direction = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        // console.log('scroll', event, this.props);

        if(this._canScroll( direction )) {
            this.props.actions.moveTo( direction, false );
        }
        else {
            this._scrolling = false;
            return false;
        }
        //     if (this._isSlideAction()) {
        //         this.props.actions.moveTo( direction, true );
        //     }
        //     else {
        //     }
    }

    _handleAnchor() {
        if (this._scrolling && !window) {
            return false;
        }

        const hash = this.props.routing.location.pathname || "";

        let cords = this._findAnchorCords( hash );

        if ( cords ) {
            this._scrolling = true;
            this.props.actions.jumpTo( cords[0], cords[1] );
        }
    }

    // Black magic! (really black, need refactoring)
    _findAnchorCords( anchor ) {
        let anchors = this.props.anchors || [];

        for(let i = 0; i < anchors.length; i ++) {
            if (Array.isArray(anchors[i])) {
                for(let j = 0; j < anchors[i].length; j ++)
                    if (anchors[i][j] == anchor) return [i, j];
            }
            else if( anchors[i] == anchor ) return [i, 0];
        }

        return false;
    }

    componentDidUpdate(){
        this.bindEvents();
    }
    componentWillUpdate(){
        this.unbindEvents();
    }
    render () {
        let containerStyle = { };
        let { horizontalScroll, delay, className } = this.props;
        let { offset, wrapperHeight } = this.state;
        if( horizontalScroll ) {
            containerStyle = {
                // height: wrapperHeight,
                width: `${ this._childrenLength * 100 }vw`,
                // position: 'relative',

                transform: `translate3d(-${offset}vw, 0, 0)`,
                MozTransform: `translate3d(-${offset}vw, 0, 0)`,
                msTransform: `translate3d(-${offset}vw, 0, 0)`,
                WebkitTransform: `translate3d(-${offset}vw, 0, 0)`,
                OTransform: `translate3d(-${offset}vw, 0, 0)`,

                // transition: `transform ${delay}ms ease`,
                // WebkitTransition: `transform ${delay}ms ease`,
                // MozTransition: `transform ${delay}ms ease`,
                // OTransition: `transform ${delay}ms ease`
            };

            if (this.props.recalculateHeight){
                containerStyle = {...containerStyle, height: wrapperHeight}
            }

        }
        else {
            containerStyle = {
                // height: wrapperHeight,
                // width: '100%',
                // position: 'relative',

                transform: `translate3d(0,-${offset}px,0)`,
                MozTransform: `translate3d(0,-${offset}px,0)`,
                msTransform: `translate3d(0,-${offset}px,0)`,
                WebkitTransform: `translate3d(0,-${offset}px,0)`,
                OTransform: `translate3d(0,-${offset}px,0)`,

                // transition: `transform ${delay}ms ease`,
                // WebkitTransition: `transform ${delay}ms ease`,
                // MozTransition: `transform ${delay}ms ease`,
                // OTransition: `transform ${delay}ms ease`,
            };
            if (this.props.recalculateHeight){
                containerStyle = {...containerStyle, height: wrapperHeight}
            }
        }

        let ignoredCount = 0;
        return (
            <div className={className} style={ containerStyle }>
                {React.Children.map(this.props.children, (child, id) => {
                    let {activeClass, activatedClass, sectionClassName, currentSection, lastActivated} = this.props;
                    if( child !== null && typeof child.type == 'function') {
                        return React.cloneElement(child, {
                            key: id,
                            ref: id - ignoredCount,
                            index: id - ignoredCount,
                            activeClass: activeClass,
                            activatedClass: activatedClass,
                            sectionClassName: sectionClassName,
                            currentSection: currentSection,
                            lastActivated: lastActivated
                        });
                    }
                    else {
                        ignoredCount += 1;
                        return child;
                    }
                })}
            </div>
        )
    }
}