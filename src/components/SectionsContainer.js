import * as React from 'react';
import { findDOMNode } from 'react-dom';


export default class SectionsContainer extends React.Component {
    _resetScrollTimer;
    _childrenLength;

    constructor(props) {
        super(props);

        this._childrenLength = this.props.children.length;

        this.state = {
            activeSection: 0,
            scrollingStarted: false,
            sectionScrolledPosition: 0,
            windowHeight: 1000,
        };

        this._handleMouseWheel = this._handleMouseWheel.bind(this);
        //this._handleAnchor = this._handleAnchor.bind(this);
        this._handleResize = this._handleResize.bind(this);
    }

    getChildContext() {
        return {
            sectionClassName: this.props.sectionClassName
        };
    }

    componentWillUnmount() {
        this._clearResetScrollTimer();
        //this._removeDefaultEventListeners();
        this._removeMouseWheelEventHandlers();
    }

    componentDidMount() {
        console.log(this.refs);
        console.log(this.refs.reduce);

        this.setState({
            windowHeight: this._calculateWrapperHeight()
        });

        console.log(this);

        window.addEventListener('resize', this._handleResize);

        this._addCSS3Scroll();
        //this._handleAnchor(); //Go to anchor in case we found it in the URL
        document.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes
    }

    /*_removeDefaultEventListeners() {
        this.refs.wrapper.removeEventListener('resize', this._handleResize);
        this.refs.wrapper.removeEventListener('hashchange', this._handleAnchor);
    }*/

    _calculateWrapperHeight() {
        let height = 0;

        Object.keys( this.refs ).forEach( ( key ) => {
            height += findDOMNode( this.refs[key] ).offsetHeight;
        });

        return height + window.innerHeight - findDOMNode(this.refs[ this._childrenLength - 1 ]).offsetHeight
    }

    _addCSS3Scroll() {
        this._addOverflowToBody();
        this._addMouseWheelEventHandlers();
    }

    /*_addActiveClass() {
        this._removeActiveClass();

        let hash = window.location.hash.substring(1);
        let activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);

        for (let i = 0; i < activeLinks.length; i++) {
            activeLinks[i].className = activeLinks[i].className + (activeLinks[i].className.length > 0 ? ' ' : '') + `${this.props.activeClass}`;
        }
    }

    _removeActiveClass() {
        let activeLinks = document.querySelectorAll(`a:not([href="#${this.props.anchors[this.state.activeSection]}"])`);

        for (let i = 0; i < activeLinks.length; i++) {
            activeLinks[i].className = activeLinks[i].className.replace(/\b ?active/g, '');
        }
    }*/

    _addOverflowToBody() {
        document.querySelector('body').style.overflow = 'hidden';
    }

    _addMouseWheelEventHandlers() {
        window.addEventListener('mousewheel', this._handleMouseWheel, false);
        window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
    }

    _removeMouseWheelEventHandlers() {
        window.removeEventListener('mousewheel', this._handleMouseWheel);
        window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
    }

    _handleMouseWheel(event) {
        const e = window.event || event; // old IE support
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        console.log(delta); // if -1 -> to bottom, +1 -> to top

        const activeSection = this.state.activeSection - delta;

        if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
            return false;
        }
        else {
            event.stopPropagation();
            this._handleSectionTransition(activeSection, delta > 0);
        }

        //this._setAnchor(activeSection);

