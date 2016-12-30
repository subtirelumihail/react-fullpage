import * as React from 'react';

class SectionSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: 1000
        };
    }

    getChildContext() {
        return {
            verticalAlign: this.props.verticalAlign,
            sectionClassName: this.props.sectionClassName,
            sectionPaddingTop: this.props.sectionPaddingTop,
            sectionPaddingBottom: this.props.sectionPaddingBottom,
            currentSection: this.props.currentSection
        };
    }

    handleResize() {
        this.setState({
            windowHeight: window.innerHeight
        });
    }

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight
        });
        window.addEventListener('resize', () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }

    render() {
        const alignVertical = this.props.verticalAlign || this.context.verticalAlign;

        const sectionStyle = {
            width: '100%',
            display: alignVertical ? 'table' : 'block',
            height: this.state.windowHeight,
            maxHeight: this.state.windowHeight,
            overflow: 'hidden',
            backgroundColor: this.props.color,
            paddingTop: this.context.sectionPaddingTop,
            paddingBottom: this.context.sectionPaddingBottom,
            position: 'relative',
            transform: `translateY(${ this.state.windowHeight * this.props.currentSection }px)`,
            transition: `all ${this.props.delay}ms ease`
        };

        let className = this.context.sectionClassName +
            (this.props.className ? ` ${this.props.className}` : '') +
            (this.props.active ? ` active` : '');

        return (
            <div className={ className }
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

SectionSlider.contextTypes = {
    verticalAlign: React.PropTypes.bool,
    sectionClassName: React.PropTypes.string,
    sectionPaddingTop: React.PropTypes.string,
    sectionPaddingBottom: React.PropTypes.string,
    currentSection: React.PropTypes.number
};

SectionSlider.childContextTypes = {
    verticalAlign: React.PropTypes.bool,
    sectionClassName: React.PropTypes.string,
    sectionPaddingTop: React.PropTypes.string,
    sectionPaddingBottom: React.PropTypes.string,
    currentSection: React.PropTypes.number
};

export default SectionSlider;