// [AIV] Build version: 0.1.0 
 /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Load library
	H5P = H5P || {};
	H5P.sdk = H5P.sdk || {};
	H5P.sdk.initPanel = __webpack_require__(1).default;
	H5P.sdk.initTabPanel = __webpack_require__(4).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = init;
	
	var _elements = __webpack_require__(2);
	
	var _functional = __webpack_require__(3);
	
	/**
	 * @const
	 * @type {string}
	 */
	var ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";
	
	/**
	 * @type {function}
	 */
	var selectExpandable = (0, _elements.querySelector)('[aria-expanded]');
	
	/**
	 * @type {function}
	 */
	var getAriaControls = (0, _elements.getAttribute)('aria-controls');
	
	/**
	 * @type {function}
	 */
	var isExpanded = (0, _elements.attributeEquals)(ATTRIBUTE_ARIA_EXPANDED, 'true');
	
	/**
	 * @type {function}
	 */
	var setAriaHiddenTrue = (0, _elements.setAttribute)('aria-hidden', 'true');
	
	/**
	 * @type {function}
	 */
	var setAriaHiddenFalse = (0, _elements.setAttribute)('aria-hidden', 'false');
	
	/**
	 * @type {Function}
	 */
	var handleMutation = (0, _functional.curry)(function (bodyElement, mutation) {
	  var titleEl = mutation.target;
	
	  if (isExpanded(titleEl)) {
	    setAriaHiddenFalse(bodyElement);
	  } else {
	    setAriaHiddenTrue(bodyElement);
	  }
	});
	
	/**
	 * Initializes a panel
	 *
	 * @param {HTMLElement} element
	 * @return {HTMLElement}
	 */
	function init(element) {
	  var titleEl = selectExpandable(element);
	  var bodyEl = document.getElementById(getAriaControls(titleEl));
	
	  if (titleEl) {
	    // set observer on title for aria-expanded
	    var observer = new MutationObserver((0, _functional.forEach)(handleMutation(bodyEl)));
	    observer.observe(titleEl, {
	      attributes: true,
	      attributeOldValue: true,
	      attributeFilter: [ATTRIBUTE_ARIA_EXPANDED]
	    });
	
	    // Set click listener that toggles aria-expanded
	    titleEl.addEventListener('click', function (event) {
	      (0, _elements.toggleAttribute)('aria-expanded', event.target);
	    });
	  }
	
	  return element;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;
	
	var _functional = __webpack_require__(3);
	
	/**
	 * Get an attribute value from element
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {string}
	 */
	var getAttribute = exports.getAttribute = (0, _functional.curry)(function (name, el) {
	  return el.getAttribute(name);
	});
	
	/**
	 * Set an attribute on a html element
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {HTMLElement} el
	 *
	 * @function
	 */
	var setAttribute = exports.setAttribute = (0, _functional.curry)(function (name, value, el) {
	  el.setAttribute(name, value);
	});
	
	/**
	 * Remove attribute from html element
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 */
	var removeAttribute = exports.removeAttribute = (0, _functional.curry)(function (name, el) {
	  el.removeAttribute(name);
	});
	
	/**
	 * Check if element has an attribute
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {boolean}
	 */
	var hasAttribute = exports.hasAttribute = (0, _functional.curry)(function (name, el) {
	  return el.hasAttribute(name);
	});
	
	/**
	 * Check if element has an attribute that equals
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {boolean}
	 */
	var attributeEquals = exports.attributeEquals = (0, _functional.curry)(function (name, value, el) {
	  return el.getAttribute(name) === value;
	});
	
	/**
	 * Toggles an attribute between 'true' and 'false';
	 *
	 * @param {string} name
	 * @param {HTMLElement} el
	 *
	 * @function
	 */
	var toggleAttribute = exports.toggleAttribute = (0, _functional.curry)(function (name, el) {
	  var value = getAttribute(name, el);
	  setAttribute(name, (0, _functional.inverseBooleanString)(value), el);
	});
	
	/**
	 * The appendChild() method adds a node to the end of the list of children of a specified parent node.
	 *
	 * @param {HTMLElement} parent
	 * @param {HTMLElement} child
	 *
	 * @function
	 * @return {HTMLElement}
	 */
	var appendChild = exports.appendChild = (0, _functional.curry)(function (parent, child) {
	  return parent.appendChild(child);
	});
	
	/**
	 * Returns the first element that is a descendant of the element on which it is invoked
	 * that matches the specified group of selectors.
	 *
	 * @param {string} selector
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {HTMLElement}
	 */
	var querySelector = exports.querySelector = (0, _functional.curry)(function (selector, el) {
	  return el.querySelector(selector);
	});
	
	/**
	 * Returns a non-live NodeList of all elements descended from the element on which it
	 * is invoked that matches the specified group of CSS selectors.
	 *
	 * @param {string} selector
	 * @param {HTMLElement} el
	 *
	 * @function
	 * @return {NodeList}
	 */
	var querySelectorAll = exports.querySelectorAll = (0, _functional.curry)(function (selector, el) {
	  return el.querySelectorAll(selector);
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Returns a curried version of a function
	 *
	 * @param {function} fn
	 *
	 * @public
	 *
	 * @return {function}
	 */
	var curry = exports.curry = function curry(fn) {
	  var arity = fn.length;
	
	  return function f1() {
	    var args = Array.prototype.slice.call(arguments, 0);
	    if (args.length >= arity) {
	      return fn.apply(null, args);
	    } else {
	      return function f2() {
	        var args2 = Array.prototype.slice.call(arguments, 0);
	        return f1.apply(null, args.concat(args2));
	      };
	    }
	  };
	};
	
	/**
	 * Compose functions together, executing from right to left
	 *
	 * @param {function...} fns
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var compose = exports.compose = function compose() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }
	
	  return fns.reduce(function (f, g) {
	    return function () {
	      return f(g.apply(undefined, arguments));
	    };
	  });
	};
	
	/**
	 * Applies a function to each element in an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var forEach = exports.forEach = curry(function (fn, arr) {
	  arr.forEach(fn);
	});
	
	/**
	 * Maps a function to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var map = exports.map = curry(function (fn, arr) {
	  return arr.map(fn);
	});
	
	/**
	 * Applies a filter to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var filter = exports.filter = curry(function (fn, arr) {
	  return arr.filter(fn);
	});
	
	/**
	 * Applies a some to an array
	 *
	 * @param {function} fn
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var some = exports.some = curry(function (fn, arr) {
	  return arr.some(fn);
	});
	
	/**
	 * Returns true if an array contains a value
	 *
	 * @param {*} value
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var contains = exports.contains = curry(function (value, arr) {
	  return arr.indexOf(value) != -1;
	});
	
	/**
	 * Returns an array without the supplied values
	 *
	 * @param {Array} values
	 * @param {Array} arr
	 *
	 * @function
	 * @public
	 *
	 * @return {function}
	 */
	var without = exports.without = curry(function (values, arr) {
	  return filter(function (value) {
	    return !contains(value, values);
	  }, arr);
	});
	
	/**
	 * Takes a string that is either 'true' or 'false' and returns the opposite
	 *
	 * @param {string} bool
	 *
	 * @public
	 * @return {string}
	 */
	var inverseBooleanString = exports.inverseBooleanString = function inverseBooleanString(bool) {
	  return (bool !== 'true').toString();
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = init;
	
	var _elements = __webpack_require__(2);
	
	var _functional = __webpack_require__(3);
	
	/**
	 * @type {function}
	 */
	var getWhereRoleIsTab = (0, _elements.querySelectorAll)('[role="tab"]');
	
	/**
	 * @type {function}
	 */
	var getWhereRoleIsTabpanel = (0, _elements.querySelectorAll)('[role="tabpanel"]');
	
	/**
	 * @type {function}
	 */
	var setAllAriaHiddenTrue = (0, _functional.forEach)((0, _elements.setAttribute)('aria-hidden', 'true'));
	
	/**
	 * @type {function}
	 */
	var setAriaSelectedFalse = (0, _elements.setAttribute)('aria-selected', 'false');
	
	/**
	 * @type {function}
	 */
	var setAllAriaSelectedFalse = (0, _functional.forEach)(setAriaSelectedFalse);
	
	function init(element) {
	  var tabs = getWhereRoleIsTab(element);
	  var tabpanels = getWhereRoleIsTabpanel(element);
	
	  tabs.forEach(function (tab) {
	    tab.addEventListener('click', function (event) {
	
	      setAllAriaSelectedFalse(tabs);
	      event.target.setAttribute('aria-selected', 'true');
	
	      setAllAriaHiddenTrue(tabpanels);
	      var tabpanelId = event.target.getAttribute('aria-controls');
	      var targetTabpanel = document.getElementById(tabpanelId);
	      targetTabpanel.setAttribute('aria-hidden', 'false');
	    });
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=h5p-sdk.js.map 