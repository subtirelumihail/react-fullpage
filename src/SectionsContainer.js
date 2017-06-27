import * as React from 'react';

export default class SectionsContainer extends React.Component {
    _resetScrollTimer;
    _childrenLength;

    constructor(props) {
        super(props);
        this.state = {
            activeSection: props.activeSection,
            scrollingStarted: false,
            sectionScrolledPosition: 0,
            windowHeight: 0
        };

        this._handleMouseWheel = this._handleMouseWheel.bind(this);
        this._handleAnchor = this._handleAnchor.bind(this);
        this._handleResize = this._handleResize.bind(this);
        this._handleArrowKeys = this._handleArrowKeys.bind(this);
    }

    getChildContext() {
        return {
            verticalAlign: this.props.verticalAlign,
            sectionClassName: this.props.sectionClassName,
            sectionPaddingTop: this.props.sectionPaddingTop,
            sectionPaddingBottom: this.props.sectionPaddingBottom,
        };
    }

    componentWillUnmount() {
        this._clearResetScrollTimer();
        this._removeDefaultEventListeners();
        this._removeMouseWheelEventHandlers();
        this._removeOverflowFromBody();
    }

    componentDidMount() {
        this._childrenLength = this.props.children.length;

        this._handleResize();
        window.addEventListener('resize', this._handleResize);

        if (!this.props.scrollBar) {
            this._addCSS3Scroll();
            this._handleAnchor(); //Go to anchor in case we found it in the URL

            window.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes

            if (this.props.arrowNavigation) {
                window.addEventListener('keydown', this._handleArrowKeys);
            }

            if (this.props.touchNavigation) {
              this._handleTouchNav();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.activeSection !== nextProps.activeSection) {
          this.setState({activeSection: nextProps.activeSection})
          this._setAnchor(nextProps.activeSection);
          this._handleSectionTransition(nextProps.activeSection);
          this._addActiveClass();
      }
    }

    _removeDefaultEventListeners() {
        window.removeEventListener('resize', this._handleResize);
        window.removeEventListener('hashchange', this._handleAnchor);


        if (this.props.arrowNavigation) {
            window.removeEventListener('keydown', this._handleArrowKeys);
        }
    }

    _addCSS3Scroll() {
        this._addOverflowToBody();
        this._addMouseWheelEventHandlers();
    }

    _addActiveClass() {
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
    }

    _addChildrenWithAnchorId() {
        let index = 0;

        return React.Children.map(this.props.children, (child) => {
            let id = this.props.anchors[index];

            index++;

            if (id) {
                return React.cloneElement(child, {
                    id: id
                });
            } else {
                return child;
            }
        });
    }

    _addOverflowToBody() {
        document.querySelector('body').style.overflow = 'hidden';
    }

     _removeOverflowFromBody() {
        document.querySelector('body').style.overflow = 'initial';
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
        const activeSection = this.state.activeSection - delta;

        if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
            return false;
        }

        this._setAnchor(activeSection);
        this._handleSectionTransition(activeSection);
        this._addActiveClass();
    }

    _handleResize() {
        const position = 0 - (this.state.activeSection * window.innerHeight);

        this.setState({
            scrollingStarted: true,
            windowHeight: window.innerHeight,
            sectionScrolledPosition: position
        });

        this._resetScroll();
    }

    _handleSectionTransition(index) {
        const position = 0 - (index * this.state.windowHeight);

        if (!this.props.anchors.length || index === -1 || index >= this.props.anchors.length) {
            return false;
        }

        this.setState({
            scrollingStarted: true,
            activeSection: index,
            sectionScrolledPosition: position
        });

        this._resetScroll();
        this._handleScrollCallback();
    }

    _handleArrowKeys(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault(); // Prevent unwanted scrolling on Firefox
        }
        const event = window.event ? window.event : e;
        const activeSection = event.keyCode === 38 || event.keyCode === 37 ? this.state.activeSection - 1 : (event.keyCode === 40 || event.keyCode === 39 ? this.state.activeSection + 1 : -1);

        if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
            return false;
        }

        this._setAnchor(activeSection);
        this._handleSectionTransition(activeSection);
        this._addActiveClass();
    }
    
    _handleTouchNav() {
    var that = this;

    var touchsurface = document.querySelector("." + this.props.className),
    swipedir,
    startX,
    startY,
    dist,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = function(swipedir){console.log(swipedir);}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
              var direction = swipedir === 'down' ? that.state.activeSection - 1 : swipedir === 'up' ? that.state.activeSection + 1 : -1;
              var hash = that.props.anchors[direction];

              if (!that.props.anchors.length || hash) {
                window.location.hash = '#' + hash;
              }

              that._handleSectionTransition(direction);
            }
        }
        handleswipe(swipedir)
        // e.preventDefault()
    }, false)
  }

    _handleAnchor() {
        const hash = window.location.hash.substring(1);
        const activeSection = this.props.anchors.indexOf(hash);

        if (this.state.activeSection !== activeSection) {
            this._handleSectionTransition(activeSection);
            this._addActiveClass();
        }
    }

    _setAnchor(index) {
        const hash = this.props.anchors[index];

        if (!this.props.anchors.length || hash) {
            window.location.hash = '#' + hash;
        }
    }

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

    renderNavigation() {
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

    render() {
        let containerStyle = {
            height: '100%',
            width: '100%',
            position: 'relative',
            transform: `translate3d(0px, ${this.state.sectionScrolledPosition}px, 0px)`,
            transition: `all ${this.props.delay}ms ease`,
        };
        return (
            <div>
                <div className={this.props.className} style={containerStyle}>
                    {this.props.scrollBar ? this._addChildrenWithAnchorId() : this.props.children}
                </div>
                {this.props.navigation && !this.props.scrollBar ? this.renderNavigation() : null}
            </div>
        );
    }
}

SectionsContainer.defaultProps = {
    scrollCallback: null,
    delay: 1000,
    verticalAlign: false,
    scrollBar: false,
    navigation: true,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    sectionPaddingTop: '0',
    sectionPaddingBottom: '0',
    arrowNavigation: true,
    activeSection: 0,
    touchNavigation: true,
};

SectionsContainer.propTypes = {
    scrollCallback: React.PropTypes.func,
    delay: React.PropTypes.number,
    verticalAlign: React.PropTypes.bool,
    scrollBar: React.PropTypes.bool,
    navigation: React.PropTypes.bool,
    className: React.PropTypes.string,
    sectionClassName: React.PropTypes.string,
    navigationClass: React.PropTypes.string,
    navigationAnchorClass: React.PropTypes.string,
    activeClass: React.PropTypes.string,
    sectionPaddingTop: React.PropTypes.string,
    sectionPaddingBottom: React.PropTypes.string,
    arrowNavigation: React.PropTypes.bool,
    activeSection: React.PropTypes.number,
    touchNavigation: React.PropTypes.bool,
};

SectionsContainer.childContextTypes = {
    verticalAlign: React.PropTypes.bool,
    sectionClassName: React.PropTypes.string,
    sectionPaddingTop: React.PropTypes.string,
    sectionPaddingBottom: React.PropTypes.string,
};
