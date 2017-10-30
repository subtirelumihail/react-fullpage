import * as React from 'react';

class Section extends React.Component {
    constructor() {
        super();

        this.state = {
            windowHeight: 0
        };
        this.handleResize = () => {
            this.setState({
                windowHeight: window.innerHeight
            });
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const alignVertical = this.props.verticalAlign || this.context.verticalAlign;
        const pix = `-${this.state.windowHeight}`
        const style = {
            zIndex: this.props.style.zIndex,
            width: '100%',
            display: alignVertical ? 'table' : 'block',
            height: this.state.windowHeight,
            maxHeight: this.state.windowHeight,
            overflow: 'auto',
            backgroundColor: this.props.color,
            paddingTop: this.context.sectionPaddingTop,
            paddingBottom: this.context.sectionPaddingBottom,
        };
        const transformStyle = {
            zIndex: this.props.style.zIndex,
            width: '100%',
            display: alignVertical ? 'table' : 'block',
            height: this.state.windowHeight,
            maxHeight: this.state.windowHeight,
            overflow: 'auto',
            backgroundColor: this.props.color,
            paddingTop: this.context.sectionPaddingTop,
            paddingBottom: this.context.sectionPaddingBottom,
            transform: `translate3d(0px, ${pix}px, 0px)`,
            transition: `all 1000ms ease`,
        };
        const sectionStyle = this.props.animate ? transformStyle : style
        return (
            <div className={this.context.sectionClassName + (this.props.className ? ` ${this.props.className}` : '')}
                 id={this.props.id} style={sectionStyle}>
                {alignVertical ? this._renderVerticalAlign() : this.props.children}
            </div>
        );
    }

    _renderVerticalAlign() {
        const verticalAlignStyle = {
            display: 'table-cell',
            verticalAlign: 'middle',
            width: '100%'
        };

        return (
            <div style={verticalAlignStyle}>
                {this.props.children}
            </div>
        );
    }
}

Section.propTypes = {
    color: React.PropTypes.string
};

Section.contextTypes = {
    verticalAlign: React.PropTypes.bool,
    sectionClassName: React.PropTypes.string,
    sectionPaddingTop: React.PropTypes.string,
    sectionPaddingBottom: React.PropTypes.string,
};

export default Section;
