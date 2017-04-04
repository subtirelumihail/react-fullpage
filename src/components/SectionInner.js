import React, { Component, PropTypes } from 'react';

const fn = ( callback, time ) => {
    setTimeout(callback, time || (1000 / 60));
};

class SectionInner extends React.Component {
    state = {
        activated: false,
        leave: false
    };

    static childContextTypes = {
        isActivated: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            isActivated: this.isActivated.bind(this)
        }
    }

    isActivated(){
        return this.state.activated;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.currentSection === this.props.index){
            fn(()=> {
                this.setState({
                    activated: true,
                    leave: false
                });
            });
        } else {
            if (this.props.index === this.props.currentSection && nextProps.currentSection !== this.props.index){
                fn(()=>{
                    this.setState({
                        leave: true
                    });
                }, 1000)
            }
        }
    }

    render() {
        let className = this.props.sectionClassName;
        let { index, currentSection, activeClass, activatedClass } = this.props;
        if ( this.props.className && this.props.className.length > 0 ) className += ` ${ this.props.className }`;
        if ( index == currentSection ) className += ` ${ activeClass }`;
        if (this.state.activated) className += ` ${ activatedClass }`;
        if (this.state.leave) className += ` section-leave-finish`;
        return (
            <div className={ className }>
                { this.props.children }
            </div>
        )
    }
}

export default SectionInner;