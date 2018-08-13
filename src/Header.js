import React, { Component } from 'react';

class Header extends Component {
  render() {
    const headerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      top: '0'
    };

    return <header style={headerStyle}>{this.props.children}</header>;
  }
}

export default Header;
