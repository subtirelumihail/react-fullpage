import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

const threshold = 50
const restraint = 100
const allowedTime = 1000

class SectionsContainer extends Component {
  state = {
    activeSection: this.props.activeSection,
    scrollingStarted: false,
    sectionScrolledPosition: 0,
    windowHeight: 0
  };

  resetScrollTimer;
  childrenLength;
  getChildContext() {
    return {
      verticalAlign: this.props.verticalAlign,
      sectionClassName: this.props.sectionClassName,
      sectionPaddingTop: this.props.sectionPaddingTop,
      sectionPaddingBottom: this.props.sectionPaddingBottom
    };
  }

  componentWillUnmount() {
    this.clearResetScrollTimer();
    this.removeDefaultEventListeners();
    this.removeMouseWheelEventHandlers();
    this.removeOverflowFromBody();
  }

  componentDidMount() {
    this.childrenLength = this.props.children.length;

    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    if (!this.props.scrollBar) {
      this.addCSS3Scroll();
      this.handleAnchor();

      window.addEventListener('hashchange', this.handleAnchor, false);
      window.addEventListener('keydown', this.handleArrowKeys, true);

    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeSection !== nextProps.activeSection) {
      this.setState({ activeSection: nextProps.activeSection });
      this.setAnchor(nextProps.activeSection);
      this.handleSectionTransition(nextProps.activeSection);
      this.addActiveClass();
    }
  }

  removeDefaultEventListeners = () => {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('hashchange', this.handleAnchor, false);
    window.removeEventListener('keydown', this.handleArrowKeys, true);
  }

  addCSS3Scroll = () => {
    this.addOverflowToBody();
    this.addMouseWheelEventHandlers();
  }

  addActiveClass = () => {
    this.removeActiveClass();

    let hash = window.location.hash.substring(1);
    let activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);

