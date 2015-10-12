var React = require('react');
var ReactDOM = require('react-dom');
var {SectionsContainer, Section, Header, Footer} = require('../index');

import './demo.css';

var app = document.querySelector('#app');

var Example = React.createClass({
  render() {
    let options = {
      verticalAlign: true,
      scrollBar: false,
      sectionClassName: 'section',
      anchors: ['sectionOne', 'sectionTwo', 'sectionThree']
    };
    
    return (
      <div>
        <Header>
          <a href="#sectionOne">Section One</a>
          <a href="#sectionTwo">Section Two</a>
          <a href="#sectionThree">Section Three</a>
        </Header>
        <Footer>prop</Footer>
        <SectionsContainer className="container" {...options}>
          <Section color="#69D2E7">Hello</Section>
          <Section color="#A7DBD8">Hello Boy</Section>
          <Section color="#E0E4CC">Hello Boy 2</Section>
        </SectionsContainer>
      </div>
    );
  }
});

ReactDOM.render(<Example/>, app);
