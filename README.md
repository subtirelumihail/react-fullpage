## React Full Page

This is an implementation of [fullpage.js](https://github.com/alvarotrigo/fullPage.js) in react.
For the moment this is still in development and a lot of things can change.

## Install

```
npm install --save react-fullpage
```

## Usage
### A basic usage
```javascript
import React from 'react';
import {SectionsContainer, Section} from 'react-fullpage';

let options = {
  ...
};

// => in the render() method of your app
return (
  <SectionsContainer {...options}>
    <Section>Page 1</Section>
    <Section>Page 2</Section>
    <Section>Page 3</Section>
  </SectionsContainer>
);

```

### Fixed header and footer

In case you need a fixed header and footer you can also include the `Header` or `Footer` component

```javascript

import {SectionsContainer, Section, Header, Footer} from 'react-fullpage';

// => in the render() method of your app
return (
  <Header>
    <a href="#sectionOne" className="opa">Section One</a>
    <a href="#sectionTwo">Section Two</a>
    <a href="#sectionThree">Section Three</a>
  </Header>
  <Footer>
    <a href="" className="opa">Dcoumentation</a>
    <a href="">Example Source</a>
    <a href="">About</a>
  </Footer>
  <SectionsContainer {...options}>
    <Section>Page 1</Section>
    <Section>Page 2</Section>
    <Section>Page 3</Section>
  </SectionsContainer>
);

```

## Lazyload

Cause of React doesn't support the attribute `lazy-src`, so we use `data-src` instead of `lazy-src` to achieve lazyload funcional.

```javascript
  <SectionsContainer {...options}>
    <Section>Page 1</Section>
    <Section>
      <img data-src="a.png" />
	  Page 2
	</Section>
    <Section>
	  <img data-src="b.png" />
	  <img data-src="c.png" />
	  Page 3
	</Section>
  </SectionsContainer>
```

## Default Props
Some of this props can be referenced with the [fullpage.js options](https://github.com/alvarotrigo/fullPage.js#options)
```javascript
let options = {
  activeClass:          'active', // the class that is appended to the sections links
  anchors:              [], // the anchors for each sections
  arrowNavigation:      true // use arrow keys
  className:            'SectionContainer', // the class name for the section container
  delay:                1000, // the scroll animation speed
  navigation:           true, // use dots navigatio
  scrollBar:            false, // use the browser default scrollbar
  sectionClassName:     'Section', // the section class name
  sectionPaddingTop:    '0', // the section top padding
  sectionPaddingBottom: '0', // the section bottom padding
  verticalAlign:        false // align the content of each section vertical
};
```

## Full example
You can find the full example [here](https://github.com/subtirelumihail/react-fullpage/tree/master/example)

````javascript
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
          <a href="#sectionOne">Section One</a>
          <a href="#sectionTwo">Section Two</a>
          <a href="#sectionThree">Section Three</a>
        </Header>
        <Footer>
          <a href="">Dcoumentation</a>
          <a href="">Example Source</a>
          <a href="">About</a>
        </Footer>
        <SectionsContainer className="container" {...options}>
          <Section className="custom-section" verticalAlign="true" color="#69D2E7">Page 1</Section>
          <Section color="#A7DBD8">Page 2</Section>
          <Section color="#E0E4CC">Page 3</Section>
        </SectionsContainer>
      </div>
    );
  }
});

ReactDOM.render(<Example/>, app);
````
