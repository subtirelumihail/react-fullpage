import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Section extends Component {
  state = {
    windowHeight: 0
  };

  handleResize() {
    this.setState({
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleResize());
  }

  renderVerticalAlign = () => {
    const verticalAlignStyle = {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '100%'
    };

    return <div style={verticalAlignStyle}>{this.props.children}</div>;
  };

  render() {
    const alignVertical =
      this.props.verticalAlign || this.context.verticalAlign;

    const sectionStyle = {
      width: '100%',
      display: alignVertical ? 'table' : 'block',
      height: this.state.windowHeight,
      maxHeight: this.state.windowHeight,
      overflow: 'auto',
      backgroundColor: this.props.color,
      paddingTop: this.context.sectionPaddingTop,
      paddingBottom: this.context.sectionPaddingBottom
    };

    return (
      <div
        className={
          this.context.sectionClassName +
          (this.props.className ? ` ${this.props.className}` : '')
        }
        id={this.props.id}
        style={sectionStyle}>
        {alignVertical ? this.renderVerticalAlign() : this.props.children}
      </div>
    );
  }
}

Section.propTypes = {
  color: PropTypes.string
};

Section.contextTypes = {
  verticalAlign: PropTypes.bool,
  sectionClassName: PropTypes.string,
  sectionPaddingTop: PropTypes.string,
  sectionPaddingBottom: PropTypes.string
};

export default Section;
