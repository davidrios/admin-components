(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("React.addons.PureRenderMixin"), require("Immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "React.addons.PureRenderMixin", "Immutable"], factory);
	else if(typeof exports === 'object')
		exports["admin-components"] = factory(require("react"), require("React.addons.PureRenderMixin"), require("Immutable"));
	else
		root["admin-components"] = factory(root["React"], root["React.addons.PureRenderMixin"], root["Immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_41__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.utils = exports.SearchableSelectInput = exports.ModifiersInput = exports.TagsInput = exports.TextInput = undefined;

	var _textInput = __webpack_require__(27);

	var _textInput2 = _interopRequireDefault(_textInput);

	var _tagsInput = __webpack_require__(42);

	var _tagsInput2 = _interopRequireDefault(_tagsInput);

	var _modifiersInput = __webpack_require__(57);

	var _modifiersInput2 = _interopRequireDefault(_modifiersInput);

	var _selectInput = __webpack_require__(58);

	var _selectInput2 = _interopRequireDefault(_selectInput);

	var _utils = __webpack_require__(12);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.TextInput = _textInput2.default;
	exports.TagsInput = _tagsInput2.default;
	exports.ModifiersInput = _modifiersInput2.default;
	exports.SearchableSelectInput = _selectInput2.default;
	exports.utils = utils;

/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(8)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(2)
	  , core      = __webpack_require__(1)
	  , ctx       = __webpack_require__(46)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(18)
	  , IE8_DOM_DEFINE = __webpack_require__(48)
	  , toPrimitive    = __webpack_require__(38)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(49)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(6)
	  , createDesc = __webpack_require__(23);
	module.exports = __webpack_require__(3) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(54)
	  , enumBugKeys = __webpack_require__(29);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(36)('wks')
	  , uid        = __webpack_require__(25)
	  , Symbol     = __webpack_require__(2).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makePropsSubset = undefined;

	var _keys = __webpack_require__(62);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var makePropsSubset = exports.makePropsSubset = function makePropsSubset(props, subset, exclude) {
	  if (!Array.isArray(subset)) {
	    subset = (0, _keys2.default)(subset);
	  }

	  return subset.reduce(function (obj, key) {
	    if (exclude == null || exclude.indexOf(key) == -1) {
	      obj[key] = props[key];
	    }
	    return obj;
	  }, {});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(61);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(63);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(60);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(44);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(44);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(17);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(16);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseFormInput = function (_React$Component) {
	  (0, _inherits3.default)(BaseFormInput, _React$Component);

	  function BaseFormInput() {
	    (0, _classCallCheck3.default)(this, BaseFormInput);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseFormInput).apply(this, arguments));
	  }

	  (0, _createClass3.default)(BaseFormInput, [{
	    key: 'handleComponentClick',
	    value: function handleComponentClick() {
	      if (this.childRef.focus != null) {
	        this.childRef.focus();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var child = _react2.default.cloneElement(this.props.children, { ref: function ref(component) {
	          return _this2.childRef = component;
	        } });

	      return _react2.default.createElement(
	        'div',
	        { className: this.props.className + (this.props.hasError ? ' has-danger' : '') },
	        _react2.default.createElement(
	          'label',
	          { onClick: function onClick() {
	              return _this2.handleComponentClick();
	            } },
	          this.props.label
	        ),
	        child,
	        this.props.errorText.length ? _react2.default.createElement(
	          'small',
	          null,
	          this.props.errorText
	        ) : null,
	        this.props.helpText.length ? _react2.default.createElement(
	          'small',
	          null,
	          this.props.helpText
	        ) : null
	      );
	    }
	  }]);
	  return BaseFormInput;
	}(_react2.default.Component);

	exports.default = BaseFormInput;


	BaseFormInput.defaultProps = {
	  className: '',
	  helpText: '',
	  errorText: '',
	  hasError: false
	};

	BaseFormInput.propTypes = {
	  label: _react2.default.PropTypes.string,
	  errorText: _react2.default.PropTypes.string,
	  helpText: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.string,
	  hasError: _react2.default.PropTypes.bool,
	  children: _react2.default.PropTypes.element.isRequired
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = React.addons.PureRenderMixin;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseTextInput = undefined;

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(17);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(16);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(26);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _base = __webpack_require__(21);

	var _base2 = _interopRequireDefault(_base);

	var _utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseTextInput = exports.BaseTextInput = function (_React$Component) {
	  (0, _inherits3.default)(BaseTextInput, _React$Component);

	  function BaseTextInput(props) {
	    (0, _classCallCheck3.default)(this, BaseTextInput);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseTextInput).call(this, props));

	    _this.state = {
	      value: props.value,
	      updateTimeout: null
	    };

	    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(BaseTextInput, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.state.updateTimeout != null) {
	        clearTimeout(this.state.updateTimeout);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== this.props.value) {
	        this.setState({ value: nextProps.value });
	      }
	    }
	  }, {
	    key: 'changeValue',
	    value: function changeValue(val) {
	      var _this2 = this;

	      if (this.state.updateTimeout != null) {
	        clearTimeout(this.state.updateTimeout);
	      }

	      var newState = { value: val, updateTimeout: null };

	      if (this.props.updateDelay == 0) {
	        this.setState(newState);

	        if (this.props.onUpdate != null) {
	          this.props.onUpdate(newState.value);
	        }

	        if (this.props.onUpdateInstant != null) {
	          this.props.onUpdateInstant(newState.value);
	        }

	        return;
	      }

	      if (this.props.onUpdate != null) {
	        newState.updateTimeout = setTimeout(function () {
	          return _this2.props.onUpdate(newState.value);
	        }, this.props.updateDelay);
	      }

	      this.setState(newState);

	      if (this.props.onUpdateInstant != null) {
	        this.props.onUpdateInstant(newState.value);
	      }
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.inputRef.focus();
	    }
	  }, {
	    key: 'handleInputFocus',
	    value: function handleInputFocus(ev) {
	      if (this.props.onFocus != null) {
	        this.props.onFocus(ev);
	      }
	    }
	  }, {
	    key: 'handleInputBlur',
	    value: function handleInputBlur(ev) {
	      if (this.props.onBlur != null) {
	        this.props.onBlur(ev);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      return _react2.default.createElement('input', { ref: function ref(el) {
	          return _this3.inputRef = el;
	        },
	        type: 'text',
	        value: this.state.value,
	        placeholder: this.props.placeholder,
	        onChange: function onChange(ev) {
	          return _this3.changeValue(ev.target.value);
	        },
	        onFocus: function onFocus(ev) {
	          return _this3.handleInputFocus(ev);
	        },
	        onBlur: function onBlur(ev) {
	          return _this3.handleInputBlur(ev);
	        } });
	    }
	  }]);
	  return BaseTextInput;
	}(_react2.default.Component);

	BaseTextInput.defaultProps = {
	  value: '',
	  updateDelay: 200
	};

	BaseTextInput.propTypes = {
	  value: _react2.default.PropTypes.string,
	  placeholder: _react2.default.PropTypes.string,
	  updateDelay: _react2.default.PropTypes.number,
	  onUpdate: _react2.default.PropTypes.func,
	  onUpdateInstant: _react2.default.PropTypes.func
	};

	var TextInput = function (_React$Component2) {
	  (0, _inherits3.default)(TextInput, _React$Component2);

	  function TextInput(props) {
	    (0, _classCallCheck3.default)(this, TextInput);

	    var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TextInput).call(this, props));

	    _this4.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this4);
	    return _this4;
	  }

	  (0, _createClass3.default)(TextInput, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _base2.default,
	        (0, _utils.makePropsSubset)(this.props, _base2.default.propTypes),
	        _react2.default.createElement(BaseTextInput, (0, _utils.makePropsSubset)(this.props, ['value', 'placeholder', 'updateDelay', 'onUpdate']))
	      );
	    }
	  }]);
	  return TextInput;
	}(_react2.default.Component);

	exports.default = TextInput;

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(18)
	  , dPs         = __webpack_require__(85)
	  , enumBugKeys = __webpack_require__(29)
	  , IE_PROTO    = __webpack_require__(35)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(47)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(78).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(6).f
	  , has = __webpack_require__(5)
	  , TAG = __webpack_require__(11)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(36)('keys')
	  , uid    = __webpack_require__(25);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(19);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(2)
	  , core           = __webpack_require__(1)
	  , LIBRARY        = __webpack_require__(31)
	  , wksExt         = __webpack_require__(40)
	  , defineProperty = __webpack_require__(6).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(11);

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = Immutable;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseTagsInput = undefined;

	var _extends2 = __webpack_require__(43);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(17);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(16);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _immutable = __webpack_require__(41);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(26);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _base = __webpack_require__(21);

	var _base2 = _interopRequireDefault(_base);

	var _utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getTextWidth(text, font) {
	  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
	  var context = canvas.getContext('2d');
	  context.font = font;
	  var metrics = context.measureText(text);
	  return metrics.width;
	}

	var BaseTagsInput = exports.BaseTagsInput = function (_React$Component) {
	  (0, _inherits3.default)(BaseTagsInput, _React$Component);

	  function BaseTagsInput(props) {
	    (0, _classCallCheck3.default)(this, BaseTagsInput);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseTagsInput).call(this, props));

	    _this.state = { inputValue: props.inputValue };

	    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(BaseTagsInput, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateEditingSize('');
	    }
	  }, {
	    key: 'addTag',
	    value: function addTag(val) {
	      if (!this.props.allowDuplicates && this.props.value.indexOf(val) != -1) {
	        this.setState({ inputValue: '' });
	        this.updateEditingSize('');
	        return;
	      }

	      this.setState({ inputValue: '' });
	      this.updateEditingSize('');
	      this.props.onAddTag(val);
	    }
	  }, {
	    key: 'updateEditingSize',
	    value: function updateEditingSize(text) {
	      if (text.length == 0) {
	        text = this.props.inputPlaceholder;
	      }

	      var style = window.getComputedStyle(this.inputRef);
	      var textSize = getTextWidth(text, [style.fontWeight, style.fontSize, style.fontFamily].join(' '));
	      this.inputRef.style.width = textSize + parseInt(style.paddingLeft) + parseInt(style.paddingRight) + 10 + 'px';
	    }
	  }, {
	    key: 'changeInputValue',
	    value: function changeInputValue(val) {
	      this.updateEditingSize(val);
	      this.setState({ inputValue: val });
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.inputRef.focus();
	    }
	  }, {
	    key: 'handleComponentClick',
	    value: function handleComponentClick() {
	      this.focus();
	    }
	  }, {
	    key: 'handleInputKeyPress',
	    value: function handleInputKeyPress(ev) {
	      if (ev.type === 'keypress' && ev.key === 'Enter' || ev.key === 'Tab' && ev.target.value.length > 0) {
	        ev.preventDefault();
	        this.addTag(ev.target.value);
	      } else if (ev.key === 'Backspace' && !ev.target.value) {
	        this.props.onRemoveTag(-1);
	      }
	    }
	  }, {
	    key: 'handleInputFocus',
	    value: function handleInputFocus(ev) {
	      if (this.props.onFocus != null) {
	        this.props.onFocus(ev);
	      }
	    }
	  }, {
	    key: 'handleInputBlur',
	    value: function handleInputBlur(ev) {
	      if (this.props.onBlur != null) {
	        this.props.onBlur(ev);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var tagsElements = this.props.value.map(function (val, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: index },
	          val,
	          _react2.default.createElement('i', { className: 'fa fa-close', onClick: function onClick() {
	              return _this2.props.onRemoveTag(index);
	            } })
	        );
	      });

	      return _react2.default.createElement(
	        'ul',
	        { className: this.props.className + ' tags-input nospaces',
	          onClick: function onClick() {
	            return _this2.handleComponentClick();
	          } },
	        tagsElements,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement('input', { type: 'text',
	            ref: function ref(el) {
	              return _this2.inputRef = el;
	            },
	            value: this.state.inputValue,
	            placeholder: this.props.inputPlaceholder,
	            onChange: function onChange(ev) {
	              return _this2.changeInputValue(ev.target.value);
	            },
	            onKeyPress: function onKeyPress(ev) {
	              return _this2.handleInputKeyPress(ev);
	            },
	            onKeyDown: function onKeyDown(ev) {
	              return _this2.handleInputKeyPress(ev);
	            },
	            onFocus: function onFocus(ev) {
	              return _this2.handleInputFocus(ev);
	            },
	            onBlur: function onBlur(ev) {
	              return _this2.handleInputBlur(ev);
	            } })
	        )
	      );
	    }
	  }]);
	  return BaseTagsInput;
	}(_react2.default.Component);

	BaseTagsInput.defaultProps = {
	  value: new _immutable2.default.List(),
	  inputValue: '',
	  inputPlaceholder: '',
	  className: '',
	  allowDuplicates: false
	};

	BaseTagsInput.propTypes = {
	  value: _react2.default.PropTypes.instanceOf(_immutable2.default.List),
	  inputValue: _react2.default.PropTypes.string,
	  inputPlaceholder: _react2.default.PropTypes.string,
	  allowDuplicates: _react2.default.PropTypes.bool,
	  className: _react2.default.PropTypes.string,
	  onAddTag: _react2.default.PropTypes.func.isRequired,
	  onRemoveTag: _react2.default.PropTypes.func.isRequired,
	  onFocus: _react2.default.PropTypes.func,
	  onBlur: _react2.default.PropTypes.func
	};

	var TagsInput = function (_React$Component2) {
	  (0, _inherits3.default)(TagsInput, _React$Component2);

	  function TagsInput(props) {
	    (0, _classCallCheck3.default)(this, TagsInput);

	    var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TagsInput).call(this, props));

	    _this3.state = { active: false };

	    _this3.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this3);
	    return _this3;
	  }

	  (0, _createClass3.default)(TagsInput, [{
	    key: 'handleTagsInputFocus',
	    value: function handleTagsInputFocus() {
	      this.setState({ active: true });
	    }
	  }, {
	    key: 'handleTagsInputBlur',
	    value: function handleTagsInputBlur() {
	      this.setState({ active: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      return _react2.default.createElement(
	        _base2.default,
	        (0, _utils.makePropsSubset)(this.props, _base2.default.propTypes),
	        _react2.default.createElement(BaseTagsInput, (0, _extends3.default)({}, (0, _utils.makePropsSubset)(this.props, BaseTagsInput.propTypes, ['className', 'onFocus', 'onBlur']), {
	          className: this.props.className + (this.state.active ? ' active' : ''),
	          onFocus: function onFocus(ev) {
	            return _this4.handleTagsInputFocus(ev);
	          },
	          onBlur: function onBlur(ev) {
	            return _this4.handleTagsInputBlur(ev);
	          } }))
	      );
	    }
	  }]);
	  return TagsInput;
	}(_react2.default.Component);

	exports.default = TagsInput;


	TagsInput.defaultProps = {
	  className: ''
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(59);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(65);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(74);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19)
	  , document = __webpack_require__(2).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(3) && !__webpack_require__(8)(function(){
	  return Object.defineProperty(__webpack_require__(47)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(45);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(31)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(56)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(5)
	  , Iterators      = __webpack_require__(30)
	  , $iterCreate    = __webpack_require__(80)
	  , setToStringTag = __webpack_require__(34)
	  , getPrototypeOf = __webpack_require__(53)
	  , ITERATOR       = __webpack_require__(11)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(22)
	  , createDesc     = __webpack_require__(23)
	  , toIObject      = __webpack_require__(7)
	  , toPrimitive    = __webpack_require__(38)
	  , has            = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(48)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(54)
	  , hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(5)
	  , toObject    = __webpack_require__(24)
	  , IE_PROTO    = __webpack_require__(35)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(5)
	  , toIObject    = __webpack_require__(7)
	  , arrayIndexOf = __webpack_require__(76)(false)
	  , IE_PROTO     = __webpack_require__(35)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4)
	  , core    = __webpack_require__(1)
	  , fails   = __webpack_require__(8);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseModifiersInput = exports.BaseModifiersInputItem = undefined;

	var _extends2 = __webpack_require__(43);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(17);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(16);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _immutable = __webpack_require__(41);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(26);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _base = __webpack_require__(21);

	var _base2 = _interopRequireDefault(_base);

	var _tagsInput = __webpack_require__(42);

	var _textInput = __webpack_require__(27);

	var _utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseModifiersInputItem = exports.BaseModifiersInputItem = function (_React$Component) {
	  (0, _inherits3.default)(BaseModifiersInputItem, _React$Component);

	  function BaseModifiersInputItem(props) {
	    (0, _classCallCheck3.default)(this, BaseModifiersInputItem);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseModifiersInputItem).call(this, props));

	    _this.state = { active: false };

	    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(BaseModifiersInputItem, [{
	    key: 'handleChildFocus',
	    value: function handleChildFocus() {
	      this.setState({ active: true });
	    }
	  }, {
	    key: 'handleChildBlur',
	    value: function handleChildBlur() {
	      this.setState({ active: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'li',
	        { className: this.state.active ? ' active' : '' },
	        _react2.default.createElement(_textInput.BaseTextInput, { value: this.props.value.get('name'),
	          placeholder: this.props.namePlaceholder,
	          onFocus: function onFocus(ev) {
	            return _this2.handleChildFocus(ev);
	          },
	          onBlur: function onBlur(ev) {
	            return _this2.handleChildBlur(ev);
	          },
	          onUpdate: function onUpdate(val) {
	            return _this2.props.onNameUpdate(val);
	          } }),
	        this.props.canBeRemoved ? _react2.default.createElement('i', { className: 'fa fa-close', onClick: function onClick(ev) {
	            return _this2.props.onClickRemove(ev);
	          } }) : null,
	        _react2.default.createElement(_tagsInput.BaseTagsInput, (0, _extends3.default)({}, (0, _utils.makePropsSubset)(this.props, ['onAddTag', 'onRemoveTag', 'allowDuplicates']), {
	          value: this.props.value.get('tags'),
	          inputPlaceholder: this.props.valuePlaceholder,
	          onFocus: function onFocus(ev) {
	            return _this2.handleChildFocus(ev);
	          },
	          onBlur: function onBlur(ev) {
	            return _this2.handleChildBlur(ev);
	          } }))
	      );
	    }
	  }]);
	  return BaseModifiersInputItem;
	}(_react2.default.Component);

	BaseModifiersInputItem.defaultProps = {
	  value: new _immutable2.default.Map(),
	  namePlaceholder: '',
	  valuePlaceholder: '',
	  canBeRemoved: true
	};

	BaseModifiersInputItem.propTypes = {
	  value: _react2.default.PropTypes.instanceOf(_immutable2.default.Map),
	  namePlaceholder: _textInput.BaseTextInput.propTypes.placeholder,
	  valuePlaceholder: _tagsInput.BaseTagsInput.propTypes.inputPlaceholder,
	  canBeRemoved: _react2.default.PropTypes.bool,
	  onNameUpdate: _react2.default.PropTypes.func.isRequired,
	  onClickRemove: _react2.default.PropTypes.func.isRequired
	};

	var BaseModifiersInput = exports.BaseModifiersInput = function (_React$Component2) {
	  (0, _inherits3.default)(BaseModifiersInput, _React$Component2);

	  function BaseModifiersInput(props) {
	    (0, _classCallCheck3.default)(this, BaseModifiersInput);

	    var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseModifiersInput).call(this, props));

	    _this3.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this3);
	    return _this3;
	  }

	  (0, _createClass3.default)(BaseModifiersInput, [{
	    key: 'handleClickAdd',
	    value: function handleClickAdd(ev) {
	      ev.preventDefault();
	      this.props.onClickAdd(ev);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var modifiers = this.props.value.map(function (value, index) {
	        return _react2.default.createElement(BaseModifiersInputItem, (0, _extends3.default)({}, (0, _utils.makePropsSubset)(_this4.props, ['namePlaceholder', 'valuePlaceholder']), {
	          key: index,
	          value: value,
	          allowDuplicates: _this4.props.allowTagDuplicates,
	          onNameUpdate: function onNameUpdate(val) {
	            return _this4.props.onNameUpdate(index, val);
	          },
	          onAddTag: function onAddTag(val) {
	            return _this4.props.onAddTag(index, val);
	          },
	          onRemoveTag: function onRemoveTag(val) {
	            return _this4.props.onRemoveTag(index, val);
	          },
	          onClickRemove: function onClickRemove() {
	            return _this4.props.onClickRemove(index);
	          } }));
	      });

	      return _react2.default.createElement(
	        'ul',
	        { className: 'modifiers-input' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'button',
	            { onClick: function onClick(ev) {
	                return _this4.handleClickAdd(ev);
	              } },
	            'New'
	          )
	        ),
	        modifiers
	      );
	    }
	  }]);
	  return BaseModifiersInput;
	}(_react2.default.Component);

	BaseModifiersInput.defaultProps = {
	  value: new _immutable2.default.List(),
	  allowTagDuplicates: false
	};

	BaseModifiersInput.propTypes = {
	  value: _react2.default.PropTypes.instanceOf(_immutable2.default.List),
	  allowTagDuplicates: _react2.default.PropTypes.bool,
	  onNameUpdate: _react2.default.PropTypes.func.isRequired,
	  onAddTag: _react2.default.PropTypes.func.isRequired,
	  onRemoveTag: _react2.default.PropTypes.func.isRequired,
	  onClickAdd: _react2.default.PropTypes.func.isRequired,
	  onClickRemove: _react2.default.PropTypes.func.isRequired
	};

	var ModifiersInput = function (_React$Component3) {
	  (0, _inherits3.default)(ModifiersInput, _React$Component3);

	  function ModifiersInput() {
	    (0, _classCallCheck3.default)(this, ModifiersInput);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ModifiersInput).apply(this, arguments));
	  }

	  (0, _createClass3.default)(ModifiersInput, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _base2.default,
	        (0, _utils.makePropsSubset)(this.props, _base2.default.propTypes),
	        _react2.default.createElement(BaseModifiersInput, (0, _utils.makePropsSubset)(this.props, BaseModifiersInput.propTypes))
	      );
	    }
	  }]);
	  return ModifiersInput;
	}(_react2.default.Component);

	exports.default = ModifiersInput;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseSearchableSelectInput = undefined;

	var _getPrototypeOf = __webpack_require__(13);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(15);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(17);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(16);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _immutable = __webpack_require__(41);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _react = __webpack_require__(20);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(26);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _base = __webpack_require__(21);

	var _base2 = _interopRequireDefault(_base);

	var _textInput = __webpack_require__(27);

	var _utils = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseSearchableSelectInput = exports.BaseSearchableSelectInput = function (_React$Component) {
	  (0, _inherits3.default)(BaseSearchableSelectInput, _React$Component);

	  function BaseSearchableSelectInput(props) {
	    (0, _classCallCheck3.default)(this, BaseSearchableSelectInput);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseSearchableSelectInput).call(this, props));

	    _this.state = { isOpen: props.isOpen };

	    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(BaseSearchableSelectInput, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.handleDocumentClick = function (ev) {
	        if (ev.target !== _this2.mainDivRef && ev.target !== _this2.searchValueRef.inputRef) {
	          _this2.setState({ isOpen: false });
	        }
	      };
	      this.documentListener = document.addEventListener('click', this.handleDocumentClick);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      document.removeEventListener('click', this.handleDocumentClick);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.state.isOpen) {
	        this.searchValueRef.focus();
	      }
	    }
	  }, {
	    key: 'handleComponentClick',
	    value: function handleComponentClick(ev) {
	      if (ev.target !== this.mainDivRef) {
	        return;
	      }

	      this.setState({ isOpen: !this.state.isOpen });
	    }
	  }, {
	    key: 'handleListClick',
	    value: function handleListClick(val) {
	      this.props.onSelect(val);
	      this.setState({ isOpen: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var searchResultsElements = this.props.searchResults.map(function (val, index) {
	        return _react2.default.createElement(
	          'li',
	          { key: index,
	            className: val.get('className') || '',
	            onClick: function onClick() {
	              return _this3.handleListClick(val);
	            } },
	          val.get('label')
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { ref: function ref(el) {
	            return _this3.mainDivRef = el;
	          },
	          className: this.props.className + ' searchable-select' + (this.state.isOpen ? ' open active' : ''),
	          onClick: function onClick(ev) {
	            return _this3.handleComponentClick(ev);
	          } },
	        _react2.default.createElement(
	          'span',
	          null,
	          this.props.selectedValue.get('label')
	        ),
	        _react2.default.createElement(
	          'ul',
	          null,
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(_textInput.BaseTextInput, { ref: function ref(component) {
	                return _this3.searchValueRef = component;
	              },
	              value: this.state.searchValue,
	              placeholder: this.props.searchPlaceholder,
	              onUpdate: function onUpdate(val) {
	                return _this3.props.onSearchUpdate(val);
	              } })
	          ),
	          searchResultsElements
	        )
	      );
	    }
	  }]);
	  return BaseSearchableSelectInput;
	}(_react2.default.Component);

	BaseSearchableSelectInput.defaultProps = {
	  isOpen: false,
	  selectedValue: new _immutable2.default.Map({ label: '', value: '' }),
	  searchValue: '',
	  searchPlaceholder: '',
	  searchResults: new _immutable2.default.List(),
	  className: ''
	};

	BaseSearchableSelectInput.propTypes = {
	  isOpen: _react2.default.PropTypes.bool,
	  selectedValue: _react2.default.PropTypes.instanceOf(_immutable2.default.Map),
	  searchValue: _react2.default.PropTypes.string,
	  searchPlaceholder: _react2.default.PropTypes.string,
	  searchResults: _react2.default.PropTypes.instanceOf(_immutable2.default.List),
	  className: _react2.default.PropTypes.string,
	  onSelect: _react2.default.PropTypes.func.isRequired,
	  onSearchUpdate: _react2.default.PropTypes.func.isRequired
	};

	var SearchableSelectInput = function (_React$Component2) {
	  (0, _inherits3.default)(SearchableSelectInput, _React$Component2);

	  function SearchableSelectInput() {
	    (0, _classCallCheck3.default)(this, SearchableSelectInput);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchableSelectInput).apply(this, arguments));
	  }

	  (0, _createClass3.default)(SearchableSelectInput, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _base2.default,
	        (0, _utils.makePropsSubset)(this.props, _base2.default.propTypes),
	        _react2.default.createElement(BaseSearchableSelectInput, (0, _utils.makePropsSubset)(this.props, BaseSearchableSelectInput.propTypes))
	      );
	    }
	  }]);
	  return SearchableSelectInput;
	}(_react2.default.Component);

	exports.default = SearchableSelectInput;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(1).Object.assign;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	var $Object = __webpack_require__(1).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(94);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	module.exports = __webpack_require__(1).Object.getPrototypeOf;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(1).Object.keys;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(1).Object.setPrototypeOf;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	__webpack_require__(98);
	__webpack_require__(101);
	__webpack_require__(102);
	module.exports = __webpack_require__(1).Symbol;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(99);
	__webpack_require__(103);
	module.exports = __webpack_require__(40).f('iterator');

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(7)
	  , toLength  = __webpack_require__(90)
	  , toIndex   = __webpack_require__(89);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(10)
	  , gOPS    = __webpack_require__(33)
	  , pIE     = __webpack_require__(22);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2).document && document.documentElement;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(45);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(32)
	  , descriptor     = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(34)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(11)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(10)
	  , toIObject = __webpack_require__(7);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(25)('meta')
	  , isObject = __webpack_require__(19)
	  , has      = __webpack_require__(5)
	  , setDesc  = __webpack_require__(6).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(8)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(10)
	  , gOPS     = __webpack_require__(33)
	  , pIE      = __webpack_require__(22)
	  , toObject = __webpack_require__(24)
	  , IObject  = __webpack_require__(49)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(8)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(6)
	  , anObject = __webpack_require__(18)
	  , getKeys  = __webpack_require__(10);

	module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(7)
	  , gOPN      = __webpack_require__(52).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(19)
	  , anObject = __webpack_require__(18);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(46)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(75)
	  , step             = __webpack_require__(81)
	  , Iterators        = __webpack_require__(30)
	  , toIObject        = __webpack_require__(7);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(84)});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(32)});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(3), 'Object', {defineProperty: __webpack_require__(6).f});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(24)
	  , $getPrototypeOf = __webpack_require__(53);

	__webpack_require__(55)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(24)
	  , $keys    = __webpack_require__(10);

	__webpack_require__(55)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(4);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(87).set});

