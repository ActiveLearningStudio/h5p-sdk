import {setAttribute, toggleAttribute, hide, show, toggleVisibility} from '../utils/elements';
import {curry, forEach} from '../utils/functional';
import { initCollapsible } from '../utils/aria';

/**
 * Unselects all elements in an array
 *
 * @param {HTMLElement[]} elements
 * @function
 */
const unSelectAll = forEach(setAttribute('aria-selected', 'false'));

/**
 * Sets the aria-expanded attribute on an element to false
 *
 * @param {HTMLElement} element
 */
const unExpand = setAttribute('aria-expanded', 'false');

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  // elements
  const menuItems = element.querySelectorAll('[role="menuitem"]');
  const toggler = element.querySelector('[aria-controls][aria-expanded]');

  // move select
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', event => {
      unSelectAll(menuItems);
      event.target.setAttribute('aria-selected', 'true');
      unExpand(toggler);
    });
  });

  // init collapse and open
  initCollapsible(element);
}