    for (let i = 0; i < activeLinks.length; i++) {
      activeLinks[i].className =
        activeLinks[i].className +
        (activeLinks[i].className.length > 0 ? ' ' : '') +
        `${this.props.activeClass}`;
    }
  }

  removeActiveClass = () => {
    let activeLinks = document.querySelectorAll(
      `a:not([href="#${this.props.anchors[this.state.activeSection]}"])`
    );

    for (let i = 0; i < activeLinks.length; i++) {
      activeLinks[i].className = activeLinks[i].className.replace(
        /\b ?active/g,
        ''
      );
    }
  }

  addChildrenWithAnchorId = () => {
    let index = 0;

    return Children.map(this.props.children, child => {
      let id = this.props.anchors[index];

      index++;

      if (id) {
        return cloneElement(child, {
          id: id
        });
      } else {
        return child;
      }
    });
  }

  addOverflowToBody = () => {
    document.querySelector('body').style.overflow = 'hidden';
  }

  removeOverflowFromBody = () => {
    document.querySelector('body').style.overflow = 'initial';
  }

  addMouseWheelEventHandlers = () => {
    window.addEventListener('mousewheel', this.handleMouseWheel, true);
  }

  removeMouseWheelEventHandlers = () => {
    window.removeEventListener('mousewheel', this.handleMouseWheel, true);
  }

  handleMouseWheel = event => {
    if (
      !this.containerElement ||
      !event.target.contains(this.containerElement) ||
      this.containerElement.contains(event.target)
    ) return false

    const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
    const activeSection = this.state.activeSection - delta;

    if (
      this.state.scrollingStarted ||
      activeSection < 0 ||
      this.childrenLength === activeSection
    ) {
      return false;
    }

    this.setAnchor(activeSection);
    this.handleSectionTransition(activeSection);
    this.addActiveClass();
  }

  handleResize = () => {
    const position = 0 - this.state.activeSection * window.innerHeight;

    this.setState({
      scrollingStarted: true,
      windowHeight: window.innerHeight,
      sectionScrolledPosition: position
    });

    this.resetScroll();
  }

  handleSectionTransition = (index) => {
    const position = 0 - index * this.state.windowHeight;

    if (
      !this.props.anchors.length ||
      index === -1 ||
      index >= this.props.anchors.length
    ) {
      return false;
    }

    this.setState({
      scrollingStarted: true,
      activeSection: index,
      sectionScrolledPosition: position
    });

    this.resetScroll();
    this.handleScrollCallback();
  }

  handleArrowKeys = (event) => {
    const { arrowNavigation } = this.props
    if (!arrowNavigation) return false;

    const targetSection =
      event.keyCode === 38 || event.keyCode === 37
        ? this.state.activeSection - 1
        : event.keyCode === 40 || event.keyCode === 39
          ? this.state.activeSection + 1
          : -1;

    if (
      this.state.scrollingStarted ||
      targetSection < 0 ||
      this.childrenLength === targetSection
    ) {
      return false;
    }

    this.setAnchor(targetSection);
    this.handleSectionTransition(targetSection);
    this.addActiveClass();
  }

  handleRef = (node) => {
    this.containerElement = node
  }

  handleTouchStart = (event) => {
    const { touchNavigation } = this.props
    if (!touchNavigation) return false;

    const { pageX, pageY } = event.changedTouches[0];
    this.startX = pageX;
    this.startY = pageY;
    this.startTime = new Date().getTime();
  }

  handleTouchMove = (event) => {
    const { touchNavigation } = this.props
    if (!touchNavigation) return false;

    event.preventDefault();
  }

  handleTouchEnd = (event) => {
    const { touchNavigation } = this.props
    if (!touchNavigation) return false;

    const { pageX, pageY } = event.changedTouches[0];
    const distX = pageX - this.startX;
    const distY = pageY - this.startY;
    const elapsedTime = new Date().getTime() - this.startTime;
    const isValidSwipe = (
      elapsedTime <= allowedTime &&
      Math.abs(distY) >= threshold &&
      Math.abs(distX) <= restraint
    )

    if (isValidSwipe) {
      const { anchors } = this.props
      const { activeSection } = this.state

      const swipedir = distY < 0 ? 'up' : 'down';
      const targetSection = swipedir === 'down'
        ? activeSection - 1
        : swipedir === 'up'
          ? activeSection + 1
          : -1;

      const hash = anchors[targetSection];
      if (hash) {
        window.location.hash = '#' + hash;
      }

      this.handleSectionTransition(targetSection);
    }
  }

  handleAnchor = () => {
    const { anchors } = this.props
    const { activeSection } = this.state
    const hash = window.location.hash.substring(1);
    const targetSection = anchors.indexOf(hash);

    if (activeSection !== targetSection) {
      this.handleSectionTransition(targetSection);
      this.addActiveClass();
    }
  }

  setAnchor = (index) => {
    const { anchors } = this.props
    const hash = anchors[index];

    if (hash) {
      window.location.hash = '#' + hash;
    }
  }

  handleScrollCallback = () => {
    const { scrollCallback } = this.props
    if (scrollCallback) {
      setTimeout(() => scrollCallback(this.state), 0);
    }
  }

  resetScroll = () => {
    this.clearResetScrollTimer();

    this.resetScrollTimer = setTimeout(() => {
      this.setState({
        scrollingStarted: false
      });
    }, this.props.delay + 300);
  }

  clearResetScrollTimer = () => {
    if (this.resetScrollTimer) {
      clearTimeout(this.resetScrollTimer);
    }
  }

  renderNavigation = () => {
    const { anchors, navigationClass, navigationAnchorClass } = this.props
    const { activeSection } = this.state

    let navigationStyle = {
      position: 'fixed',
      zIndex: '10',
      right: '20px',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    };

    return (
      <div
        className={navigationClass || 'Navigation'}
        style={navigationClass ? null : navigationStyle}
      >
        {anchors.map((link, index) => {
          const anchorStyle = {
            display: 'block',
            margin: '10px',
            borderRadius: '100%',
            backgroundColor: '#556270',
            padding: '5px',
            transition: 'all 0.2s',
            transform: activeSection === index ? 'scale(1.3)' : 'none'
          };
          return (
            <a
              href={`#${link}`}
              key={index}
              className={navigationAnchorClass || 'Navigation-Anchor'}
              style={navigationAnchorClass ? null : anchorStyle}
            />
          );
        })}
      </div>
    );
  }

  render() {
    let containerStyle = {
      height: '100%',
      width: '100%',
      position: 'relative',
      transform: `translate3d(0px, ${
        this.state.sectionScrolledPosition
      }px, 0px)`,
      transition: `all ${this.props.delay}ms ease`
    };
    return (
      <div>
        <div
          ref={this.handleRef}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          className={this.props.className}
          style={containerStyle}
        >
          {this.props.scrollBar
            ? this.addChildrenWithAnchorId()
            : this.props.children}
        </div>
        {this.props.navigation && !this.props.scrollBar
          ? this.renderNavigation()
          : null}
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
  touchNavigation: true
};

SectionsContainer.propTypes = {
  scrollCallback: PropTypes.func,
  delay: PropTypes.number,
  verticalAlign: PropTypes.bool,
  scrollBar: PropTypes.bool,
  navigation: PropTypes.bool,
  className: PropTypes.string,
  sectionClassName: PropTypes.string,
  navigationClass: PropTypes.string,
  navigationAnchorClass: PropTypes.string,
  activeClass: PropTypes.string,
  sectionPaddingTop: PropTypes.string,
  sectionPaddingBottom: PropTypes.string,
  arrowNavigation: PropTypes.bool,
  activeSection: PropTypes.number,
  touchNavigation: PropTypes.bool
};

SectionsContainer.childContextTypes = {
  verticalAlign: PropTypes.bool,
  sectionClassName: PropTypes.string,
  sectionPaddingTop: PropTypes.string,
  sectionPaddingBottom: PropTypes.string
};

export default SectionsContainer;