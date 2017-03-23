import { initCollapsible } from '../utils/collapsible';
import Keyboard from '../utils/keyboard';
import { toggleAttribute, querySelectorAll, toggleVisibility } from '../utils/elements';

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const keyboard = new Keyboard();
  const togglerSelector = '[role="heading"] [aria-controls][aria-expanded]';
  keyboard.onSelect = el => toggleAttribute('aria-expanded', el);

  // collapse/expand on header press
  initCollapsible(element, (expanded, element) => toggleVisibility(expanded, element), togglerSelector);

  // Add keyboard support to expand collapse
  querySelectorAll(togglerSelector, element)
    .forEach(el => keyboard.addElement(el));
}