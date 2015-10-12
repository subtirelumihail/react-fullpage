import React from 'react';
import ReactDOM from 'react-dom';

const SectionsContainer = React.createClass({
  
  propTypes: {
    delay:            React.PropTypes.number,
    verticalAlign:    React.PropTypes.bool,
    scrollBar:        React.PropTypes.bool,
    className:        React.PropTypes.string,
    sectionClassName: React.PropTypes.string,
  },
  
  childContextTypes: {
     verticalAlign:    React.PropTypes.bool,
     sectionClassName: React.PropTypes.string
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
      delay: 1000,
      verticalAlign: false,
      scrollBar: false,
      className: 'SectionContainer',
      sectionClassName: 'Section',
      anchors: [],
    };
  },
  
  getChildContext() {
     return {
       verticalAlign: this.props.verticalAlign,
       sectionClassName: this.props.sectionClassName
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
    }
  },
  
  _addCSS3Scroll() {
    this._addOverflowToBody();
    this._addHeightToParents();
    this._addMouseWheelEventHandlers();
  },
  
  _addAnchorsToChildren() {
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
  
  _handleAnchor() {
    let hash = window.location.hash.substring(1);
    let index = this.props.anchors.indexOf(hash);
    let position = 0 - (index * this.state.windowHeight);
    
    if (!this.props.anchors.length || index === -1) {
      return false;
    }
    
    this.setState({
      activeSection: index,
      sectionScrolledPosition: position
    });
    
  //  history.pushState(null, null, window.location);
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
      <div className={this.props.className} style={containerStyle}>
        {this.props.scrollBar ? this._addAnchorsToChildren() : this.props.children}
      </div>
    );
  },
  
});

export default SectionsContainer;
