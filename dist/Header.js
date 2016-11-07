import React from 'react';

const Header = React.createClass({
  displayName: 'Header',


  render() {
    var headerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      top: '0'
    };

    return React.createElement(
      'header',
      { style: headerStyle },
      this.props.children
    );
  }

});

export default Header;