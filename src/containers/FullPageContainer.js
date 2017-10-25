/**
 * Created by yura on 04.01.17.
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FullPage from '../components/FullPage';
import * as actions from '../actions/ContainerActions';

const mapStateToProps = ( state ) => {
    return {
        ...state.fullpage,
        routing: state.routing
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
};

const FullPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)( FullPage );

export default FullPageContainer;