        //this._addActiveClass();
    }

    _handleResize() {
        this.setState({
            scrollingStarted: true,
            windowHeight: this._calculateWrapperHeight()
        });

        this._resetScroll();
    }

    _handleSectionTransition(index, topDirection) {
        const child = findDOMNode( this.refs[ this.state.activeSection ] );
        const position = topDirection ? this.state.sectionScrolledPosition - child.offsetHeight : this.state.sectionScrolledPosition + child.offsetHeight;

        this.setState({
            scrollingStarted: true,
            activeSection: index,
            sectionScrolledPosition: position
        });

        this._resetScroll();
        this._handleScrollCallback();
    }

    /*_handleAnchor() {
        const hash = window.location.hash.substring(1).split(';');
        console.log(hash);
        const subIndex = hash[1];
        const activeSection = this.props.anchors.indexOf(hash[0]);

        if (this.state.activeSection !== activeSection) {
            this._handleSectionTransition(activeSection);
            this._addActiveClass();
        }
        else if (!!subIndex){
            this._childrenSliders[ activeSection ].activeSection = parseInt(subIndex);
            this.setState({});
        }
    }

    _setAnchor(index, subIndex) {
        const hash = this.props.anchors[index];

        if (!this.props.anchors.length || hash) {
            window.location.hash = !!subIndex ? '#' + hash + ';' + subIndex : '#' + hash;
        }
    }*/

    _handleScrollCallback() {
        if (this.props.scrollCallback) {
            setTimeout(() => this.props.scrollCallback(this.state), 0);
        }
    }

    _resetScroll() {
        this._clearResetScrollTimer();

        this._resetScrollTimer = setTimeout(() => {
            this.setState({
                scrollingStarted: false
            });
        }, this.props.delay + 300);
    }

    _clearResetScrollTimer() {
        if (this._resetScrollTimer) {
            clearTimeout(this._resetScrollTimer);
        }
    }

    /*renderNavigation() {
        let navigationStyle = {
            position: 'fixed',
            zIndex: '10',
            right: '20px',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        };

        const anchors = this.props.anchors.map((link, index) => {
            const anchorStyle = {
                display: 'block',
                margin: '10px',
                borderRadius: '100%',
                backgroundColor: '#556270',
                padding: '5px',
                transition: 'all 0.2s',
                transform: this.state.activeSection === index ? 'scale(1.3)' : 'none'
            };

            return (
                <a href={`#${link}`} key={index} className={this.props.navigationAnchorClass || 'Navigation-Anchor'}
                   style={this.props.navigationAnchorClass ? null : anchorStyle}></a>
            );
        });

        return (
            <div className={this.props.navigationClass || 'Navigation'}
                 style={this.props.navigationClass ? null : navigationStyle}>
                {anchors}
            </div>
        );
    }

    getChildrenWithProps() {
        return React.Children.map(this.props.children, (child, index) => {
            let props = {
                currentSection: this._childrenSliders[ index ] ? this._childrenSliders[ index ].current : 0,
                subIndex: this._childrenSliders[ index ] ? this._childrenSliders[ index ].current : 0,
                delay: this.props.delay
            };

            if (index == this.state.activeSection) props.active = true;

            return React.cloneElement(child, props);
        });
    }*/

    render() {
        let containerStyle = {
            height: '100%',
            width: '100%',
            position: 'relative',
            transform: `translate3d(0px, -${this.state.sectionScrolledPosition}px, 0px)`,
            transition: `all ${this.props.delay}ms ease`,
        };
        return (
            <div style={{ height: `${this.state.windowHeight}px` }} ref={ input =>  this.wrapper = input }>
                <div className={this.props.className} style={containerStyle}>
                    {React.Children.map(this.props.children, (element, idx) => {
                        return React.cloneElement(element, { ref: idx });
                    })}
                    {/*{this.props.scrollBar ? this._addChildrenWithAnchorId() : this.props.children}*/}
                </div>
                {/*{this.props.navigation && !this.props.scrollBar ? this.renderNavigation() : null}*/}
            </div>
        );
    }
}

SectionsContainer.defaultProps = {
    scrollCallback: null,
    delay: 1000,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    slider: false,
    scrollBar: true
};

SectionsContainer.propTypes = {
    scrollCallback: React.PropTypes.func,
    delay: React.PropTypes.number,
    className: React.PropTypes.string,
    sectionClassName: React.PropTypes.string,
    activeClass: React.PropTypes.string,
    slider: React.PropTypes.bool,
    scrollBar: React.PropTypes.bool
};

SectionsContainer.childContextTypes = {
    sectionClassName: React.PropTypes.string
};
