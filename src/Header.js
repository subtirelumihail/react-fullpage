import * as React from 'react';

class Header extends React.Component {
    render() {
        const headerStyle = {
            position: 'fixed',
            width: '100%',
            zIndex: '1',
            top: '0'
        };

        return (
            <header style={headerStyle}>
                {this.props.children}
            </header>
        );
    }
}

export default Header;
