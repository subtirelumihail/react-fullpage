'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _FullPage = require('../components/FullPage');

var _FullPage2 = _interopRequireDefault(_FullPage);

var _ContainerActions = require('../actions/ContainerActions');

var actions = _interopRequireWildcard(_ContainerActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yura on 04.01.17.
 */

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(actions, dispatch)
    };
};

var FullPageContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_FullPage2.default);

exports.default = FullPageContainer;