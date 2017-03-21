import * as React from 'react';

const fn = ( callback ) => {
    setTimeout(callback, 1000 / 60);
};
const canUseDOM = ()=> !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);
class SectionInner extends React.Component {
    state = {
        activated: false
    };
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.currentSection === this.props.index){
            let requestAnimFrame = undefined;
            if (canUseDOM()){
                requestAnimFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    fn;
            } else {
                requestAnimFrame = fn;
            }
            requestAnimFrame(()=> {
                this.setState({
                    activated: true
                });
            });
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