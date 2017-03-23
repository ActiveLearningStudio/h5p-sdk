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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleClass = exports.toggleVisibility = exports.show = exports.hide = exports.classListContains = exports.removeChild = exports.querySelectorAll = exports.nodeListToArray = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

var _functional = __webpack_require__(1);

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
  return el.setAttribute(name, value);
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
  return el.removeAttribute(name);
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
 * Transforms a NodeList to an Array
 *
 * @param {NodeList} nodeList
 *
 * @return {Node[]}
 */
var nodeListToArray = exports.nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

/**
 * Returns a non-live NodeList of all elements descended from the element on which it
 * is invoked that matches the specified group of CSS selectors.
 *
 * @param {string} selector
 * @param {HTMLElement} el
 *
 * @function
 * @return {Node[]}
 */
var querySelectorAll = exports.querySelectorAll = (0, _functional.curry)(function (selector, el) {
  return nodeListToArray(el.querySelectorAll(selector));
});

/**
 * The removeChild() method removes a child node from the DOM. Returns removed node.
 *
 * @param {Node} parent
 * @param {Node} oldChild
 *
 * @return {Node}
 */
var removeChild = exports.removeChild = (0, _functional.curry)(function (parent, oldChild) {
  return parent.removeChild(oldChild);
});

/**
 * Returns true if a node has a class
 *
 * @param {string} cls
 * @param {HTMLElement} el
 *
 * @function
 */
var classListContains = exports.classListContains = (0, _functional.curry)(function (cls, el) {
  return el.classList.contains(cls);
});

/**
 * Adds aria-hidden=true to an element
 *
 * @param {HTMLElement} element
 * @function
 */
var hide = exports.hide = setAttribute('aria-hidden', 'true');

/**
 * Adds aria-hidden=false to an element
 * @function
 */
var show = exports.show = setAttribute('aria-hidden', 'false');

/**
 * Toggles aria-hidden on an element
 *
 * @param {boolean} visible
 * @param {HTMLElement} element
 */
var toggleVisibility = exports.toggleVisibility = (0, _functional.curry)(function (visible, element) {
  return (visible ? show : hide)(element);
});

/**
 * Toggles a class on an element
 *
 * @param {string} cls
 * @param {boolean} add
 * @param {HTMLElement} element
 */
