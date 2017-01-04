import * as React from 'react';


class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //windowHeight: 1000
        };
    }

    /*handleResize() {
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
    }*/

    render() {
        const alignVertical = this.props.verticalAlign || this.context.verticalAlign;

        const sectionStyle = {
            width: '100%',
            overflow: 'auto'
        };

        let className = this.context.sectionClassName +
            (this.props.className ? ` ${this.props.className}` : '');

        console.log(this.props.children);
        return (
            <div ref={ wrapper => this.wrapper = wrapper } className={ className } id={this.props.id} style={sectionStyle}>
                { this.props.children }
            </div>
        );
    }
}

/*Section.propTypes = {
    color: React.PropTypes.string,
    delay: React.PropTypes.number
};*/

Section.contextTypes = {
    sectionClassName: React.PropTypes.string
};

export default Section;
