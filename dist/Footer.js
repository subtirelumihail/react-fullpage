import React from 'react';

const Footer = React.createClass({
  displayName: 'Footer',


  render() {
    var footerStyle = {
      position: 'fixed',
      width: '100%',
      zIndex: '1',
      bottom: '0'
    };

    return React.createElement(
      'footer',
      { style: footerStyle },
      this.props.children
    );
  }

});

export default Footer;