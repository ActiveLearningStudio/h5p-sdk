import { setAttribute, removeAttribute, hasAttribute, classListContains, querySelector, nodeListToArray, querySelectorAll, toggleVisibility } from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

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
const toggleEnabled = (element, enabled) => (enabled ? enable : disable)(element);

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
const updateView = (element, state) => {
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
  toggleEnabled(nextButton, state.position > (state.displayCount - totalCount));
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
const onNavigationButtonClick = (element, state, button, updateState) => {
  if(!isDisabled(button)){
    updateState(state);
    updateView(element, state);
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
    nodeListToArray(record.removedNodes)
      .filter(classListContains('slide'))
      .map(querySelector('img'))
      .filter(image => image !== null)
      .forEach(image => {keyboard.removeElement(image)});

    // Add keyboard events for new nodes
    nodeListToArray(record.addedNodes)
      .filter(classListContains('slide'))
      .map(querySelector('img'))
      .filter(image => image !== null)
      .forEach(image => {keyboard.addElement(image)});
  }

  // update the view
  updateView(element, Object.assign(state, {
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
export default function init(element) {
  // get button html elements
  const nextButton = element.querySelector('.next');
  const prevButton = element.querySelector('.previous');
  const keyboard = new Keyboard();

  /**
   * @typedef {object} ImageScrollerState
   * @property {number} displayCount
   * @property {number} position
   */
  const state = {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  };

  // initialize buttons
  nextButton.addEventListener('click', () => onNavigationButtonClick(element, state, nextButton, state => state.position--));
  prevButton.addEventListener('click', () => onNavigationButtonClick(element, state, prevButton, state => state.position++));

  // listen for updates to data-size
  let observer = new MutationObserver(forEach(handleDomUpdate(element, state, keyboard)));

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
