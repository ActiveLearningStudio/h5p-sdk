import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector} from '../utils/elements';

/**
 * @type {function}
 */
const selectExpandable = querySelector('[aria-expanded]');

/**
 * @type {function}
 */
const isExpanded = attributeEquals('aria-expanded', 'true');

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const titleElement = selectExpandable(element);

  if(titleElement) {

  }

  return element;
}
