import React from 'react';
import ReactDOM from 'react-dom';

const SectionsContainer = React.createClass({
  
  propTypes: {
    delay:                  React.PropTypes.number,
    verticalAlign:          React.PropTypes.bool,
    scrollBar:              React.PropTypes.bool,
    navigation:             React.PropTypes.bool,
    className:              React.PropTypes.string,
    sectionClassName:       React.PropTypes.string,
    navigationClass:        React.PropTypes.string,
    navigationAnchorClass:  React.PropTypes.string,
    activeClass:            React.PropTypes.string,
    sectionPaddingTop:      React.PropTypes.string,
    sectionPaddingBottom:   React.PropTypes.string,
    arrowNavigation:        React.PropTypes.bool,
  },
  
  childContextTypes: {
     verticalAlign:          React.PropTypes.bool,
     sectionClassName:       React.PropTypes.string,
     sectionPaddingTop:      React.PropTypes.string,
     sectionPaddingBottom:   React.PropTypes.string,
  },
  
  getInitialState() {
    return {
      activeSection: 0,
      scrollingStarted: false,
      sectionScrolledPosition: 0,
      windowHeight: window.innerHeight,
    };
  },
  
  getDefaultProps() {
    return {
      delay:                1000,
      verticalAlign:        false,
      scrollBar:            false,
      navigation:           true,
      className:            'SectionContainer',
      sectionClassName:     'Section',
      anchors:              [],
      activeClass:          'active',
      sectionPaddingTop:    '0',
      sectionPaddingBottom: '0',
      arrowNavigation:      true
    };
  },
  
  getChildContext() {
     return {
       verticalAlign:          this.props.verticalAlign,
       sectionClassName:       this.props.sectionClassName,
       sectionPaddingTop:      this.props.sectionPaddingTop,
       sectionPaddingBottom:   this.props.sectionPaddingBottom,
     };
  },
  
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  
  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
    
    if (!this.props.scrollBar) {
      this._addCSS3Scroll();
      this._handleAnchor(); //Go to anchor in case we found it in the URL
      
      window.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes
      
      if (this.props.arrowNavigation) {
        window.addEventListener('keydown', this._handleArrowKeys);
      }
    }
  },
  
  _addCSS3Scroll() {
    this._addOverflowToBody();
    this._addHeightToParents();
    this._addMouseWheelEventHandlers();
  },
  
  _addActiveClass() {
    this._removeActiveClass();
    
    let hash = window.location.hash.substring(1);
    let activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);
    
    for( let i=0; i < activeLinks.length; i++) {
      activeLinks[i].className = activeLinks[i].className + (activeLinks[i].className.length > 0 ? ' ': '') + `${this.props.activeClass}`;
    }
    
    //console.log(allLinks);
  },
  
  _removeActiveClass() {
    let activeLinks = document.querySelectorAll(`a:not([href="#${this.props.anchors[this.state.activeSection]}"])`);
    
    for( let i=0; i < activeLinks.length; i++) {
      activeLinks[i].className = activeLinks[i].className.replace(/\b ?active/g, '');
    }
  },
  
  _addChildrenWithAnchorId() {
    var index = 0;
    return React.Children.map(this.props.children, function (child) {
      let id = this.props.anchors[index];
      index++;
      if (id) {
        return React.cloneElement(child, {
          id: id
        });
      } else {
        return child;
      }
    }.bind(this));
  },
  
  _addOverflowToBody() {
    document.querySelector('body').style.overflow = 'hidden';
  },
  
  _addHeightToParents() {
    let child = ReactDOM.findDOMNode(this);
    let previousParent = child.parentNode;
    
    while (previousParent) {
      if ('style' in previousParent) {
        previousParent.style.height = '100%';
        previousParent = previousParent.parentNode;
      } else {
        return false;
      }
    }
  },
  
  _addMouseWheelEventHandlers() {
    window.addEventListener('mousewheel', this._mouseWheelHandler, false);
    window.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false);
  },
  
  _removeMouseWheelEventHandlers() {
    window.removeEventListener('mousewheel', this._mouseWheelHandler);
    window.removeEventListener('DOMMouseScroll', this._mouseWheelHandler);
  },
  
  _mouseWheelHandler() {
    this._removeMouseWheelEventHandlers();
    
    let e             = window.event || e; // old IE support
	  let delta         = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    let position      = this.state.sectionScrolledPosition + (delta * this.state.windowHeight);
    let activeSection = this.state.activeSection - delta;
    let maxPosition   = 0 - (this.props.children.length * this.state.windowHeight);

    if (position > 0 || maxPosition === position  || this.state.scrollingStarted) {
      return this._addMouseWheelEventHandlers();
    }
    
    let index = this.props.anchors[activeSection];
    if (!this.props.anchors.length || index) {
      window.location.hash = '#' + index;
    }
    
    this.setState({
      activeSection: activeSection,
      scrollingStarted: true,
      sectionScrolledPosition: position
    });
    
    setTimeout(() => {
      this.setState({
        scrollingStarted: false
      });
      this._addMouseWheelEventHandlers();
    }, this.props.delay + 300);
  },
  
  _handleResize() {
    let position = 0 - (this.state.activeSection * window.innerHeight);
    this.setState({
      windowHeight: window.innerHeight,
      sectionScrolledPosition: position
    });
  },
  
  _handleSectionTransition(index) {
    let position = 0 - (index * this.state.windowHeight);
    
    if (!this.props.anchors.length || index === -1 || index >= this.props.anchors.length) {
      return false;
    }
    
    this.setState({
      activeSection: index,
      sectionScrolledPosition: position
    });
  },
  
  _handleArrowKeys(e) {
    let event     = window.event ? window.event : e;
    let direction = event.keyCode === 38 || event.keyCode === 37 ? this.state.activeSection - 1 : (event.keyCode === 40 || event.keyCode === 39 ? this.state.activeSection + 1 : -1);
    let hash      = this.props.anchors[direction];
    
    if (!this.props.anchors.length || hash) {
      window.location.hash = '#' + hash;
    }
    
    this._handleSectionTransition(direction);
  },
  
  _handleAnchor() {
    let hash  = window.location.hash.substring(1);
    let index = this.props.anchors.indexOf(hash);
    
    this._handleSectionTransition(index);
    
    this._addActiveClass();
  },
  
  renderNavigation() {
    let navigationStyle = {
      position:   'fixed',
      zIndex:     '10',
      right:      '20px',
      top:        '50%',
      transform:  'translate(-50%, -50%)',
    };
    
    const anchors = this.props.anchors.map((link, index) => {
      let anchorStyle = {
        display:          'block',
        margin:           '10px',
        borderRadius:     '100%',
        backgroundColor:  '#556270',
        padding:          '5px',
        transition:       'all 0.2s',
        transform:        this.state.activeSection === index ? 'scale(1.3)' : 'none'
      };
      return <a href={`#${link}`} key={index} className={this.props.navigationAnchorClass || 'Navigation-Anchor'} style={this.props.navigationAnchorClass ? null : anchorStyle}></a>;
    });
    
    return (
      <div className={this.props.navigationClass || 'Navigation'} style={this.props.navigationClass ? null : navigationStyle}>
        {anchors}
      </div>
    );
  },
  
  render() {
    let containerStyle = {
      height:     '100%',
      width:      '100%',
      position:   'relative',
      transform:  `translate3d(0px, ${this.state.sectionScrolledPosition}px, 0px)`,
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
  },
  
});

export default SectionsContainer;
