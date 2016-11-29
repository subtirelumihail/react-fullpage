import './demo.css';

import React    from 'react';
import ReactDOM from 'react-dom';

import {SectionsContainer, Section, Header, Footer} from '../index';

const app = document.querySelector('#app');

const Example = React.createClass({
  render() {
    let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        false,
      sectionPaddingTop:    '50px',
      sectionPaddingBottom: '50px',
      arrowNavigation:      true
    };
    
    return (
      <div>
        <Header>
          <a href="#sectionOne" className="opa">Section One</a>
          <a href="#sectionTwo">Section Two</a>
          <a href="#sectionThree">Section Three</a>
        </Header>
        <Footer>
          <a href="">Documentation</a>
          <a href="">Example Source</a>
          <a href="">About</a>
        </Footer>
        <SectionsContainer className="container" {...options}>
          <Section className="custom-section" verticalAlign="true" color="#69D2E7">Page 1</Section>
          <Section color="#A7DBD8">
            <div data-lazy-bg="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png"></div>
            <img data-lazy-src="https://octodex.github.com/images/murakamicat.png" />
            Page 2
          </Section>
          <Section color="#E0E4CC">
            <img data-lazy-src="https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png" />
            <img data-lazy-src="https://assets-cdn.github.com/images/modules/open_graph/github-mark.png" />
            Page 3
          </Section>
        </SectionsContainer>
      </div>
    );
  }
});

ReactDOM.render(<Example/>, app);
