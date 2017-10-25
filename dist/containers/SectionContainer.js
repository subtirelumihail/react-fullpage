'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Section = require('../components/Section');

var _Section2 = _interopRequireDefault(_Section);

var _ContainerActions = require('../actions/ContainerActions');

var actions = _interopRequireWildcard(_ContainerActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*const mapStateToProps = ( state ) => {
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
)( Section );*/

/**
 * Created by yura on 04.01.17.
 */

exports.default = _Section2.default;