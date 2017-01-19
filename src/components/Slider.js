/**
 * Created by yura on 05.01.17.
 */

import React from 'react';
import { FindDOMNode } from 'react-dom';


export default class extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        let containerStyle = {
            height: this.state.wrapperHeight,
            width: '100%',
            position: 'relative',
            transform: `translate3d(0px, -${this.state.offset}px, 0px)`,
            transition: `all ${this.props.delay}ms ease`,
        };

        /*transform: `translateY(${ this.state.windowHeight * this.props.currentSection }px)`,
            +            transition: `all ${this.props.delay}ms ease`*/

        return (
            <div>
                {React.Children.map(this.props.children, (child, id) => {
                    return React.cloneElement(child, {
                        ref: id,
                        index: id,
                    });
                })}
            </div>
        )
    }
}