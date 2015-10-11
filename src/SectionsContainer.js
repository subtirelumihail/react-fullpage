import React from 'react';
import ReactDOM from 'react-dom';

var SectionsContainer = React.createClass({
  
  propTypes: {
    delay: React.PropTypes.number,
    verticalAlign: React.PropTypes.bool,
  },
  
  childContextTypes: {
     verticalAlign: React.PropTypes.bool
  },
  
  getInitialState() {
    return {
      activeSection: 0,
      scrollingStarted: false,
      sectionScrolledPosition: 0,
      windowHeight: window.innerHeight
    };
  },
  
  getDefaultProps() {
    return {
      delay: 1000,
      verticalAlign: false
    };
  },
  
  getChildContext: function() {
     return {
       verticalAlign: this.props.verticalAlign
     };
  },
  
  componentWillMount() {
    document.querySelector('body').style.overflow = 'hidden';
  },
  
  componentWillUnmount: function() {
    window.removeEventListener('resize', this._handleResize);
  },
  
  componentDidMount() {
    window.addEventListener('resize', this._handleResize);
    this._addHeightToParents();
    this._addMouseWheelEventHandlers();
  },
  
  _addHeightToParents() {
    var child = ReactDOM.findDOMNode(this);
    var previousParent = child.parentNode;
    
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
    
    let e = window.event || e; // old IE support
	  let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    let activeSection = this.state.activeSection - delta;
    let position = this.state.sectionScrolledPosition + (delta * this.state.windowHeight);
    let maxPosition =  0 - (this.props.children.length * this.state.windowHeight);

    if (position > 0 || maxPosition === position  || this.state.scrollingStarted) {
      this._addMouseWheelEventHandlers();
      return false;
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
  
  _handleResize: function() {
    let position = 0 - (this.state.activeSection * window.innerHeight);
    this.setState({
      windowHeight: window.innerHeight,
      sectionScrolledPosition: position
    });
  },
  
  render() {
    var containerStyle = {
      transform: `translate3d(0px, ${this.state.sectionScrolledPosition}px, 0px)`,
      transition: `all ${this.props.delay}ms ease`,
      height: '100%',
      width: '100%'
    };
    
    return (
      <div className='SectionContainer' style={containerStyle}>
        {this.props.children}
      </div>
    );
  },
  
});

export default SectionsContainer;
