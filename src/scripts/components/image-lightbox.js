import {setAttribute, removeAttribute, hasAttribute, classListContains, querySelector, nodeListToArray, querySelectorAll} from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import Keyboard from '../utils/keyboard';

/**
 * @constant
 */
const ATTRIBUTE_SHOW = 'data-show';

/**
 * @constant
 * @type Object.<string, number>
 */
const KEY = {
  TAB:    9,
  ENTER: 13,
  SHIFT: 16,
  SPACE: 32
};

/**
 * @constant
 * @type Object.<string, number>
 */
const TAB_DIRECTION = {
  FORWARD: 0,
  BACKWARD: 1
};

/**
 * @function
 * @param {HTMLElement} element
 */
const show = (element) => element.classList.add('active');

/**
 * @function
 * @param {HTMLElement} element
 */
const hide = (element) => {
  element.classList.remove('active');
  element.removeAttribute('aria-live');
}

/**
 * @function
 * @param {HTMLElement} element
 */
const live = setAttribute('aria-live', 'polite');

/**
 * @function
 * @param {HTMLElement} element
 */
const enable = (element) => {
  element.tabIndex = 0;
  element.removeAttribute('aria-disabled');
};

/**
 * @function
 * @param {HTMLElement} element
 */
const disable = (element) => {
  element.tabIndex = -1;
  element.setAttribute('aria-disabled', 'true');
};

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
 * @param {HTMLElement} element
 */
const hideLightbox = removeAttribute(ATTRIBUTE_SHOW);

/**
 * Focus first element with tabindex from arguments
 *
 * @function
 * @param {...HTMLElement} elements
 */
const focus = (...elements) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].tabIndex !== -1) {
      return elements[i].focus();
    }
  }
};

/**
 * Will toggle the siblings of the element visible or not.
 *
 * @function
 * @param {HTMLElement} element
 * @param {boolean} show
 */
const toggleSiblings = (element, show) => {
  const siblings = element.parentNode.children;

  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i];

    if (sibling !== element) {
      if (show) {
        // TODO This is dangerous, and will interfere with
        // the aria-hidden state set by other compoents
        sibling.removeAttribute('aria-hidden')
      }
      else {
        sibling.setAttribute('aria-hidden', 'true');
      }
    }
  }
};

/**
 * @type string
 */
let progressTemplateText;

/**
 * Update the view
 *
 * @function
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {boolean} setDialogFocus
 */
const updateView = (element, state) => {

  const images = element.querySelectorAll('.imagelightbox-image');
  const progress = element.querySelector('.imagelightbox-progress');
  const prevButton = element.querySelector('.previous');
  const nextButton = element.querySelector('.next');

  // Hide all images
  images.forEach(image => hide(image));
  if (state.currentImage !== null) {
    // Show selected image
    const image = element.querySelector('.imagelightbox-image:nth-child(' + (state.currentImage + 1) + ')');

    show(image);
    live(image);
  }

  // Update progress text
  if (!progressTemplateText) {
    // Keep template for future updates
    progressTemplateText = progress.innerText;
  }
  progress.innerText = progressTemplateText.replace(':num', state.currentImage + 1).replace(':total', images.length);

  // Determine if buttons should be shown or hidden
  toggleHidden(prevButton, !images.length);
  toggleHidden(nextButton, !images.length);

  // Determine if buttons should be enabled or disabled
  toggleDisabled(prevButton, state.currentImage === 0);
  toggleDisabled(nextButton, state.currentImage === images.length - 1);

  // Determine if lightbox should be shown or hidden
  toggleHidden(element, state.currentImage === null);
  toggleSiblings(element, state.currentImage === null);
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
 * @function
 */
const onButtonPress = (button, handler) => {
  button.addEventListener('click', handler);
  button.addEventListener('keypress', (event) => {
    if (event.which === KEY.ENTER || event.which === KEY.SPACE) {
      // Enter or space key pressed
      handler();
      event.preventDefault();
    }
  });
}

/**
 * Keep track of which keys are currently pressed.
 *
 * @type Object.<number, boolean>
 */
const keysDown = {};

/**
 * Binds key listeners that traps focus when the lightbox is open.
 *
 * @function
 */
const onButtonTab = (button, direction, handler) => {
  button.addEventListener('keydown', (event) => {
    // Keep track of which keys are currently pressed
    keysDown[event.which] = true;

    if (event.which === KEY.TAB) {
      // Tab key press

      if (keysDown[KEY.SHIFT]) {
        if (direction === TAB_DIRECTION.BACKWARD) {
          // Shift is down, tab backward
          handler();
          event.preventDefault();
        }
      }
      else {
        if (direction === TAB_DIRECTION.FORWARD) {
          // Tab forward
          handler();
          event.preventDefault();
        }
      }
    }
  });
  button.addEventListener('keyup', (event) => {
    delete keysDown[event.which];
  });
}

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
  onButtonPress(nextButton, () => onNavigationButtonClick(element, nextButton, state.currentImage + 1));
  onButtonTab(nextButton, TAB_DIRECTION.BACKWARD, () => focus(closeButton));

  onButtonPress(prevButton, () => onNavigationButtonClick(element, prevButton, state.currentImage - 1));
  onButtonTab(prevButton, TAB_DIRECTION.BACKWARD, () => focus(nextButton, closeButton));

  onButtonPress(closeButton, () => hideLightbox(element));
  onButtonTab(closeButton, TAB_DIRECTION.FORWARD, () => focus(nextButton, prevButton));

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
