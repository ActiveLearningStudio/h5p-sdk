import { hide, show } from '../utils/elements';

/**
 * Initiates a modal window
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const dismissButtons = element.querySelectorAll('[data-dismiss="modal"]');
  hide(element);
  dismissButtons.forEach(button => button.addEventListener('click', () => hide(element)))
}
