import * as React from 'react';


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = this.props.index == this.props.currentSection ?
            `${this.props.sectionClassName} ${this.props.activeClass}` :
               this.props.sectionClassName;

        return (
            <div className={ className }>
                { this.props.children }
            </div>
        )
    }
}