var toggleClass = exports.toggleClass = (0, _functional.curry)(function (cls, add, element) {
  element.classList[add ? 'add' : 'remove'](cls);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(0);

var _functional = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLElement} element
 * @function
 */
var addTabIndex = (0, _elements.setAttribute)('tabindex', '0');

/**
 * @param {HTMLElement} element
 * @function
 */
var removeTabIndex = (0, _elements.removeAttribute)('tabindex');

/**
 * @param {HTMLElement[]} elements
 * @function
 */

var removeTabIndexForAll = (0, _functional.forEach)(removeTabIndex);

/**
 * @param {HTMLElement} element
 * @function
 */
var hasTabIndex = (0, _elements.hasAttribute)('tabindex');

/**
 * Sets tabindex and focus on an element, remove it from all others
 *
 * @param {HTMLElement[]} elements
 * @param {number} index
 */
var updateTabbable = function updateTabbable(elements, index) {
  var selectedElement = elements[index];

  if (selectedElement) {
    removeTabIndexForAll(elements);
    addTabIndex(selectedElement);
  }
};

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
var nextIndex = function nextIndex(currentIndex, lastIndex) {
  return currentIndex === lastIndex ? 0 : currentIndex + 1;
};

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
var previousIndex = function previousIndex(currentIndex, lastIndex) {
  return currentIndex === 0 ? lastIndex : currentIndex - 1;
};

/**
 * @class
 */

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];
    /**
     * Creates a bound key handler, that can be removed
     * @property {function} boundHandleKeyDown
     */
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleFocus = this.handleFocus.bind(this);
    /**
     * @property {number} selectedIndex
     */
    this.selectedIndex = 0;
  }

  /**
   * Add keyboard support to an element
   *
   * @param {HTMLElement} element
   *
   * @public
   * @return {HTMLElement}
   */


  _createClass(Keyboard, [{
    key: 'addElement',
    value: function addElement(element) {
      this.elements.push(element);
      element.addEventListener('keydown', this.boundHandleKeyDown);
      element.addEventListener('focus', this.boundHandleFocus);

      if (this.elements.length === 1) {
        // if first
        addTabIndex(element);
      }

      return element;
    }
  }, {
    key: 'removeElement',


    /**
     * Add controls to an element
     *
     * @param {HTMLElement} element
     *
     * @public
     * @return {HTMLElement}
     */
    value: function removeElement(element) {
      this.elements = (0, _functional.without)([element], this.elements);

      element.removeEventListener('keydown', this.boundHandleKeyDown);
      element.removeEventListener('focus', this.boundHandleFocus);

      // if removed element was selected
      if (hasTabIndex(element)) {
        removeTabIndex(element);

        this.selectedIndex = 0;
        updateTabbable(this.elements, this.selectedIndex);
      }

      return element;
    }
  }, {
    key: 'handleKeyDown',


    /**
     * Handles key down, and updates the tab index
     *
     * @param {KeyboardEvent} event Keyboard event
     *
     * @private
     */
    value: function handleKeyDown(event) {
      var lastIndex = this.elements.length - 1;

      switch (event.which) {
        case 13: // Enter
        case 32:
          // Space
          this.select();
          event.preventDefault();
          break;
        case 35:
          // End
          this.selectedIndex = lastIndex;
          event.preventDefault();
          break;
        case 36:
          // Home
          this.selectedIndex = 0;
          event.preventDefault();
          break;
        case 37: // Left Arrow
        case 38:
          // Up Arrow
          this.selectedIndex = previousIndex(this.selectedIndex, lastIndex);
          event.preventDefault();
          break;
        case 39: // Right Arrow
        case 40:
          // Down Arrow
          this.selectedIndex = nextIndex(this.selectedIndex, lastIndex);
          event.preventDefault();
          break;
      }

      updateTabbable(this.elements, this.selectedIndex);
      this.elements[this.selectedIndex].focus();
    }
  }, {
    key: 'handleFocus',


    /**
     * Updates the selected index with the focused element
     *
     * @param {FocusEvent} event
     */
    value: function handleFocus(event) {
      this.selectedIndex = this.elements.indexOf(event.srcElement);
    }

    /**
     * Sets the selected index, and updates the tab index
     *
     * @param {number} index
     */

  }, {
    key: 'forceSelectedIndex',
    value: function forceSelectedIndex(index) {
      this.selectedIndex = index;
      updateTabbable(this.elements, this.selectedIndex);
    }

    /**
     * Triggers 'onSelect' function if it exists
     */

  }, {
    key: 'select',
    value: function select() {
      if (this.onSelect != undefined) {
        this.onSelect(this.elements[this.selectedIndex]);
      }
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCollapsible = undefined;

var _elements = __webpack_require__(0);

/**
 * Returns true if aria-expanded=true on element
 *
 * @param {HTMLElement} element
 * @function
 */
var isExpanded = (0, _elements.attributeEquals)("aria-expanded", 'true');

/**
 * Toggles aria-hidden on 'collapsible' when aria-expanded changes on 'toggler',
 * and toggles aria-expanded on 'toggler' on click
 *
 * @param {HTMLElement} element
 * @param {function} [targetHandler] falls back to toggleVisibility with aria-hidden
 * @param {string} [togglerSelector]
 */
var initCollapsible = exports.initCollapsible = function initCollapsible(element) {
  var targetHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _elements.toggleVisibility;
  var togglerSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '[aria-controls][aria-expanded]';

  // elements
  var togglers = (0, _elements.querySelectorAll)(togglerSelector, element);

  togglers.forEach(function (toggler) {
    var collapsibleId = toggler.getAttribute('aria-controls');
    var collapsible = element.querySelector('#' + collapsibleId);

    // set observer on title for aria-expanded
    var observer = new MutationObserver(function () {
      return targetHandler(isExpanded(toggler), collapsible);
    });

    observer.observe(toggler, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    toggler.addEventListener('click', function () {
      return (0, _elements.toggleAttribute)("aria-expanded", toggler);
    });

    // initialize
    targetHandler(isExpanded(toggler), collapsible);
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _elements = __webpack_require__(0);

var _functional = __webpack_require__(1);

var _keyboard = __webpack_require__(2);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant
 */
var ATTRIBUTE_SHOW = 'data-show';

/**
 * @function
 * @param {HTMLElement} element
 */
var show = (0, _elements.removeAttribute)('aria-hidden');

/**
 * @function
 * @param {HTMLElement} element
 */
var hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 * @param {HTMLElement} element
 */
var enable = (0, _elements.removeAttribute)('aria-disabled');

/**
 * @function
 * @param {HTMLElement} element
 */
var disable = (0, _elements.setAttribute)('aria-disabled', '');

/**
 * @function
 * @param {HTMLElement} element
 */
var isDisabled = (0, _elements.hasAttribute)('aria-disabled');

/**
 * @function
 * @param {HTMLElement} element
 * @param {boolean} force
 */
var toggleDisabled = function toggleDisabled(element, force) {
  return (force ? disable : enable)(element);
};

/**
 * @function
 * @param {HTMLElement} element
 * @param {boolean} force
 */
var toggleHidden = function toggleHidden(element, force) {
  return (force ? hide : show)(element);
};

/**
 * @function
 * @param {HTMLElement} element
 * @param {number} imageIndex
 */
var showImageLightbox = (0, _functional.curry)(function (element, imageIndex) {
  return (0, _elements.setAttribute)('data-show', imageIndex, element);
});

/**
 * @function
 * @type {function}
 * @param {HTMLElement} element
 */
var hideLightbox = (0, _elements.removeAttribute)(ATTRIBUTE_SHOW);

/**
 * Update the view
 *
 * @function
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
var updateView = function updateView(element, state) {

  var images = element.querySelectorAll('.imagelightbox-image');
  var prevButton = element.querySelector('.previous');
  var nextButton = element.querySelector('.next');

  // Hide all images
  images.forEach(function (image) {
    return hide(image);
  });
  if (state.currentImage !== null) {
    // Show selected image
    var image = element.querySelector('.imagelightbox-image:nth-child(' + (state.currentImage + 1) + ')');
    show(image);
  }

  // Determine if lightbox should be shown or hidden
  toggleHidden(element, state.currentImage === null);

  // Determine if buttons should be shown or hidden
  toggleHidden(prevButton, !images.length);
  toggleHidden(nextButton, !images.length);

  // Determine if buttons should be enabled or disabled
  toggleDisabled(prevButton, state.currentImage === 0);
  toggleDisabled(nextButton, state.currentImage === images.length - 1);
};

/**
 * Handles button clicked
 *
 * @function
 * @param {HTMLElement} element
 * @param {HTMLElement} button
 * @param {number} imageIndex
 */
var onNavigationButtonClick = function onNavigationButtonClick(element, button, imageIndex) {
  if (!isDisabled(button)) {
    showImageLightbox(element, imageIndex);
  }
};

/**
 * Callback for when the dom is updated
 *
 * @function
 * @param {HTMLElement} element
 * @param {ImageLightboxState} state
 * @param {Keyboard} keyboard
 * @param {MutationRecord} record
 */
var handleDomUpdate = (0, _functional.curry)(function (element, state, keyboard, record) {

  if (record.type === 'attributes' && record.attributeName === ATTRIBUTE_SHOW) {

    var showImage = parseInt(record.target.getAttribute(ATTRIBUTE_SHOW));

    // update the view
    updateView(element, _extends(state, {
      currentImage: isNaN(showImage) ? null : showImage
    }));
  }
});

/**
 * Initializes a panel
 *
 * @function
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  // get button html elements
  var nextButton = element.querySelector('.next');
  var prevButton = element.querySelector('.previous');
  var closeButton = element.querySelector('.close');
  var keyboard = new _keyboard2.default();

  /**
   * @typedef {object} ImageLightboxState
   * @property {number} currentImage Index of image to display
   */
  var state = {
    currentImage: false
  };

  // initialize buttons
  prevButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, prevButton, state.currentImage - 1);
  });
  nextButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, nextButton, state.currentImage + 1);
  });
  closeButton.addEventListener('click', function () {
    return hideLightbox(element);
  });

  // listen for updates to data-size
  var observer = new MutationObserver((0, _functional.forEach)(handleDomUpdate(element, state, keyboard)));

  observer.observe(element, {
    subtree: false,
    childList: false,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SHOW]
  });

  return element;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _elements = __webpack_require__(0);

var _functional = __webpack_require__(1);

var _keyboard = __webpack_require__(2);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant
 */
var ATTRIBUTE_SIZE = 'data-size';

/**
 * @type {function}
 */
var disable = (0, _elements.setAttribute)('disabled', '');

/**
 * @type {function}
 */
var enable = (0, _elements.removeAttribute)('disabled');

/**
 * @param {HTMLElement} element
 * @param {boolean} enabled
 */
var toggleEnabled = function toggleEnabled(element, enabled) {
  return (enabled ? enable : disable)(element);
};

/**
 * @param {HTMLElement} element
 * @param {boolean} hidden
 */
var toggleVisibility = (0, _functional.curry)(function (hidden, element) {
  return (0, _elements.setAttribute)('aria-hidden', hidden.toString(), element);
});

/**
 * @type {function}
 */
var isDisabled = (0, _elements.hasAttribute)('disabled');

/**
 * @type {function}
 */
var showImageLightbox = (0, _functional.curry)(function (lightbox, imageIndex) {
  return (0, _elements.setAttribute)('data-show', imageIndex, lightbox);
});

/**
 * Update the view
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
var updateView = function updateView(element, state) {
  var prevButton = element.querySelector('.previous');
  var nextButton = element.querySelector('.next');
  var list = element.querySelector('ul');
  var totalCount = list.childElementCount;

  // update list sizes
  list.style.width = 100 / state.displayCount * totalCount + '%';
  list.style.marginLeft = state.position * (100 / state.displayCount) + '%';

  // update image sizes
  (0, _elements.querySelectorAll)('li', element).forEach(function (element) {
    return element.style.width = 100 / totalCount + '%';
  });

  // toggle button visibility
  [prevButton, nextButton].forEach(toggleVisibility(state.displayCount >= totalCount));

  // toggle button enable, disabled
  toggleEnabled(nextButton, state.position > state.displayCount - totalCount);
  toggleEnabled(prevButton, state.position < 0);
};

/**
 * Handles button clicked
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {HTMLElement} button
 * @param {function} updateState
 *
 * @function
 */
var onNavigationButtonClick = function onNavigationButtonClick(element, state, button, updateState) {
  if (!isDisabled(button)) {
    updateState(state);
    updateView(element, state);
  }
};

/**
 * Initializes an image
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} image
 *
 * @function
 * @return {HTMLElement}
 */
var initImage = (0, _functional.curry)(function (element, keyboard, image, imageIndex) {
  var targetId = image.getAttribute('aria-controls');
  var lightBox = document.querySelector('#' + targetId);

  image.addEventListener('click', function (event) {
    return showImageLightbox(lightBox, imageIndex);
  });

  keyboard.addElement(image);

  return image;
});

/**
 * Callback for when the dom is updated
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {MutationRecord} record
 * @function
 */
var handleDomUpdate = (0, _functional.curry)(function (element, state, keyboard, record) {
  // on add image run initialization
  if (record.type === 'childList') {
    (0, _elements.nodeListToArray)(record.addedNodes).filter((0, _elements.classListContains)('slide')).map((0, _elements.querySelector)('img')).filter(function (image) {
      return image !== null;
    }).forEach(initImage(element, keyboard));
  }

  // update the view
  updateView(element, _extends(state, {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  }));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  // get button html elements
  var nextButton = element.querySelector('.next');
  var prevButton = element.querySelector('.previous');
  var keyboard = new _keyboard2.default();

  /**
   * @typedef {object} ImageScrollerState
   * @property {number} displayCount
   * @property {number} position
   */
  var state = {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  };

  // initialize buttons
  nextButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, state, nextButton, function (state) {
      return state.position--;
    });
  });
  prevButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, state, prevButton, function (state) {
      return state.position++;
    });
  });

  // initialize images
  (0, _elements.querySelectorAll)('[aria-controls]', element).forEach(initImage(element, keyboard));

  // listen for updates to data-size
  var observer = new MutationObserver((0, _functional.forEach)(handleDomUpdate(element, state, keyboard)));

  observer.observe(element, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SIZE]
  });

  // initialize position
  updateView(element, state);

  return element;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(0);

