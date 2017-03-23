import {setAttribute, removeAttribute, hasAttribute, classListContains, querySelector, nodeListToArray, querySelectorAll} from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

/**
 * @constant
 */
const ATTRIBUTE_SHOW = 'data-show';

/**
 * @function
 * @param {HTMLElement} element
 */
const show = removeAttribute('aria-hidden');

/**
 * @function
 * @param {HTMLElement} element
 */
const hide = setAttribute('aria-hidden', 'true');

/**
 * @function
 * @param {HTMLElement} element
 */
const enable = removeAttribute('aria-disabled');

/**
 * @function
 * @param {HTMLElement} element
 */
const disable = setAttribute('aria-disabled', '');

/**
 * @function
 * @param {HTMLElement} element
 */
const isDisabled = hasAttribute('aria-disabled');

/**
 * @function
 * @param {HTMLElement} element
 * @param {boolean} force
 */
const toggleDisabled = (element, force) => (force ? disable : enable)(element);

/**
 * @function
 * @param {HTMLElement} element
 * @param {boolean} force
 */
const toggleHidden = (element, force) => (force ? hide : show)(element);

/**
 * @function
 * @param {HTMLElement} element
 * @param {number} imageIndex
 */
const showImageLightbox = curry((element, imageIndex) => setAttribute('data-show', imageIndex, element));

/**
 * @function
 * @type {function}
 * @param {HTMLElement} element
 */
const hideLightbox = removeAttribute(ATTRIBUTE_SHOW);

/**
 * Update the view
 *
 * @function
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
const updateView = (element, state) => {

  const images = element.querySelectorAll('.imagelightbox-image');
  const prevButton = element.querySelector('.previous');
  const nextButton = element.querySelector('.next');

  // Hide all images
  images.forEach(image => hide(image));
  if (state.currentImage !== null) {
    // Show selected image
    const image = element.querySelector('.imagelightbox-image:nth-child(' + (state.currentImage + 1) + ')');
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
const onNavigationButtonClick = (element, button, imageIndex) => {
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
const handleDomUpdate = curry((element, state, keyboard, record) => {

  if (record.type === 'attributes' &&
      record.attributeName === ATTRIBUTE_SHOW) {

    var showImage = parseInt(record.target.getAttribute(ATTRIBUTE_SHOW));

    // update the view
    updateView(element, Object.assign(state, {
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
export default function init(element) {
  // get button html elements
  const nextButton = element.querySelector('.next');
  const prevButton = element.querySelector('.previous');
  const closeButton = element.querySelector('.close');
  const keyboard = new Keyboard();

  /**
   * @typedef {object} ImageLightboxState
   * @property {number} currentImage Index of image to display
   */
  const state = {
    currentImage: false
  };

  // initialize buttons
  prevButton.addEventListener('click', () => onNavigationButtonClick(element, prevButton, state.currentImage - 1));
  nextButton.addEventListener('click', () => onNavigationButtonClick(element, nextButton, state.currentImage + 1));
  closeButton.addEventListener('click', () => hideLightbox(element));

  // listen for updates to data-size
  let observer = new MutationObserver(forEach(handleDomUpdate(element, state, keyboard)));

  observer.observe(element, {
    subtree: false,
    childList: false,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SHOW]
  });

  return element;
}
