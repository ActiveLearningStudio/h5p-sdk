import {getAttribute, setAttribute, removeAttribute, hasAttribute} from '../utils/elements';

const expandable = hasAttribute('aria-expanded');

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  if(expandable(element)) {

  }

  return element;
}