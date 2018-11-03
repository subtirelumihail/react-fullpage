import React, { Component } from 'react';
import PropTypes from 'prop-types';
import join from 'classnames'

class Section extends Component {

  state = {
    windowHeight: 0
  }

  componentDidMount() {
    this.handleResize();
    addEventListener('resize', this.handleResize);
    addEventListener('orientationchange', this.handleResize);
  }

  componentWillUnmount() {
    removeEventListener('resize', this.handleResize);
    removeEventListener('orientationchange', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight
    });
  }

  render() {
    const { verticalAlign, color, children, id, className } = this.props
    const { windowHeight } = this.state
    const alignVertical = verticalAlign || this.context.verticalAlign;

    return (
      <div
        id={id}
        style={{
          width: '100%',
          overflow: 'auto',
          display: alignVertical ? 'table' : 'block',
          height: windowHeight,
          maxHeight: windowHeight,
          backgroundColor: color,
          paddingTop: this.context.sectionPaddingTop,
          paddingBottom: this.context.sectionPaddingBottom
        }}
        className={join(
          this.context.sectionClassName,
          className
        )}
      >
        {alignVertical
          ? <div style={{
              display: 'table-cell',
              verticalAlign: 'middle',
              width: '100%'
            }}>
              {children}
            </div>
          : children
        }
      </div>
    );
  }
}

Section.contextTypes = {
  verticalAlign: PropTypes.bool,
  sectionClassName: PropTypes.string,
  sectionPaddingTop: PropTypes.string,
  sectionPaddingBottom: PropTypes.string
}

Section.propTypes = {
  color: PropTypes.string
}


export default Section

