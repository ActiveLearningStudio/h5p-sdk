import { curry } from '../utils/functional';
import { hide, querySelectorAll } from '../utils/elements';

const getAllTabbableChildren = element => {
  return querySelectorAll('a[href],link[href],button,input,select,textarea,[tabindex="0"]', element);
};

/**
 * Handles key press inside modal
 *
 * @param {Element} element
 * @param {KeyboardEvent} event
 *
 * @function
 */
const handleKeyPress = curry((element, event) => {
  let target = event.srcElement || event.target;

  switch(event.which) {
    case 27: // ESC
      hide(element);
      event.preventDefault();
      break;
    case 9: // TAB
      const elements = getAllTabbableChildren(element);

      // wrap around on tabbing
      if(elements.length > 0) {
        const lastIndex = elements.length - 1;

        if (target === elements[0] && event.shiftKey) {
          elements[lastIndex].focus();
          event.preventDefault();
        }
        else if(target === elements[lastIndex]) {
          elements[0].focus();
          event.preventDefault();
        }
      }
      break;
  }
});

/**
 * Initiates a modal window
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const dismissButtons = querySelectorAll('[data-dismiss="modal"]', element);
  hide(element);

  dismissButtons.forEach(button => button.addEventListener('click', () => hide(element)));

  // hide modal on escape keypress
  element.addEventListener('keydown', handleKeyPress(element));
}
