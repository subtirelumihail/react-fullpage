import React, { Component } from 'react';

export default class Navigation extends Component {

  render() {
    const { anchors, navigationClass, navigationAnchorClass, activeSection } = this.props

    let navigationStyle = {
      position: 'fixed',
      zIndex: '10',
      right: '20px',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    };

    return (
      <div
        className={navigationClass || 'Navigation'}
        style={navigationClass ? null : navigationStyle}
      >
        {anchors.map((link, index) => {
          const anchorStyle = {
            display: 'block',
            margin: '10px',
            borderRadius: '100%',
            backgroundColor: '#556270',
            padding: '5px',
            transition: 'all 0.2s',
            transform: activeSection === index ? 'scale(1.3)' : 'none'
          };
          return (
            <a
              href={`#${link}`}
              key={index}
              className={navigationAnchorClass || 'Navigation-Anchor'}
              style={navigationAnchorClass ? null : anchorStyle}
            />
          );
        })}
      </div>
    );
  }
}