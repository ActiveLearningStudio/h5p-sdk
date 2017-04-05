import {setAttribute, removeAttribute, hasAttribute, querySelectorAll} from '../utils/elements';
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
  SPACE: 32,
  ESC: 27,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39
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
const hideLightbox = (element) => {
  element.removeAttribute(ATTRIBUTE_SHOW);
  element.dispatchEvent(new Event('lightbox-hidden'));
};

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

  const images = querySelectorAll('.imagelightbox-image', element);
  const progress = element.querySelector('.imagelightbox-progress');
  const prevButton = element.querySelector('.previous');
  const nextButton = element.querySelector('.next');
  const closeButton = element.querySelector('.close');

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
  const isAlreadyShowing = element.classList.contains('active');
  toggleHidden(element, state.currentImage === null);
  toggleSiblings(element, state.currentImage === null);

  // Set focus to close button if not already showing
  if (!isAlreadyShowing) {
    setTimeout(() => {
      closeButton.focus();
    }, 20);
  }
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
 * Generic function for handling keydowns
 *
 * @function
 * @param {HTMLElement} element
 * @param {number[]}  keycodes
 * @param {function} handler
 */
const onKeyDown = (element, keycodes, handler) => {
  element.addEventListener('keydown', event => {
    if (keycodes.indexOf(event.which) !== -1) {
      handler();
      event.preventDefault();
    }
  });
};

/**
 * @function
 */
const onButtonPress = (button, handler) => {
  button.addEventListener('click', handler);
  onKeyDown(button, [KEY.ENTER, KEY.SPACE], handler);
};

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

    const showImage = parseInt(record.target.getAttribute(ATTRIBUTE_SHOW));

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
  onButtonTab(nextButton, TAB_DIRECTION.BACKWARD, () => focus(prevButton, closeButton));
  onButtonTab(nextButton, TAB_DIRECTION.FORWARD, () => focus(closeButton, prevButton));

  onButtonPress(prevButton, () => onNavigationButtonClick(element, prevButton, state.currentImage - 1));
  onButtonTab(prevButton, TAB_DIRECTION.BACKWARD, () => focus(closeButton, nextButton));
  onButtonTab(prevButton, TAB_DIRECTION.FORWARD, () => focus(nextButton, closeButton));

  onButtonPress(closeButton, () => hideLightbox(element));
  onButtonTab(closeButton, TAB_DIRECTION.BACKWARD, () => focus(nextButton, prevButton));
  onButtonTab(closeButton, TAB_DIRECTION.FORWARD, () => focus(prevButton, nextButton));

  // When clicking on the background, let's close it
  element.addEventListener('click', (event) => {
    if (event.target === element) {
      hideLightbox(element);
    }
  });

  // Initialize keyboard navigation
  element.addEventListener('keyup', event => {
    if (event.which === KEY.ESC) {
      event.preventDefault();
      hideLightbox(element);
    }
    else if (event.which === KEY.LEFT_ARROW) {
      if (state.currentImage !== 0) {
        showImageLightbox(element, state.currentImage - 1);
      }
    }
    else if (event.which === KEY.RIGHT_ARROW) {
      const images = querySelectorAll('.imagelightbox-image', element);
      if (state.currentImage !== images.length - 1) {
        showImageLightbox(element, state.currentImage + 1);
      }
    }
  });

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
