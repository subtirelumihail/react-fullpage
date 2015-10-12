import React from 'react';

const Footer = React.createClass({

  render() {
    var footerStyle = {
      position: 'fixed',
      width:    '100%',
      zIndex:   '1',
      bottom:   '0'
    };
    
    return (
      <footer style={footerStyle}>
        {this.props.children}
      </footer>
    );
  }

});

export default Footer;
