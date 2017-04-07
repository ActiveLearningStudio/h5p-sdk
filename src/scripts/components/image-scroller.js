import { setAttribute, removeAttribute, hasAttribute, classListContains, querySelector, nodeListToArray, querySelectorAll, toggleVisibility } from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

/**
 * @typedef {object} ScreenMapping
 * @param {number} width
 * @param {number} size
 */

/**
 * Mapping for number of images to show per screen size
 * @type {ScreenMapping[]}
 */
const NUM_IMAGES_TO_SHOW_FOR_WIDTH = [{
    width: 576,
    size: 2
  },
  {
    width: 768,
    size: 3
  },
  {
    width: 992,
    size: 4
  }];

/**
 * @constant
 */
const ATTRIBUTE_SIZE = 'data-size';

/**
 * @type {function}
 */
const disable = setAttribute('disabled', '');

/**
 * @type {function}
 */
const enable = removeAttribute('disabled');

/**
 * @param {HTMLElement} element
 * @param {boolean} enabled
 */
const toggleEnabled = (element, force, nextElement) => {
  if (force) {
    if (isDisabled(element)) {
      enable(element);
    }
  }
  else {
    if (!isDisabled(element))  {
      disable(element);
      if (nextElement) {
        nextElement.focus();
      }
    }
  }
};

/**
 * @type {function}
 */
const isDisabled = hasAttribute('disabled');

/**
 * Update the view
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
const updateView = (element, state, clickChange) => {
  const prevButton = element.querySelector('.previous');
  const nextButton = element.querySelector('.next');
  const list = element.querySelector('ul');
  const totalCount = list.childElementCount;

  // update list sizes
  list.style.width = `${100 / state.displayCount * totalCount}%`;
  list.style.marginLeft = `${state.position * (100 / state.displayCount)}%`;

  // update image sizes
  querySelectorAll('li', element)
    .forEach(element => element.style.width = `${100 / totalCount}%`);

  // toggle button visibility
  [prevButton, nextButton]
    .forEach(toggleVisibility(state.displayCount < totalCount));

  // toggle button enable, disabled
  toggleEnabled(nextButton, state.position > (state.displayCount - totalCount), clickChange ? prevButton : null);
  toggleEnabled(prevButton, state.position < 0, clickChange ? nextButton : null);

  if (element.dataset.preventResizeLoop === 'true') {
    element.ignoreResize = true;
  }
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
const onNavigationButtonClick = (element, state, button, updateState) => {
  if(!isDisabled(button)){
    updateState(state);
    updateView(element, state, true);
  }
};

/**
 * Callback for when the dom is updated
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {MutationRecord} record
 * @function
 */
const handleDomUpdate = curry((element, state, keyboard, record) => {
  // on add image run initialization
  if(record.type === 'childList') {
    // Remove keyboard events for removed nodes
    let added = nodeListToArray(record.removedNodes)
      .filter(classListContains('slide'))
      .map(querySelector('img'))
      .filter(image => image !== null)
      .map(image => keyboard.removeElement(image));

    // Add keyboard events for new nodes
    let removed = nodeListToArray(record.addedNodes)
      .filter(classListContains('slide'))
      .map(querySelector('img'))
      .filter(image => image !== null)
      .map(image => keyboard.addElement(image));

    if(added.length > 0 || removed.length > 0) {
      // update the view
      updateView(element, Object.assign(state, {
        position: 0
      }));
    }
  }
});

/**
 * Handles focus when using keyboard navigation
 *
 * @param {Element} element
 * @param {ImageScrollerState} state
 * @param {CustomEvent} event
 * @function
 */
const handleFocus = curry((element, state, event) => {
  const focusedIndex = event.detail.index;
  const firstVisibleElementIndex = (state.position * -1);
  const lastVisibleElementIndex = (firstVisibleElementIndex + state.displayCount -1);

  const moveLeft = focusedIndex < firstVisibleElementIndex;
  const moveRight = focusedIndex > lastVisibleElementIndex;
  const doAnimation = moveLeft || moveRight;

  const focusOnTabbableElement = () => element.querySelector('img[tabindex="0"]').focus();

  // animation stuff
  if(doAnimation) {
    element.addEventListener("transitionend", focusOnTabbableElement, { once: true, bubbles: true });
  }

  if(moveLeft) {
    state.position = (focusedIndex * -1);
    updateView(element, state);
  }
  else if (moveRight) {
    state.position = state.position - (focusedIndex - lastVisibleElementIndex);
    updateView(element, state);
  }
  else if (element.dataset.preventResizeLoop === 'true') {
    element.ignoreResize = true;
  }

  if(!doAnimation) {
    focusOnTabbableElement();
  }
});

/**
 * Handles updating the screen size to make thumbnails responsive
 *
 * @param {Element} element
 * @param {ImageScrollerState} state
 */
const onResize = (element, state) => {
  const defaultSize = parseInt(element.getAttribute(ATTRIBUTE_SIZE)) || 5;
  const displayCount = calculateDisplayCount(window.innerWidth, defaultSize);

  updateView(element, Object.assign(state, {
    displayCount: displayCount,
    position: 0
  }));
};

/**
 * Returns the number of elements to show for a given width
 *
 * @param {number} elementWidth
 * @param {number} defaultValue
 *
 * @return {number}
 */
const calculateDisplayCount = (elementWidth, defaultValue) => {
  return NUM_IMAGES_TO_SHOW_FOR_WIDTH
    .reduce((res, opt) => Math.min((elementWidth < opt.width) ? opt.size : Infinity, res), defaultValue);
};

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  // get button html elements
  const nextButton = element.querySelector('.next');
  const prevButton = element.querySelector('.previous');
  const keyboard = new Keyboard();
  const defaultSize = parseInt(element.getAttribute(ATTRIBUTE_SIZE)) || 5;
  const displayCount = calculateDisplayCount(window.innerWidth, defaultSize);

  /**
   * @typedef {object} ImageScrollerState
   * @property {number} displayCount
   * @property {number} position
   */
  const state = {
    displayCount: displayCount,
    position: 0
  };

  // initialize images already existing in the dom
  querySelectorAll('[aria-controls]', element)
    .filter(image => image !== null)
    .forEach(image => keyboard.addElement(image));

  // initialize buttons
  nextButton.addEventListener('click', () => onNavigationButtonClick(element, state, nextButton, state => state.position--));
  prevButton.addEventListener('click', () => onNavigationButtonClick(element, state, prevButton, state => state.position++));

  // stop keyboard from setting focus
  element.addEventListener('sdk.keyboard.focus', event => event.preventDefault());

  // react to keyboard input
  element.addEventListener('sdk.keyboard.update', handleFocus(element, state));

  // listen for updates to data-size
  let observer = new MutationObserver(forEach(handleDomUpdate(element, state, keyboard)));

  observer.observe(element, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SIZE]
  });

  // on screen resize calculate number of images to show
  window.addEventListener('resize', () => {
    if (element.ignoreResize) {
      // If resize is triggered by resize we don't want to continue resizing
      element.ignoreResize = false;
      return;
    }

    onResize(element, state);
  });

  // initialize position
  updateView(element, state);

  return element;
}
