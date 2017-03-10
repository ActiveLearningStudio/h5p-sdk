import { setAttribute, removeAttribute, hasAttribute } from '../utils/elements';
import {curry, forEach} from '../utils/functional';

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
 * @param {HTMLElement} element
 * @param {boolean} hidden
 */
const toggleVisibility = curry((hidden, element) => setAttribute('aria-hidden', hidden.toString(), element));

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
  element.querySelectorAll('li')
    .forEach(element => element.style.width = `${100 / totalCount}%`);

  // toggle button visibility
  [prevButton, nextButton]
    .forEach(toggleVisibility(state.displayCount >= totalCount));

  // toggle button enable, disabled
  toggleEnabled(nextButton, state.position > (state.displayCount - totalCount));
  toggleEnabled(prevButton, state.position < 0);
};

/**
 * Handles button clicked
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {function} updateState
 * @param {Event}
 * @type {function}
 */
const onButtonClick = curry((element, state, updateState, event) => {
  if(!isDisabled(event.target)){
    updateState(state);
    updateView(element, state);
  }
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
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
  element.querySelector('.next').addEventListener('click', onButtonClick(element, state, state => state.position--));
  element.querySelector('.previous').addEventListener('click', onButtonClick(element, state, state => state.position++));

  // initialize images
  element.querySelectorAll('[aria-controls]')
    .forEach(image => {
      let targetId = image.getAttribute('aria-controls');
      let target = element.querySelector(`#${targetId}`);

      target.addEventListener('click', event => target.setAttribute('aria-hidden', 'true'));
      image.addEventListener('click', event => target.setAttribute('aria-hidden', 'false'))
    });

  // listen for updates to data-size
  let observer = new MutationObserver(forEach(record => {
    updateView(element, Object.assign(state, {
      position: 0,
      displayCount: element.getAttribute(ATTRIBUTE_SIZE)
    }));
  }));

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