import * as React from 'react';

class SectionSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            { this.props.children }
        </div>
    }
}

export default SectionSlider;