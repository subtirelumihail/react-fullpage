/**
 * Created by yura on 04.01.17.
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Section from '../components/Section';
import * as actions from '../actions/ContainerActions';

const mapStateToProps = ( state ) => {
    return state;
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
};

const SectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)( Section );

export default SectionContainer;
