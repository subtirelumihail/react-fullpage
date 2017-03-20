import * as React from 'react';

class SectionInner extends React.Component {
    state = {
        activated: false
    };
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.currentSection === this.props.index){
            setTimeout(()=>{
                this.setState({
                    activated: true
                });
            }, 10);
        }
    }

    render() {
        let className = this.props.sectionClassName;
        let { index, currentSection, activeClass, activatedClass } = this.props;
        if ( this.props.className && this.props.className.length > 0 ) className += ` ${ this.props.className }`;
        if ( index == currentSection ) className += ` ${ activeClass }`;
        if (this.state.activated) className += ` ${ activatedClass }`;
        return (
            <div className={ className }>
                { this.props.children }
            </div>
        )
    }
}

export default SectionInner;