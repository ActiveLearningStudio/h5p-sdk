import { initCollapsible } from '../utils/collapsible';
import Keyboard from '../utils/keyboard';
import { toggleAttribute } from '../utils/elements';

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const keyboard = new Keyboard();
  keyboard.onSelect = el => toggleAttribute('aria-expanded', el);

  // collapse/expand on header press
  initCollapsible(element);

  // Add keyboard support to expand collapse
  element.querySelectorAll('[aria-controls][aria-expanded]')
    .forEach(el => keyboard.addElement(el));
}