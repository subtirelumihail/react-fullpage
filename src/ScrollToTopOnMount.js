import React, { Component } from 'react';

class ScrollToTopOnMount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

export default ScrollToTopOnMount;