/***/ },
/* 98 */
/***/ function(module, exports) {

	

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(88)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(50)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(2)
	  , has            = __webpack_require__(5)
	  , DESCRIPTORS    = __webpack_require__(3)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(56)
	  , META           = __webpack_require__(83).KEY
	  , $fails         = __webpack_require__(8)
	  , shared         = __webpack_require__(36)
	  , setToStringTag = __webpack_require__(34)
	  , uid            = __webpack_require__(25)
	  , wks            = __webpack_require__(11)
	  , wksExt         = __webpack_require__(40)
	  , wksDefine      = __webpack_require__(39)
	  , keyOf          = __webpack_require__(82)
	  , enumKeys       = __webpack_require__(77)
	  , isArray        = __webpack_require__(79)
	  , anObject       = __webpack_require__(18)
	  , toIObject      = __webpack_require__(7)
	  , toPrimitive    = __webpack_require__(38)
	  , createDesc     = __webpack_require__(23)
	  , _create        = __webpack_require__(32)
	  , gOPNExt        = __webpack_require__(86)
	  , $GOPD          = __webpack_require__(51)
	  , $DP            = __webpack_require__(6)
	  , $keys          = __webpack_require__(10)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(52).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(22).f  = $propertyIsEnumerable;
	  __webpack_require__(33).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(31)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39)('asyncIterator');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39)('observable');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var global        = __webpack_require__(2)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(30)
	  , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }
/******/ ])
});
;