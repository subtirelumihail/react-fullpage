var React = require('react');
var ReactDOM = require('react-dom');
var {SectionsContainer, Section} = require('../index');

var app = document.querySelector('#app');


var Example = React.createClass({
  render() {
    let options = {
      verticalAlign: false
    };
    
    return (
      <SectionsContainer {...options}>
        <Section verticalAlign={true} color="red">Hello</Section>
        <Section>Hello Boy</Section>
        <Section color="blue">Hello Boy 2</Section>
      </SectionsContainer>
    );
  }
});

ReactDOM.render(<Example/>, app);
