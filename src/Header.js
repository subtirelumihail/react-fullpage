import React from 'react';

const Header = React.createClass({

  render() {
    var headerStyle = {
      position: 'fixed',
      width:    '100%',
      zIndex:   '1',
      top:      '0'
    };
    
    return (
      <header style={headerStyle}>
        {this.props.children}
      </header>
    );
  }

});

export default Header;