var _functional = __webpack_require__(1);

var _collapsible = __webpack_require__(3);

var _keyboard = __webpack_require__(2);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Unselects all elements in an array
 *
 * @param {HTMLElement[]} elements
 * @function
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * Sets the aria-expanded attribute on an element to false
 *
 * @param {HTMLElement} element
 */
var unExpand = (0, _elements.setAttribute)('aria-expanded', 'false');

/**
 * Selects an element, and un selects all other menu items
 *
 * @param {HTMLElement[]} menuItems
 * @param {HTMLElement} element
 * @function
 */
var onSelectMenuItem = function onSelectMenuItem(menuItems, element) {
  unSelectAll(menuItems);
  element.setAttribute('aria-selected', 'true');
};

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  // elements
  var menuItems = (0, _elements.querySelectorAll)('[role="menuitem"]', element);
  var toggler = element.querySelector('[aria-controls][aria-expanded]');
  var keyboard = new _keyboard2.default();

  keyboard.onSelect = function (element) {
    onSelectMenuItem(menuItems, element);
    unExpand(toggler);
  };

  // move select
  menuItems.forEach(function (menuItem) {
    // add mouse click listener
    menuItem.addEventListener('click', function (event) {
      var element = event.target;
      var elementIndex = menuItems.indexOf(element);

      onSelectMenuItem(menuItems, element);
      unExpand(toggler);
      keyboard.forceSelectedIndex(elementIndex);
    });

    // add keyboard support
    keyboard.addElement(menuItem);
  });

  // init collapse and open
  (0, _collapsible.initCollapsible)(element, function (expanded, el) {
    return (0, _elements.toggleClass)('collapsed', !expanded, el);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _collapsible = __webpack_require__(3);

var _keyboard = __webpack_require__(2);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _elements = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  var keyboard = new _keyboard2.default();
  var togglerSelector = '[role="heading"] [aria-controls][aria-expanded]';
  keyboard.onSelect = function (el) {
    return (0, _elements.toggleAttribute)('aria-expanded', el);
  };

  // collapse/expand on header press
  (0, _collapsible.initCollapsible)(element, function (expanded, element) {
    return (0, _elements.toggleVisibility)(expanded, element);
  }, togglerSelector);

  // Add keyboard support to expand collapse
  (0, _elements.querySelectorAll)(togglerSelector, element).forEach(function (el) {
    return keyboard.addElement(el);
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(0);

var _functional = __webpack_require__(1);

var _keyboard = __webpack_require__(2);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 */
var hideAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-hidden', 'true'));

/**
 * @function
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @function
 */
var isSelected = (0, _elements.attributeEquals)('aria-selected', 'true');

/**
 * @function
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * Change tab panel when tab's aria-selected is changed
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} tab
 */
var addAriaSelectedObserver = function addAriaSelectedObserver(element, tab) {
  // set observer on title for aria-expanded
  var observer = new MutationObserver(function () {
    var panelId = tab.getAttribute('aria-controls');
    var panel = element.querySelector('#' + panelId);
    var allPanels = (0, _elements.querySelectorAll)('[role="tabpanel"]', element);

    if (isSelected(tab)) {
      hideAll(allPanels);
      show(panel);
    }
  });

  observer.observe(tab, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-selected"]
  });
};

/**
 * Selects an element, and unselects all other tabs
 *
 * @param {HTMLElement[]} allTabs
 * @param {HTMLElement} element
 * @function
 */
var selectTab = (0, _functional.curry)(function (allTabs, element) {
  unSelectAll(allTabs);
  element.setAttribute('aria-selected', 'true');
});

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  var tabs = (0, _elements.querySelectorAll)('[role="tab"]', element);
  var keyboard = new _keyboard2.default();

  // handle enter + space click
  keyboard.onSelect = selectTab(tabs);

  // init tabs
  tabs.forEach(function (tab) {
    addAriaSelectedObserver(element, tab);

    tab.addEventListener('click', function (event) {
      var element = event.target;
      var elementIndex = tabs.indexOf(element);
      selectTab(tabs, element);
      keyboard.forceSelectedIndex(elementIndex);
    });

    keyboard.addElement(tab);
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
/**
 * Initiates an upload form and adds logic
 * to bind the elements together.
 *
 * @param {HTMLElement} element
 */
function init(element) {
  var uploadInput = element.querySelector('.upload input[type="file"]');
  var uploadPath = element.querySelector('.upload-path');
  var useButton = element.querySelector('.use-button');
  uploadInput.onchange = function () {
    if (this.value !== '') {

      // Replace the placeholder text with the selected filepath
      uploadPath.value = this.value.replace('C:\\fakepath\\', '');

      // Only show the 'use' button once a file has been selected
      useButton.style.display = 'inline-block';
    }
  };
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

// Load library
H5P = H5P || {};
H5P.sdk = H5P.sdk || {};
H5P.sdk.initPanel = __webpack_require__(7).default;
H5P.sdk.initTabPanel = __webpack_require__(8).default;
H5P.sdk.initNavbar = __webpack_require__(6).default;
H5P.sdk.initImageScroller = __webpack_require__(5).default;
H5P.sdk.initImageLightbox = __webpack_require__(4).default;
H5P.sdk.initUploadForm = __webpack_require__(9).default;

/***/ })
/******/ ]);
//# sourceMappingURL=h5p-sdk.js.map