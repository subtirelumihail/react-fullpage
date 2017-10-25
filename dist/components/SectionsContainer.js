'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SectionsContainer = function (_React$Component) {
    _inherits(SectionsContainer, _React$Component);

    function SectionsContainer(props) {
        _classCallCheck(this, SectionsContainer);

        var _this = _possibleConstructorReturn(this, (SectionsContainer.__proto__ || Object.getPrototypeOf(SectionsContainer)).call(this, props));

        _this._childrenLength = _this.props.children.length;

        _this.state = {
            activeSection: 0,
            scrollingStarted: false,
            sectionScrolledPosition: 0,
            windowHeight: 1000
        };

        _this._handleMouseWheel = _this._handleMouseWheel.bind(_this);
        //this._handleAnchor = this._handleAnchor.bind(this);
        _this._handleResize = _this._handleResize.bind(_this);
        return _this;
    }

    _createClass(SectionsContainer, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                sectionClassName: this.props.sectionClassName
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._clearResetScrollTimer();
            //this._removeDefaultEventListeners();
            this._removeMouseWheelEventHandlers();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(this.refs);
            console.log(this.refs.reduce);

            this.setState({
                windowHeight: this._calculateWrapperHeight()
            });

            console.log(this);

            window.addEventListener('resize', this._handleResize);

            this._addCSS3Scroll();
            //this._handleAnchor(); //Go to anchor in case we found it in the URL
            document.addEventListener('hashchange', this._handleAnchor, false); //Add an event to watch the url hash changes
        }

        /*_removeDefaultEventListeners() {
            this.refs.wrapper.removeEventListener('resize', this._handleResize);
            this.refs.wrapper.removeEventListener('hashchange', this._handleAnchor);
        }*/

    }, {
        key: '_calculateWrapperHeight',
        value: function _calculateWrapperHeight() {
            var _this2 = this;

            var height = 0;

            Object.keys(this.refs).forEach(function (key) {
                height += (0, _reactDom.findDOMNode)(_this2.refs[key]).offsetHeight;
            });

            return height + window.innerHeight - (0, _reactDom.findDOMNode)(this.refs[this._childrenLength - 1]).offsetHeight;
        }
    }, {
        key: '_addCSS3Scroll',
        value: function _addCSS3Scroll() {
            this._addOverflowToBody();
            this._addMouseWheelEventHandlers();
        }

        /*_addActiveClass() {
            this._removeActiveClass();
             let hash = window.location.hash.substring(1);
            let activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);
             for (let i = 0; i < activeLinks.length; i++) {
                activeLinks[i].className = activeLinks[i].className + (activeLinks[i].className.length > 0 ? ' ' : '') + `${this.props.activeClass}`;
            }
        }
         _removeActiveClass() {
            let activeLinks = document.querySelectorAll(`a:not([href="#${this.props.anchors[this.state.activeSection]}"])`);
             for (let i = 0; i < activeLinks.length; i++) {
                activeLinks[i].className = activeLinks[i].className.replace(/\b ?active/g, '');
            }
        }*/

    }, {
        key: '_addOverflowToBody',
        value: function _addOverflowToBody() {
            document.querySelector('body').style.overflow = 'hidden';
        }
    }, {
        key: '_addMouseWheelEventHandlers',
        value: function _addMouseWheelEventHandlers() {
            window.addEventListener('mousewheel', this._handleMouseWheel, false);
            window.addEventListener('DOMMouseScroll', this._handleMouseWheel, false);
        }
    }, {
        key: '_removeMouseWheelEventHandlers',
        value: function _removeMouseWheelEventHandlers() {
            window.removeEventListener('mousewheel', this._handleMouseWheel);
            window.removeEventListener('DOMMouseScroll', this._handleMouseWheel);
        }
    }, {
        key: '_handleMouseWheel',
        value: function _handleMouseWheel(event) {
            var e = window.event || event; // old IE support
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            console.log(delta); // if -1 -> to bottom, +1 -> to top

            var activeSection = this.state.activeSection - delta;

            if (this.state.scrollingStarted || activeSection < 0 || this._childrenLength === activeSection) {
                return false;
            } else {
                event.stopPropagation();
                this._handleSectionTransition(activeSection, delta > 0);
            }

            //this._setAnchor(activeSection);

            //this._addActiveClass();
        }
    }, {
        key: '_handleResize',
        value: function _handleResize() {
            this.setState({
                scrollingStarted: true,
                windowHeight: this._calculateWrapperHeight()
            });

            this._resetScroll();
        }
    }, {
        key: '_handleSectionTransition',
        value: function _handleSectionTransition(index, topDirection) {
            var child = (0, _reactDom.findDOMNode)(this.refs[this.state.activeSection]);
            var position = topDirection ? this.state.sectionScrolledPosition - child.offsetHeight : this.state.sectionScrolledPosition + child.offsetHeight;

            this.setState({
                scrollingStarted: true,
                activeSection: index,
                sectionScrolledPosition: position
            });

            this._resetScroll();
            this._handleScrollCallback();
        }

        /*_handleAnchor() {
            const hash = window.location.hash.substring(1).split(';');
            console.log(hash);
            const subIndex = hash[1];
            const activeSection = this.props.anchors.indexOf(hash[0]);
             if (this.state.activeSection !== activeSection) {
                this._handleSectionTransition(activeSection);
                this._addActiveClass();
            }
            else if (!!subIndex){
                this._childrenSliders[ activeSection ].activeSection = parseInt(subIndex);
                this.setState({});
            }
        }
         _setAnchor(index, subIndex) {
            const hash = this.props.anchors[index];
             if (!this.props.anchors.length || hash) {
                window.location.hash = !!subIndex ? '#' + hash + ';' + subIndex : '#' + hash;
            }
        }*/

    }, {
        key: '_handleScrollCallback',
        value: function _handleScrollCallback() {
            var _this3 = this;

            if (this.props.scrollCallback) {
                setTimeout(function () {
                    return _this3.props.scrollCallback(_this3.state);
                }, 0);
            }
        }
    }, {
        key: '_resetScroll',
        value: function _resetScroll() {
            var _this4 = this;

            this._clearResetScrollTimer();

            this._resetScrollTimer = setTimeout(function () {
                _this4.setState({
                    scrollingStarted: false
                });
            }, this.props.delay + 300);
        }
    }, {
        key: '_clearResetScrollTimer',
        value: function _clearResetScrollTimer() {
            if (this._resetScrollTimer) {
                clearTimeout(this._resetScrollTimer);
            }
        }

        /*renderNavigation() {
            let navigationStyle = {
                position: 'fixed',
                zIndex: '10',
                right: '20px',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            };
             const anchors = this.props.anchors.map((link, index) => {
                const anchorStyle = {
                    display: 'block',
                    margin: '10px',
                    borderRadius: '100%',
                    backgroundColor: '#556270',
                    padding: '5px',
                    transition: 'all 0.2s',
                    transform: this.state.activeSection === index ? 'scale(1.3)' : 'none'
                };
                 return (
                    <a href={`#${link}`} key={index} className={this.props.navigationAnchorClass || 'Navigation-Anchor'}
                       style={this.props.navigationAnchorClass ? null : anchorStyle}></a>
                );
            });
             return (
                <div className={this.props.navigationClass || 'Navigation'}
                     style={this.props.navigationClass ? null : navigationStyle}>
                    {anchors}
                </div>
            );
        }
         getChildrenWithProps() {
            return React.Children.map(this.props.children, (child, index) => {
                let props = {
                    currentSection: this._childrenSliders[ index ] ? this._childrenSliders[ index ].current : 0,
                    subIndex: this._childrenSliders[ index ] ? this._childrenSliders[ index ].current : 0,
                    delay: this.props.delay
                };
                 if (index == this.state.activeSection) props.active = true;
                 return React.cloneElement(child, props);
            });
        }*/

    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var containerStyle = {
                height: '100%',
                width: '100%',
                position: 'relative',
                transform: 'translate3d(0px, -' + this.state.sectionScrolledPosition + 'px, 0px)',
                transition: 'all ' + this.props.delay + 'ms ease'
            };
            return React.createElement(
                'div',
                { style: { height: this.state.windowHeight + 'px' }, ref: function ref(input) {
                        return _this5.wrapper = input;
                    } },
                React.createElement(
                    'div',
                    { className: this.props.className, style: containerStyle },
                    React.Children.map(this.props.children, function (element, idx) {
                        return React.cloneElement(element, { ref: idx });
                    })
                )
            );
        }
    }]);

    return SectionsContainer;
}(React.Component);

exports.default = SectionsContainer;


SectionsContainer.defaultProps = {
    scrollCallback: null,
    delay: 1000,
    className: 'SectionContainer',
    sectionClassName: 'Section',
    anchors: [],
    activeClass: 'active',
    slider: false,
    scrollBar: true
};

SectionsContainer.propTypes = {
    scrollCallback: _propTypes2.default.func,
    delay: _propTypes2.default.number,
    className: _propTypes2.default.string,
    sectionClassName: _propTypes2.default.string,
    activeClass: _propTypes2.default.string,
    slider: _propTypes2.default.bool,
    scrollBar: _propTypes2.default.bool
};

SectionsContainer.childContextTypes = {
    sectionClassName: _propTypes2.default.string
};