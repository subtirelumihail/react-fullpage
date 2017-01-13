/**
 * Created by yura on 04.01.17.
 */

import React from 'react';
import {findDOMNode} from 'react-dom';


export default class extends React.Component {
    _childrenLength = 0;

    constructor(props) {
        super(props);

        React.Children.map(this.props.children, (child) => {
            if(typeof child.type == 'function')
                this._childrenLength += 1;
        });

        this.state = {};

        this._handleResize = this._handleResize.bind(this);
        this._handleMouseWheel = this._handleMouseWheel.bind(this);
        this._handleAnchor = this._handleAnchor.bind(this);
    }

    componentDidMount() {
        this.state.wrapperHeight = this._calculateHeight();

        this.bindEvents();
        this._handleAnchor();

        document.querySelector('body').style.overflow = 'hidden';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentSection !== this.props.currentSection) {
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
        window.addEventListener('resize', this._handleResize);
        window.addEventListener('mousewheel', this._handleMouseWheel, false);
        window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
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

        Object.keys(this.refs).forEach((key) => {
            height += findDOMNode(this.refs[key]).offsetHeight;
        });

        // If we want to reserve for last block (need to add flag)
        //return height + window.innerHeight - findDOMNode(this.refs[ this._childrenLength - 1 ]).offsetHeight

        return height;
    }

    _isSlideAction() {
        let currentSection = this.props.anchors[this.props.currentSection];

        return Array.isArray(currentSection) && currentSection.length < this.props.currentSlide && this.props.currentSlide >= 0;
    }

    _canScroll(direction) {
        return direction > 0 && this.props.currentSection > 0 ||
            direction < 0 && this.props.currentSection < this.props.anchors.length - 1
    }

    _calculateOffset(currentSection) {
        let offset = 0;

        for (let i = 0; i < currentSection; i++) {
            offset += findDOMNode(this.refs[i]).offsetHeight;
        }

        if (offset > this.state.wrapperHeight - window.innerHeight)
            offset = this.state.wrapperHeight - window.innerHeight;

        return offset;
    }

    _setAnchor(section, slide) {
        let anchor = this.props.anchors[section];

        if (Array.isArray(anchor)) anchor = anchor[slide];

        window.location.hash = anchor;
    }

    /*
     * Handlers
     * */
    _handleResize() {
        this.setState({
            wrapperHeight: this._calculateHeight(),
            offset: this._calculateOffset(this.props.currentSection)
        });
    }

    _handleMouseWheel(event) {
        if (this.props.scrolling) {
            return false;
        }

        const e = window.event || event;
        const direction = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        if (this._isSlideAction()) {
            this.props.actions.moveTo(direction, true);
        }
        else {
            if (this._canScroll(direction)) {
                this.props.actions.moveTo(direction, false);
            }
            else {
                return false;
            }
        }
    }

    _handleAnchor() {
        const hash = window.location.hash.substring(1);

        let cords = this._findAnchorCords(hash);

        if (cords) return this.props.actions.jumpTo(cords[0], cords[1]);
    }

    // Black magic! (really black, need refactoring)
    _findAnchorCords(anchor) {
        let anchors = this.props.anchors;

        for (let i = 0; i < anchors.length; i++) {
            if (Array.isArray(anchors[i])) {
                for (let j = 0; j < anchors[i].length; j++)
                    if (anchors[i][j] == anchor) return [i, j];
            }
            else if (anchors[i] == anchor) return [i, 0];
        }

        return false;
    }

    render() {
        let containerStyle = {
            height: this.state.wrapperHeight,
            width: '100%',
            position: 'relative',
            transform: `translate3d(0,-${this.state.offset}px,0)`,
            transition: `all ${this.props.delay}ms ease`,
            willChange: 'transform'
        };

        let ignoredCount = 0;

        return (
            <div className={ this.props.className } style={ containerStyle }>
                {React.Children.map(this.props.children, (child, id) => {
                    if(typeof child.type == 'function') {
                        return React.cloneElement(child, {
                            ref: id - ignoredCount,
                            index: id,
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