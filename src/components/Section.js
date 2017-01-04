import * as React from 'react';


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = this.props.sectionClassName;

        if ( this.props.index == this.props.currentSection ) className += ` ${ this.props.activeClass }`;
        if ( this.props.index <= this.props.lastActivated ) className += ` ${ this.props.activatedClass }`;

        return (
            <div className={ className }>
                { this.props.children }
            </div>
        )
    }
}
