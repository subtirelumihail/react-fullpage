import * as React from 'react';

class Footer extends React.Component {
    render() {
        const footerStyle = {
            position: 'fixed',
            width: '100%',
            zIndex: '1',
            bottom: '0'
        };

        return (
            <footer style={footerStyle}>
                {this.props.children}
            </footer>
        );
    }
}

export default Footer;
